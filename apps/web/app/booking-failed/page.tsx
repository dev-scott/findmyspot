import { IconAlertTriangle, IconArrowLeft, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center">
      {/* Error icon */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.15)',
        }}
      >
        <IconAlertTriangle size={36} style={{ color: '#ef4444' }} />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Booking Failed
      </h1>
      <p className="text-gray-400 text-base max-w-md mb-8 leading-relaxed">
        We couldn&apos;t complete your reservation. This may be due to a payment issue or the spot is no longer available.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
        >
          <IconArrowLeft size={16} />
          Back to Home
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-black rounded-xl transition-all duration-200 active:scale-[0.97] hover:shadow-lg"
          style={{
            backgroundColor: '#C8FF00',
            boxShadow: '0 2px 12px #C8FF0044',
          }}
        >
          <IconSearch size={16} />
          Try Again
        </Link>
      </div>

      {/* Help text */}
      <p className="mt-10 text-xs text-gray-300">
        Need help?{' '}
        <a href="mailto:support@findmyspot.com" className="underline hover:text-gray-500 transition-colors">
          Contact support
        </a>
      </p>
    </div>
  )
}