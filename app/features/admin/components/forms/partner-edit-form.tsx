import { useState } from 'react'

import Close from '~/assets/icons/close.svg?react'
import { ImageUpload } from '~/components/image-upload'
import { ModalDialog } from '~/components/modal-dialog'
import { EditableSection } from '~/features/admin/components/editable-section'

interface ImageItem {
  logo: string
  logoFile: File | null
}

interface PartnerEditFormProps {
  onClose: () => void
  onSave: (data: ImageItem[]) => void
}

export function PartnerEditForm({ onClose, onSave }: PartnerEditFormProps) {
  const [images, setImages] = useState<ImageItem[]>([
    { logo: '', logoFile: null },
    { logo: '', logoFile: null },
    { logo: '', logoFile: null },
  ])

  const handleImageSelect = (index: number, file: File | null, previewUrl: string | null) => {
    setImages((prev) => prev.map((item, i) => (i === index ? { logo: previewUrl || '', logoFile: file } : item)))
  }

  const handleSave = () => {
    const validImages = images.filter((item) => item.logo)
    if (validImages.length === 0) return
    onSave(validImages)
  }

  return (
    <ModalDialog onClose={onClose}>
      <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
        <h2 className='text-text-primary text-lg font-bold sm:text-xl'>파트너 추가</h2>
        <button onClick={onClose} className='rounded-full bg-black p-1.5 transition-colors hover:bg-black/80 sm:p-2'>
          <Close className='text-text-primary h-3 w-3' />
        </button>
      </div>

      <div className='p-4 sm:p-6'>
        <EditableSection onCancel={onClose} onSave={handleSave} className='flex flex-col gap-4 sm:flex-row'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            {images.map((item, index) => (
              <ImageUpload
                key={index}
                currentImage={item.logo}
                onFileSelect={(file, previewUrl) => handleImageSelect(index, file, previewUrl)}
                buttonText='Choose image'
                className='aspect-video w-full sm:w-40 lg:w-52'
              />
            ))}
          </div>
        </EditableSection>
      </div>
    </ModalDialog>
  )
}
