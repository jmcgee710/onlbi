import { useState } from 'react'
import { restaurants, happyHours } from '../data/eats'

const CATS = ['All', 'Seafood', 'Bar & Grill', 'Breakfast', 'Italian', 'Raw Bar', 'Casual']
const TOWNS = ['All', 'Beach Haven', 'Surf City', 'Ship Bottom', 'Harvey Cedars', 'Barnegat Light']
const HH_TAGS = ['All', 'Drafts', 'Cocktails', 'Oysters', 'Food', 'Wine', 'Seafood', 'Live Music']

const activeCount = happyHours.filter(h => h.status === 'active').length

function statusStyle(s: string) {
  if (s === 'active')   return { pill: 'bg-green-50 text-green-700',   dot: 'bg-green-500' }
  if (s === 'upcoming') return { pill: 'bg-amber-50 text-amber-700',   dot: 'bg-amber-400' }
  return                       { pill: 'bg-gray-100 text-gray-400',    dot: 'bg-gray-300' }
}

export default function EatPage() {
  const [tab, setTab] = useState<'eats' | 'hh'>('eats')
  const [catFilter, setCatFilter] = useState('All')
  const [openOnly, setOpenOnly] = useState(false)
  const [townFilter, setTownFilter] = useState('All')
  const [tagFilter, setTagFilter] = useState('All')
  const [expandedHH, setExpandedHH] = useState<number | null>(null)

  const filteredEats = restaurants.filter(r => {
    if (openOnly && !r.open) return false
    if (catFilter !== 'All' && r.cat !== catFilter) return false
    return true
  })

  const filteredHH = happyHours.filter(h => {
    if (townFilter !== 'All' && h.town !== townFilter) return false
    if (tagFilter !== 'All' && !h.tags.includes(tagFilter)) return false
    return true
  })

  return (
    <div>
      {/* Header */}
      <div className="bg-[#e76f51] px-5 py-5 md:px-8">
        <h1 className="text-2xl font-black text-white mb-1">🍽️ Eat & Drink</h1>
        <p className="text-sm text-white/70">Restaurants, bars & happy hour on LBI</p>
      </div>

      {/* Tab switcher */}
      <div className="bg-white border-b border-gray-200 px-5 md:px-8">
        <div className="flex gap-6">
          <button
            onClick={() => setTab('eats')}
            className={`py-3 text-sm font-bold border-b-2 transition-colors ${tab === 'eats' ? 'border-[#e76f51] text-[#e76f51]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            🍽️ Restaurants
          </button>
          <button
            onClick={() => setTab('hh')}
            className={`py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${tab === 'hh' ? 'border-[#e76f51] text-[#e76f51]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            🍹 Happy Hour
            {activeCount > 0 && (
              <span className="text-[10px] bg-[#e76f51] text-white rounded-full px-1.5 py-0.5 font-black">{activeCount} live</span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-5">

        {/* RESTAURANTS TAB */}
        {tab === 'eats' && (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2 space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 items-center">
                <button
                  onClick={() => setOpenOnly(!openOnly)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${openOnly ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-500 border-gray-200'}`}
                >
                  🟢 Open Now
                </button>
                {CATS.map(c => (
                  <button
                    key={c}
                    onClick={() => setCatFilter(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${catFilter === c ? 'bg-[#e76f51] text-white border-[#e76f51]' : 'bg-white text-gray-500 border-gray-200'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-400">Live wait times updated by staff</p>

              {/* Restaurant cards */}
              <div className="space-y-3">
                {filteredEats.map((r, i) => (
                  <div key={i} className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 ${!r.open ? 'opacity-60' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 items-center">
                        <span className="text-2xl">{r.icon}</span>
                        <div>
                          <p className="font-black text-gray-900">{r.name}</p>
                          <p className="text-xs text-gray-400">{r.town} · {r.cat} · {r.price}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        {r.open
                          ? <span className="text-xs bg-green-50 text-green-700 rounded-lg px-2 py-1 font-bold block">⏱ {r.wait}</span>
                          : <span className="text-xs bg-red-50 text-red-700 rounded-lg px-2 py-1 font-bold block">Closed</span>
                        }
                        <p className="text-xs text-amber-500 font-bold mt-1.5">★ {r.rating}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 italic">💡 {r.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:block space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">🍹 Happy Hour Now</p>
                {happyHours.filter(h => h.status === 'active').map(h => (
                  <div key={h.id} className="mb-3 pb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                    <p className="text-sm font-bold text-gray-900">{h.emoji} {h.name}</p>
                    <p className="text-xs text-gray-400">{h.town} · {h.hours}</p>
                    <p className="text-xs text-green-600 font-semibold mt-1">{h.closesIn}</p>
                  </div>
                ))}
                {activeCount === 0 && <p className="text-xs text-gray-400">No happy hours active right now.</p>}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-amber-800 mb-1">🎟️ BYOB Guide</p>
                <p className="text-xs text-amber-700 leading-relaxed">Many LBI restaurants are BYOB — look for the note on each listing. Kubel's and Stefano's are classics. Always call ahead to confirm.</p>
              </div>
            </div>
          </div>
        )}

        {/* HAPPY HOUR TAB */}
        {tab === 'hh' && (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2 space-y-4">
              {/* Filters */}
              <div className="space-y-2">
                <div className="flex gap-2 flex-wrap">
                  {TOWNS.map(t => (
                    <button key={t} onClick={() => setTownFilter(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${townFilter === t ? 'bg-[#e76f51] text-white border-[#e76f51]' : 'bg-white text-gray-500 border-gray-200'}`}>
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {HH_TAGS.map(t => (
                    <button key={t} onClick={() => setTagFilter(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${tagFilter === t ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* HH cards */}
              <div className="space-y-3">
                {filteredHH.map(h => {
                  const st = statusStyle(h.status)
                  const isExpanded = expandedHH === h.id
                  return (
                    <div key={h.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex gap-3 items-center">
                            <span className="text-2xl">{h.emoji}</span>
                            <div>
                              <p className="font-black text-gray-900">{h.name}</p>
                              <p className="text-xs text-gray-400">{h.town} · {h.price} · {h.hours}</p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 flex-shrink-0 ml-2 ${st.pill}`}>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${st.dot}`} />
                            {h.status === 'active' ? h.closesIn : h.status === 'upcoming' ? h.opensIn : h.opensIn}
                          </span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap mb-3">
                          {h.deals.slice(0, 2).map((d, i) => (
                            <span key={i} className="text-[10px] bg-orange-50 text-orange-700 rounded-md px-2 py-0.5 font-semibold">{d}</span>
                          ))}
                          {h.deals.length > 2 && !isExpanded && (
                            <span className="text-[10px] text-gray-400 px-1 self-center">+{h.deals.length - 2} more</span>
                          )}
                        </div>
                        {isExpanded && (
                          <div className="space-y-2 mb-3">
                            {h.deals.slice(2).map((d, i) => (
                              <span key={i} className="text-[10px] bg-orange-50 text-orange-700 rounded-md px-2 py-0.5 font-semibold mr-1.5">{d}</span>
                            ))}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-2">
                              <p className="text-[10px] font-black text-green-700 mb-1">LOCAL TIP</p>
                              <p className="text-xs text-green-800">{h.tip}</p>
                            </div>
                          </div>
                        )}
                        <button
                          onClick={() => setExpandedHH(isExpanded ? null : h.id)}
                          className="text-xs text-[#0077b6] font-semibold"
                        >
                          {isExpanded ? 'Show less ↑' : 'See all deals + tip →'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:block space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">📊 Today's Status</p>
                <div className="space-y-2">
                  {[
                    { label: 'Active Now', count: happyHours.filter(h => h.status === 'active').length, color: 'text-green-600' },
                    { label: 'Opening Soon', count: happyHours.filter(h => h.status === 'upcoming').length, color: 'text-amber-500' },
                    { label: 'Closed Today', count: happyHours.filter(h => h.status === 'closed').length, color: 'text-gray-400' },
                  ].map(s => (
                    <div key={s.label} className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{s.label}</span>
                      <span className={`text-sm font-black ${s.color}`}>{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-orange-800 mb-1">💡 Pro Tip</p>
                <p className="text-xs text-orange-700 leading-relaxed">Happy hours on LBI tend to run 4–6 PM on weekdays. Weekends are busier — arrive 15 min early for the best spots.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
