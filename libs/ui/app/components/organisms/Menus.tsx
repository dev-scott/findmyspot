import { MenuItem } from '@findmyspot/util/types'
import Link from 'next/link'

export interface IMenuItemProps {
  menuItems: MenuItem[]
}

export const Menus = ({ menuItems }: IMenuItemProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {menuItems.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className="text-lg font-bold text-white/60 hover:text-primary uppercase tracking-[0.2em] transition-all duration-300 flex items-center group"
        >
          <span className="w-0 group-hover:w-4 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
          {label}
        </Link>
      ))}
    </div>
  )
}
