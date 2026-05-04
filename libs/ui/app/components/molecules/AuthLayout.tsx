'use client'
import { IconArrowBack, IconMapPin, IconParking, IconShieldCheck } from '@tabler/icons-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { BrandIcon } from '../atoms/BrandIcon'
import { GoogleButton } from './GoogleButton'

export interface IAuthLayoutProps {
  children: ReactNode
  title: string
}

export const AuthLayout = ({ title, children }: IAuthLayoutProps) => {
  const isLogin = title.toLowerCase() === 'login'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'auto',
      }}
    >
      <div className="flex min-h-screen">
        {/* ══════════ LEFT: Decorative Panel ══════════ */}
        <div
          className="hidden lg:flex flex-col justify-between w-[480px] xl:w-[520px] shrink-0 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
          }}
        >
          {/* Animated gradient orb */}
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, #C8FF00 0%, transparent 70%)',
              filter: 'blur(60px)',
              animation: 'pulse 4s ease-in-out infinite',
            }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #C8FF00 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'pulse 6s ease-in-out infinite reverse',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full px-10 py-12">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-3 group">
                <span
                  className="w-2.5 h-2.5 rounded-full group-hover:scale-150 transition-all duration-300"
                  style={{ backgroundColor: '#C8FF00', boxShadow: '0 0 12px #C8FF0066' }}
                />
                <span className="text-white/90 text-xl font-semibold tracking-tight">findmyspot</span>
              </Link>
            </div>

            {/* Tagline */}
            <div className="flex-1 flex flex-col justify-center">
              <h2
                className="text-4xl xl:text-5xl font-bold leading-tight mb-6"
                style={{ color: 'white' }}
              >
                Find your
                <br />
                perfect
                <br />
                <span style={{ color: '#C8FF00' }}>parking spot.</span>
              </h2>
              <p className="text-white/40 text-base leading-relaxed max-w-sm">
                Join thousands of drivers who save time every day by finding and booking parking in advance.
              </p>

              {/* Feature pills */}
              <div className="flex flex-col gap-3 mt-10">
                {[
                  { icon: <IconMapPin size={16} />, text: 'Real-time availability' },
                  { icon: <IconParking size={16} />, text: 'Reserve in seconds' },
                  { icon: <IconShieldCheck size={16} />, text: 'Secure payments' },
                ].map((feature) => (
                  <div
                    key={feature.text}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: 'rgba(200, 255, 0, 0.1)',
                        border: '1px solid rgba(200, 255, 0, 0.15)',
                      }}
                    >
                      <span style={{ color: '#C8FF00' }}>{feature.icon}</span>
                    </div>
                    <span className="text-white/50 text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom attribution */}
            <div className="flex items-center gap-2 text-white/20 text-xs">
              <span>© {new Date().getFullYear()} findmyspot</span>
              <span>·</span>
              <span>All rights reserved</span>
            </div>
          </div>

          {/* Decorative grid lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* ══════════ RIGHT: Form Panel ══════════ */}
        <div
          className="flex-1 flex flex-col justify-center items-center px-6 sm:px-10 py-12"
          style={{ background: '#fafafa' }}
        >
          <div className="w-full max-w-md">
            {/* Mobile brand (hidden on lg+) */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#C8FF00', boxShadow: '0 0 8px #C8FF0066' }}
              />
              <span className="text-gray-900 text-lg font-semibold tracking-tight">findmyspot</span>
            </div>

            {/* Title */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="text-gray-400 text-sm">
                {isLogin
                  ? 'Sign in to access your parking bookings and saved spots.'
                  : 'Get started — it only takes a minute to find your spot.'}
              </p>
            </div>

            {/* Google Button */}
            <div className="mb-6">
              <GoogleButton />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Form slot */}
            <div>{children}</div>

            {/* Back to home */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IconArrowBack size={14} />
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
