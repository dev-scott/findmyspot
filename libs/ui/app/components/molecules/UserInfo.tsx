import { BaseComponent } from '@findmyspot/util/types'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export const UserInfo = ({ children, className }: BaseComponent) => {
  const session = useSession()
  const image = session.data?.user?.image
  const name = session.data?.user?.name
  const uid = session.data?.user?.uid
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative w-14 h-14 shrink-0">
        <Image
          src={image || '/user.png'}
          alt=""
          width={56}
          height={56}
          className="w-full h-full object-cover border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary border-2 border-black" />
      </div>
      <div className="flex flex-col min-w-0">
        <div className="text-sm font-bold text-white uppercase tracking-wider truncate">{name}</div>
        <div className="text-[10px] font-mono text-white/40 truncate">{uid}</div>
      </div>
      {children}
    </div>
  )
}
