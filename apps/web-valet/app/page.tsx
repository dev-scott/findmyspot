'use client'
import { IsLoggedIn } from '@findmyspot/ui/app/components/organisms/IsLoggedIn'
import { IsValet } from '@findmyspot/ui/app/components/organisms/IsValet'
import { ValetHome } from '@findmyspot/ui/app/components/templates/ValetHome'

export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsValet uid={uid}>
            <ValetHome />
          </IsValet>
        )}
      </IsLoggedIn>
    </main>
  )
}
