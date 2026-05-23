import { parkingLots } from '../data/gettingAround'

const towns = [
  { name: 'Beach Haven',    badge: '$8/day', street: 'Metered on Ocean & Bay Ave', tip: 'Arrive before 9 AM on weekends. Lot B fills by 10 AM in peak season.' },
  { name: 'Ship Bottom',    badge: '$6/day', street: 'Free on residential streets',  tip: 'Municipal lot on 8th St is your best bet. Short walk to beach.' },
  { name: 'Surf City',      badge: '$7/day', street: 'Free on side streets',         tip: '9th St lot fills fast on Saturdays. Try 19th St access instead.' },
  { name: 'Harvey Cedars',  badge: '$5/day', street: 'Free street parking',          tip: 'Quieter than the southern towns. Usually easy parking before noon.' },
  { name: 'Barnegat Light', badge: 'Free',   street: 'State park lot — free',        tip: 'State Park lot is the largest on the island. Fills on hot Sundays.' },
  { name: 'Long Beach Twp', badge: '$5/day', street: 'Limited street parking',       tip: 'Covers Brant Beach, Beach Haven Crest, Brighton, Holgate, and more.' },
]

function lotColor(avail: number, cap: number) {
  if (avail === 0) return { bar: 'bg-red-500', text: 'text-red-600 font-black', label: 'FULL' }
  if (avail / cap < 0.2) return { bar: 'bg-amber-400', text: 'text-amber-600 font-black', label: `${avail} left` }
  return { bar: 'bg-green-500', text: 'text-green-600 font-semibold', label: `${avail} open` }
}

export default function ParkingPage() {
  return (
    <div>
      <div className="bg-[#0d1b2a] px-5 py-5 md:px-8">
        <h1 className="text-2xl font-black text-white mb-1">🅿️ Parking</h1>
        <p className="text-sm text-white/60">Town-by-town guide · No live sensors — estimates only</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-5">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-2 space-y-5">

            {/* Live lot estimates */}
            <div>
              <h2 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-3">Lot Availability Estimates</h2>
              <div className="space-y-3">
                {parkingLots.map((p, i) => {
                  const { bar, text, label } = lotColor(p.avail, p.cap)
                  const pct = Math.round((1 - p.avail / p.cap) * 100)
                  return (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-bold text-gray-800">{p.loc}</p>
                        <span className={`text-xs ${text}`}>{label}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                        <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[10px] text-gray-400">{p.avail} of {p.cap} spots available</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Town guide */}
            <div>
              <h2 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-3">Town Parking Guide</h2>
              <div className="space-y-3">
                {towns.map((t, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-black text-gray-900">{t.name}</p>
                      <span className="text-xs bg-amber-50 text-amber-700 font-bold rounded-md px-2 py-0.5">🎫 {t.badge}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">🚗 {t.street}</p>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                      <p className="text-[10px] font-black text-[#0077b6] mb-0.5">LOCAL TIP</p>
                      <p className="text-xs text-gray-700">{t.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden md:block space-y-4 mt-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-sm font-bold text-gray-800 mb-3">⏰ Best Times to Park</p>
              <div className="space-y-2">
                {[
                  { time: 'Before 9 AM', level: '🟢 Easy', note: 'Any day' },
                  { time: '9–11 AM',     level: '🟡 Moderate', note: 'Weekdays' },
                  { time: '9–11 AM',     level: '🔴 Hard', note: 'Weekends' },
                  { time: 'After 4 PM',  level: '🟢 Easy', note: 'Spots open up' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{r.time}</p>
                      <p className="text-[10px] text-gray-400">{r.note}</p>
                    </div>
                    <span className="text-xs">{r.level}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-sm font-bold text-amber-800 mb-1">💡 Pro Tips</p>
              <ul className="space-y-1.5 text-xs text-amber-700 leading-relaxed">
                <li>• Bay side streets often have spots when lots fill</li>
                <li>• Beach Haven has the most lots and the most competition</li>
                <li>• HC permit plates can park in any HC beach spot</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
