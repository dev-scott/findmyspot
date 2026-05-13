import { IconAlertCircle } from '@tabler/icons-react'
import { ReactNode } from 'react'

export interface IAlertSectionProps {
  title?: ReactNode
  children: ReactNode
}

export const AlertSection = ({ title, children }: IAlertSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[40vh] py-12 px-4">
      <div className="w-full max-w-md p-10 border border-gray-100 bg-white flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-50 flex items-center justify-center mb-6">
          <IconAlertCircle size={32} className="text-red-500" stroke={2} />
        </div>

        {title && (
          <h2 className="text-lg font-bold uppercase tracking-tighter italic mb-4">
            {title}
          </h2>
        )}

        <div className="text-gray-500 text-xs font-medium uppercase tracking-[0.1em] leading-relaxed flex flex-col items-center gap-4 w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
