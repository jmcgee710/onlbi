const alerts = [
  { id: 1, severity: 'warning',  cat: 'Beach Conditions', title: 'Rip Current Advisory — Surf City',    body: 'Rip current advisory in effect. Swim near lifeguards and stay aware of changing conditions.',                     time: '8 min ago',  active: true },
  { id: 2, severity: 'info',     cat: 'Traffic',          title: 'Causeway — Moderate Delays',           body: 'Route 72 eastbound moderate delays. Estimated 12 min wait at Manahawkin Bay Bridge.',                         time: '18 min ago', active: true },
  { id: 3, severity: 'info',     cat: 'Water Quality',    title: 'All Beaches Pass Water Quality',        body: 'NJ DEP weekly testing: all LBI beaches passed. No closures in effect.',                                       time: '2 hrs ago',  active: true },
  { id: 4, severity: 'critical', cat: 'Weather',          title: 'Thunderstorm Watch — Monday',           body: 'NWS: Thunderstorm watch Monday 2–8 PM. Seek shelter immediately if thunder heard on beach.',                   time: 'Yesterday',  active: false },
]

function sevStyle(s: string): { accent: string; bg: string; text: string } {
  if (s === 'critical') return { accent: 'var(--coral)',  bg: 'rgba(196,90,62,0.06)',  text: 'var(--coral)' }
  if (s === 'warning')  return { accent: 'var(--sun)',    bg: 'rgba(212,162,78,0.06)', text: 'var(--sun)' }
  return                       { accent: 'var(--teal)',   bg: 'rgba(107,150,148,0.06)', text: 'var(--teal-deep)' }
}

export default function AlertsPage() {
  const active = alerts.filter(a => a.active)
  const past   = alerts.filter(a => !a.active)

  return (
    <div className="pg-wrap">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <span>Beach Alerts</span>
          <span className="rule" />
          <span>NWS · NJ DEP · NJ511 · LBI Towns</span>
        </div>
        <h1>Beach <em>Alerts</em></h1>
        <p className="pg-lede">
          Conditions, weather, water quality &amp; traffic alerts for Long Beach Island.
          Sourced from NWS, NJ DEP, NJ511 &amp; town offices.
        </p>
        <div className="pg-tabs" style={{ pointerEvents: 'none' }}>
          <button className="pg-tab active">
            <span className="tab-lbl">Active Alerts</span>
            <span className="tab-val">{active.length}</span>
          </button>
          <button className="pg-tab">
            <span className="tab-lbl">Warning</span>
            <span className="tab-val">{alerts.filter(a => a.severity === 'warning').length}</span>
          </button>
          <button className="pg-tab">
            <span className="tab-lbl">Info</span>
            <span className="tab-val">{alerts.filter(a => a.severity === 'info').length}</span>
          </button>
          <button className="pg-tab">
            <span className="tab-lbl">Critical</span>
            <span className="tab-val">{alerts.filter(a => a.severity === 'critical' && a.active).length}</span>
          </button>
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Active alerts */}
          <div>
            <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--slate-soft)', fontWeight: 600, marginBottom: 14 }}>
              Active
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {active.map(a => {
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
                    <p style={{ fontSize: 11.5, color: 'var(--slate-soft)', marginTop: 10 }}>{a.time}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Past alerts */}
          {past.length > 0 && (
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--slate-soft)', fontWeight: 600, marginBottom: 14 }}>
                Recent / Expired
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, opacity: 0.55 }}>
                {past.map(a => {
                  const st = sevStyle(a.severity)
                  return (
                    <div key={a.id} className="lc" style={{ borderLeft: `3px solid ${st.accent}`, paddingLeft: 25 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 8 }}>
                        <h3 className="lc-name" style={{ fontSize: 17 }}>{a.title}</h3>
                        <span style={{ fontSize: 11, color: 'var(--slate-soft)', flexShrink: 0 }}>Expired</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--slate)', lineHeight: 1.5 }}>{a.body}</p>
                      <p style={{ fontSize: 11, color: 'var(--slate-soft)', marginTop: 8 }}>{a.time}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <p style={{ fontSize: 12, color: 'var(--slate-soft)', textAlign: 'center', paddingTop: 8 }}>
            Sourced from NWS, NJ DEP, NJ511 &amp; LBI municipality offices · Updated automatically
          </p>
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card">
            <p className="aside-title">Status Summary</p>
            <div className="aside-mini">
              <div>
                <div className="st-lbl">Active Now</div>
                <div className="st-val warn" style={{ fontSize: 28, marginTop: 4 }}>{active.length}</div>
              </div>
              <div>
                <div className="st-lbl">Expired</div>
                <div className="st-val" style={{ fontSize: 28, color: 'var(--slate-soft)', marginTop: 4 }}>{past.length}</div>
              </div>
            </div>
          </div>
          <div className="aside-card advisory">
            <p className="aside-title">Emergency Contacts</p>
            <ul className="aside-list">
              <li>Beach Haven PD — (609) 492-0111</li>
              <li>Barnegat Light PD — (609) 494-8822</li>
              <li>NJ Poison Control — 1-800-222-1222</li>
              <li>Coast Guard — 1-800-418-7314</li>
              <li>In emergency — call 911</li>
            </ul>
          </div>
          <div className="aside-card">
            <p className="aside-title">Alert Sources</p>
            <ul className="aside-list">
              <li>National Weather Service — weather.gov</li>
              <li>NJ DEP water quality testing</li>
              <li>NJ511 — traffic &amp; road conditions</li>
              <li>LBI municipality offices</li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  )
}
