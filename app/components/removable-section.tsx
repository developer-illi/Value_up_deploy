import React from 'react'

import Close from '~/assets/icons/close.svg?react'

type RemovableSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  onRemove: () => void
}

export function RemovableSection({ children, onRemove, className, ...props }: React.PropsWithChildren<RemovableSectionProps>) {
  return (
    <div className={`group relative ${className}`} {...props}>
      <button
        onClick={onRemove}
        className='bg-primary hover:bg-primary/90 absolute -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full text-white transition-colors'
      >
        <Close className='h-3 w-3' />
      </button>
      {children}
    </div>
  )
}
