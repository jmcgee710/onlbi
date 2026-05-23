import { useParams, Link } from 'react-router-dom'
import { beaches } from '../data/beaches'

export default function BeachAccessPage() {
  const { town, street } = useParams<{ town: string; street: string }>()
  const townName = town?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? ''
  const streetName = street?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? ''
  const beach = beaches.find(b => b.name.toLowerCase() === streetName.toLowerCase())

  return (
    <div>
      <div className="bg-[#0d1b2a] px-5 py-5 md:px-8">
        <Link to={`/beaches/${town}`} className="text-xs text-white/50 hover:text-white/80 mb-2 block">← {townName}</Link>
        <h1 className="text-2xl font-black text-white">{streetName}</h1>
        <p className="text-sm text-white/60">{townName}</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-5">
        {beach ? (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[{ l: '🌡️ Water', v: beach.temp }, { l: '🌊 Surf', v: beach.surf }, { l: '💨 Wind', v: beach.wind }].map(s => (
                  <div key={s.l} className="text-center">
                    <p className="text-[10px] text-gray-400 font-semibold">{s.l}</p>
                    <p className="text-base font-black text-gray-800 mt-0.5">{s.v}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {beach.lifeguard && <span className="text-xs bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 font-semibold">🛟 Lifeguard On Duty</span>}
                {beach.mat && <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 font-semibold">♿ Beach Mat</span>}
                {!beach.badgeReq && <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 font-semibold">🎫 No Badge Required</span>}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Parking & Fees</p>
              <p className="text-sm text-gray-700">Daily fee: <strong>{beach.fee}</strong></p>
              <p className="text-sm text-gray-700 mt-1">Badge required: <strong>{beach.badgeReq ? 'Yes' : 'No'}</strong></p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Detailed info for this access coming soon.</p>
        )}
      </div>
    </div>
  )
}
