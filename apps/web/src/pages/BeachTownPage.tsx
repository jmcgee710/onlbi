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

function AllowedChip({ allowed, note }: { allowed: boolean | null | undefined; note?: string }) {
  if (allowed === true) return (
    <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5 font-semibold">✓ Allowed</span>
  )
  if (allowed === false) return (
    <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 rounded-md px-2 py-0.5 font-semibold">✗ Not allowed</span>
  )
  if (note?.includes('⚠️')) return (
    <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded-md px-2 py-0.5 font-semibold">⚠️ Verify</span>
  )
  return null
}

const RULE_ROWS = [
  { key: 'dogs',      icon: '🐕', label: 'Dogs' },
  { key: 'tents',     icon: '⛺', label: 'Tents & Umbrellas' },
  { key: 'surfing',   icon: '🏄', label: 'Surfing' },
  { key: 'alcohol',   icon: '🍺', label: 'Alcohol' },
  { key: 'smoking',   icon: '🚬', label: 'Smoking' },
  { key: 'drones',    icon: '🚁', label: 'Drones & Kites' },
  { key: 'fishing',   icon: '🎣', label: 'Fishing' },
  { key: 'kayaks',    icon: '🛶', label: 'Kayaks' },
] as const

export default function BeachTownPage() {
  const { town: townSlug } = useParams<{ town: string }>()

  // All data keyed off townSlug
  const beach       = beaches.find(b => b.townSlug === townSlug)
  const guards      = lifeguardInfo.find(l => l.townSlug === townSlug)
  const rules       = beachRules.find(r => r.townSlug === townSlug)
  const badge       = beachBadgeInfo.find(b => b.townSlug === townSlug)
  const accessible  = accessibleBeaches.filter(a => a.townSlug === townSlug)
  const transport   = beachTransportServices.filter(t => t.townSlug === townSlug)

  const displayName = beach?.town ?? townSlug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? ''

  if (!beach) {
    return (
      <div>
        <div className="bg-[#0d1b2a] px-5 py-5 md:px-8">
          <Link to="/beaches" className="text-xs text-white/50 hover:text-white/80 mb-2 block">← All Beaches</Link>
          <h1 className="text-2xl font-black text-white">{displayName}</h1>
        </div>
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 text-center text-gray-400">
          <p className="text-4xl mb-3">🏖️</p>
          <p className="font-semibold">No data for this town yet.</p>
          <Link to="/beaches" className="text-xs text-[#0077b6] mt-2 inline-block">← Back to all beaches</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-[#0d1b2a] px-5 py-5 md:px-8">
        <Link to="/beaches" className="text-xs text-white/50 hover:text-white/80 mb-2 block">
          ← All Beaches
        </Link>
        <h1 className="text-2xl font-black text-white">{displayName}</h1>
        {beach.highlight && (
          <p className="text-sm text-[#B8CDC8] mt-1">{beach.highlight}</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-5 space-y-5">

        {/* ── OVERVIEW CHIPS ────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          {beach.badgeRequired && (
            <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded-md px-2 py-0.5 font-semibold">
              🎫 Badge required 12+
            </span>
          )}
          {beach.lifeguarded && (
            <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5 font-semibold">
              🛟 Lifeguarded {beach.lifeguardHours}
            </span>
          )}
          {beach.beachTram && (
            <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 rounded-md px-2 py-0.5 font-semibold">
              🚐 Beach Tram
            </span>
          )}
          {beach.bayBeach && (
            <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-100 rounded-md px-2 py-0.5 font-semibold">
              ⚓ Bay Beach available
            </span>
          )}
          {beach.noFreeDay && (
            <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5 font-semibold">
              ⭐ {beach.noFreeDay}
            </span>
          )}
        </div>

        {/* ── BADGE PRICES ──────────────────────────────────────────────── */}
        {badge && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="font-black text-gray-900">🎫 2026 Badge Prices</p>
              {badge.needsVerification && (
                <p className="text-xs text-amber-600 mt-1">⚠️ Prices unconfirmed for 2026 — call to verify</p>
              )}
            </div>

            {badge.pricing.daily > 0 ? (
              <>
                <div className="grid grid-cols-4 divide-x divide-gray-100">
                  {[
                    { label: 'Daily',         val: fmtPrice(badge.pricing.daily) },
                    { label: 'Weekly',        val: fmtPrice(badge.pricing.weekly) },
                    { label: 'Pre-season',    val: fmtPrice(badge.pricing.preseason) },
                    { label: 'In-season',     val: fmtPrice(badge.pricing.seasonal) },
                  ].map((p) => (
                    <div key={p.label} className="py-3 text-center">
                      <div className="font-black text-[#0077b6] text-lg">{p.val}</div>
                      <div className="text-[10px] text-gray-400 font-semibold">{p.label}</div>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4 space-y-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    👶 <strong>Under 12:</strong> Always free
                  </p>
                  {badge.pricing.senior !== 0 && (
                    <p className="text-xs text-gray-500">
                      👴 <strong>Seniors 65+:</strong> {fmtPrice(badge.pricing.senior)} ({badge.pricing.seniorType} badge)
                    </p>
                  )}
                  {badge.pricing.veteranDaily === 'free' && (
                    <p className="text-xs text-gray-500">
                      🎖️ <strong>Veterans:</strong> Free daily admission with valid ID
                    </p>
                  )}
                  {badge.pricing.veteranLifetime === 'free' && (
                    <p className="text-xs text-gray-500">
                      🎖️ <strong>Veterans:</strong> Free lifetime badge at badge office with proper ID
                    </p>
                  )}
                  {badge.pricing.digitalApp && (
                    <p className="text-xs text-gray-500">
                      📱 <strong>Digital:</strong> My Beach Mobile app accepted
                    </p>
                  )}
                  {badge.pricing.cashOnly && (
                    <p className="text-xs text-gray-500">
                      💵 <strong>Payment:</strong> Cash or check only at booth
                    </p>
                  )}
                  {badge.pricing.notes?.includes('NOT REQUIRED ON WEDNESDAYS') && (
                    <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 mt-2">
                      <p className="text-xs text-green-800 font-bold">
                        ⭐ Badges NOT required on Wednesdays — free beach entry all day
                      </p>
                    </div>
                  )}
                </div>

                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-500">📞 {badge.badgeOffice.phone}</p>
                  <a
                    href={badge.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0077b6] font-semibold"
                  >
                    Official source ↗
                  </a>
                </div>
              </>
            ) : (
              <div className="px-5 py-4">
                <p className="text-xs text-amber-700">
                  ⚠️ 2026 pricing not confirmed from the official website.
                  Call <strong>{badge.badgeOffice.phone}</strong> to confirm before visiting.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── LIFEGUARD SEASON ──────────────────────────────────────────── */}
        {guards && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="font-black text-gray-900">🛟 Lifeguard Season</p>
            </div>
            <div className="px-5 py-4 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Season</span>
                <span className="font-semibold text-gray-800">{guards.seasonStart} – {guards.seasonEnd}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Hours</span>
                <span className="font-semibold text-gray-800">{guards.hours}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Status now</span>
                <span className="font-semibold text-gray-800">{guards.currentStatus}</span>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                <p className="text-xs text-red-700 font-semibold">{guards.safetyNote}</p>
              </div>
              {guards.guardedBeaches.length > 0 && !guards.guardedBeaches[0].startsWith('⚠️') && (
                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-1">Guarded beaches:</p>
                  <ul className="space-y-0.5">
                    {guards.guardedBeaches.map((b, i) => (
                      <li key={i} className="text-xs text-gray-500">· {b}</li>
                    ))}
                  </ul>
                </div>
              )}
              <a
                href="https://safebeachday.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#0077b6] font-semibold block"
              >
                📡 Live conditions at safebeachday.com ↗
              </a>
            </div>
          </div>
        )}

        {/* ── BEACH RULES ───────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="font-black text-gray-900">📋 Beach Rules</p>
            {rules?.verified
              ? <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5 font-semibold">✓ Verified {new Date(rules?.sourceUrl ?? '').getFullYear() || '2026'}</span>
              : <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded-md px-2 py-0.5 font-semibold">⚠️ Partial data</span>
            }
          </div>

          {rules ? (
            <div className="divide-y divide-gray-50">
              {RULE_ROWS.map(({ key, icon, label }) => {
                const rule = rules.rules[key as keyof typeof rules.rules] as { allowed?: boolean | null; note?: string; seasonalRestriction?: string; dogBeach?: string } | undefined
                if (!rule) return null
                const note = rule.seasonalRestriction ?? rule.dogBeach ?? rule.note
                const isVerify = !note || note.startsWith('⚠️')
                if (isVerify && !rules.verified) return null
                return (
                  <div key={key} className="px-5 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-base">{icon}</span>
                        <span className="text-xs font-semibold text-gray-700">{label}</span>
                      </div>
                      <AllowedChip allowed={'allowed' in rule ? rule.allowed : undefined} note={note} />
                    </div>
                    {note && !note.startsWith('⚠️') && (
                      <p className="text-xs text-gray-400 mt-1 ml-6 leading-relaxed">{note}</p>
                    )}
                  </div>
                )
              })}

              {rules.additionalNotes && !rules.additionalNotes.startsWith('⚠️') && (
                <div className="px-5 py-3 bg-gray-50">
                  <p className="text-xs text-gray-500 leading-relaxed">{rules.additionalNotes}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="px-5 py-4">
              <p className="text-xs text-gray-400">
                Full beach rules for {displayName} need field research.
                Check the town's official website for current rules.
              </p>
            </div>
          )}

          {rules?.sourceUrl && (
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
              <a
                href={rules.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#0077b6] font-semibold"
              >
                Full rules at official source ↗
              </a>
            </div>
          )}
        </div>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────────── */}
        {(accessible.length > 0 || transport.length > 0) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="font-black text-gray-900">♿ Accessible Beach Options</p>
            </div>
            <div className="divide-y divide-gray-50">
              {accessible.map((a, i) => (
                <div key={i} className="px-5 py-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-bold text-gray-800">{a.beach}</p>
                    <div className="flex gap-1 ml-2">
                      {a.mobiMat && (
                        <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 rounded-md px-1.5 py-0.5 font-semibold">
                          Mobi-mat
                        </span>
                      )}
                      {a.wheelchairLoan && (
                        <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 rounded-md px-1.5 py-0.5 font-semibold">
                          Beach wheel
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{a.notes}</p>
                  {a.contact && (
                    <a href={`tel:${a.contact}`} className="text-xs text-[#0077b6] font-semibold">
                      📞 {a.contact}
                    </a>
                  )}
                </div>
              ))}

              {transport.map((t, i) => (
                <div key={i} className="px-5 py-4 bg-blue-50">
                  <p className="text-sm font-bold text-blue-800">{t.name}</p>
                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">{t.description}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Season: {t.season} · {t.free ? 'Free' : 'Fee applies'}
                  </p>
                  <a href={`tel:${t.contact}`} className="text-xs text-[#0077b6] font-semibold mt-1 block">
                    📞 {t.contact}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MOBI-MAT STREETS ──────────────────────────────────────────── */}
        {beach.mobiMatStreets && beach.mobiMatStreets.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-2xl px-5 py-4">
            <p className="text-sm font-bold text-purple-800 mb-2">
              ♿ Mobi-Mat Beach Access Streets
            </p>
            <div className="flex flex-wrap gap-1.5">
              {beach.mobiMatStreets.map(s => (
                <span
                  key={s}
                  className="text-[10px] bg-white border border-purple-200 rounded-md px-2 py-0.5 text-purple-700 font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Dog rules reminder */}
        {beach.dogRules && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3">
            <p className="text-xs text-gray-600">
              🐕 <strong>Dog rules:</strong> {beach.dogRules}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
