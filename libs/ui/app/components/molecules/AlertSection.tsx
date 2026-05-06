import { IconAlertCircle } from '@tabler/icons-react'
import { ReactNode } from 'react'

export interface IAlertSectionProps {
  title?: ReactNode
  children: ReactNode
}

export const AlertSection = ({ title, children }: IAlertSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] py-12 px-4">
      <div
        className="w-full max-w-md p-8 text-center flex flex-col items-center"
        style={{
          // background: '#ffffff',
          // borderRadius: '24px',
          // border: '1px solid rgba(0,0,0,0.06)',
          // boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)',
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{
            background: 'rgba(0,0,0,0.03)',
          }}
        >
          <IconAlertCircle size={32} className="text-gray-400" stroke={1.5} />
        </div>

        {title && (
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {title}
          </h2>
        )}

        <div className="text-gray-500 text-sm leading-relaxed flex flex-col items-center gap-4 w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
