import { useParams, Link } from 'react-router-dom'
import { beaches, beachRules, lifeguardInfo } from '../data/beaches'
import { beachBadgeInfo } from '../data/beachBadges'
import { accessibleBeaches, beachTransportServices } from '../data/accessibility'

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fmtPrice(n: number | 'free' | undefined): string {
  if (!n || n === 0) return '⚠️ call'
  if (n === 'free') return 'Free'
  return `$${n}`
}

function StatusBadge({ allowed, note }: { allowed: boolean | null | undefined; note?: string }) {
  if (note?.includes('⚠️')) return (
    <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--sun)', background: 'rgba(212,162,78,0.1)', padding: '3px 9px', borderRadius: 4 }}>
      Verify
    </span>
  )
  if (allowed === true) return (
    <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--moss)', background: 'rgba(107,142,92,0.1)', padding: '3px 9px', borderRadius: 4 }}>
      Allowed
    </span>
  )
  if (allowed === false) return (
    <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--coral)', background: 'rgba(196,90,62,0.08)', padding: '3px 9px', borderRadius: 4 }}>
      Not allowed
    </span>
  )
  return null
}

const RULE_ROWS = [
  { key: 'dogs',    label: 'Dogs' },
  { key: 'tents',   label: 'Tents & Umbrellas' },
  { key: 'surfing', label: 'Surfing' },
  { key: 'alcohol', label: 'Alcohol' },
  { key: 'smoking', label: 'Smoking' },
  { key: 'drones',  label: 'Drones & Kites' },
  { key: 'fishing', label: 'Fishing' },
  { key: 'kayaks',  label: 'Kayaks' },
] as const

export default function BeachTownPage() {
  const { town: townSlug } = useParams<{ town: string }>()

  const beach      = beaches.find(b => b.townSlug === townSlug)
  const guards     = lifeguardInfo.find(l => l.townSlug === townSlug)
  const rules      = beachRules.find(r => r.townSlug === townSlug)
  const badge      = beachBadgeInfo.find(b => b.townSlug === townSlug)
  const accessible = accessibleBeaches.filter(a => a.townSlug === townSlug)
  const transport  = beachTransportServices.filter(t => t.townSlug === townSlug)

  const displayName = beach?.town ?? townSlug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? ''

  if (!beach) {
    return (
      <div className="pg-wrap">
        <div className="pg-hero">
          <div className="pg-eyebrow">
            <Link to="/beaches" style={{ color: 'var(--teal-deep)', textDecoration: 'none' }}>← Beaches</Link>
            <span className="rule" />
            <span>LBI · New Jersey</span>
          </div>
          <h1>{displayName}</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--slate)' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>No data for this town yet.</p>
          <Link to="/beaches" style={{ fontSize: 13, color: 'var(--teal-deep)', marginTop: 8, display: 'inline-block' }}>← Back to all beaches</Link>
        </div>
      </div>
    )
  }

  const hasAccessibility = accessible.length > 0 || transport.length > 0 || !!beach.mobiMatStreets?.length

  return (
    <div className="pg-wrap">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="pg-hero">
        <div className="pg-eyebrow">
          <Link to="/beaches" style={{ color: 'var(--teal-deep)', textDecoration: 'none', fontWeight: 600 }}>← Beaches</Link>
          <span className="rule" />
          <span>LBI · New Jersey · 2026</span>
        </div>
        <h1><em>{displayName}</em></h1>
        {beach.highlight && (
          <p className="pg-lede">{beach.highlight}</p>
        )}
        <div className="pg-tabs" style={{ pointerEvents: 'none' }}>
          <div className="pg-tab active">
            <span className="tab-lbl">Daily Badge</span>
            <span className="tab-val">
              {badge && badge.pricing.daily > 0 ? `$${badge.pricing.daily}` : <em>Verify</em>}
            </span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">Lifeguard</span>
            <span className="tab-val" style={{ fontSize: 17 }}>
              {guards?.hours.includes('Verify') ? <em>Verify</em> : '10am–5pm'}
            </span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">Season</span>
            <span className="tab-val" style={{ fontSize: 17 }}>
              {guards?.seasonStart.includes('Verify') ? <em>June?</em> : 'June'}&nbsp;–&nbsp;<em>Sept</em>
            </span>
          </div>
          <div className="pg-tab">
            <span className="tab-lbl">Rules</span>
            <span className="tab-val" style={{ fontSize: 17 }}>
              {rules?.verified ? <><em>✓</em>&nbsp;Verified</> : <em>Partial</em>}
            </span>
          </div>
        </div>
      </div>

      <div className="pg-grid">

        {/* ── Main column ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* BADGE PRICES */}
          {badge && (
            <div className="lc">
              <div className="lc-head" style={{ marginBottom: 0 }}>
                <h2 className="lc-name" style={{ fontSize: 22 }}>2026 Badge Prices</h2>
                {badge.needsVerification && (
                  <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--sun)', background: 'rgba(212,162,78,0.1)', padding: '4px 10px', borderRadius: 4, flexShrink: 0 }}>
                    Unconfirmed
                  </span>
                )}
              </div>

              {badge.pricing.daily > 0 ? (
                <>
                  <div className="st-row" style={{ marginTop: 18 }}>
                    <div className="st">
                      <div className="st-lbl">Daily</div>
                      <div className="st-val">${badge.pricing.daily}</div>
                    </div>
                    <div className="st">
                      <div className="st-lbl">Weekly</div>
                      <div className="st-val">${badge.pricing.weekly}</div>
                    </div>
                    <div className="st">
                      <div className="st-lbl">Pre-season</div>
                      <div className="st-val">${badge.pricing.preseason}</div>
                      <div className="st-note">by {badge.pricing.preseasonDeadline}</div>
                    </div>
                    <div className="st">
                      <div className="st-lbl">In-season</div>
                      <div className="st-val">${badge.pricing.seasonal}</div>
                    </div>
                  </div>

                  <div className="lc-feats">
                    <span className="lc-feat">👶 Under 12 always free</span>
                    {badge.pricing.senior !== 0 && (
                      <span className="lc-feat">65+ — {fmtPrice(badge.pricing.senior)} ({badge.pricing.seniorType})</span>
                    )}
                    {badge.pricing.veteranDaily === 'free' && (
                      <span className="lc-feat">Veterans — free daily</span>
                    )}
                    {badge.pricing.veteranLifetime === 'free' && (
                      <span className="lc-feat">Veterans — free lifetime</span>
                    )}
                    {badge.pricing.digitalApp && (
                      <span className="lc-feat">My Beach Mobile app accepted</span>
                    )}
                    {badge.pricing.cashOnly && (
                      <span className="lc-feat dim">💵 Cash/check only at booth</span>
                    )}
                  </div>

                  {badge.pricing.notes?.includes('NOT REQUIRED ON WEDNESDAYS') && (
                    <div style={{ marginTop: 14, padding: '12px 16px', background: 'rgba(107,142,92,0.08)', borderRadius: 6 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--moss)' }}>
                        Badges not required on Wednesdays — free beach entry all day
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ marginTop: 14, padding: '12px 16px', background: 'rgba(212,162,78,0.07)', borderRadius: 6 }}>
                  <p style={{ fontSize: 13, color: 'var(--sun)' }}>
                    2026 pricing not confirmed from the official website. Call <strong>{badge.badgeOffice.phone}</strong> before visiting.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line-soft)' }}>
                <span style={{ fontSize: 13, color: 'var(--slate)' }}>{badge.badgeOffice.phone}</span>
                <a href={badge.sourceUrl} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                  Official source ↗
                </a>
              </div>
            </div>
          )}

          {/* LIFEGUARD SEASON */}
          {guards && (
            <div className="lc">
              <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 0 }}>Lifeguard Season</h2>
              <div className="st-row c3" style={{ marginTop: 18 }}>
                <div className="st">
                  <div className="st-lbl">Season Opens</div>
                  <div className="st-val" style={{ fontSize: 16 }}>{guards.seasonStart}</div>
                </div>
                <div className="st">
                  <div className="st-lbl">Hours</div>
                  <div className="st-val" style={{ fontSize: 16 }}>{guards.hours.includes('Verify') ? <em>Verify</em> : guards.hours.replace(/ \(.*\)/, '')}</div>
                </div>
                <div className="st">
                  <div className="st-lbl">Status</div>
                  <div className="st-val" style={{ fontSize: 14, color: guards.currentStatus.includes('Verify') || guards.currentStatus.includes('No lifeguards') ? 'var(--sun)' : 'var(--moss)' }}>
                    {guards.currentStatus}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(196,90,62,0.06)', borderRadius: 6, borderLeft: '3px solid var(--coral)' }}>
                <p style={{ fontSize: 13, color: 'var(--coral)', fontWeight: 600 }}>{guards.safetyNote}</p>
              </div>

              {guards.guardedBeaches.length > 0 && !guards.guardedBeaches[0].startsWith('⚠️') && (
                <div className="lc-feats" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                  <span className="st-lbl" style={{ marginBottom: 2 }}>Guarded Beaches</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {guards.guardedBeaches.map((b, i) => (
                      <span key={i} style={{ fontSize: 12, color: 'var(--ink-soft)', background: 'var(--sand)', padding: '4px 10px', borderRadius: 4 }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line-soft)' }}>
                <a href="https://safebeachday.com/" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                  Live conditions at safebeachday.com ↗
                </a>
              </div>
            </div>
          )}

          {/* BEACH RULES */}
          <div className="lc">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 className="lc-name" style={{ fontSize: 22 }}>Beach Rules</h2>
              {rules?.verified ? (
                <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--moss)', background: 'rgba(107,142,92,0.1)', padding: '4px 10px', borderRadius: 4 }}>
                  Verified 2026
                </span>
              ) : (
                <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--sun)', background: 'rgba(212,162,78,0.1)', padding: '4px 10px', borderRadius: 4 }}>
                  Partial data
                </span>
              )}
            </div>

            {rules ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {RULE_ROWS.map(({ key, label }, i) => {
                  const rule = rules.rules[key as keyof typeof rules.rules] as { allowed?: boolean | null; note?: string; seasonalRestriction?: string; dogBeach?: string } | undefined
                  if (!rule) return null
                  const note = rule.seasonalRestriction ?? rule.dogBeach ?? rule.note
                  const isVerify = !note || note.startsWith('⚠️')
                  if (isVerify && !rules.verified) return null
                  return (
                    <div key={key} style={{
                      padding: '13px 0',
                      borderTop: i === 0 ? 'none' : '1px solid var(--line-soft)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{label}</span>
                        <StatusBadge allowed={'allowed' in rule ? rule.allowed : undefined} note={note} />
                      </div>
                      {note && !note.startsWith('⚠️') && (
                        <p style={{ fontSize: 12.5, color: 'var(--slate)', marginTop: 5, lineHeight: 1.45 }}>{note}</p>
                      )}
                    </div>
                  )
                })}

                {rules.additionalNotes && !rules.additionalNotes.startsWith('⚠️') && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line-soft)', fontSize: 12.5, color: 'var(--slate)', lineHeight: 1.5 }}>
                    {rules.additionalNotes}
                  </div>
                )}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: 'var(--slate)' }}>
                Full beach rules for {displayName} need field research. Check the town's official website for current rules.
              </p>
            )}

            {rules?.sourceUrl && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line-soft)' }}>
                <a href={rules.sourceUrl} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
                  Full rules at official source ↗
                </a>
              </div>
            )}
          </div>

          {/* ACCESSIBILITY */}
          {hasAccessibility && (
            <div className="lc">
              <h2 className="lc-name" style={{ fontSize: 22, marginBottom: 16 }}>Accessibility</h2>

              {accessible.map((a, i) => (
                <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < accessible.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>{a.beach}</p>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {a.mobiMat && (
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal-deep)', background: 'rgba(72,108,107,0.08)', padding: '3px 8px', borderRadius: 4 }}>
                          Mobi-Mat
                        </span>
                      )}
                      {a.wheelchairLoan && (
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--moss)', background: 'rgba(107,142,92,0.1)', padding: '3px 8px', borderRadius: 4 }}>
                          Wheelchair
                        </span>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{a.notes}</p>
                  {a.contact && (
                    <a href={`tel:${a.contact}`} style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>
                      {a.contact}
                    </a>
                  )}
                </div>
              ))}

              {transport.map((t, i) => (
                <div key={i} style={{ padding: '14px 16px', background: 'rgba(107,142,92,0.06)', borderRadius: 6, marginTop: 8 }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{t.name}</p>
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{t.description}</p>
                  <p style={{ fontSize: 12, color: 'var(--moss)', fontWeight: 600, marginTop: 6 }}>Free · {t.season}</p>
                  <a href={`tel:${t.contact}`} style={{ fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 6 }}>
                    {t.contact}
                  </a>
                </div>
              ))}

              {beach.mobiMatStreets && beach.mobiMatStreets.length > 0 && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: accessible.length > 0 || transport.length > 0 ? '1px solid var(--line-soft)' : 'none' }}>
                  <div className="st-lbl" style={{ marginBottom: 10 }}>Mobi-Mat Access Streets</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {beach.mobiMatStreets.map(s => (
                      <span key={s} style={{ fontSize: 12, background: 'var(--sand)', color: 'var(--ink-soft)', padding: '4px 10px', borderRadius: 4, border: '1px solid var(--line)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside className="pg-aside">
          <div className="aside-card">
            <p className="aside-title">Quick Reference</p>
            <div className="aside-mini">
              <div>
                <div className="st-lbl">Daily Badge</div>
                <div className="st-val" style={{ fontSize: 22, marginTop: 4 }}>
                  {badge && badge.pricing.daily > 0 ? `$${badge.pricing.daily}` : '⚠️'}
                </div>
              </div>
              <div>
                <div className="st-lbl">Under 12</div>
                <div className="st-val ok" style={{ fontSize: 18, marginTop: 4 }}>Free</div>
              </div>
              <div>
                <div className="st-lbl">Lifeguards</div>
                <div className="st-val" style={{ fontSize: 14, marginTop: 4, lineHeight: 1.2 }}>
                  {guards?.hours.includes('Verify') ? 'Verify hours' : '10am – 5pm'}
                </div>
              </div>
              <div>
                <div className="st-lbl">Season</div>
                <div className="st-val" style={{ fontSize: 14, marginTop: 4, lineHeight: 1.2 }}>June – Labor Day</div>
              </div>
            </div>
          </div>

          <div className="aside-card advisory">
            <p className="aside-title">🌊 Swim Safety</p>
            <p className="aside-body">
              Always swim near a lifeguard. If caught in a rip current, swim <strong>parallel to shore</strong> — never fight it straight in.
            </p>
            <a href="https://safebeachday.com/" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: 10, fontSize: 12.5, color: 'var(--teal-deep)', fontWeight: 600, textDecoration: 'none' }}>
              Live rip forecast ↗
            </a>
          </div>

          {beach.dogRules && (
            <div className="aside-card">
              <p className="aside-title">Dog Rules</p>
              <p className="aside-body">{beach.dogRules}</p>
            </div>
          )}

          {badge?.badgeOffice && (
            <div className="aside-card">
              <p className="aside-title">Badge Office</p>
              <p className="aside-body" style={{ marginBottom: 8 }}>{badge.badgeOffice.location}</p>
              <p style={{ fontSize: 13, color: 'var(--teal-deep)', fontWeight: 600 }}>{badge.badgeOffice.phone}</p>
              {badge.badgeOffice.seasonHours && (
                <p style={{ fontSize: 12, color: 'var(--slate)', marginTop: 6 }}>{badge.badgeOffice.seasonHours}</p>
              )}
            </div>
          )}
        </aside>

      </div>
    </div>
  )
}
