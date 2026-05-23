import { useParams, Link } from 'react-router-dom'
import { beaches } from '../data/beaches'

export default function BeachTownPage() {
  const { town } = useParams<{ town: string }>()
  const name = town?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? ''
  const townBeaches = beaches.filter(b => b.town.toLowerCase() === name.toLowerCase())

  return (
    <div>
      <div className="bg-[#0d1b2a] px-5 py-5 md:px-8">
        <Link to="/beaches" className="text-xs text-white/50 hover:text-white/80 mb-2 block">← All Beaches</Link>
        <h1 className="text-2xl font-black text-white">{name}</h1>
      </div>
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-5 space-y-3">
        {townBeaches.length > 0 ? townBeaches.map((b, i) => (
          <Link key={i} to={`/beaches/${town}/${b.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:border-[#0077b6] transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-black text-gray-900">{b.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{b.temp} · {b.surf}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${b.status === 'green' ? 'bg-green-500' : 'bg-amber-400'}`} />
            </div>
          </Link>
        )) : (
          <p className="text-gray-400 text-sm">No beach data for this town yet.</p>
        )}
      </div>
    </div>
  )
}
