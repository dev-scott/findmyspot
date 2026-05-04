'use client'
import { Tab, Tabs, TabPanel } from '../molecules/Tabs'
import { useState } from 'react'
import { ShowCustomerBookings } from '../organisms/ShowCustomerBookings'
import { BookingStatus } from '@findmyspot/network/src/gql/generated'
import { IconCalendarEvent, IconHistory, IconCar } from '@tabler/icons-react'

export const ListCustomerBookings = () => {
  const [value, setValue] = useState<0 | 1>(1)
  return (
    <div className="py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(200, 255, 0, 0.12)',
              border: '1px solid rgba(200, 255, 0, 0.2)',
            }}
          >
            <IconCalendarEvent size={20} style={{ color: '#8ab300' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-sm text-gray-400">Manage and track your parking reservations</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label="bookings"
      >
        <Tab
          label={
            <span className="flex items-center gap-1.5">
              <IconHistory size={15} /> Past
            </span>
          }
        />
        <Tab
          label={
            <span className="flex items-center gap-1.5">
              <IconCar size={15} /> On Going
            </span>
          }
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowCustomerBookings
          statuses={[BookingStatus.CheckedOut, BookingStatus.ValetReturned]}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowCustomerBookings
          statuses={[
            BookingStatus.Booked,
            BookingStatus.ValetPickedUp,
            BookingStatus.ValetAssignedForCheckIn,
            BookingStatus.CheckedIn,
            BookingStatus.ValetAssignedForCheckOut,
          ]}
        />
      </TabPanel>
    </div>
  )
}
