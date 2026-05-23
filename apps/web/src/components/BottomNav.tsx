import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', icon: '🌊', label: 'Today' },
  { to: '/beaches', icon: '🏖️', label: 'Beaches' },
  { to: '/eat', icon: '🍽️', label: 'Eat' },
  { to: '/do', icon: '🏄', label: 'Do' },
  { to: '/accessibility', icon: '♿', label: 'Access' },
]

export default function BottomNav() {
  return (
    <ul className="flex">
      {tabs.map(({ to, icon, label }) => (
        <li key={to} className="flex-1">
          <NavLink
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 text-[10px] font-semibold transition-colors ${
                isActive ? 'text-[#00b4d8]' : 'text-gray-500'
              }`
            }
          >
            <span className="text-lg leading-none">{icon}</span>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
