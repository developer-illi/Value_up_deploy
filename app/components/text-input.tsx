import React, { forwardRef } from 'react'

type TextInputProps = React.ComponentProps<'input'>

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ className, value, onChange, ...props }, ref) => {
  return (
    <input
      type='text'
      ref={ref}
      value={value}
      onChange={onChange}
      className={`border-primary text-md text-text-primary w-full border border-dashed px-2 py-1 font-medium ${className || ''}`}
      {...props}
    />
  )
})

TextInput.displayName = 'TextInput'
