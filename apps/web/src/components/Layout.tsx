import { Outlet, NavLink } from 'react-router-dom'
import Sidebar from './Sidebar'

const mobileNav = [
  { to: '/', icon: '🌊', label: 'Today' },
  { to: '/beaches', icon: '🏖️', label: 'Beaches' },
  { to: '/eat', icon: '🍽️', label: 'Eat' },
  { to: '/do', icon: '🏄', label: 'Do' },
  { to: '/accessibility', icon: '♿', label: 'Access' },
]

export default function Layout() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        {/* Mobile top bar */}
        <div className="mobile-topbar">
          <img src="/logo-dark.png" alt="On LBI" style={{ height: 40, objectFit: 'contain' }} />
          <div style={{ display: 'flex', gap: 16 }}>
            <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 20 }}>🔍</button>
            <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 20 }}>🔔</button>
          </div>
        </div>

        {/* Desktop top bar */}
        <div className="topbar" style={{ display: 'flex' } as React.CSSProperties}>
          <div className="crumbs"><strong>Today</strong> · Saturday, May 9</div>
          <span className="spacer" />
          <button className="icon-btn">🔍 Search the island</button>
          <button className="icon-btn">📅 Tomorrow</button>
          <button className="icon-btn primary">🔔 1 Alert</button>
        </div>

        <Outlet />

        {/* Mobile bottom nav */}
        <nav className="mobile-bottom-nav">
          <div style={{ display: 'flex', width: '100%' }}>
            {mobileNav.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 2, padding: '10px 0', fontSize: 10, fontWeight: 600, textDecoration: 'none',
                  color: isActive ? '#B8CDC8' : 'rgba(255,255,255,0.4)',
                  fontFamily: 'var(--font-body)',
                })}
              >
                <span style={{ fontSize: 20 }}>{icon}</span>
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
