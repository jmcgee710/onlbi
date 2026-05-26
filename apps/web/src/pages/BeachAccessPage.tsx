import { useParams, Link } from 'react-router-dom'

export default function BeachAccessPage() {
  const { town, street } = useParams<{ town: string; street: string }>()
  const townName   = town?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? ''
  const streetName = street?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? ''

  return (
    <div className="pg-wrap">
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <Link to={`/beaches/${town}`} style={{ color: 'var(--teal-deep)', textDecoration: 'none', fontWeight: 600 }}>
            ← {townName}
          </Link>
          <span className="rule" />
          <span>Beach Access Point</span>
        </div>
        <h1><em>{streetName}</em></h1>
        <p className="pg-lede">{townName} · Long Beach Island, NJ</p>
      </div>

      <div style={{ maxWidth: 640 }}>
        <div className="aside-card advisory">
          <p className="aside-title" style={{ fontSize: 15, marginBottom: 6 }}>Street-level data coming soon</p>
          <p className="aside-body">
            Detailed access-point info (parking, exact mat location, facilities) for {streetName} is being
            researched. Check the{' '}
            <Link to={`/beaches/${town}`} style={{ color: 'var(--teal-deep)', textDecoration: 'none', borderBottom: '1px solid rgba(72,108,107,0.35)', fontWeight: 600 }}>
              {townName} town page
            </Link>{' '}
            for what's available now.
          </p>
        </div>
      </div>
    </div>
  )
}
