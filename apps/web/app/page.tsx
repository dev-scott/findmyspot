'use client'
import { useQuery } from '@apollo/client/react'
import { SearchGaragesDocument } from '@findmyspot/network'
import { CarScene } from '@findmyspot/3d/src/scenes/CarScene'
import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'

export default function Home() {


  const { data: garages } = useQuery(SearchGaragesDocument, { variables: { dateFilter: { end: '2026-05-16', start: '2024-05-13' }, locationFilter: { ne_lat: 90, ne_lng: 180, sw_lat: -90, sw_lng: -180 } }, })
  console.log("here is the garage i search:", garages)

  return (
    <main className="h-[calc(100vh-4rem)] flex flex-col  justify-center ">
      <div className="absolute top-16 bottom-0 left-0 right-0">
        <CarScene />
      </div>
      <div className="flex flex-col items-start space-y-2 font-black text-9xl">
        <div className="z-10 inline-block px-3 bg-white mt-2">Need</div>{' '}
        <div className="z-10 inline-block w-full max-w-md px-3 bg-white ">
          parking?
        </div>
        <Link
          href="/search"
          className="z-10 flex items-center gap-2 px-3 py-2 text-xl font-medium text-black underline underline-offset-4 bg-white"
        >
          <IconSearch /> Search now
        </Link>
      </div>

      <div>
        {garages?.searchGarages?.map((garage) => (
          <pre key={garage.id}>{JSON.stringify(garage, null, 2)}</pre>
        ))}
      </div>
    </main>
  )
}