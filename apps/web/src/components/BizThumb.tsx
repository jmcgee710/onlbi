import { useState } from 'react'

interface BizThumbProps {
  id: number
  name: string
  size?: number
}

// Deterministic color per business name — keeps lettermark fallbacks distinct.
const PALETTE = ['#486C6B', '#6B8E5C', '#1B3654', '#C45A3E', '#5F7388', '#D4A24E']

function pickColor(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return PALETTE[Math.abs(h) % PALETTE.length]
}

/**
 * Business thumbnail: a Google Places photo served via the /api/biz-photo edge
 * function, with a colored letter-mark fallback when the business has no photo
 * (or the request fails). Lazy-loaded so a long list doesn't fetch all at once.
 */
export default function BizThumb({ id, name, size = 88 }: BizThumbProps) {
  const [failed, setFailed] = useState(false)
  const letter = name.charAt(0).toUpperCase()
  const color = pickColor(name)

  return (
    <div
      style={{
        width: size, height: size, borderRadius: 8, flexShrink: 0,
        background: 'var(--sand)', border: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {!failed ? (
        <img
          src={`/api/biz-photo?id=${id}`}
          alt=""
          loading="lazy"
          width={size}
          height={size}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: Math.round(size * 0.46),
            fontWeight: 500,
            color,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {letter}
        </span>
      )}
    </div>
  )
}
