import { BookingsForCustomerQuery } from '@findmyspot/network/src/gql/generated'
import { StartEndDateCard } from './DateCard'
import { MapLink } from '../molecules/MapLink'
import { StaticMapSimple } from './map/StaticMapSimple'
import { TitleStrongValue, TitleValue } from '../atoms/TitleValue'
import { Reveal } from '../molecules/Reveal'
import { Accordion } from '../atoms/Accordion'
import { format } from 'date-fns'
import { IconMapPin, IconCar, IconKey, IconTimeline } from '@tabler/icons-react'

export interface IBookingCardProps {
  booking: NonNullable<BookingsForCustomerQuery['bookingsForCustomer']>[number]
}

const statusColor = (status: string) => {
  if (status.includes('BOOKED')) return { bg: '#C8FF0020', text: '#6b8a00', border: '#C8FF0040' }
  if (status.includes('CHECK_IN') || status.includes('CHECKED_IN')) return { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' }
  if (status.includes('CHECK_OUT') || status.includes('CHECKED_OUT') || status.includes('RETURNED')) return { bg: '#f3f4f6', text: '#6b7280', border: '#d1d5db' }
  return { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' }
}

export const CustomerBookingCard = ({ booking }: IBookingCardProps) => {
  const lat = booking.slot.garage.address?.lat || 0
  const lng = booking.slot.garage.address?.lng || 0
  const colors = statusColor(booking.status)

  return (
    <div
      className="overflow-hidden transition-all duration-200 hover:shadow-lg group"
      style={{
        borderRadius: '16px',
        border: '1px solid rgba(0,0,0,0.08)',
        background: 'white',
      }}
    >
      {/* Map Preview */}
      <div className="relative h-36 overflow-hidden">
        <MapLink waypoints={[{ lat, lng }]}>
          <StaticMapSimple
            position={{ lat, lng }}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </MapLink>
        {/* Status badge overlay */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
          style={{
            borderRadius: '8px',
            background: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(8px)',
          }}
        >
          {booking.status.split('_').join(' ')}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Date range */}
        <StartEndDateCard
          startTime={booking.startTime}
          endTime={booking.endTime}
        />

        {/* Divider */}
        <div className="h-px bg-gray-100 my-3" />

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <IconCar size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <TitleStrongValue title="Slot">
              {booking.slot.displayName}
            </TitleStrongValue>
          </div>
          <div className="flex items-start gap-2">
            <IconKey size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <TitleStrongValue title="Vehicle">
              {booking.vehicleNumber}
            </TitleStrongValue>
          </div>
          <div className="col-span-2 flex items-start gap-2">
            <IconMapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <TitleStrongValue title="Address">
              <div className="text-sm">
                {booking.slot.garage.address?.address}
              </div>
            </TitleStrongValue>
          </div>
        </div>

        {/* Passcode */}
        <div className="mt-3 flex items-center gap-2 px-3 py-2" style={{ borderRadius: '10px', background: '#fafafa', border: '1px solid #f0f0f0' }}>
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Code</span>
          <Reveal secret={booking.passcode || ''} />
        </div>

        {/* Timeline accordion */}
        <div className="mt-3">
          <Accordion
            defaultOpen={false}
            title={
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <IconTimeline size={14} /> Booking Timeline
              </span>
            }
          >
            <div className="flex flex-col gap-1.5 pt-1">
              {booking.bookingTimeline.map((timeline) => (
                <div
                  key={timeline.timestamp}
                  className="flex items-center justify-between py-1.5 px-2 text-xs"
                  style={{ borderRadius: '8px', background: '#fafafa' }}
                >
                  <span className="font-medium text-gray-600">{timeline.status.split('_').join(' ')}</span>
                  <span className="text-gray-400">{format(new Date(timeline.timestamp), 'PPp')}</span>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

