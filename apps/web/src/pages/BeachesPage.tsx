import { useState } from 'react'
import { beaches } from '../data/beaches'
import { forecast } from '../data/conditions'

const FILTERS = ['All', '🟢 Clear', '⚠️ Advisory', 'No Badge Required']
const today = forecast[0]

function ripBanner(rip: string) {
  if (rip === 'Low') return { bg: 'bg-green-50 border-green-200', text: 'text-green-700', label: 'Safe for most swimmers. Swim near lifeguards and stay aware.' }
  if (rip === 'Moderate') return { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', label: 'Caution advised. Rip currents possible — stay near lifeguard stands.' }
  return { bg: 'bg-red-50 border-red-200', text: 'text-red-700', label: 'Dangerous conditions. Only strong swimmers. Heed all warnings.' }
}

function scoreColor(s: number) {
  if (s >= 80) return 'text-green-600'
  if (s >= 60) return 'text-amber-500'
  return 'text-red-500'
}

export default function BeachesPage() {
  const [tab, setTab] = useState<'conditions' | 'weather'>('conditions')
  const [filter, setFilter] = useState('All')
  const rip = ripBanner(today.rip)

  const filtered = beaches.filter(b => {
    if (filter === '🟢 Clear') return b.status === 'green'
    if (filter === '⚠️ Advisory') return b.status === 'amber'
    if (filter === 'No Badge Required') return !b.badgeReq
    return true
  })

  return (
    <div>
      {/* Header */}
      <div className="bg-[#0d1b2a] px-5 py-5 md:px-8">
        <h1 className="text-2xl font-black text-white mb-1">🏖️ Beaches</h1>
        <p className="text-sm text-white/60">Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>

      {/* Tab switcher */}
      <div className="bg-white border-b border-gray-200 px-5 md:px-8">
        <div className="flex gap-6">
          {(['conditions', 'weather'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 text-sm font-bold border-b-2 transition-colors capitalize ${tab === t ? 'border-[#0077b6] text-[#0077b6]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              {t === 'conditions' ? '🏖️ Conditions' : '🌤️ Weather & Surf'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-5">

        {/* CONDITIONS TAB */}
        {tab === 'conditions' && (
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2 space-y-4">
              {/* Badge info */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-amber-800">🎫 Beach Badge Info — 2025 Season</p>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">Daily $8 · Weekly $20 · Season $60 · Kids under 12 free · Available at each borough office and most beaches</p>
              </div>

              {/* Rip current banner */}
              <div className={`rounded-2xl border p-4 ${rip.bg}`}>
                <p className={`text-sm font-bold ${rip.text}`}>🌀 Rip Current Risk: {today.rip}</p>
                <p className={`text-xs mt-1 leading-relaxed ${rip.text}`}>{rip.label}</p>
              </div>

              {/* Filter pills */}
              <div className="flex gap-2 flex-wrap">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${filter === f ? 'bg-[#0077b6] text-white border-[#0077b6]' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Beach cards */}
              <div className="space-y-3">
                {filtered.map((b, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-black text-gray-900">{b.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{b.town}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${b.status === 'green' ? 'bg-green-500' : 'bg-amber-400'}`} />
                        {b.badge && <span className="text-[10px] bg-amber-50 text-amber-700 rounded-md px-1.5 py-0.5 font-bold">{b.badge}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {[{ l: '🌡️ Water', v: b.temp }, { l: '🌊 Surf', v: b.surf }, { l: '💨 Wind', v: b.wind }].map(s => (
                        <div key={s.l} className="bg-sky-50 rounded-lg px-2 py-1">
                          <div className="text-[9px] text-gray-400 font-semibold">{s.l}</div>
                          <div className="text-xs font-bold text-gray-800">{s.v}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mb-2">🅿️ {b.status === 'green' ? 'Parking available' : 'Parking limited'} · Fee: {b.fee}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {b.lifeguard && <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-0.5 font-semibold">🛟 Lifeguard</span>}
                      {b.mat && <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 rounded-md px-2 py-0.5 font-semibold">♿ Beach Mat</span>}
                      {!b.badgeReq && <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded-md px-2 py-0.5 font-semibold">🎫 No Badge</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right sidebar on desktop */}
            <div className="hidden md:block space-y-4 mt-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">📅 5-Day Surf</p>
                <div className="space-y-2">
                  {forecast.map((f, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{f.icon}</span>
                        <span className="text-sm font-semibold text-gray-700">{f.day}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{f.swell}</span>
                        <span className={`text-xs font-black ${scoreColor(f.score)}`}>{f.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-2">🏊 Swim Safety</p>
                <ul className="space-y-1.5 text-xs text-gray-600 leading-relaxed">
                  <li>• Always swim near a lifeguard stand</li>
                  <li>• If caught in a rip, swim parallel to shore</li>
                  <li>• Check conditions before entering water</li>
                  <li>• Keep children within arm's reach</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* WEATHER TAB */}
        {tab === 'weather' && (
          <div className="md:grid md:grid-cols-2 md:gap-6 space-y-4 md:space-y-0">
            <div className="space-y-4">
              {/* Score hero */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-2">Beach Day Score</p>
                <div className="flex items-end gap-4 mb-3">
                  <span className={`text-7xl font-black leading-none ${scoreColor(today.score)}`}>{today.score}</span>
                  <div className="pb-2">
                    <p className={`text-lg font-black ${scoreColor(today.score)}`}>{today.score >= 80 ? 'Great day 🤙' : today.score >= 60 ? 'Decent day' : 'Skip it ⛈️'}</p>
                    <p className="text-xs text-gray-400">out of 100</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${scoreColor(today.score).replace('text-', 'bg-')}`} style={{ width: `${today.score}%` }} />
                </div>
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '🌡️', label: 'Air Temp',   value: `${today.high}°F`, sub: `Low ${today.low}°F` },
                  { icon: '🌊', label: 'Swell',      value: today.swell,       sub: 'Period 8s' },
                  { icon: '☀️', label: 'UV Index',   value: `${today.uvIdx}`,  sub: today.uvIdx >= 8 ? 'Very High' : 'High' },
                  { icon: '💨', label: 'Wind',        value: today.wind,        sub: 'Surface' },
                  { icon: '🌅', label: 'Sunrise',    value: '5:48 AM',          sub: 'Sunset 7:56 PM' },
                  { icon: '🌡️', label: 'Water',      value: '72°F',            sub: 'Ocean surface' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center">
                    <div className="text-xl">{s.icon}</div>
                    <div className="text-sm font-black text-gray-800 mt-1">{s.value}</div>
                    <div className="text-[9px] text-gray-400 font-semibold">{s.label}</div>
                    <div className="text-[9px] text-gray-400">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* UV safety */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-orange-800 mb-2">☀️ UV Index {today.uvIdx} — Very High</p>
                <div className="flex flex-wrap gap-1.5">
                  {['SPF 30+ recommended', 'Reapply every 2 hours', 'Seek shade 11 AM–3 PM', 'Sunglasses & hat essential'].map(t => (
                    <span key={t} className="text-[10px] bg-white border border-orange-200 rounded-md px-2 py-0.5 text-orange-700 font-semibold">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Bay vs Ocean */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">🗺️ Bay vs. Ocean</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Ocean Side', icon: '🌊', temp: '72°F', wave: '2–3ft', wind: 'SSW 12mph', swim: 'Moderate', color: 'blue' },
                    { name: 'Bay Side',   icon: '⚓', temp: '76°F', wave: 'Calm',  wind: 'SSW 8mph',  swim: 'Calm',     color: 'teal' },
                  ].map(side => (
                    <div key={side.name} className={`rounded-xl p-3 ${side.color === 'blue' ? 'bg-blue-50 border border-blue-100' : 'bg-teal-50 border border-teal-100'}`}>
                      <div className="text-lg mb-1">{side.icon}</div>
                      <p className={`text-xs font-black mb-2 ${side.color === 'blue' ? 'text-[#0077b6]' : 'text-teal-700'}`}>{side.name}</p>
                      {[['🌡️', 'Temp', side.temp], ['🏄', 'Waves', side.wave], ['💨', 'Wind', side.wind], ['🏊', 'Swim', side.swim]].map(([ic, l, v]) => (
                        <div key={l} className="flex justify-between text-[10px] mb-1">
                          <span className="text-gray-400">{ic} {l}</span>
                          <span className="font-bold text-gray-700">{v}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* 5-day */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">📅 5-Day Forecast</p>
                <div className="space-y-2">
                  {forecast.map((f, i) => (
                    <div key={i} className={`flex items-center justify-between rounded-xl px-3 py-2 ${i === 0 ? 'bg-[#0077b6]/10' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-3 w-16">
                        <span className="text-lg">{f.icon}</span>
                        <span className="text-xs font-bold text-gray-700">{f.day}</span>
                      </div>
                      <span className="text-xs text-gray-500">{f.swell} · UV {f.uvIdx}</span>
                      <span className={`text-xs font-black ${scoreColor(f.score)}`}>{f.score}/100</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
