import { useEffect } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { Sun, Umbrella, MapPinned, UtensilsCrossed, Anchor, Compass, Accessibility, Bell } from 'lucide-react'
import Sidebar from './Sidebar'

const mobileNav = [
  { to: '/',               Icon: Sun,             label: 'Today' },
  { to: '/beaches',        Icon: Umbrella,        label: 'Beaches' },
  { to: '/towns',          Icon: MapPinned,       label: 'Towns' },
  { to: '/eat',            Icon: UtensilsCrossed, label: 'Eat' },
  { to: '/do',             Icon: Anchor,          label: 'Do' },
  { to: '/getting-around', Icon: Compass,         label: 'Around' },
  { to: '/accessibility',  Icon: Accessibility,   label: 'Access' },
]

export default function Layout() {
  const { pathname } = useLocation()

  // Reset scroll to the top of the page on every route change. Without this,
  // navigating from the bottom of one page lands you at the bottom of the next.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        {/* Mobile top bar */}
        <div className="mobile-topbar">
          <img src="/logo-dark.png" alt="On LBI" style={{ height: 40, objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, flex: 1, minWidth: 0, margin: '0 12px' }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.01em' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', letterSpacing: '0.01em' }}>
              because you're <span style={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'normal', fontWeight: 500 }}>ON</span> the island, not in it!
            </span>
          </div>
          <Link to="/alerts" style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center' }}>
            <Bell size={18} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Desktop top bar */}
        <div className="topbar">
          <div className="crumbs">
            <strong>Today</strong> · {new Date().toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric',
            })}
          </div>
        </div>

        <Outlet />

        {/* Mobile bottom nav */}
        <nav className="mobile-bottom-nav">
          <div style={{ display: 'flex', width: '100%' }}>
            {mobileNav.map(({ to, Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 3, padding: '10px 2px', fontSize: 9.5, fontWeight: 600, textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  color: isActive ? '#B8CDC8' : 'rgba(255,255,255,0.4)',
                  fontFamily: 'var(--font-body)',
                })}
              >
                <Icon size={19} strokeWidth={1.5} />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </main>
    </div>
  )
}
