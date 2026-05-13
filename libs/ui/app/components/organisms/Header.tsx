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

  // useEffect(() => {
  //   const handleScroll = () => setIsScrolled(window.scrollY > 10)
  //   window.addEventListener('scroll', handleScroll, { passive: true })
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

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
    ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10'
    : onDark
      ? 'bg-transparent border-b border-transparent'
      : 'bg-white/60 backdrop-blur-2xl border-b border-black/5'

  const linkBase = isScrolled || onDark
    ? 'text-white/50 hover:text-white'
    : 'text-gray-500 hover:text-black'

  const linkActive = isScrolled || onDark
    ? 'text-white'
    : 'text-black'

  return (
    <header>
      <nav
        className={`fixed z-50 top-0 w-full transition-all duration-500 ${navBg}`}
        style={{ height: isScrolled ? 60 : 72 }}
      >
        <MaxWidthWrapper className="relative flex items-center justify-between h-full gap-6">

          {/* ══════════ LEFT: Brand ══════════ */}
          <Link href="/" aria-label="Home" className="z-50 flex items-center gap-3 group shrink-0">
            <div className="relative">
              <span
                className="block w-2.5 h-2.5 bg-primary rounded-none rotate-45 group-hover:rotate-180 transition-all duration-500"
                style={{ boxShadow: '0 0 15px #C8FF00' }}
              />
            </div>
            <Brand type={type} className="hidden sm:block" />
            <Brand type={type} shortForm className="block sm:hidden" />
          </Link>

          {/* ══════════ CENTER: Navigation Links ══════════ */}
          <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {menuItems.map(({ label, href }) => {
              const isActive = pathname === href || pathname?.startsWith(href + '/')
              return (
                <Link
                  key={label}
                  href={href}
                  className={`
                    relative flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest
                    transition-all duration-300 group
                    ${isActive ? linkActive : linkBase}
                  `}
                >
                  {/* Icon */}
                  <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}>
                    {NAV_ICONS[label] || <IconMapPin size={14} stroke={2.5} />}
                  </span>
                  {label}
                  {/* Active indicator line */}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-5 right-5 h-0.5 bg-primary"
                      style={{ boxShadow: '0 0 10px #C8FF00' }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* ══════════ RIGHT: Actions ══════════ */}
          <div className="flex items-center gap-4">

            {uid ? (
              <>
                <button
                  className={`
                    hidden md:flex items-center justify-center w-10 h-10 rounded-none
                    transition-all duration-300 border
                    ${isScrolled || onDark 
                      ? 'border-white/10 hover:border-white/30 text-white/50 hover:text-white hover:bg-white/5' 
                      : 'border-black/5 hover:border-black/20 text-gray-400 hover:text-black hover:bg-black/5'}
                  `}
                  aria-label="Notifications"
                >
                  <IconBell size={18} stroke={2} />
                </button>

                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`
                      flex items-center gap-3 p-1 rounded-none
                      transition-all duration-300 group border
                      ${isScrolled || onDark
                        ? 'border-white/10 hover:border-white/30 bg-white/5'
                        : 'border-black/10 hover:border-black/20 bg-black/5'
                      }
                    `}
                  >
                    <div
                      className="w-8 h-8 bg-primary/20 flex-shrink-0 relative overflow-hidden"
                      style={{ border: '1px solid #C8FF00' }}
                    >
                      <Image
                        src={userImage || '/user.png'}
                        alt={userName || 'User'}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <span
                      className={`hidden lg:block text-[11px] font-bold uppercase tracking-tighter ${isScrolled || onDark ? 'text-white/90' : 'text-black'
                        }`}
                    >
                      {userName || 'User'}
                    </span>
                    <IconChevronDown
                      size={14}
                      className={`mr-2 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''} ${isScrolled || onDark ? 'text-white/40' : 'text-gray-400'
                        }`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div
                      className="absolute right-0 mt-3 w-60 origin-top-right animate-in fade-in zoom-in-95 duration-200"
                      style={{
                        background: 'rgba(10,10,10,0.95)',
                        backdropFilter: 'blur(32px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '8px',
                      }}
                    >
                      <div className="px-4 py-3 border-b border-white/10 mb-2">
                        <div className="text-xs font-bold text-white uppercase tracking-wider truncate">{userName || 'User'}</div>
                        <div className="text-[10px] text-white/40 font-mono truncate mt-0.5">{uid}</div>
                      </div>

                      {[
                        { icon: <IconCalendarEvent size={16} />, label: 'My Bookings', href: '/bookings' },
                      ].map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white/60 hover:text-primary hover:bg-white/5 transition-all"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}

                      <div className="h-px bg-white/10 my-2" />

                      <button
                        onClick={() => { setUserMenuOpen(false); signOut() }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                      >
                        <IconLogout size={16} />
                        Log out
                      </button>
                    </div>
                  )}
                </div>

                <div className="md:hidden">
                  <NavSidebar menuItems={menuItems} />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className={`
                    hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-widest
                    transition-all duration-300
                    ${isScrolled || onDark
                      ? 'text-white/60 hover:text-white hover:bg-white/5'
                      : 'text-gray-500 hover:text-black hover:bg-black/5'
                    }
                  `}
                >
                  Register
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-7 py-2.5 text-xs font-bold uppercase tracking-widest text-black bg-primary transition-all duration-300 hover:bg-primary-300 active:scale-95"
                  style={{ boxShadow: '0 4px 20px rgba(200,255,0,0.3)' }}
                >
                  Log in
                </Link>

                <div className="md:hidden">
                  <NavSidebar menuItems={menuItems} />
                </div>
              </>
            )}
          </div>
        </MaxWidthWrapper>

        {/* Primary glow line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-full transition-all duration-700"
          style={{
            background: 'linear-gradient(90deg, transparent, #C8FF00, transparent)',
            opacity: isScrolled ? 0.4 : 0,
            boxShadow: '0 0 15px #C8FF00',
          }}
        />
      </nav>

      <div className="h-16 md:h-20" />
    </header>
  )
}