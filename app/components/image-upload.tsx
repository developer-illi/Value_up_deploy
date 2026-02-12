import React, { useRef, useState, useEffect } from 'react'

type ImageUploadProps = {
  rounded?: boolean
  currentImage?: string
  onFileSelect?: (file: File | null, previewUrl: string | null) => void
  className?: string
  buttonText?: string
  clickable?: boolean
  imageClassName?: string
}

export function ImageUpload({
  currentImage,
  onFileSelect,
  rounded = false,
  className = '',
  buttonText = 'Choose Image',
  clickable = false,
  imageClassName = 'w-full h-full object-cover',
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(currentImage || null)

  useEffect(() => {
    setPreview(currentImage || null)
  }, [currentImage])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const previewUrl = reader.result as string
      setPreview(previewUrl)
      onFileSelect?.(file, previewUrl)
    }
    reader.readAsDataURL(file)

    e.target.value = ''
  }

  const handleClick = () => {
    if (clickable) {
      fileInputRef.current?.click()
    }
  }

  if (clickable) {
    return (
      <div className={className}>
        <input ref={fileInputRef} type='file' accept='image/*' onChange={handleFileChange} className='hidden' />
        <div
          onClick={handleClick}
          className={`group relative h-full w-full cursor-pointer overflow-hidden bg-gray-100 ${rounded && 'rounded-3xl'} ${className}`}
        >
          {preview ? (
            <>
              <img src={preview} alt='Preview' className={imageClassName} />
              <div className='absolute inset-0 z-10 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30'>
                <span className='text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100'>{buttonText}</span>
              </div>
            </>
          ) : (
            <div className='flex h-full min-h-24 w-full items-center justify-center transition-colors'>
              <span className='group-hover:text-primary text-sm text-gray-400 transition-colors'>{buttonText}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {preview ? (
        <div className={`relative w-full overflow-hidden bg-gray-100 ${rounded && 'rounded-3xl'}`}>
          <img src={preview} alt='Preview' className={imageClassName} />
        </div>
      ) : (
        <div className={`flex h-full min-h-24 w-full items-center justify-center bg-gray-100 ${rounded && 'rounded-3xl'}`} />
      )}
      <input ref={fileInputRef} type='file' accept='image/*' onChange={handleFileChange} className='hidden' />
      <button
        type='button'
        onClick={() => fileInputRef.current?.click()}
        className='border-primary text-primary hover:bg-primary w-fit rounded-xl border px-4 py-2 transition-colors hover:text-white'
      >
        {buttonText}
      </button>
    </div>
  )
}
