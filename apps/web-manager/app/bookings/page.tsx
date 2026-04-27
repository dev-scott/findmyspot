import { IsLoggedIn } from '@findmyspot/ui/app/components/organisms/IsLoggedIn'
import { IsManager } from '@findmyspot/ui/app/components/organisms/IsManager'
import { ListGarageBookings } from '@findmyspot/ui/app/components/templates/ListGarageBookings'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const garageId = Number((await searchParams).garageId);

  return (
    <main>
      <IsLoggedIn>
        <IsManager>
          {Number.isNaN(garageId) ? (
            <div className="p-4">Garage ID is required.</div>
          ) : (
            <ListGarageBookings garageId={garageId} />
          )}
        </IsManager>
      </IsLoggedIn>
    </main>
  )
}
