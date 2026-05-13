import { BookingsForGarageQuery } from '@findmyspot/network/src/gql/generated'
import { TitleStrongValue, TitleValue } from '../atoms/TitleValue'
import { Reveal } from '../molecules/Reveal'
import { StartEndDateCard } from './DateCard'
import { Accordion } from '../atoms/Accordion'
import { format } from 'date-fns'

export interface IManageBookingCardProps {
  booking: BookingsForGarageQuery['bookingsForGarage'][0]
}

export const ManageBookingCard = ({ booking }: IManageBookingCardProps) => (
    <div className="p-6 bg-white border border-gray-100 shadow-sm flex flex-col gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/5">
      <div className="flex items-start justify-between gap-4">
        <div>
           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">
             Vehicle Number
           </p>
           <div className="text-4xl font-bold tracking-tighter italic uppercase text-black">
             {booking.vehicleNumber}
           </div>
        </div>
        <div className="px-3 py-1.5 border border-primary bg-primary/5 flex flex-col items-end">
           <span className="text-[8px] font-bold uppercase tracking-widest text-primary-700">Slot</span>
           <span className="text-xs font-bold text-black">{booking.slot.displayName}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <StartEndDateCard
          startTime={booking.startTime}
          endTime={booking.endTime}
        />
        <div className="flex flex-col gap-1">
           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Security Passcode</p>
           <Reveal showIntruction={false} secret={booking.passcode || ''} />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50">
        <Accordion
          defaultOpen={false}
          title={
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Current Status:</span>
               <span className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2 py-0.5">
                 {booking.status.split('_').join(' ')}
               </span>
            </div>
          }
        >
          <div className="flex flex-col gap-3 py-4">
            {booking.bookingTimeline.map((timeline) => (
              <div key={timeline.timestamp} className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">{timeline.status.split('_').join(' ')}</span>
                <span className="text-[10px] font-medium text-gray-400 font-mono">
                  {format(new Date(timeline.timestamp), 'PPp')}
                </span>
              </div>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  )
