import { ManageValets } from '@findmyspot/ui/app/components/templates/ManageValets'
import { IsLoggedIn } from '@findmyspot/ui/app/components/organisms/IsLoggedIn'

export default function Page() {
  return (
    <IsLoggedIn>
      <ManageValets />
    </IsLoggedIn>
  )
}
