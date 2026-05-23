import { useState } from 'react'
import { activities } from '../data/activities'

const CATS = ['All', 'On the Water', 'On Land']
const TOWNS = ['All', 'Beach Haven', 'Surf City', 'Ship Bottom', 'Harvey Cedars', 'Barnegat Light']

const catColor = (cat: string) =>
  cat === 'On the Water' ? 'text-[#0077b6] bg-blue-50 border-blue-100' : 'text-teal-700 bg-teal-50 border-teal-100'

const catBar = (cat: string) =>
  cat === 'On the Water' ? 'bg-[#0077b6]' : 'bg-teal-600'

function availStyle(av: string) {
  if (av.includes('left')) return 'bg-amber-50 text-amber-700'
  if (av.includes('welcome')) return 'bg-green-50 text-green-700'
  return 'bg-blue-50 text-[#0077b6]'
}

export default function DoPage() {
  const [catFilter, setCatFilter] = useState('All')
  const [townFilter, setTownFilter] = useState('All')
  const [bookableOnly, setBookableOnly] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = activities.filter(a => {
    if (catFilter !== 'All' && a.cat !== catFilter) return false
    if (townFilter !== 'All' && a.town !== townFilter) return false
    if (bookableOnly && a.bookingRequired) return false
    return true
  })

  return (
    <div>
      {/* Header */}
      <div className="bg-[#2a9d8f] px-5 py-5 md:px-8">
        <h1 className="text-2xl font-black text-white mb-1">🏄 Things To Do</h1>
        <p className="text-sm text-white/70">Activities, rentals & experiences on LBI</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-5">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-2 space-y-4">
            {/* Filters */}
            <div className="space-y-2">
              <div className="flex gap-2 flex-wrap">
                {CATS.map(c => (
                  <button key={c} onClick={() => setCatFilter(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${catFilter === c ? 'bg-[#2a9d8f] text-white border-[#2a9d8f]' : 'bg-white text-gray-500 border-gray-200'}`}>
                    {c}
                  </button>
                ))}
                <button onClick={() => setBookableOnly(!bookableOnly)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${bookableOnly ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200'}`}>
                  🚶 Walk-in Only
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {TOWNS.map(t => (
                  <button key={t} onClick={() => setTownFilter(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${townFilter === t ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity cards */}
            <div className="space-y-3">
              {filtered.map(a => {
                const isExp = expanded === a.id
                return (
                  <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Category color bar */}
                    <div className={`h-1 ${catBar(a.cat)}`} />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-3 items-center">
                          <span className="text-3xl">{a.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-black text-gray-900">{a.name}</p>
                              {a.featured && <span className="text-[9px] bg-amber-50 text-amber-700 rounded px-1.5 py-0.5 font-black">⭐ FEATURED</span>}
                            </div>
                            <p className="text-xs text-gray-400">{a.town} · {a.cat}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3">
                          <p className="text-sm font-black text-gray-800">{a.price}</p>
                          <p className="text-[10px] text-gray-400">{a.duration}</p>
                        </div>
                      </div>

                      <div className="flex gap-1.5 flex-wrap mb-3">
                        <span className={`text-[10px] font-semibold rounded-md px-2 py-0.5 border ${catColor(a.cat)}`}>{a.cat}</span>
                        <span className={`text-[10px] font-semibold rounded-md px-2 py-0.5 ${a.bookingRequired ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                          {a.bookingRequired ? '📅 Book ahead' : '🚶 Walk-in OK'}
                        </span>
                        <span className="text-[10px] bg-amber-50 text-amber-700 rounded-md px-2 py-0.5 font-semibold">★ {a.rating} ({a.reviews})</span>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed mb-3">{a.desc}</p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {a.tags.map(t => (
                          <span key={t} className={`text-[10px] font-semibold rounded-md px-2 py-0.5 ${catColor(a.cat)}`}>{t}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold rounded-full px-3 py-1 ${availStyle(a.availability)}`}>
                          🕐 {a.availability}
                        </span>
                        <button onClick={() => setExpanded(isExp ? null : a.id)}
                          className="text-xs text-[#0077b6] font-semibold">
                          {isExp ? 'Less ↑' : 'Local tip →'}
                        </button>
                      </div>

                      {isExp && (
                        <div className="mt-3 border-t border-gray-100 pt-3">
                          <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-2">
                            <p className="text-[10px] font-black text-green-700 mb-1">LOCAL TIP</p>
                            <p className="text-xs text-green-800">{a.tip}</p>
                          </div>
                          <p className="text-xs text-[#0077b6] font-bold">📞 {a.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <div className="text-4xl mb-3">🏄</div>
                  <p className="font-semibold">Nothing matches those filters</p>
                  <p className="text-sm mt-1">Try a different category or town</p>
                </div>
              )}
            </div>

            {/* List your activity CTA */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 text-center">
              <p className="text-sm font-black text-teal-800">Run a tour, rental, or activity?</p>
              <p className="text-xs text-teal-600 mt-1 mb-3">Get listed and reach thousands of visitors looking for exactly what you offer</p>
              <button className="px-5 py-2 rounded-full bg-[#2a9d8f] text-white text-xs font-bold">+ List Your Activity</button>
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden md:block space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-sm font-bold text-gray-800 mb-3">⭐ Featured Today</p>
              {activities.filter(a => a.featured).map(a => (
                <div key={a.id} className="mb-3 pb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex gap-2 items-center">
                    <span className="text-xl">{a.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{a.name}</p>
                      <p className="text-xs text-gray-400">{a.price} · {a.town}</p>
                      <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 mt-1 inline-block ${availStyle(a.availability)}`}>{a.availability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <p className="text-sm font-bold text-blue-800 mb-1">🚲 LBI Bike Path</p>
              <p className="text-xs text-blue-700 leading-relaxed">The island has an 18-mile bike path running end-to-end. Rent a cruiser and ride from Beach Haven to Barnegat Light — a bucket list LBI experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
