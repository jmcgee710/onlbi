import { useState } from 'react'
import { accessibleBeaches, restrooms } from '../data/accessibility'

type Tab = 'beaches' | 'restrooms'

export default function AccessibilityPage() {
  const [tab, setTab] = useState<Tab>('beaches')
  const [filterMat, setFilterMat] = useState(false)
  const [filterWheelchair, setFilterWheelchair] = useState(false)
  const [filterChanging, setFilterChanging] = useState(false)
  const [filterShower, setFilterShower] = useState(false)

  const filteredBeaches = accessibleBeaches.filter(b => {
    if (filterMat && !b.mobiMat) return false
    if (filterWheelchair && !b.wheelchairLoan) return false
    return true
  })

  const filteredRestrooms = restrooms.filter(r => {
    if (filterChanging && !r.changing) return false
    if (filterShower && !r.showers) return false
    return true
  })

  return (
    <div>
      {/* Header */}
      <div className="bg-[#7c3aed] px-5 py-5 md:px-8">
        <h1 className="text-2xl font-black text-white mb-1">♿ Accessibility</h1>
        <p className="text-sm text-white/70">Beach mats, wheelchair loans & accessible facilities</p>
      </div>

      {/* Tab switcher */}
      <div className="bg-white border-b border-gray-200 px-5 md:px-8">
        <div className="flex gap-6">
          {(['beaches', 'restrooms'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`py-3 text-sm font-bold border-b-2 transition-colors capitalize ${tab === t ? 'border-[#7c3aed] text-[#7c3aed]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
              {t === 'beaches' ? '🏖️ Beach Access' : '🚻 Restrooms & Facilities'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-5">

        {/* BEACH ACCESS TAB */}
        {tab === 'beaches' && (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2 space-y-4">
              {/* Info banner */}
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-purple-800 mb-1">ℹ️ How Beach Wheelchair Loans Work</p>
                <p className="text-xs text-purple-700 leading-relaxed">Free beach wheelchairs are available at select accesses — first-come at the lifeguard stand during staffed hours. Call ahead on peak weekends. Mobi-mats provide a firm surface from the dune to the water's edge.</p>
              </div>

              {/* Filters */}
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setFilterMat(!filterMat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${filterMat ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'bg-white text-gray-500 border-gray-200'}`}>
                  🛤️ Mobi-Mat
                </button>
                <button onClick={() => setFilterWheelchair(!filterWheelchair)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${filterWheelchair ? 'bg-[#7c3aed] text-white border-[#7c3aed]' : 'bg-white text-gray-500 border-gray-200'}`}>
                  ♿ Wheelchair Loan
                </button>
              </div>

              {/* Beach cards */}
              <div className="space-y-3">
                {filteredBeaches.map((b, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-black text-gray-900">{b.beach}</p>
                        <p className="text-xs text-gray-400">{b.town}</p>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        {b.hcParking && <span className="text-[10px] bg-blue-50 text-[#0077b6] font-bold rounded-md px-2 py-0.5">🚗 HC Parking</span>}
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      <span className={`text-[10px] font-semibold rounded-md px-2 py-0.5 border ${b.mobiMat ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-gray-50 text-gray-400 border-gray-200 line-through'}`}>
                        🛤️ Mobi-Mat
                      </span>
                      <span className={`text-[10px] font-semibold rounded-md px-2 py-0.5 border ${b.wheelchairLoan ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-200 line-through'}`}>
                        ♿ Wheelchair Loan
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{b.notes}</p>
                    <p className="text-xs text-[#7c3aed] font-semibold">📞 {b.contact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:block space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">📊 Summary</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-gray-500">Mobi-mats available</span><span className="font-black text-purple-700">{accessibleBeaches.filter(b => b.mobiMat).length}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Wheelchair loans</span><span className="font-black text-green-600">{accessibleBeaches.filter(b => b.wheelchairLoan).length}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">HC parking</span><span className="font-black text-[#0077b6]">{accessibleBeaches.filter(b => b.hcParking).length}</span></div>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-purple-800 mb-1">📋 Planning Tips</p>
                <ul className="space-y-1.5 text-xs text-purple-700 leading-relaxed">
                  <li>• Call ahead on peak summer weekends</li>
                  <li>• Mobi-mats are seasonal (Memorial–Labor Day)</li>
                  <li>• HC beach parking is usually unrestricted</li>
                  <li>• Low tide = firmer sand, easier access</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* RESTROOMS TAB */}
        {tab === 'restrooms' && (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2 space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Total',      value: restrooms.length,                              color: 'text-gray-800' },
                  { label: 'Changing',   value: restrooms.filter(r => r.changing).length,      color: 'text-teal-600' },
                  { label: 'Accessible', value: restrooms.filter(r => r.accessible).length,    color: 'text-purple-600' },
                  { label: 'Showers',    value: restrooms.filter(r => r.showers).length,       color: 'text-[#0077b6]' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 text-center">
                    <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-gray-400 font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setFilterChanging(!filterChanging)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${filterChanging ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-500 border-gray-200'}`}>
                  👶 Changing Station
                </button>
                <button onClick={() => setFilterShower(!filterShower)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${filterShower ? 'bg-[#0077b6] text-white border-[#0077b6]' : 'bg-white text-gray-500 border-gray-200'}`}>
                  🚿 Has Showers
                </button>
              </div>

              <div className="space-y-3">
                {filteredRestrooms.map((r, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{r.name}</p>
                        <p className="text-xs text-gray-400">{r.town} · {r.hours}</p>
                      </div>
                      <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${r.condition === 'good' ? 'bg-green-500' : r.condition === 'fair' ? 'bg-amber-400' : 'bg-red-500'}`} />
                    </div>
                    <div className="flex gap-1.5 flex-wrap mb-2">
                      {[['👶 Changing', r.changing], ['♿ Accessible', r.accessible], ['🚿 Showers', r.showers], ['🏠 Enclosed', r.enclosed]].map(([l, v], j) => (
                        <span key={j} className={`text-[10px] font-semibold rounded-md px-2 py-0.5 border ${v ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                          {v ? '✓' : '✗'} {l}
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
                <p className="text-sm font-bold text-gray-800 mb-2">🏆 Best Maintained</p>
                <p className="text-sm font-semibold text-gray-700">Ship Bottom Beach Facility</p>
                <p className="text-xs text-gray-400 mt-1">Consistently rated best maintained. Changing station, showers, and accessible entrance.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
