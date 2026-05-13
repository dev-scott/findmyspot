'use client'
import { useState } from 'react'
import { Tab, TabPanel, Tabs } from '../molecules/Tabs'
import { ShowGarageBookings } from '../organisms/ShowGarageBookings'
import { BookingStatus } from '@findmyspot/network/src/gql/generated'

export interface IListBookingsProps {
  garageId: number
}
export const ListGarageBookings = ({ garageId }: IListBookingsProps) => {
  const [value, setValue] = useState<0 | 1 | 2>(0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-bold tracking-tighter uppercase italic">
          Garage <span className="text-primary">Bookings</span>
        </h1>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-[0.2em] mt-1">
          Manage your incoming and outgoing vehicles
        </p>
      </div>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label="bookings"
      >
        <Tab label={'IN'} />
        <Tab label={'OUT'} />
        <Tab label={'RESOLVED'} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowGarageBookings
          garageId={garageId}
          statuses={[
            BookingStatus.Booked,
            BookingStatus.ValetPickedUp,
            BookingStatus.ValetAssignedForCheckIn,
          ]}
          showCheckIn
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowGarageBookings
          garageId={garageId}
          statuses={[
            BookingStatus.CheckedIn,
            BookingStatus.ValetAssignedForCheckOut,
          ]}
          showCheckOut
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ShowGarageBookings
          garageId={garageId}
          statuses={[BookingStatus.CheckedOut]}
        />
      </TabPanel>
    </div>
  )
}
