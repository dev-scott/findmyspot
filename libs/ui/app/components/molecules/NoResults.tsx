import { IconBox } from '@tabler/icons-react'

export const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: 'rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <IconBox size={24} className="text-gray-300" />
      </div>
      <div className="text-sm font-medium text-gray-400">No bookings found</div>
      <div className="text-xs text-gray-300">Your reservations will appear here</div>
    </div>
  )
}

