// Stylized N–S map of LBI for the homepage tides section: bay tide stations
// (B1–B4) west of the island, the two ocean readings (O1 Atlantic City pier,
// O2 buoy 44091) pointing off-map, and the Long Beach Township cams.
// Marker positions are approximate latitudes along the drawn island.
import { ISLAND_PATH, OCEAN_PATH, Causeway, causewayY } from './lbiGeometry'

const OCEAN = '#2A6F97'
const BAY = '#4E7A5A'
const INK = '#10263A'

const bayPins = [
  { id: 'B1', x: 198, y: 112 },
  { id: 'B2', x: 180, y: 290 },
  { id: 'B3', x: 200, y: Math.round(causewayY(200)) }, // on the causeway (Manahawkin Bay bridge)
  { id: 'B4', x: 120, y: 728 },
]
const oceanPins = [
  { id: 'O2', x: 490, y: 100 },
  { id: 'O1', x: 490, y: 780 },
]
const cams = [
  { x: 287, y: 410 }, // 28th St, Ship Bottom
  { x: 270, y: 500 }, // 38th St, Brant Beach
  { x: 212, y: 845 }, // Holgate
]
const places: Array<[string, number, number]> = [
  ['Barnegat Light', 298, 74],
  ['Loveladies', 292, 152],
  ['Harvey Cedars', 280, 228],
  ['North Beach', 272, 272],
  ['Surf City', 266, 344],
  ['Ship Bottom', 262, 390],
  ['Brant Beach', 244, 522],
  ['Beach Haven', 222, 694],
  ['Holgate', 190, 818],
]

export default function IslandMap() {
  return (
    <svg
      className="island-map"
      viewBox="0 0 520 900"
      role="img"
      aria-label="Map of Long Beach Island with bay tide stations to the west, ocean readings to the east, and live cams along the island"
    >
      <rect x="0" y="0" width="520" height="900" fill="#E3EBDF" />
      <path d={OCEAN_PATH} fill="#DCE8F0" />
      <Causeway />
      <path d={ISLAND_PATH} fill="#EFE3CC" stroke="#C9B48E" strokeWidth="1.5" />
      <g fontFamily="Instrument Sans, sans-serif" fontSize="11" fontWeight="600" letterSpacing="2">
        <text x="440" y="40" fill={OCEAN} textAnchor="middle">ATLANTIC</text>
        <text x="440" y="55" fill={OCEAN} textAnchor="middle">OCEAN</text>
        <text x="70" y="40" fill={BAY}>BARNEGAT BAY</text>
      </g>
      <g fontFamily="Instrument Sans, sans-serif" fontSize="10" fontStyle="italic" fill="#5A6570">
        <text x="345" y="22">Barnegat Inlet</text>
        <text x="210" y="892" textAnchor="end">Little Egg Inlet</text>
      </g>
      <g fontFamily="Fraunces, Georgia, serif" fontSize="13" fill={INK} textAnchor="end">
        {places.map(([name, x, y]) => <text key={name} x={x} y={y}>{name}</text>)}
      </g>
      <g className="map-bay" fontFamily="Instrument Sans, sans-serif" fontSize="10" fontWeight="600" fill="#FFFFFF" textAnchor="middle">
        {bayPins.map((p) => (
          <g key={p.id}>
            <circle cx={p.x} cy={p.y} r="13" fill={BAY} />
            <text x={p.x} y={p.y + 4}>{p.id}</text>
          </g>
        ))}
      </g>
      <g className="map-ocean">
        <g fontFamily="Instrument Sans, sans-serif" fontSize="10" fontWeight="600" fill="#FFFFFF" textAnchor="middle">
          {oceanPins.map((p) => (
            <g key={p.id}>
              <circle cx={p.x} cy={p.y} r="13" fill={OCEAN} />
              <text x={p.x} y={p.y + 4}>{p.id}</text>
            </g>
          ))}
        </g>
        <g fontFamily="Instrument Sans, sans-serif" fontSize="11" fontWeight="600" fill="#1F5A7A" textAnchor="end">
          <text x="470" y="96">Buoy 44091 →</text>
          <text x="470" y="110" fontWeight="400">offshore</text>
          <text x="470" y="776">Atlantic City pier ↓</text>
          <text x="470" y="790" fontWeight="400">tide + surf temp</text>
        </g>
      </g>
      <g>
        {cams.map((c) => (
          <g key={`${c.x}-${c.y}`}>
            <circle cx={c.x} cy={c.y} r="11" fill={INK} />
            <rect x={c.x - 6} y={c.y - 4} width="12" height="9" rx="2" fill="none" stroke="#F5F1EA" strokeWidth="1.4" />
            <circle cx={c.x} cy={c.y + 0.5} r="2.2" fill="none" stroke="#F5F1EA" strokeWidth="1.4" />
          </g>
        ))}
      </g>
      <g fontFamily="Instrument Sans, sans-serif" fontSize="11" fill={INK}>
        <rect x="360" y="820" width="148" height="68" rx="10" fill="#FFFDF9" stroke="#D9CFBC" />
        <circle cx="378" cy="838" r="6" fill={OCEAN} /><text x="392" y="842">Ocean reading</text>
        <circle cx="378" cy="856" r="6" fill={BAY} /><text x="392" y="860">Bay tide station</text>
        <circle cx="378" cy="874" r="6" fill={INK} /><text x="392" y="878">Live cam</text>
      </g>
    </svg>
  )
}
