import { ListCustomerBookings } from '@findmyspot/ui/app/components/templates/ListCustomerBookings'
import { IsLoggedIn } from '@findmyspot/ui/app/components/organisms/IsLoggedIn'

export default function Page() {
  return (
    <IsLoggedIn>
      <ListCustomerBookings />
    </IsLoggedIn>
  )
}