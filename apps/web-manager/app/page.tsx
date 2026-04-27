'use client'
import { IsLoggedIn } from '@findmyspot/ui/app/components/organisms/IsLoggedIn'
import { IsManager } from '@findmyspot/ui/app/components/organisms/IsManager'
import { ListGarages } from '@findmyspot/ui/app/components/organisms/ListGarages'

export default function Home() {
  return (
    <IsLoggedIn>
      <IsManager>
        {(companyId) => <ListGarages companyId={companyId} />}
      </IsManager>
    </IsLoggedIn>
  )
}
