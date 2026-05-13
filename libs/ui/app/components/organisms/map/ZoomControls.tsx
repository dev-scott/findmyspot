import { MouseEventHandler, ReactNode } from 'react'

import { IconMinus, IconParking, IconPlus } from '@tabler/icons-react'

import { useMap } from 'react-map-gl/mapbox'

export interface IZoomControlsProps {}

const MapControls = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-px shadow-2xl bg-black/20 backdrop-blur-xl border border-white/10">
    {children}
  </div>
)

const ZoomControlButton = ({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}) => (
  <button
    className="bg-white/90 hover:bg-primary transition-all duration-300 p-2 flex items-center justify-center group"
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
)

const ZoomIn = () => {
  const { current: map } = useMap()

  return (
    <ZoomControlButton onClick={() => map?.zoomIn()}>
      <IconPlus className="w-5 h-5 text-black stroke-[3] group-hover:scale-110 transition-transform" />
    </ZoomControlButton>
  )
}

const ZoomOut = () => {
  const { current: map } = useMap()
  return (
    <ZoomControlButton onClick={() => map?.zoomOut()}>
      <IconMinus className="w-5 h-5 text-black stroke-[3] group-hover:scale-110 transition-transform" />
    </ZoomControlButton>
  )
}

export const CenterOfMap = ({
  onClick,
  Icon = IconParking,
}: {
  onClick: (latLng: { lng: number; lat: number }) => void
  Icon?: typeof IconParking
}) => {
  const { current: map } = useMap()
  return (
    <ZoomControlButton
      onClick={() => {
        const { lat, lng } = map?.getCenter() as { lng: number; lat: number }
        onClick({ lat, lng })
      }}
    >
      <Icon className="w-5 h-5 text-black stroke-[2.5] group-hover:scale-110 transition-transform" />
    </ZoomControlButton>
  )
}

MapControls.ZoomIn = ZoomIn
MapControls.ZoomOut = ZoomOut
MapControls.CenterOfMap = CenterOfMap

export default MapControls

export const DefaultZoomControls = ({ children }: { children?: ReactNode }) => (
  <MapControls>
    <ZoomIn />
    <ZoomOut />
    {children}
  </MapControls>
)
