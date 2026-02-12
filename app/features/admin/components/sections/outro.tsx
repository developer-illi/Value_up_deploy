import React, { useState, useEffect, useRef } from 'react'

import { useFetcher } from 'react-router'
import { toast } from 'react-toastify'

import { EditableSection } from '~/features/admin/components/editable-section'

import type { OutroMessage } from '~/types/admin.type'

type OutroResponse = {
  outroMessage?: OutroMessage
  success?: boolean
  error?: string
  message?: string
}

export function Outro() {
  const fetcher = useFetcher<OutroResponse>()
  const [outroMessage, setOutroMessage] = useState<OutroMessage>({
    id: '1',
    title: '',
    subtitle: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const originalDataRef = useRef<OutroMessage | null>(null)
  const isLoadedRef = useRef(false)

  useEffect(() => {
    if (!isLoadedRef.current) {
      isLoadedRef.current = true
      fetcher.load('/api/outro-message')
    }
  }, [fetcher])

  useEffect(() => {
    if (!fetcher.data) return

    if ('error' in fetcher.data && fetcher.data.error) {
      toast.error(fetcher.data.error)
      return
    }

    if ('outroMessage' in fetcher.data && fetcher.data.outroMessage) {
      const data = fetcher.data.outroMessage
      originalDataRef.current = data
      setOutroMessage(data)
    }

    if ('success' in fetcher.data && fetcher.data.success) {
      toast.success(fetcher.data.message || '저장되었습니다.')
    }
  }, [fetcher.data])

  const handleUpdate = (field: 'title' | 'subtitle', value: string) => {
    setOutroMessage((prev) => ({ ...prev, [field]: value }))
  }

  const handleCancel = () => {
    if (originalDataRef.current) {
      setOutroMessage(originalDataRef.current)
    }
    toast.info('변경사항이 취소되었습니다.')
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const formData = new FormData()
      formData.append(
        'data',
        JSON.stringify({
          title: outroMessage.title,
          subtitle: outroMessage.subtitle,
        }),
      )

      fetcher.submit(formData, {
        method: 'PUT',
        action: '/api/outro-message',
      })

      originalDataRef.current = outroMessage
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '저장에 실패했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className='flex flex-col gap-6 md:gap-8'>
      <div className='space-y-4 bg-[#0D2650] px-4 py-12 text-center sm:px-8 sm:py-16 md:px-16 lg:px-24 lg:py-20'>
        <textarea
          value={outroMessage.title}
          onChange={(e) => handleUpdate('title', e.target.value)}
          rows={2}
          className='border-primary w-full resize-none border border-dashed bg-transparent px-2 py-2 text-center text-xl leading-8 font-bold whitespace-pre-wrap text-white focus:outline-none sm:text-2xl sm:leading-10 md:text-3xl md:leading-12'
          placeholder='제목'
        />
        <textarea
          value={outroMessage.subtitle}
          onChange={(e) => handleUpdate('subtitle', e.target.value)}
          rows={3}
          className='border-primary w-full resize-none border border-dashed bg-transparent px-2 py-2 text-center text-base leading-6 font-medium whitespace-pre-wrap text-white focus:outline-none sm:text-lg sm:leading-8'
          placeholder='부제목'
        />
      </div>
      <div className='container mx-auto flex w-full items-center justify-end gap-2 px-4 sm:px-0'>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          className='text-md rounded-xl bg-gray-400 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50'
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className='text-md rounded-xl bg-black px-6 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isSaving ? '...' : 'Save'}
        </button>
      </div>
    </section>
  )
}
