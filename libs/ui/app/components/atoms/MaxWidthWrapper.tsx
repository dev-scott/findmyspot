import { cn } from '@findmyspot/util'
import React from 'react'
import { ReactNode } from 'react'


interface MaxWidthWrapperProps{
  className?:string
  children:ReactNode
}

const MaxWidthWrapper = ({className,children}: MaxWidthWrapperProps) => {
  return (
    <div className={cn('mx-auto max-w-screen px-4 md:px-20',className)}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper