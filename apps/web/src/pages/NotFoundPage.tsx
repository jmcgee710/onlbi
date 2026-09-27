import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="pg-wrap">
      <section className="pg-hero" data-not-found="">
        <div className="pg-eyebrow"><span className="rule" />404</div>
        <h1>Page <em>not found.</em></h1>
        <p className="pg-lede">That page isn’t on the island. Try the homepage or a town guide.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/" className="lc-cta-btn">Back to today <span className="arw">→</span></Link>
          <Link to="/towns" className="lc-cta-btn" style={{ background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--line-strong)' }}>
            All towns <span className="arw">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
