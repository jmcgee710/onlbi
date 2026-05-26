import { useState } from 'react'
import { waterSports, entertainment, type Business } from '../data/businesses'

// Combine water sports and entertainment for the "Things To Do" page.
// Nightlife is deliberately left on the Eat & Drink page.
const doItems: Business[] = [...waterSports, ...entertainment]

const CATS = ['All', 'Water Sports & Rentals', 'Entertainment']

const TOWNS = [
  'All',
  'Beach Haven',
  'Barnegat Light',
  'Harvey Cedars',
  'Surf City',
  'Ship Bottom',
  'Long Beach Township',
  'Brant Beach',
  'Holgate',
]

const CAT_COLOR: Record<string, string> = {
  'Water Sports & Rentals': 'text-[#0077b6] bg-blue-50 border-blue-100',
  'Entertainment':          'text-teal-700 bg-teal-50 border-teal-100',
}

const CAT_BAR: Record<string, string> = {
  'Water Sports & Rentals': 'bg-[#0077b6]',
  'Entertainment':          'bg-teal-600',
}

const ACCENT: Record<string, string> = {
  'Water Sports & Rentals': 'bg-[#2a9d8f]',
  'Entertainment':          'bg-[#2a9d8f]',
}

export default function DoPage() {
  const [catFilter, setCatFilter]   = useState('All')
  const [townFilter, setTownFilter] = useState('All')

  const filtered = doItems.filter(a => {
    if (catFilter  !== 'All' && a.cat  !== catFilter)  return false
    if (townFilter !== 'All' && a.town !== townFilter) return false
    return true
  })

  return (
    <div>
      {/* Header */}
      <div className="bg-[#2a9d8f] px-5 py-5 md:px-8">
        <h1 className="text-2xl font-black text-white mb-1">🏄 Things To Do</h1>
        <p className="text-sm text-white/70">
          {doItems.length} activities · water sports, rentals, amusements & more
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-5">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-2 space-y-4">

            {/* Filters */}
            <div className="space-y-2">
              <div className="flex gap-2 flex-wrap">
                {CATS.map(c => (
                  <button
                    key={c}
                    onClick={() => setCatFilter(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      catFilter === c
                        ? 'bg-[#2a9d8f] text-white border-[#2a9d8f]'
                        : 'bg-white text-gray-500 border-gray-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {TOWNS.map(t => (
                  <button
                    key={t}
                    onClick={() => setTownFilter(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      townFilter === t
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-white text-gray-500 border-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-400">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} ·
              Hours and availability vary — call ahead to confirm
            </p>

            {/* Activity cards */}
            <div className="space-y-3">
              {filtered.map(a => (
                <div
                  key={a.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Category color bar */}
                  <div className={`h-1 ${CAT_BAR[a.cat] ?? 'bg-gray-200'}`} />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-3 items-center">
                        <span className="text-3xl">{a.icon}</span>
                        <div>
                          <p className="font-black text-gray-900">{a.name}</p>
                          <p className="text-xs text-gray-400">{a.town} · {a.subcat}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-semibold rounded-md px-2 py-0.5 border flex-shrink-0 ml-2 ${
                          CAT_COLOR[a.cat] ?? 'bg-gray-50 text-gray-500 border-gray-100'
                        }`}
                      >
                        {a.cat}
                      </span>
                    </div>

                    {a.note && (
                      <p className="text-xs text-gray-600 leading-relaxed mt-2">
                        {a.note}
                      </p>
                    )}

                    {(a.phone || a.web) && (
                      <div className="flex gap-3 mt-3 pt-3 border-t border-gray-50">
                        {a.phone && (
                          <a
                            href={`tel:${a.phone}`}
                            className="text-xs text-[#0077b6] font-semibold hover:underline"
                          >
                            📞 {a.phone}
                          </a>
                        )}
                        {a.web && (
                          <a
                            href={a.web}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#0077b6] font-semibold hover:underline"
                          >
                            🌐 Website →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

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
              <p className="text-xs text-teal-600 mt-1 mb-3">
                Get listed and reach thousands of visitors looking for exactly what you offer
              </p>
              <button
                className={`px-5 py-2 rounded-full text-white text-xs font-bold ${ACCENT['Entertainment']}`}
              >
                + List Your Activity
              </button>
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden md:block space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <p className="text-sm font-bold text-blue-800 mb-1">🚲 LBI Bike Path</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                The island has an 18-mile bike path running end-to-end. Rent a cruiser and
                ride from Beach Haven to Barnegat Light — a bucket-list LBI experience.
                Multiple rental shops across the island.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-sm font-bold text-gray-800 mb-3">🌊 Water Sports</p>
              <div className="space-y-2 text-xs text-gray-600">
                <p>· Pontoon boat rentals available island-wide</p>
                <p>· Surf lessons for all levels — multiple shops</p>
                <p>· Kayak & SUP rentals on the bay side</p>
                <p>· Head boat fishing from Viking Village (north end)</p>
              </div>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4">
              <p className="text-sm font-bold text-teal-800 mb-1">🎡 Beach Haven</p>
              <p className="text-xs text-teal-700 leading-relaxed">
                Most of LBI's amusement parks, mini golf, and family entertainment is
                concentrated in Beach Haven at the south end. Plan at least an evening there.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
