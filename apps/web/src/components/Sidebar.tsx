import { useNavigate, useLocation } from 'react-router-dom'

const nav = [
  { id: '/', label: 'Today', icon: '☀', meta: undefined, dot: false, section: 'island' },
  { id: '/beaches', label: 'Beaches', icon: '⛱', meta: '6 open', dot: false, section: 'island' },
  { id: '/eat', label: 'Eat & Drink', icon: '⚡', meta: 'Happy hr', dot: false, section: 'island' },
  { id: '/do', label: 'Things To Do', icon: '⚓', meta: undefined, dot: false, section: 'island' },
  { id: '/getting-around', label: 'Getting Around', icon: '🚌', meta: undefined, dot: false, section: 'practical' },
  { id: '/accessibility', label: 'Accessibility', icon: '♿', meta: undefined, dot: false, section: 'practical' },
  { id: '/alerts', label: 'Alerts', icon: '🔔', meta: undefined, dot: true, section: 'practical' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isActive = (id: string) => id === '/' ? pathname === '/' : pathname.startsWith(id)

  const island = nav.filter(n => n.section === 'island')
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
          {island.map(n => (
            <button key={n.id} className="nav-item" aria-current={isActive(n.id) ? 'true' : undefined}
              onClick={() => navigate(n.id)}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span>{n.label}</span>
              {n.meta && <span className="nav-meta">{n.meta}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div>
        <div className="nav-section-label">Practical</div>
        <nav className="nav">
          {practical.map(n => (
            <button key={n.id} className="nav-item" aria-current={isActive(n.id) ? 'true' : undefined}
              onClick={() => navigate(n.id)}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span>{n.label}</span>
              {n.dot && <span className="nav-dot" />}
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
