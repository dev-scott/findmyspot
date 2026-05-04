'use client'
import { useQuery } from '@apollo/client/react'
import { SearchGaragesDocument } from '@findmyspot/network'
import { CarScene } from '@findmyspot/3d/src/scenes/CarScene'
import {
  IconSearch,
  IconShieldCheck,
  IconClock,
  IconMapPin,
  IconArrowRight,
} from '@tabler/icons-react'
import Link from 'next/link'

const FEATURES = [
  { icon: IconMapPin, label: '+500 parkings disponibles' },
  { icon: IconShieldCheck, label: 'Paiement 100 % sécurisé' },
  { icon: IconClock, label: 'Réservation en 30 secondes' },
]

const STATS = [
  { value: '500+', label: 'Parking spots' },
  { value: '2 min', label: 'Avg. booking time' },
  { value: '24/7', label: 'Always available' },
]

export default function Home() {
  const { data: garages } = useQuery(SearchGaragesDocument, {
    variables: {
      dateFilter: { end: '2026-05-16', start: '2024-05-13' },
      locationFilter: { ne_lat: 90, ne_lng: 180, sw_lat: -90, sw_lng: -180 },
    },
  })

  return (
   



<>
 <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-between  overflow-hidden">

        {/* 3-D scene */}
        <div className="absolute inset-0">
          <CarScene />
        </div>


        {/* Gradient: transparent top → heavy black bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/90 pointer-events-none" />

        {/* Hero copy — anchored to bottom-left */}
        <div className="relative z-10 flex flex-col justify-end flex-1  pb-10 w-full">

          {/* Pill badge */}
          <div className="mb-8 inline-flex w-fit items-center gap-2 border border-[#C8FF00]/30 bg-black/40 backdrop-blur-sm px-4 py-1.5">
            <span className="size-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
            <span className="text-[#C8FF00] text-xs font-bold tracking-[0.2em] uppercase">
              Live map — spots updating now
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-black text-white leading-[0.88] tracking-tight mb-6">
            <span className="block text-[clamp(3.5rem,11vw,8.5rem)]">Find your</span>
            <span
              className="block text-[clamp(3.5rem,11vw,8.5rem)]"
              style={{ color: '#C8FF00', textShadow: '0 0 80px #C8FF0033' }}
            >
              perfect spot.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Browse, book, and park — all in under two minutes. 
            Real-time availability on a stunning 3D map.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href="/search"
              className="group inline-flex items-center gap-3 font-bold px-8 py-4 text-base text-black transition-all duration-150 active:scale-[0.97]"
              style={{ backgroundColor: '#C8FF00' }}
            >
              <IconSearch size={18} />
              Search parking
              <IconArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-3 border border-white/20 hover:border-white/50 text-white/70 hover:text-white px-8 py-4 text-base transition-all duration-150"
            >
              How it works
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-0 border-t border-white/10 pt-8">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className={`pr-10 ${i !== 0 ? 'pl-10 border-l border-white/10' : ''}`}
              >
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="text-white/35 text-xs tracking-widest uppercase mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 flex justify-center pb-6">
          <div className="flex flex-col items-center gap-1.5 text-white/20 text-xs tracking-widest uppercase">
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/20" />
            scroll
          </div>
        </div>
      </section>
</>
  )
}