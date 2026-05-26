import { useNavigate, useLocation } from 'react-router-dom'
import { Sun, Umbrella, UtensilsCrossed, Anchor, Compass, Accessibility, Bell } from 'lucide-react'

const nav = [
  { id: '/',               label: 'Today',          Icon: Sun,             meta: undefined,   dot: false, section: 'island' },
  { id: '/beaches',        label: 'Beaches',         Icon: Umbrella,        meta: '6 open',    dot: false, section: 'island' },
  { id: '/eat',            label: 'Eat & Drink',     Icon: UtensilsCrossed, meta: 'Happy hr',  dot: false, section: 'island' },
  { id: '/do',             label: 'Do & Shop',        Icon: Anchor,          meta: undefined,   dot: false, section: 'island' },
  { id: '/getting-around', label: 'Getting Around',  Icon: Compass,         meta: undefined,   dot: false, section: 'practical' },
  { id: '/accessibility',  label: 'Accessibility',   Icon: Accessibility,   meta: undefined,   dot: false, section: 'practical' },
  { id: '/alerts',         label: 'Alerts',          Icon: Bell,            meta: undefined,   dot: true,  section: 'practical' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isActive = (id: string) => id === '/' ? pathname === '/' : pathname.startsWith(id)

  const island    = nav.filter(n => n.section === 'island')
  const practical = nav.filter(n => n.section === 'practical')

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <img src="/logo-light.png" alt="ON LBI" />
        </div>
        <div className="brand-meta">
          <span className="wordmark">on lbi</span>
          <span className="tagline">Long Beach Island</span>
        </div>
      </div>

      <div>
        <div className="nav-section-label">The Island</div>
        <nav className="nav">
          {island.map(({ id, label, Icon, meta }) => (
            <button key={id} className="nav-item" aria-current={isActive(id) ? 'true' : undefined}
              onClick={() => navigate(id)}>
              <Icon size={18} strokeWidth={1.5} />
              <span>{label}</span>
              {meta && <span className="nav-meta">{meta}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div>
        <div className="nav-section-label">Practical</div>
        <nav className="nav">
          {practical.map(({ id, label, Icon, dot }) => (
            <button key={id} className="nav-item" aria-current={isActive(id) ? 'true' : undefined}
              onClick={() => navigate(id)}>
              <Icon size={18} strokeWidth={1.5} />
              <span>{label}</span>
              {dot && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-foot">
        <span className="live-dot">Live · just now</span>
        <span>Real-time beach data for LBI, NJ</span>
      </div>
    </aside>
  )
}
