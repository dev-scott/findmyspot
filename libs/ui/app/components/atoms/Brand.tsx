import { Role } from '@findmyspot/util/types'
import { BrandIcon } from './BrandIcon'

export interface IBrandProps {
  className?: string
  shortForm?: boolean
  type?: Role
}

export const Brand = ({
  shortForm = false,
  className = '',
  type = undefined,
}: IBrandProps) => {
  return (
    <div className={`flex items-center z-50 ${className}`}>
      {shortForm ? (
        <BrandIcon className="w-5 h-5" />
      ) : (
        <div className="flex items-center gap-3">
          <BrandIcon className="w-6 h-6" />
          <div className="flex flex-col leading-none">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold tracking-tighter uppercase italic">
                find<span className="text-primary">my</span>spot
              </span>
              {type && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 px-1 bg-primary/5 border border-primary/10">
                  {type}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
