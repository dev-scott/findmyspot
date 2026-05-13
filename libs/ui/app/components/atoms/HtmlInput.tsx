import React, { InputHTMLAttributes } from 'react'

export type HtmlInputProps = InputHTMLAttributes<HTMLInputElement>

export const HtmlInput = React.forwardRef<HTMLInputElement, HtmlInputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`
        block w-full px-4 py-3 
        bg-white border border-gray-200 rounded-none 
        appearance-none placeholder-gray-400 
        text-sm font-medium
        transition-all duration-300
        read-only:bg-gray-50 read-only:text-gray-500
        focus:outline-none focus:border-black focus:ring-0
        hover:border-gray-300
        ${className}
      `}
      {...props}
    />
  ),
)
HtmlInput.displayName = 'Input'
