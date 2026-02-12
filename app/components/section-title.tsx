import React from 'react'

import PlusCircle from '~/assets/icons/plus-circle.svg?react'

type SectionTitleProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: boolean
  title: string
  subtitle?: string
  className?: string
  onClick?: () => void
}

export function SectionTitle({ icon = false, title, subtitle, className, onClick, ...props }: SectionTitleProps) {
  return (
    <div className={`flex flex-col gap-2 sm:gap-4 ${className}`} {...props}>
      <div className='flex items-center gap-2 sm:gap-4'>
        <h2 className='text-text-primary text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl'>{title}</h2>
        {icon && <PlusCircle className='h-6 w-6 cursor-pointer sm:h-8 sm:w-8 md:h-10 md:w-10' onClick={onClick} />}
      </div>
      {subtitle && <p className='text-text-primary text-sm sm:text-base'>{subtitle}</p>}
    </div>
  )
}
