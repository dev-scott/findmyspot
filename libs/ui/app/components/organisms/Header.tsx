'use client'
import { BaseComponent, MenuItem, Role } from '@findmyspot/util/types'
import { Brand } from '../atoms/Brand'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { NavSidebar } from './NavSidebar'
import MaxWidthWrapper from '../atoms/MaxWidthWrapper'
import { useState, useEffect, useRef } from 'react'
import {
  IconLogin,
  IconUserPlus,
  IconMapPin,
  IconSearch,
  IconCalendarEvent,
  IconHeartFilled,
  IconChevronDown,
  IconUser,
  IconSettings,
  IconLogout,
  IconBell,
  IconMoon,
} from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export type IHeaderProps = {
  type?: Role
  menuItems: MenuItem[]
} & BaseComponent

/* ── Icon map for nav links ── */
const NAV_ICONS: Record<string, React.ReactNode> = {
  Search: <IconSearch size={14} />,
  Bookings: <IconCalendarEvent size={14} />,
  Favorites: <IconHeartFilled size={14} />,
}

export const Header = ({ type = 'customer', menuItems }: IHeaderProps) => {
  const session = useSession()
  const uid = session?.data?.user?.uid
  const userName = session?.data?.user?.name
  const userImage = session?.data?.user?.image
  const [isScrolled, setIsScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const isSearchPage = pathname?.startsWith('/search')
  const isHome = pathname === '/'

  const user = session.data?.user
  console.log("user of session ", user)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Close user menu on click outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* ── Colour tokens ── */
  const onDark = isHome && !isScrolled && type=="customer"
  const isDark = onDark || isScrolled // dark text contexts

  const navBg = isScrolled
    ? 'bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.06]'
    : onDark
      ? 'bg-transparent border-b border-transparent'
      : 'bg-white/80 backdrop-blur-xl border-b border-black/[0.06]'

  const linkBase = isScrolled || onDark
    ? 'text-white/60 hover:text-white'
    : 'text-gray-500 hover:text-gray-900'

  const linkActive = isScrolled || onDark
    ? 'text-white'
    : 'text-gray-900'

  return (
    <header>
      <nav
        className={`fixed z-50 top-0 w-full transition-all duration-500 ${navBg}`}
        style={{ height: isScrolled ? 56 : 64, transition: 'height 0.3s, background 0.5s' }}
      >
        <MaxWidthWrapper className="relative flex items-center justify-between h-full gap-6">

          {/* ══════════ LEFT: Brand ══════════ */}
          <Link href="/" aria-label="Home" className="z-50 flex items-center gap-2.5 group shrink-0">
            <span
              className="w-2 h-2 rounded-full shrink-0 group-hover:scale-150 transition-all duration-300"
              style={{ backgroundColor: '#C8FF00', boxShadow: '0 0 8px #C8FF0066' }}
            />
            <Brand type={type} className="hidden sm:block h-7" />
            <Brand type={type} shortForm className="block sm:hidden h-7" />
          </Link>

          {/* ══════════ CENTER: Navigation Links ══════════ */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {menuItems.map(({ label, href }) => {
              const isActive = pathname === href || pathname?.startsWith(href + '/')
              return (
                <Link
                  key={label}
                  href={href}
                  className={`
                    relative flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-medium
                    rounded-full transition-all duration-200 group
                    ${isActive ? linkActive : linkBase}
                  `}
                  style={isActive ? {
                    background: isScrolled || onDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  } : {}}
                >
                  {/* Icon */}
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                    {NAV_ICONS[label] || <IconMapPin size={14} />}
                  </span>
                  {label}
                  {/* Active indicator dot */}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: '#C8FF00' }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* ══════════ RIGHT: Actions ══════════ */}
          <div className="flex items-center gap-2">

            {uid ? (
              <>
                {/* ── Notification bell ── */}
                <button
                  className={`
                    hidden md:flex items-center justify-center w-9 h-9 rounded-full
                    transition-all duration-200
                    ${isScrolled || onDark ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-black/5 text-gray-400 hover:text-gray-700'}
                  `}
                  aria-label="Notifications"
                >
                  <IconBell size={18} />
                </button>

                {/* ── User Avatar + Dropdown ── */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`
                      flex items-center gap-2 pl-1 pr-2 py-1 rounded-full
                      transition-all duration-200 group
                      ${isScrolled || onDark
                        ? 'hover:bg-white/10 border border-white/10 hover:border-white/20'
                        : 'hover:bg-black/5 border border-black/10 hover:border-black/20'
                      }
                    `}
                  >
                    {/* Avatar */}
                    <div
                      className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
                      style={{
                        border: '2px solid #C8FF00',
                        boxShadow: '0 0 0 1px rgba(0,0,0,0.06)',
                      }}
                    >
                      <Image
                        src={userImage || '/user.png'}
                        alt={userName || 'User'}
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Name (desktop) */}
                    <span
                      className={`hidden lg:block text-[13px] font-medium max-w-[100px] truncate ${isScrolled || onDark ? 'text-white/80' : 'text-gray-700'
                        }`}
                    >
                      {userName || 'User'}
                    </span>
                    <IconChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''} ${isScrolled || onDark ? 'text-white/40' : 'text-gray-400'
                        }`}
                    />
                  </button>

                  {/* ── Dropdown menu ── */}
                  {userMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        borderRadius: '14px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.5) inset',
                        padding: '6px',
                      }}
                    >
                      {/* User info header */}
                      <div className="px-3 py-2.5 border-b border-gray-100 mb-1">
                        <div className="text-sm font-semibold text-gray-900 truncate">{userName || 'User'}</div>
                        <div className="text-[11px] text-gray-400 truncate">{uid}</div>
                      </div>

                      {/* Menu items */}
                      {[
                        { icon: <IconUser size={15} />, label: 'My Profile', href: '/profile' },
                        { icon: <IconCalendarEvent size={15} />, label: 'My Bookings', href: '/bookings' },
                        { icon: <IconSettings size={15} />, label: 'Settings', href: '/settings' },
                      ].map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <span className="text-gray-400">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}

                      {/* Divider */}
                      <div className="h-px bg-gray-100 my-1" />

                      {/* Logout */}
                      <button
                        onClick={() => { setUserMenuOpen(false); signOut() }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <IconLogout size={15} />
                        Log out
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile nav */}
                <div className="md:hidden">
                  <NavSidebar menuItems={menuItems} />
                </div>
              </>
            ) : (
              <>


                {/* Register — ghost */}
                <Link
                  href="/register"
                  className={`
                    hidden md:inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium
                     transition-all duration-200
                    ${isScrolled || onDark
                      ? 'text-white/60 hover:text-white hover:bg-white/10'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
                    }
                  `}
                >
                  <IconUserPlus size={15} />
                  Register
                </Link>

                {/* Log in — lime CTA */}
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-5 py-2 text-[13px] font-bold text-black  transition-all duration-200 active:scale-[0.97] hover:shadow-lg"
                  style={{
                    backgroundColor: '#C8FF00',
                    boxShadow: '0 2px 12px #C8FF0044',
                  }}
                >
                  <IconLogin size={15} />
                  Log in
                </Link>

                {/* Mobile nav */}
                <div className="md:hidden">
                  <NavSidebar menuItems={menuItems} />
                </div>
              </>
            )}
          </div>
        </MaxWidthWrapper>

        {/* Lime gradient line at bottom */}
        <div
          className="absolute bottom-0 left-0 h-px w-full transition-opacity duration-500"
          style={{
            background: 'linear-gradient(90deg, transparent 5%, #C8FF0050 50%, transparent 95%)',
            opacity: isScrolled ? 1 : 0,
          }}
        />
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </header>
  )
}