import { useState, useEffect, useRef } from 'react'

import { useFetcher } from 'react-router'
import { toast } from 'react-toastify'

import { Field } from '~/components/field'
import { ImageUpload } from '~/components/image-upload'
import { EditableSection } from '~/features/admin/components/editable-section'
import { uploadImageFile } from '~/hooks'

import type { Information } from '~/types/admin.type'

type InformationResponse = {
  informations?: Information[]
  information?: Information
  success?: boolean
  error?: string
  message?: string
}

type LocalInformation = Information & {
  imageFile?: File | null
}

const generateDefaultInformation = (id: number): LocalInformation => ({
  id,
  title: '',
  content: '',
  image: '',
  imageFile: null,
})

export function Intro() {
  const fetcher = useFetcher<InformationResponse>()
  const [informations, setInformations] = useState<LocalInformation[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const originalDataRef = useRef<Information[]>([])
  const isLoadedRef = useRef(false)

  useEffect(() => {
    if (!isLoadedRef.current) {
      isLoadedRef.current = true
      fetcher.load('/api/information')
    }
  }, [fetcher])

  useEffect(() => {
    if (!fetcher.data) return

    if ('error' in fetcher.data && fetcher.data.error) {
      toast.error(fetcher.data.error)
      return
    }

    if ('informations' in fetcher.data && fetcher.data.informations) {
      const data = fetcher.data.informations
      originalDataRef.current = data
      setInformations(data.map((info) => ({ ...info, imageFile: null })))
    }

    if ('success' in fetcher.data && fetcher.data.success) {
      toast.success(fetcher.data.message || '저장되었습니다.')
    }
  }, [fetcher.data])

  const handleUpdate = (id: number, field: keyof Information, value: string | null) => {
    setInformations((prev) => prev.map((info) => (info.id === id ? { ...info, [field]: value } : info)))
  }

  const handleImageSelect = (id: number, file: File | null, previewUrl: string | null) => {
    setInformations((prev) => prev.map((info) => (info.id === id ? { ...info, image: previewUrl, imageFile: file } : info)))
  }

  const handleCancel = () => {
    setInformations(originalDataRef.current.map((info) => ({ ...info, imageFile: null })))
    toast.info('변경사항이 취소되었습니다.')
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const updatePromises = informations.map(async (info) => {
        let imageUrl = info.image

        if (info.imageFile) {
          imageUrl = await uploadImageFile(info.imageFile)
        }

        const formData = new FormData()
        formData.append('id', info.id.toString())
        formData.append(
          'data',
          JSON.stringify({
            title: info.title,
            content: info.content,
            image: imageUrl,
          }),
        )

        const response = await fetch('/api/information', {
          method: 'PUT',
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || '저장에 실패했습니다.')
        }

        return response.json()
      })

      await Promise.all(updatePromises)

      originalDataRef.current = informations.map(({ imageFile: _, ...rest }) => ({
        ...rest,
        image: rest.image || null,
      }))
      setInformations((prev) => prev.map((info) => ({ ...info, imageFile: null })))
      toast.success('저장되었습니다.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '저장에 실패했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section id='about' className='bg-primary px-4 py-12 sm:px-6 sm:py-14 lg:px-12 lg:py-16 xl:px-20 xl:py-20'>
      <EditableSection onCancel={handleCancel} onSave={handleSave} disabled={isSaving}>
        <div className='flex flex-col gap-4 sm:gap-6 lg:gap-8'>
          {Array.from({ length: 3 }).map((_, i) => {
            const info = informations[i] || generateDefaultInformation(i)
            return (
              <div key={info.id} className='overflow-hidden rounded-2xl bg-white p-4 sm:p-6 lg:rounded-3xl lg:p-8'>
                <div className='flex flex-col gap-4 lg:flex-row'>
                  <div className='w-full lg:flex-1'>
                    <ImageUpload
                      rounded
                      currentImage={info.image || ''}
                      onFileSelect={(file, previewUrl) => handleImageSelect(info.id, file, previewUrl)}
                      buttonText='Choose image'
                    />
                  </div>
                  <div className='flex w-full flex-col gap-3 sm:gap-4 lg:flex-2'>
                    <Field.Textarea
                      wrap='hard'
                      className='h-14 font-bold sm:h-16'
                      rows={1}
                      value={info.title}
                      onChange={(e) => handleUpdate(info.id, 'title', e.target.value)}
                    />
                    <Field.Textarea
                      wrap='hard'
                      className='flex-2'
                      value={info.content}
                      onChange={(e) => handleUpdate(info.id, 'content', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </EditableSection>
    </section>
  )
}
