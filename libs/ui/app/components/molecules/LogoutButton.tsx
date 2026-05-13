'use client'
import { IconDoorExit, IconLogin, IconUserPlus } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import { Button } from '../atoms/Button'

export const LogoutButton = () => {
  return (
    <Button
      variant="outlined"
      color="white"
      onClick={() => {
        signOut()
      }}
      className="flex items-center gap-3 w-full border-white/20 hover:border-red-500/50 hover:text-red-500 group"
    >
      <IconDoorExit className="w-4 h-4 transition-transform group-hover:translate-x-1" /> 
      <span>Log out</span>
    </Button>
  )
}
