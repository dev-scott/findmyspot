'use client'
import { IsLoggedIn } from '@findmyspot/ui/app/components/organisms/IsLoggedIn'
import { IsValet } from '@findmyspot/ui/app/components/organisms/IsValet'
import { ValetTrips } from '@findmyspot/ui/app/components/templates/ValetTrips'

export default function Page() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsValet uid={uid}>
            <ValetTrips uid={uid} />
          </IsValet>
        )}
      </IsLoggedIn>
    </main>
  )
}
