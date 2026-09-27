// Shared drawing of Long Beach Island for the homepage IslandMap and the
// /towns LbiTownsMap, in a 520×900 viewBox (north up, bay west, ocean east).

export const VIEW_W = 520
export const VIEW_H = 900

export const ISLAND_PATH =
  'M 322 30 C 340 60, 345 110, 336 170 C 322 280, 300 420, 278 560 C 260 680, 240 780, 210 870 ' +
  'L 192 866 C 218 776, 236 676, 252 556 C 272 416, 292 276, 304 166 C 310 110, 308 60, 322 30 Z'

export const OCEAN_PATH =
  'M 330 0 L 520 0 L 520 900 L 214 900 C 240 780, 258 680, 276 560 C 298 420, 318 280, 334 170 C 344 100, 340 40, 330 0 Z'

// Route 72 leaves Ship Bottom heading slightly north of west toward
// Manahawkin — a straight causeway, drawn from the island's bay shore to the
// map's west edge.
export const CAUSEWAY = { x1: 274, y1: 420, x2: 0, y2: 398 }

/** y on the causeway at a given x (for placing markers/labels on it). */
export function causewayY(x: number): number {
  const { x1, y1, x2, y2 } = CAUSEWAY
  return y2 + ((y1 - y2) * (x - x2)) / (x1 - x2)
}

export const CAUSEWAY_ANGLE = (Math.atan2(CAUSEWAY.y1 - CAUSEWAY.y2, CAUSEWAY.x1 - CAUSEWAY.x2) * 180) / Math.PI

// The island's west (bay) shore as three cubic Béziers, sampled once so labels
// can sit a fixed distance off the shore at any latitude.
type Pt = [number, number]
const WEST_SHORE: Array<[Pt, Pt, Pt, Pt]> = [
  [[192, 866], [218, 776], [236, 676], [252, 556]],
  [[252, 556], [272, 416], [292, 276], [304, 166]],
  [[304, 166], [310, 110], [308, 60], [322, 30]],
]
const shoreSamples: Pt[] = WEST_SHORE.flatMap(([a, b, c, d]) =>
  Array.from({ length: 41 }, (_, i) => {
    const t = i / 40, u = 1 - t
    return [
      u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
      u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
    ] as Pt
  }),
).sort((p, q) => p[1] - q[1])

/** x of the island's bay shore at height y. */
export function westShoreX(y: number): number {
  for (let i = 1; i < shoreSamples.length; i++) {
    const [x0, y0] = shoreSamples[i - 1]
    const [x1, y1] = shoreSamples[i]
    if (y <= y1) return y1 === y0 ? x1 : x0 + ((x1 - x0) * (y - y0)) / (y1 - y0)
  }
  return shoreSamples[shoreSamples.length - 1][0]
}

/** The causeway as a road: tan roadbed with a dashed center line. */
export function Causeway({ label = true }: { label?: boolean }) {
  const { x1, y1, x2, y2 } = CAUSEWAY
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B9AD95" strokeWidth="8" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F5F1EA" strokeWidth="1.2" strokeDasharray="6 5" />
      {label && (
        <text
          x="16"
          y={causewayY(16) - 9}
          transform={`rotate(${CAUSEWAY_ANGLE.toFixed(2)} 16 ${causewayY(16) - 9})`}
          fontSize="11"
          fill="#6B5B3E"
          fontFamily="Instrument Sans, sans-serif"
          fontWeight="600"
          letterSpacing="1"
        >
          RT 72 CAUSEWAY
        </text>
      )}
    </g>
  )
}
