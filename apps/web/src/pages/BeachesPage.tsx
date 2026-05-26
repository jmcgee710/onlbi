import { useState } from 'react'
import { Link } from 'react-router-dom'
import { beaches } from '../data/beaches'
import { beachBadgeInfo } from '../data/beachBadges'

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function fmtPrice(n: number | 'free' | undefined): string {
  if (!n || n === 0) return '⚠️ call'
  if (n === 'free') return 'Free'
  return `$${n}`
}

type BadgeTab = 'conditions' | 'badges' | 'weather'

export default function BeachesPage() {
  const [tab, setTab] = useState<BadgeTab>('conditions')
  const [lifeguardOnly, setLifeguardOnly] = useState(false)
  const [accessibleOnly, setAccessibleOnly] = useState(false)

  const filtered = beaches.filter(b => {
    if (lifeguardOnly && !b.lifeguarded) return false
    if (accessibleOnly && !b.mobiMatStreets?.length) return false
    return true
  })

  return (
    <div>
      {/* Header */}
      <div className="bg-[#0d1b2a] px-5 py-5 md:px-8">
        <h1 className="text-2xl font-black text-white mb-1">🏖️ Beaches</h1>
        <p className="text-sm text-white/60">
          {beaches.length} towns · beach conditions, rules & 2026 badge prices
        </p>
      </div>

      {/* Tab switcher */}
      <div className="bg-white border-b border-gray-200 px-5 md:px-8">
        <div className="flex gap-0">
          {([
            ['conditions', '🏖️ Conditions'],
            ['badges',     '🎫 Badge Prices'],
            ['weather',    '🌤️ Weather'],
          ] as [BadgeTab, string][]).map(([t, l]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                tab === t
                  ? 'border-[#0077b6] text-[#0077b6]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-5">

        {/* ── CONDITIONS ──────────────────────────────────────────────── */}
        {tab === 'conditions' && (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2 space-y-4">

              {/* Rip current callout — static / conservative */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-amber-800">
                  🌊 Rip Current Safety
                </p>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                  Always swim near a lifeguard stand. If caught in a rip, swim parallel to shore —
                  never fight it straight toward shore. Check{' '}
                  <a
                    href="https://safebeachday.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline"
                  >
                    safebeachday.com
                  </a>{' '}
                  for today's conditions before entering the water.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setLifeguardOnly(!lifeguardOnly)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    lifeguardOnly
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-500 border-gray-200'
                  }`}
                >
                  🛟 Lifeguarded
                </button>
                <button
                  onClick={() => setAccessibleOnly(!accessibleOnly)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    accessibleOnly
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-500 border-gray-200'
                  }`}
                >
                  ♿ Accessible
                </button>
              </div>

              {/* Beach cards */}
              <div className="space-y-3">
                {filtered.map(b => (
                  <Link
                    key={b.townSlug}
                    to={`/beaches/${b.townSlug}`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:border-[#0077b6] transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-black text-gray-900">{b.name}</h3>
                          {b.highlight && (
                            <p className="text-xs text-[#0077b6] mt-0.5">{b.highlight}</p>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-semibold mt-1">
                          Tap for details →
                        </span>
                      </div>

                      <div className="flex gap-1.5 flex-wrap">
                        {b.lifeguarded && (
                          <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5 font-semibold">
                            🛟 Guarded {b.lifeguardHours}
                          </span>
                        )}
                        {b.badgeRequired && (
                          <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded-md px-2 py-0.5 font-semibold">
                            🎫 Badge required 12+
                          </span>
                        )}
                        {b.beachTram && (
                          <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 rounded-md px-2 py-0.5 font-semibold">
                            🚐 Beach Tram
                          </span>
                        )}
                        {b.bayBeach && (
                          <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-100 rounded-md px-2 py-0.5 font-semibold">
                            ⚓ Bay Beach
                          </span>
                        )}
                        {b.mobiMatStreets?.length ? (
                          <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 rounded-md px-2 py-0.5 font-semibold">
                            ♿ Mobi-mat access
                          </span>
                        ) : null}
                        {b.noFreeDay && (
                          <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5 font-semibold">
                            ⭐ {b.noFreeDay}
                          </span>
                        )}
                      </div>

                      {b.dogRules && (
                        <p className="text-xs text-gray-400 mt-2">🐕 {b.dogRules}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="hidden md:block space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-blue-800 mb-1">🎫 Badges</p>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Each town controls its own badge program. Prices and purchase methods
                  vary. See the Badges tab for 2026 pricing across all towns.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-2">🏊 Swim Safety</p>
                <ul className="space-y-1.5 text-xs text-gray-600 leading-relaxed">
                  <li>• Always swim near a lifeguard stand</li>
                  <li>• If caught in a rip, swim parallel to shore</li>
                  <li>• Lifeguard season: mid-June – Labor Day</li>
                  <li>• Keep children within arm's reach</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── BADGE PRICES ────────────────────────────────────────────── */}
        {tab === 'badges' && (
          <div className="space-y-4">

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <p className="text-sm font-bold text-blue-800">🎫 2026 Beach Badge Prices · Verified May 2026</p>
              <p className="text-xs text-blue-700 mt-1">
                Each LBI municipality runs its own badge program — there's no island-wide badge.
                Prices below are verified from official town websites. Children under 12 are always free.
              </p>
            </div>

            {/* Badge cards per town */}
            <div className="space-y-4">
              {beachBadgeInfo.map(t => (
                <div
                  key={t.townSlug}
                  className={`bg-white rounded-2xl shadow-sm border p-5 ${
                    t.needsVerification ? 'border-amber-200' : 'border-gray-100'
                  }`}
                >
                  {/* Town header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black text-gray-900 text-lg">{t.townName}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{t.badgeScopeNote}</p>
                    </div>
                    {t.needsVerification && (
                      <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded-md px-2 py-0.5 font-bold flex-shrink-0 ml-2">
                        ⚠️ Verify 2026
                      </span>
                    )}
                  </div>

                  {/* Price grid */}
                  {t.pricing.daily > 0 ? (
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[
                        { label: 'Daily',   val: fmtPrice(t.pricing.daily) },
                        { label: 'Weekly',  val: fmtPrice(t.pricing.weekly) },
                        { label: 'Season',  val: fmtPrice(t.pricing.preseason), sub: 'pre-season' },
                        { label: 'Season',  val: fmtPrice(t.pricing.seasonal),  sub: 'in-season' },
                      ].map((p, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                          <div className="font-black text-[#0077b6] text-lg">{p.val}</div>
                          <div className="text-[10px] text-gray-500 font-semibold">{p.label}</div>
                          {p.sub && <div className="text-[9px] text-gray-400">{p.sub}</div>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                      <p className="text-xs text-amber-800 font-semibold">
                        ⚠️ Pricing not confirmed for 2026 — call to verify before visiting.
                      </p>
                    </div>
                  )}

                  {/* Perks & special cases */}
                  <div className="space-y-2 mb-4">
                    {/* Free day */}
                    {t.pricing.notes?.includes('NOT REQUIRED ON WEDNESDAYS') && (
                      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                        <span className="text-base">⭐</span>
                        <p className="text-xs text-green-800 font-bold">
                          FREE ENTRY WEDNESDAYS — badges not required in Beach Haven
                        </p>
                      </div>
                    )}

                    {/* Senior */}
                    {t.pricing.senior !== 0 && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>👴</span>
                        <span>
                          Senior 65+: {fmtPrice(t.pricing.senior)} ({t.pricing.seniorType} badge)
                        </span>
                      </div>
                    )}

                    {/* Veteran */}
                    {t.pricing.veteranDaily === 'free' && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>🎖️</span>
                        <span>Veterans: Free daily admission with valid ID</span>
                      </div>
                    )}
                    {t.pricing.veteranLifetime === 'free' && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>🎖️</span>
                        <span>Veterans: Free lifetime badge with proper ID (badge office only)</span>
                      </div>
                    )}

                    {/* Digital app */}
                    {t.pricing.digitalApp && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>📱</span>
                        <span>My Beach Mobile app accepted</span>
                      </div>
                    )}

                    {/* Cash only */}
                    {t.pricing.cashOnly && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>💵</span>
                        <span>Cash or check only at booth · Credit cards at office</span>
                      </div>
                    )}
                  </div>

                  {/* Contact + source */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex gap-4">
                      <a
                        href={`tel:${t.badgeOffice.phone}`}
                        className="text-xs text-[#0077b6] font-semibold"
                      >
                        📞 {t.badgeOffice.phone}
                      </a>
                    </div>
                    <a
                      href={t.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-[#0077b6] font-semibold"
                    >
                      Official source ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Under-12 callout */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <p className="text-sm font-bold text-green-800 mb-1">👶 Children Under 12: Always Free</p>
              <p className="text-xs text-green-700 leading-relaxed">
                All LBI towns require badges starting at age 12. Under 12 is free everywhere on the island.
              </p>
            </div>
          </div>
        )}

        {/* ── WEATHER (kept from original, mock data) ──────────────────── */}
        {tab === 'weather' && (
          <div className="md:grid md:grid-cols-2 md:gap-6 space-y-4 md:space-y-0">
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">🌊 Bay vs. Ocean</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Ocean Side', icon: '🌊', wave: 'See Today page', wind: 'See Today page', swim: 'Varies', color: 'blue' },
                    { name: 'Bay Side',   icon: '⚓', wave: 'Generally calm', wind: 'Lighter',         swim: 'Calmer',  color: 'teal' },
                  ].map(side => (
                    <div
                      key={side.name}
                      className={`rounded-xl p-3 ${
                        side.color === 'blue'
                          ? 'bg-blue-50 border border-blue-100'
                          : 'bg-teal-50 border border-teal-100'
                      }`}
                    >
                      <div className="text-lg mb-1">{side.icon}</div>
                      <p
                        className={`text-xs font-black mb-2 ${
                          side.color === 'blue' ? 'text-[#0077b6]' : 'text-teal-700'
                        }`}
                      >
                        {side.name}
                      </p>
                      {[
                        ['🌊', 'Waves', side.wave],
                        ['💨', 'Wind', side.wind],
                        ['🏊', 'Swim', side.swim],
                      ].map(([ic, l, v]) => (
                        <div key={l} className="flex justify-between text-[10px] mb-1">
                          <span className="text-gray-400">{ic} {l}</span>
                          <span className="font-bold text-gray-700">{v}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-amber-800 mb-1">☀️ UV Safety</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['SPF 30+ recommended', 'Reapply every 2 hours', 'Seek shade 11 AM–3 PM', 'Sunglasses & hat'].map(t => (
                    <span
                      key={t}
                      className="text-[10px] bg-white border border-amber-200 rounded-md px-2 py-0.5 text-amber-700 font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-sm font-bold text-gray-800 mb-3">📋 Beach Quick Reference</p>
              <div className="space-y-3 text-xs text-gray-600">
                <p className="font-bold text-gray-800">Lifeguard Season</p>
                <p>Mid-June – Labor Day · 10am–5pm daily (varies by town)</p>
                <p className="font-bold text-gray-800 mt-2">Badge Season</p>
                <p>Required when badge checkers are on duty. Varies by town — see Badges tab.</p>
                <p className="font-bold text-gray-800 mt-2">No Swimming Without Lifeguards</p>
                <p>Before lifeguard season, there are no guards on duty. Swim at your own risk.</p>
                <p className="font-bold text-gray-800 mt-2">Live Conditions</p>
                <a
                  href="https://safebeachday.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0077b6] font-bold"
                >
                  safebeachday.com ↗
                </a>
                {' '}· Select NJ → Ocean County
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
