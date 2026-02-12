import React from 'react'

type EditableSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  onCancel: () => void
  onSave: () => void
  disabled?: boolean
}

export function EditableSection({ children, onCancel, onSave, disabled = false, className, ...props }: React.PropsWithChildren<EditableSectionProps>) {
  return (
    <div className='flex w-full flex-col gap-6' {...props}>
      <div className={className}>{children}</div>
      <div className='flex items-center gap-2 self-end'>
        <button
          onClick={onCancel}
          disabled={disabled}
          className='text-md rounded-xl bg-gray-400 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50'
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={disabled}
          className='text-md rounded-xl bg-black px-6 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50'
        >
          {disabled ? '...' : 'Save'}
        </button>
      </div>
    </div>
  )
}
