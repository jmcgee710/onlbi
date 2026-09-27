import { Suspense, useEffect, useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'
import { getPageSeo } from '../lib/seo'

// Main nav — shown in the desktop header and the mobile menu.
const mainNav = [
  { to: '/towns',          label: 'Towns' },
  { to: '/lbi-conditions', label: 'Conditions' },
  { to: '/beaches',        label: 'Beaches' },
  { to: '/eat',            label: 'Eat' },
  { to: '/do',             label: 'Do' },
  { to: '/getting-around', label: 'Getting Around' },
]

// Mobile menu also carries the practical pages the desktop header leaves to the footer.
const mobileNav = [
  { to: '/', label: 'Today' },
  ...mainNav,
  { to: '/accessibility', label: 'Accessibility' },
  { to: '/alerts',        label: 'Alerts' },
]

const footerNav = [
  { to: '/towns',          label: 'Towns' },
  { to: '/lbi-conditions', label: 'Conditions' },
  { to: '/beaches',        label: 'Beaches' },
  { to: '/accessibility',  label: 'Accessibility' },
  { to: '/getting-around', label: 'Getting Around' },
  { to: '/alerts',         label: 'Alerts' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Reset scroll to the top of the page on every route change. Without this,
  // navigating from the bottom of one page lands you at the bottom of the next.
  // Also closes the mobile menu after a link in it is followed.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
    setMenuOpen(false)
  }, [pathname])

  // Keep <title> + meta description correct during client-side (SPA) navigation.
  // Crawlers get the right tags from the prerendered HTML; this is for in-app nav.
  useEffect(() => {
    const { title, description } = getPageSeo(pathname)
    document.title = title
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [pathname])

  return (
    <div className="app">
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="site-logo" aria-label="On LBI — home">
            <img src="/logo-light.png" alt="On LBI" width={160} height={213} />
          </Link>
          <nav className="site-nav" aria-label="Main">
            {mainNav.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {label}
              </NavLink>
            ))}
          </nav>
          <Link to="/lbi-conditions" className="site-cta">Tides &amp; temps</Link>
          <button
            type="button"
            className="menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
        <nav id="mobile-menu" className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-label="Mobile">
          {mobileNav.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {label} <span aria-hidden="true">→</span>
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="main">
        {/* Suspense boundary for the lazy per-page chunks (App.tsx). During
            hydration React keeps the prerendered HTML inside this boundary
            visible until the page's chunk loads — do not remove it, or every
            prerendered page breaks. Server render passes static components,
            so the fallback is never emitted into prerendered HTML. */}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <Link to="/" aria-label="On LBI — home">
            <img src="/logo-light.png" alt="On LBI" width={160} height={213} />
          </Link>
          <nav aria-label="Footer">
            {footerNav.map(({ to, label }) => (
              <Link key={to} to={to}>{label}</Link>
            ))}
          </nav>
          <div>onlongbeachisland.com</div>
        </div>
      </footer>
      <Analytics />
    </div>
  )
}
