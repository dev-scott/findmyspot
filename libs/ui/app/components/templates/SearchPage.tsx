'use client'
import { useCallback } from 'react'
import { Map } from '../organisms/map/Map'
import { Panel } from '../organisms/map/Panel'
import { DefaultZoomControls } from '../organisms/map/ZoomControls'
import { ViewStateChangeEvent } from 'react-map-gl/mapbox'
import { initialViewState } from '@findmyspot/util/constants'
import { SearchPlaceBox } from '../organisms/map/SearchPlacesBox'
import { useFormContext } from 'react-hook-form'
import { FormTypeSearchGarage } from '@findmyspot/forms/src/searchGarages'
import { IconType } from '../molecules/IconTypes'
import { IconCalendar, IconCalendarCheck, IconFilter, IconMapPin } from '@tabler/icons-react'
import { HtmlInput } from '../atoms/HtmlInput'
import { toLocalISOString } from '@findmyspot/util/date'
import { ShowGarages } from '../organisms/search/ShowGarages'
import { FilterSidebar } from '../organisms/search/FilterSidebar'

export const SearchPage = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<FormTypeSearchGarage>()

  const formData = watch()

  const handleMapChange = useCallback(
    (target: ViewStateChangeEvent['target']) => {
      const bounds = target.getBounds()
      const locationFilter = {
        ne_lat: bounds?.getNorthEast().lat || 0,
        ne_lng: bounds?.getNorthEast().lng || 0,
        sw_lat: bounds?.getSouthWest().lat || 0,
        sw_lng: bounds?.getSouthWest().lng || 0,
      }
      setValue('locationFilter', locationFilter)
    },
    [setValue],
  )

  const hasErrors = errors && Object.keys(errors).length > 0

  return (
    <Map
      onLoad={(e) => handleMapChange(e.target)}
      onDragEnd={(e) => handleMapChange(e.target)}
      onZoomEnd={(e) => handleMapChange(e.target)}
      initialViewState={initialViewState}
    >
      <ShowGarages />

      {/* ── Search & Date Panel (top-left) ── */}
      <Panel position="left-top">
        <div
          className="flex ml-2 flex-col gap-3 w-[340px]"
          style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.85)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.14), 0 1px 0 rgba(255,255,255,0.6) inset',
            padding: '16px',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#C8FF00',
                  boxShadow: '0 0 6px #C8FF0088',
                }}
              />
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#111',
                }}
              >
                Find a Spot
              </span>
            </div>
            {/* Filter button integrated */}
            <FilterSidebar />
          </div>

          {/* Search input */}
          <div
            style={{
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.08)',
              background: 'rgba(255,255,255,0.8)',
            }}
          >
            <div className="flex items-center gap-2 px-3 py-1">
              <IconMapPin size={15} style={{ color: '#C8FF00', flexShrink: 0 }} />
              <SearchPlaceBox />
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.07)', margin: '0 -4px' }} />

          {/* Date pickers */}
          <div className="flex flex-col gap-2">
            {/* Start */}
            <div
              className="flex items-center gap-2 px-3 py-2"
              style={{
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.07)',
              }}
            >
              <IconCalendar size={16} style={{ color: '#555', flexShrink: 0 }} />
              <div className="flex flex-col flex-1" style={{ minWidth: 0 }}>
                <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Arrivée</span>
                <HtmlInput
                  type="datetime-local"
                  className="w-full text-sm font-medium border-0 bg-transparent p-0 outline-none"
                  style={{ color: '#111' }}
                  min={toLocalISOString(new Date()).slice(0, 16)}
                  {...register('startTime', {
                    onChange() {
                      trigger('startTime')
                      trigger('endTime')
                    },
                  })}
                />
              </div>
            </div>

            {/* End */}
            <div
              className="flex items-center gap-2 px-3 py-2"
              style={{
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.07)',
              }}
            >
              <IconCalendarCheck size={16} style={{ color: '#C8FF00', flexShrink: 0 }} />
              <div className="flex flex-col flex-1" style={{ minWidth: 0 }}>
                <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Départ</span>
                <HtmlInput
                  min={toLocalISOString(new Date()).slice(0, 16)}
                  type="datetime-local"
                  className="w-full text-sm font-medium border-0 bg-transparent p-0 outline-none"
                  style={{ color: '#111' }}
                  {...register('endTime', {
                    onChange() {
                      trigger('endTime')
                    },
                  })}
                />
              </div>
            </div>
          </div>

          {/* Errors */}
          {hasErrors && (
            <div style={{ borderRadius: 8, overflow: 'hidden' }}>
              {Object.entries(errors).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    fontSize: '12px',
                    color: '#c0392b',
                    background: 'rgba(192,57,43,0.08)',
                    padding: '6px 10px',
                    borderLeft: '3px solid #c0392b',
                  }}
                >
                  {value.message}
                </div>
              ))}
            </div>
          )}
        </div>
      </Panel>

      {/* ── Zoom Controls (bottom-right) ── */}
      <Panel position="right-center">
        <div
          style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.85)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}
        >
          <DefaultZoomControls />
        </div>
      </Panel>

      {/* ── Map attribution badge (bottom-center) ── */}
      <Panel position="center-bottom">
        <div
          style={{
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '6px 14px',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em' }}>
            🅿 Drag or zoom to explore parking spots
          </span>
        </div>
      </Panel>
    </Map>
  )
}
