import { IsAdmin } from '@findmyspot/ui/app/components/organisms/IsAdmin'
import { AdminHome } from '@findmyspot/ui/app/components/templates/AdminHome'

export default function Home() {
  return (
    <main>
      <IsAdmin>
        <AdminHome />
      </IsAdmin>
    </main>
  )
}
