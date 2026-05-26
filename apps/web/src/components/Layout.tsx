import { Outlet, NavLink } from 'react-router-dom'
import { Sun, Umbrella, UtensilsCrossed, Anchor, Accessibility, Search, Bell, CalendarDays } from 'lucide-react'
import Sidebar from './Sidebar'

const mobileNav = [
  { to: '/',              Icon: Sun,             label: 'Today' },
  { to: '/beaches',       Icon: Umbrella,        label: 'Beaches' },
  { to: '/eat',           Icon: UtensilsCrossed, label: 'Eat' },
  { to: '/do',            Icon: Anchor,          label: 'Do' },
  { to: '/accessibility', Icon: Accessibility,   label: 'Access' },
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
            because your <span style={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'normal', fontWeight: 500 }}>ON</span> the island not in it!
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 0 }}>
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 0 }}>
              <Bell size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Desktop top bar */}
        <div className="topbar" style={{ display: 'flex' } as React.CSSProperties}>
          <div className="crumbs">
            <strong>Today</strong> · {new Date().toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric',
            })}
          </div>
          <span className="spacer" />
          <button className="icon-btn">
            <Search size={14} strokeWidth={1.75} /> Search the island
          </button>
          <button className="icon-btn">
            <CalendarDays size={14} strokeWidth={1.75} /> Tomorrow
          </button>
          <button className="icon-btn primary">
            <Bell size={14} strokeWidth={1.75} /> 1 Alert
          </button>
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
                  gap: 4, padding: '10px 0', fontSize: 10, fontWeight: 600, textDecoration: 'none',
                  color: isActive ? '#B8CDC8' : 'rgba(255,255,255,0.4)',
                  fontFamily: 'var(--font-body)',
                })}
              >
                <Icon size={20} strokeWidth={1.5} />
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
