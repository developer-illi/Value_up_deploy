import { useState } from 'react'

import Clip from '~/assets/icons/clip.svg?react'
import Close from '~/assets/icons/close.svg?react'
import { Field } from '~/components/field'
import { ImageUpload } from '~/components/image-upload'
import { ModalDialog } from '~/components/modal-dialog'
import { EditableSection } from '~/features/admin/components/editable-section'

interface ProjectEditFormProps {
  initialData?: {
    type?: string
    title?: string
    link?: string
    image?: string
  }
  onClose: () => void
  onSave: (data: { type: string; title: string; link: string; image: string; imageFile?: File | null }) => void
}

export function ProjectEditForm({ initialData, onClose, onSave }: ProjectEditFormProps) {
  const [type, setType] = useState(initialData?.type || '')
  const [title, setTitle] = useState(initialData?.title || '')
  const [link, setLink] = useState(initialData?.link || '')
  const [image, setImage] = useState(initialData?.image || '')
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleImageSelect = (file: File | null, previewUrl: string | null) => {
    setImage(previewUrl || '')
    setImageFile(file)
  }

  const handleSave = () => {
    onSave({ type, title, link, image, imageFile })
  }

  return (
    <ModalDialog onClose={onClose}>
      <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
        <h2 className='text-text-primary text-lg font-bold sm:text-xl'>Edit</h2>
        <button onClick={onClose} className='rounded-full bg-black p-1.5 transition-colors hover:bg-black/80 sm:p-2'>
          <Close className='text-text-primary h-3 w-3' />
        </button>
      </div>

      <div className='p-4 sm:p-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <ImageUpload
              currentImage={image}
              onFileSelect={handleImageSelect}
              buttonText='Choose image'
              className={image ? 'h-64 w-full sm:h-96 sm:w-60' : 'h-64 w-full flex-1 justify-center sm:h-96 sm:w-60'}
              clickable
            />
          </div>

          <EditableSection onCancel={onClose} onSave={handleSave} className='flex-1'>
            <div className='flex w-full flex-1 flex-col justify-center gap-2 sm:w-64 lg:w-96'>
              <Field.Text value={type} onChange={(e) => setType(e.target.value)} placeholder='PPT' className='text-sm' />
              <Field.Text value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Untitled' className='text-lg font-bold sm:text-xl' />
              <div className='border-primary relative flex items-center gap-2 rounded-full border px-2 py-1'>
                <Clip className='text-text-primary h-4 w-4 shrink-0' />
                <div className='bg-primary h-full w-px' />
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder='Link'
                  className='caret-primary text-text-primary min-w-0 flex-1 focus:outline-none'
                />
              </div>
            </div>
          </EditableSection>
        </div>
      </div>
    </ModalDialog>
  )
}
