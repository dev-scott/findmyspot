import { GaragesQuery } from '@findmyspot/network/src/gql/generated'
import { AutoImageChanger } from './AutoImageChanger'
import Link from 'next/link'
import { IconTypes } from '../molecules/IconTypes'
import { CreateManySlotsDialog } from './CreateManySlotsDialog'

export interface IGarageCardProps {
  garage: GaragesQuery['garages'][number]
}

export const GarageCard = ({ garage }: IGarageCardProps) => {
  return (
    <div className="group relative bg-white border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        <AutoImageChanger images={garage.images || []} durationPerImage={5000} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
           <Link
              href={{ pathname: 'bookings', query: { garageId: garage.id } }}
              className="w-full bg-white text-black py-2 text-[10px] font-bold uppercase tracking-widest text-center block"
            >
              View Bookings
            </Link>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col gap-4">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-bold tracking-tighter uppercase italic line-clamp-1">
              {garage.displayName}
            </h3>
          </div>
          <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider mt-2 line-clamp-2 leading-relaxed">
            {garage.description}
          </p>
          <div className="flex items-start gap-1.5 mt-4 text-gray-500">
             <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-50 px-1.5 py-0.5 border border-gray-100">
               Address
             </span>
             <span className="text-[10px] font-medium truncate">
               {garage.address?.address}
             </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-50">
          {garage.slotCounts.map((slotType) => (
            <div
              key={slotType.type}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 border border-gray-100"
            >
              <div className="text-gray-400">{IconTypes[slotType.type]}</div>
              <div className="text-xs font-bold">{slotType.count}</div>
            </div>
          ))}
          <div className="ml-auto">
            <CreateManySlotsDialog garageId={garage.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
