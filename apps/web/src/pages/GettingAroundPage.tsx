import { useState } from 'react'
import { shuttleRoutes, cameras, parkingLots, trafficStatus } from '../data/gettingAround'

type Tab = 'transit' | 'traffic' | 'parking' | 'cams'

function parkingColor(avail: number, cap: number) {
  const pct = avail / cap
  if (avail === 0) return { bar: 'bg-red-500', text: 'text-red-600', label: 'FULL' }
  if (pct < 0.2)  return { bar: 'bg-amber-400', text: 'text-amber-600', label: `${avail} left` }
  return              { bar: 'bg-green-500', text: 'text-green-600', label: `${avail} open` }
}

export default function GettingAroundPage() {
  const [tab, setTab] = useState<Tab>('transit')

  return (
    <div>
      {/* Header */}
      <div className="bg-[#0d1b2a] px-5 py-5 md:px-8">
        <h1 className="text-2xl font-black text-white mb-1">🚌 Getting Around</h1>
        <p className="text-sm text-white/60">Transit, traffic, parking & live cams</p>
      </div>

      {/* Tab switcher */}
      <div className="bg-white border-b border-gray-200 px-5 md:px-8">
        <div className="flex gap-1 overflow-x-auto">
          {([['transit', '🚌 Transit'], ['traffic', '🚗 Traffic'], ['parking', '🅿️ Parking'], ['cams', '📷 Cams']] as [Tab, string][]).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`py-3 px-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${tab === k ? 'border-[#0077b6] text-[#0077b6]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-5">

        {/* TRANSIT */}
        {tab === 'transit' && (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-[#0077b6]">🎟️ LBI Beach Shuttle</p>
                <p className="text-xs text-blue-700 mt-1">Memorial Day – Labor Day · Day passes available at kiosks · $2/ride or $8 day pass</p>
              </div>
              {shuttleRoutes.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                  <p className="font-black text-gray-900 mb-1">{r.route}</p>
                  <p className="text-xs text-gray-400 mb-3">🔄 {r.freq} · First: {r.firstRun} · Last: {r.lastRun} · {r.fare}</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {r.stops.map((s, j) => (
                      <div key={j} className="flex items-center gap-1">
                        <span className="bg-blue-50 text-[#0077b6] text-[10px] font-bold rounded-lg px-2 py-1">{s}</span>
                        {j < r.stops.length - 1 && <span className="text-gray-300 text-xs">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-gray-700 mb-1">🚲 Bike Path</p>
                <p className="text-xs text-gray-500 leading-relaxed">The LBI bike path runs 18 miles from Barnegat Light to Holgate along the bay side. Open year-round. Rentals available at multiple locations.</p>
              </div>
            </div>
            <div className="hidden md:block space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">📋 Quick Reference</p>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between"><span>Day pass</span><span className="font-bold">$8</span></div>
                  <div className="flex justify-between"><span>Single ride</span><span className="font-bold">$2</span></div>
                  <div className="flex justify-between"><span>Season</span><span className="font-bold">Memorial – Labor Day</span></div>
                  <div className="flex justify-between"><span>Routes</span><span className="font-bold">{shuttleRoutes.length} active</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRAFFIC */}
        {tab === 'traffic' && (
          <div className="md:grid md:grid-cols-2 md:gap-6 space-y-4 md:space-y-0">
            <div className="space-y-4">
              {/* Causeway status */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-black text-gray-900">Route 72 Causeway</p>
                    <p className="text-xs text-gray-400">Manahawkin Bay Bridge</p>
                  </div>
                  <span className="text-xs bg-amber-50 text-amber-700 font-bold rounded-full px-3 py-1">Moderate</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
                  <p className="text-xs font-semibold text-amber-800">⏱ Estimated Wait: {trafficStatus.causeway.wait}</p>
                  <p className="text-xs text-amber-700 mt-1">{trafficStatus.rt72}</p>
                </div>
                <p className="text-[10px] text-gray-400">Updated {trafficStatus.causeway.updated} · Powered by NJ511</p>
              </div>

              {/* Peak times */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">📅 Expected Peak Times</p>
                <div className="space-y-2">
                  {[
                    { day: 'Friday',   dir: 'Eastbound (to LBI)', time: '2 PM – 8 PM',  level: 'Heavy' },
                    { day: 'Saturday', dir: 'Both directions',     time: '10 AM – 2 PM', level: 'Moderate' },
                    { day: 'Sunday',   dir: 'Westbound (from LBI)',time: '2 PM – 7 PM',  level: 'Heavy' },
                    { day: 'Monday',   dir: 'Westbound (from LBI)',time: '12 PM – 5 PM', level: 'Moderate' },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-xs font-bold text-gray-800">{t.day}</p>
                        <p className="text-[10px] text-gray-400">{t.dir} · {t.time}</p>
                      </div>
                      <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${t.level === 'Heavy' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>{t.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">🛣️ Alternate Routes</p>
                <div className="space-y-3">
                  {[
                    { name: 'Route 539 North', desc: 'Via Tuckerton — adds ~15 min but avoids bridge backup', tag: 'Best alternate' },
                    { name: 'Early Morning',   desc: 'Before 9 AM on summer weekends — typically under 5 min wait', tag: 'Recommended' },
                    { name: 'Route 9 South',   desc: 'Via Little Egg Harbor — longer but sometimes faster on peak Saturdays', tag: 'Option' },
                  ].map((r, i) => (
                    <div key={i} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-gray-800">{r.name}</p>
                        <span className="text-[9px] bg-blue-50 text-[#0077b6] font-bold rounded px-1.5 py-0.5">{r.tag}</span>
                      </div>
                      <p className="text-xs text-gray-500">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PARKING */}
        {tab === 'parking' && (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2 space-y-3">
              <p className="text-xs text-gray-400 mb-2">Estimates updated every 30 min · No live sensors — based on historical patterns</p>
              {parkingLots.map((p, i) => {
                const { bar, text, label } = parkingColor(p.avail, p.cap)
                const pct = Math.round((1 - p.avail / p.cap) * 100)
                return (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-bold text-gray-800">{p.loc}</p>
                      <span className={`text-xs font-black ${text}`}>{label}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full transition-all ${bar}`} style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-[10px] text-gray-400">{p.avail}/{p.cap} spots available</p>
                  </div>
                )
              })}
            </div>
            <div className="hidden md:block space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">🅿️ Parking Tips</p>
                <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
                  <li>• Arrive before 9 AM on weekends for best availability</li>
                  <li>• Bay side streets often have spots when beach lots fill</li>
                  <li>• Beach Haven has the most lots — also the most competition</li>
                  <li>• Barnegat Light State Park rarely fills on weekdays</li>
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-amber-800 mb-1">💡 Badge Parking</p>
                <p className="text-xs text-amber-700 leading-relaxed">Many beach lots require a beach badge to park. Check signage. Some HC spots are unrestricted.</p>
              </div>
            </div>
          </div>
        )}

        {/* CAMS */}
        {tab === 'cams' && (
          <div>
            <p className="text-xs text-gray-400 mb-4">{cameras.filter(c => c.status === 'live').length} of {cameras.length} cameras online</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cameras.map((cam, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden shadow-sm ${cam.status === 'live' ? 'bg-[#0d1b2a]' : 'bg-gray-100'}`}>
                  <div className="h-24 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl">{cam.status === 'live' ? '🔴' : '⚫'}</div>
                      <p className={`text-[9px] font-black mt-1 tracking-widest ${cam.status === 'live' ? 'text-white' : 'text-gray-400'}`}>
                        {cam.status === 'live' ? 'LIVE' : 'OFFLINE'}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-2 ${cam.status === 'live' ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-bold leading-tight ${cam.status === 'live' ? 'text-white' : 'text-gray-700'}`}>{cam.name}</p>
                    <p className={`text-[10px] mt-0.5 ${cam.status === 'live' ? 'text-white/50' : 'text-gray-400'}`}>{cam.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
