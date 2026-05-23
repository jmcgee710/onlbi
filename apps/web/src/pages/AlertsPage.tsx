const alerts = [
  { id: 1, severity: 'warning',  cat: 'Beach Conditions', title: '🌀 Rip Current Advisory — Surf City', body: 'Rip current advisory in effect. Swim near lifeguards and stay aware of changing conditions.', time: '8 min ago',  active: true },
  { id: 2, severity: 'info',     cat: 'Traffic',          title: '🚗 Causeway — Moderate Delays',       body: 'Route 72 eastbound moderate delays. Estimated 12 min wait at Manahawkin Bay Bridge.',        time: '18 min ago', active: true },
  { id: 3, severity: 'info',     cat: 'Water Quality',    title: '✅ All Beaches Pass Water Quality',    body: 'NJ DEP weekly testing: all LBI beaches passed. No closures in effect.',                      time: '2 hrs ago',  active: true },
  { id: 4, severity: 'critical', cat: 'Weather',          title: '⛈️ Thunderstorm Watch — Monday',      body: 'NWS: Thunderstorm watch Monday 2–8 PM. Seek shelter immediately if thunder heard on beach.',  time: 'Yesterday',  active: false },
]

const sevStyle = (s: string) => {
  if (s === 'critical') return { bar: 'bg-red-500',    pill: 'bg-red-50 text-red-700 border-red-200' }
  if (s === 'warning')  return { bar: 'bg-amber-400',  pill: 'bg-amber-50 text-amber-700 border-amber-200' }
  return                       { bar: 'bg-blue-400',   pill: 'bg-blue-50 text-[#0077b6] border-blue-200' }
}

export default function AlertsPage() {
  const active = alerts.filter(a => a.active)
  const past   = alerts.filter(a => !a.active)

  return (
    <div>
      <div className="bg-[#dc2626] px-5 py-5 md:px-8">
        <h1 className="text-2xl font-black text-white mb-1">🚨 Alerts</h1>
        <p className="text-sm text-white/70">{active.length} active alert{active.length !== 1 ? 's' : ''} right now</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-5 space-y-6">
        <div>
          <h2 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-3">Active</h2>
          <div className="space-y-3">
            {active.map(a => {
              const st = sevStyle(a.severity)
              return (
                <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className={`h-1 ${st.bar}`} />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-gray-900 leading-tight">{a.title}</p>
                      <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 border flex-shrink-0 ml-3 ${st.pill}`}>{a.cat}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{a.body}</p>
                    <p className="text-[10px] text-gray-400 mt-2">{a.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {past.length > 0 && (
          <div>
            <h2 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-3">Recent / Expired</h2>
            <div className="space-y-3 opacity-60">
              {past.map(a => {
                const st = sevStyle(a.severity)
                return (
                  <div key={a.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className={`h-1 ${st.bar}`} />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-bold text-gray-700">{a.title}</p>
                        <span className="text-[10px] text-gray-400 flex-shrink-0 ml-3">Expired</span>
                      </div>
                      <p className="text-xs text-gray-500">{a.body}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{a.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
          <p className="text-xs text-gray-500">Alerts sourced from NWS, NJ DEP, NJ511, and LBI municipality offices. Updated automatically.</p>
        </div>
      </div>
    </div>
  )
}
