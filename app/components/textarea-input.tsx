import React, { forwardRef } from 'react'

type TextareaInputProps = React.ComponentProps<'textarea'>

export const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  ({ className, value, onChange, placeholder, rows = 2, ...props }: TextareaInputProps, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`text-md text-text-primary border-primary h-full max-h-48 w-full resize-none border border-dashed px-2 py-1 leading-relaxed ${className || ''}`}
        {...props}
      />
    )
  },
)

TextareaInput.displayName = 'TextareaInput'
