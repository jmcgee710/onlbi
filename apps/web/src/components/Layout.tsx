import { Outlet, NavLink, Link } from 'react-router-dom'
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
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        {/* Mobile top bar */}
        <div className="mobile-topbar">
          <img src="/logo-dark.png" alt="On LBI" style={{ height: 40, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', letterSpacing: '0.01em' }}>
            because you're <span style={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'normal', fontWeight: 500 }}>ON</span> the island, not in it!
          </span>
          <Link to="/alerts" style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center' }}>
            <Bell size={18} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Desktop top bar */}
        <div className="topbar" style={{ display: 'flex' } as React.CSSProperties}>
          <div className="crumbs">
            <strong>Today</strong> · {new Date().toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric',
            })}
          </div>
          <span className="spacer" />
          <Link to="/alerts" className="icon-btn primary" style={{ textDecoration: 'none' }}>
            <Bell size={14} strokeWidth={1.75} /> Alerts
          </Link>
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

// needed for inline style cast
import type React from 'react'
