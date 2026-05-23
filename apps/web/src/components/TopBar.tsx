import { Link } from 'react-router-dom'

export default function TopBar() {
  return (
    <>
      <Link to="/">
        <img src="/logo-dark.png" alt="On LBI" className="h-10 w-auto object-contain" />
      </Link>
      <div className="flex items-center gap-4">
        <button className="text-xl">🔍</button>
        <button className="text-xl">🔔</button>
      </div>
    </>
  )
}
