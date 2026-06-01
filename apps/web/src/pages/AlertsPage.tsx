import { useState } from 'react'
import { useAlerts, type AlertSeverity, type LiveAlert } from '../hooks/useAlerts'

type Filter = 'all' | 'warning' | 'info' | 'critical'

// LBI center point (Beach Haven) — weather/marine alerts are issued by zone,
// so one point covers the whole island.
const LBI_LAT = 39.5604
const LBI_LON = -74.2429

function sevStyle(s: AlertSeverity): { accent: string; bg: string; text: string } {
  if (s === 'critical') return { accent: 'var(--coral)',  bg: 'rgba(196,90,62,0.06)',  text: 'var(--coral)' }
  if (s === 'warning')  return { accent: 'var(--sun)',    bg: 'rgba(212,162,78,0.06)', text: 'var(--sun)' }
  return                       { accent: 'var(--teal)',   bg: 'rgba(107,150,148,0.06)', text: 'var(--teal-deep)' }
}

export default function AlertsPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const { alerts, error, loading } = useAlerts(LBI_LAT, LBI_LON)

  const list: LiveAlert[] = alerts ?? []

  // True totals (unfiltered) — power the pill counts + sidebar summary.
  const allActive = list.filter(a => a.active)
  const allPast   = list.filter(a => !a.active)
  const counts: Record<Filter, number> = {
    all:      allActive.length,
    warning:  list.filter(a => a.severity === 'warning').length,
    info:     list.filter(a => a.severity === 'info').length,
    critical: list.filter(a => a.severity === 'critical').length,
  }

  // What the current filter shows, split into active vs. expired.
  const shown       = filter === 'all' ? list : list.filter(a => a.severity === filter)
  const shownActive = shown.filter(a => a.active)
  const shownPast   = shown.filter(a => !a.active)

  return (
    <div className="pg-wrap">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <span>Beach Alerts</span>
          <span className="rule" />
          <span>Live · National Weather Service</span>
        </div>
        <h1>Beach <em>Alerts</em></h1>
        <p className="pg-lede">
          Live watches, warnings &amp; advisories for Long Beach Island, straight from the
          National Weather Service. Water-quality &amp; traffic links below go to the
          official sources.
        </p>
        <div className="pg-tabs">
          {([
            { key: 'all',      label: 'Active Alerts' },
            { key: 'warning',  label: 'Warning' },
            { key: 'info',     label: 'Info' },
            { key: 'critical', label: 'Critical' },
          ] as { key: Filter; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              className={`pg-tab${filter === key ? ' active' : ''}`}
              onClick={() => setFilter(key)}
            >
              <span className="tab-lbl">{label}</span>
              <span className="tab-val">{counts[key]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Loading */}
          {loading && (
            <p style={{ fontSize: 13.5, color: 'var(--slate)', textAlign: 'center', padding: '24px 0' }}>
              Checking the National Weather Service for active alerts…
            </p>
          )}

          {/* Error — be honest that we couldn't reach the source */}
          {!loading && error && (
            <div className="lc" style={{ borderLeft: '3px solid var(--sun)', paddingLeft: 25 }}>
              <h3 className="lc-name" style={{ fontSize: 18, marginBottom: 8 }}>
                Couldn't load live alerts
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                We couldn't reach the National Weather Service just now. Check{' '}
                <a href="https://www.weather.gov/phi/" target="_blank" rel="noopener noreferrer"
                   style={{ color: 'var(--teal-deep)', fontWeight: 600 }}>
                  weather.gov
                </a>{' '}
                directly for the latest watches and warnings.
              </p>
            </div>
          )}

          {/* No active alerts — the common, good case */}
          {!loading && !error && allActive.length === 0 && (
            <div className="lc" style={{ borderLeft: '3px solid var(--teal)', paddingLeft: 25 }}>
              <h3 className="lc-name" style={{ fontSize: 18, marginBottom: 8 }}>
                No active weather alerts for LBI
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                The National Weather Service has no watches, warnings, or advisories in effect
                for Long Beach Island right now. Always check posted beach flags and lifeguards
                before swimming.
              </p>
            </div>
          )}

          {/* Active alerts */}
          {shownActive.length > 0 && (
          <div>
            <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--slate-soft)', fontWeight: 600, marginBottom: 14 }}>
              Active
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {shownActive.map(a => {
                const st = sevStyle(a.severity)
                return (
                  <div key={a.id} className="lc" style={{ borderLeft: `3px solid ${st.accent}`, paddingLeft: 25 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 10 }}>
                      <h3 className="lc-name" style={{ fontSize: 18 }}>{a.title}</h3>
                      <span style={{
                        fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700,
                        color: st.text, background: st.bg, padding: '4px 10px', borderRadius: 4, flexShrink: 0,
                      }}>
                        {a.cat}
                      </span>
                    </div>
                    <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{a.body}</p>
                    {a.instruction && (
                      <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.5, marginTop: 8, fontStyle: 'italic' }}>
                        {a.instruction}
                      </p>
                    )}
                    <p style={{ fontSize: 11.5, color: 'var(--slate-soft)', marginTop: 10 }}>
                      {a.area} · {a.sender}
                      {a.expiresLabel ? ` · ${a.expiresLabel}` : a.time ? ` · ${a.time}` : ''}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          )}

          {/* Past alerts */}
          {shownPast.length > 0 && (
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--slate-soft)', fontWeight: 600, marginBottom: 14 }}>
                Recent / Expired
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, opacity: 0.55 }}>
                {shownPast.map(a => {
                  const st = sevStyle(a.severity)
                  return (
                    <div key={a.id} className="lc" style={{ borderLeft: `3px solid ${st.accent}`, paddingLeft: 25 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 8 }}>
                        <h3 className="lc-name" style={{ fontSize: 17 }}>{a.title}</h3>
                        <span style={{ fontSize: 11, color: 'var(--slate-soft)', flexShrink: 0 }}>Expired</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--slate)', lineHeight: 1.5 }}>{a.body}</p>
                      <p style={{ fontSize: 11, color: 'var(--slate-soft)', marginTop: 8 }}>{a.area} · {a.sender}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <p style={{ fontSize: 12, color: 'var(--slate-soft)', textAlign: 'center', paddingTop: 8 }}>
            Live from the National Weather Service (weather.gov) · Refreshed each visit
          </p>
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card">
            <p className="aside-title">Status Summary</p>
            <div className="aside-mini">
              <div>
                <div className="st-lbl">Active Now</div>
                <div className="st-val warn" style={{ fontSize: 28, marginTop: 4 }}>{allActive.length}</div>
              </div>
              <div>
                <div className="st-lbl">Expired</div>
                <div className="st-val" style={{ fontSize: 28, color: 'var(--slate-soft)', marginTop: 4 }}>{allPast.length}</div>
              </div>
            </div>
          </div>

          {/* Water quality + traffic don't have clean live feeds — link out to
              the official sources rather than inventing a status. */}
          <div className="aside-card">
            <p className="aside-title">Water Quality</p>
            <p className="aside-body" style={{ marginBottom: 10 }}>
              NJ DEP tests ocean &amp; bay beaches weekly in season and posts any
              advisories or closures.
            </p>
            <a href="https://www.njbeaches.org/" target="_blank" rel="noopener noreferrer"
               style={{ fontSize: 13, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
              Check NJ beach status →
            </a>
          </div>

          <div className="aside-card">
            <p className="aside-title">Traffic &amp; Roads</p>
            <p className="aside-body" style={{ marginBottom: 10 }}>
              Live Causeway (Route 72) delays, incidents &amp; cameras from NJ511.
            </p>
            <a href="https://511nj.org/" target="_blank" rel="noopener noreferrer"
               style={{ fontSize: 13, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
              Open NJ511 →
            </a>
          </div>

          <div className="aside-card advisory">
            <p className="aside-title">Emergency Contacts</p>
            <p className="aside-body" style={{ marginBottom: 10, fontSize: 12 }}>
              <strong>In any emergency, call 911.</strong> Non-emergency police lines below,
              north to south:
            </p>
            <ul className="aside-list">
              <li>Long Beach Twp PD — (609) 494-3322</li>
              <li>Harvey Cedars PD — (609) 494-6509</li>
              <li>Surf City PD — (609) 494-8121</li>
              <li>Ship Bottom PD — (609) 494-1518</li>
              <li>Beach Haven PD — (609) 492-0505</li>
              <li>NJ Poison Control — 1-800-222-1222</li>
              <li>Coast Guard (water emergency) — VHF Ch. 16 or 911</li>
            </ul>
            <p className="aside-body" style={{ marginTop: 10, fontSize: 12 }}>
              Barnegat Light is covered by Long Beach Township PD, which also patrols
              the unincorporated LBT communities (Loveladies, Brant Beach, Holgate &amp; more).
            </p>
          </div>
        </aside>

      </div>
    </div>
  )
}
