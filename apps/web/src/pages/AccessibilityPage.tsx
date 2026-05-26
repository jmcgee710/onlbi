import { useState } from 'react'
import { accessibleBeaches, beachTransportServices, restrooms } from '../data/accessibility'

type Tab = 'access' | 'transport' | 'restrooms'

// Group beach access entries by town
const byTown = accessibleBeaches.reduce<Record<string, typeof accessibleBeaches>>((acc, b) => {
  if (!acc[b.town]) acc[b.town] = []
  acc[b.town].push(b)
  return acc
}, {})

const TRANSPORT_ICONS: Record<string, string> = {
  taxi:  '🚐',
  tram:  '🚌',
  gator: '🚜',
  utv:   '🏍️',
}

export default function AccessibilityPage() {
  const [tab, setTab]               = useState<Tab>('access')
  const [filterMat, setFilterMat]   = useState(false)
  const [filterWC, setFilterWC]     = useState(false)

  const filteredBeaches = accessibleBeaches.filter(b => {
    if (filterMat && !b.mobiMat)        return false
    if (filterWC  && !b.wheelchairLoan) return false
    return true
  })

  // Re-group filtered results by town
  const filteredByTown = filteredBeaches.reduce<Record<string, typeof accessibleBeaches>>((acc, b) => {
    if (!acc[b.town]) acc[b.town] = []
    acc[b.town].push(b)
    return acc
  }, {})

  return (
    <div>
      {/* Header */}
      <div className="bg-[#7c3aed] px-5 py-5 md:px-8">
        <h1 className="text-2xl font-black text-white mb-1">♿ Accessibility</h1>
        <p className="text-sm text-white/70">
          Beach mats · wheelchair loans · free beach transport · restrooms
        </p>
      </div>

      {/* Tab switcher */}
      <div className="bg-white border-b border-gray-200 px-5 md:px-8">
        <div className="flex gap-0">
          {([
            ['access',    '🏖️ Beach Access'],
            ['transport', '🚐 Transport'],
            ['restrooms', '🚻 Restrooms'],
          ] as [Tab, string][]).map(([t, l]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                tab === t
                  ? 'border-[#7c3aed] text-[#7c3aed]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-5">

        {/* ── BEACH ACCESS ────────────────────────────────────────────── */}
        {tab === 'access' && (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2 space-y-4">

              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-purple-800 mb-1">
                  ℹ️ How It Works
                </p>
                <p className="text-xs text-purple-700 leading-relaxed">
                  <strong>Mobi-mats</strong> provide a firm surface from the dune to the water's edge —
                  great for wheelchairs, walkers, and strollers.{' '}
                  <strong>Beach wheelchair loans</strong> are typically free and available by reservation.
                  Call ahead on peak summer weekends. Also check the Transport tab for free taxi and
                  tram services that drive you right to the beach.
                </p>
              </div>

              {/* Filters */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilterMat(!filterMat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    filterMat ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'bg-white text-gray-500 border-gray-200'
                  }`}
                >
                  🛤️ Mobi-Mat
                </button>
                <button
                  onClick={() => setFilterWC(!filterWC)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    filterWC ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'bg-white text-gray-500 border-gray-200'
                  }`}
                >
                  ♿ Wheelchair Loan
                </button>
              </div>

              {/* Grouped by town */}
              {Object.entries(filteredByTown).map(([town, entries]) => (
                <div key={town}>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 mt-2">
                    {town}
                  </p>
                  <div className="space-y-3">
                    {entries.map((b, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-black text-gray-900">{b.beach}</p>
                          {b.hcParking && (
                            <span className="text-[10px] bg-blue-50 text-[#0077b6] font-bold rounded-md px-2 py-0.5 flex-shrink-0 ml-2">
                              🚗 HC Parking
                            </span>
                          )}
                        </div>

                        <div className="flex gap-1.5 flex-wrap mb-3">
                          {b.mobiMat ? (
                            <span className="text-[10px] font-semibold rounded-md px-2 py-0.5 border bg-purple-50 text-purple-700 border-purple-200">
                              🛤️ Mobi-Mat
                            </span>
                          ) : null}
                          {b.wheelchairLoan ? (
                            <span className="text-[10px] font-semibold rounded-md px-2 py-0.5 border bg-green-50 text-green-700 border-green-200">
                              ♿ Wheelchair Loan
                            </span>
                          ) : null}
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed">{b.notes}</p>

                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
                          <a
                            href={`tel:${b.contact}`}
                            className="text-xs text-[#7c3aed] font-semibold"
                          >
                            📞 {b.contact}
                          </a>
                          {b.sourceUrl && (
                            <a
                              href={b.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gray-400 hover:text-[#7c3aed] font-semibold"
                            >
                              Official source ↗
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredBeaches.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-3xl mb-2">♿</p>
                  <p className="font-semibold">No results for those filters</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="hidden md:block space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">📊 Island Summary</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Mobi-mat locations</span>
                    <span className="font-black text-purple-700">
                      {accessibleBeaches.filter(b => b.mobiMat).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Wheelchair loan programs</span>
                    <span className="font-black text-green-600">
                      {accessibleBeaches.filter(b => b.wheelchairLoan).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">HC parking locations</span>
                    <span className="font-black text-[#0077b6]">
                      {accessibleBeaches.filter(b => b.hcParking).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Towns covered</span>
                    <span className="font-black text-gray-700">
                      {Object.keys(byTown).length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-purple-800 mb-1">📋 Planning Tips</p>
                <ul className="space-y-1.5 text-xs text-purple-700 leading-relaxed">
                  <li>• Call ahead — most programs require reservations</li>
                  <li>• Mobi-mats are seasonal (Memorial – Labor Day)</li>
                  <li>• HC parking is usually unrestricted near access points</li>
                  <li>• Low tide = firmer sand = easier wheelchair access</li>
                  <li>• Free transport services — see the Transport tab</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── TRANSPORT ───────────────────────────────────────────────── */}
        {tab === 'transport' && (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2 space-y-4">

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-blue-800 mb-1">
                  🎉 All transport services listed here are FREE
                </p>
                <p className="text-xs text-blue-700 leading-relaxed">
                  LBI towns operate several free accessible transport programs so visitors who
                  can't walk to the beach can still get there. Most require a valid beach badge
                  and are available during the summer season.
                </p>
              </div>

              {beachTransportServices.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{TRANSPORT_ICONS[t.type] ?? '🚐'}</span>
                        <div>
                          <p className="font-black text-gray-900">{t.name}</p>
                          <p className="text-xs text-gray-400">{t.town}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5 font-bold flex-shrink-0 ml-2">
                        FREE
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-5 py-4 space-y-3">
                    <p className="text-xs text-gray-600 leading-relaxed">{t.description}</p>

                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Season</span>
                      <span className="font-semibold text-gray-700">{t.season}</span>
                    </div>

                    {t.beachDropoffs.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1.5">Beach drop-offs:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {t.beachDropoffs.map((d, j) => (
                            <span
                              key={j}
                              className="text-[10px] bg-blue-50 text-[#0077b6] rounded-md px-2 py-0.5 font-semibold"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <a
                      href={`tel:${t.contact}`}
                      className="text-xs text-[#7c3aed] font-semibold"
                    >
                      📞 {t.contact}
                    </a>
                    <a
                      href={t.moreInfo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-[#7c3aed] font-semibold"
                    >
                      More info ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="hidden md:block space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">🗺️ Town Coverage</p>
                <div className="space-y-2 text-xs">
                  {beachTransportServices.map(t => (
                    <div key={t.name} className="flex items-center gap-2">
                      <span>{TRANSPORT_ICONS[t.type] ?? '🚐'}</span>
                      <span className="text-gray-700 font-semibold">{t.town}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-purple-800 mb-1">⭐ Pro Tip</p>
                <p className="text-xs text-purple-700 leading-relaxed">
                  Long Beach Township's Beach Gator program is one of the largest accessible beach
                  transport programs in the entire US — running since 1992 with 6 vehicles covering
                  7+ communities from Loveladies to Holgate.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── RESTROOMS ───────────────────────────────────────────────── */}
        {tab === 'restrooms' && (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2 space-y-4">

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-amber-800">⚠️ Limited Data</p>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                  Only Beach Haven restrooms are verified as of May 2026. Other towns need
                  field research. Know a public restroom we're missing?{' '}
                  <strong>We want to add it.</strong>
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Verified',   value: restrooms.filter(r => r.verified).length, color: 'text-green-600' },
                  { label: 'Accessible', value: restrooms.filter(r => r.accessible).length, color: 'text-purple-600' },
                  { label: 'Showers',    value: restrooms.filter(r => r.showers).length, color: 'text-[#0077b6]' },
                  { label: 'Changing',   value: restrooms.filter(r => r.changing).length, color: 'text-teal-600' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center">
                    <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-gray-400 font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {restrooms.map((r, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{r.name}</p>
                        <p className="text-xs text-gray-400">{r.town} · {r.hours}</p>
                      </div>
                      <div className="flex gap-1 items-center ml-2">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                          r.condition === 'good' ? 'bg-green-500' : r.condition === 'fair' ? 'bg-amber-400' : 'bg-red-500'
                        }`} />
                        {r.verified && (
                          <span className="text-[9px] text-green-600 font-bold">Verified</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1.5 flex-wrap mb-2">
                      {[
                        ['👶 Changing', r.changing],
                        ['♿ Accessible', r.accessible],
                        ['🚿 Showers', r.showers],
                        ['🏠 Enclosed', r.enclosed],
                      ].map(([l, v], j) => (
                        <span
                          key={j}
                          className={`text-[10px] font-semibold rounded-md px-2 py-0.5 border ${
                            v
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-gray-50 text-gray-400 border-gray-200'
                          }`}
                        >
                          {v ? '✓' : '–'} {l}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-400 italic">💬 {r.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-2">📋 Quick Tips</p>
                <ul className="space-y-1.5 text-xs text-gray-600 leading-relaxed">
                  <li>• Most beach towns have restrooms at main beach entrances</li>
                  <li>• Rinse stations (outdoor showers) are common at mobi-mat access points</li>
                  <li>• Restaurants along Long Beach Blvd are generally public-friendly</li>
                  <li>• Wawa (Ship Bottom + LBT) has clean restrooms — open 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
