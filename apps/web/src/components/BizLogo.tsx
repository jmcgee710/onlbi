import { useState } from 'react'

interface BizLogoProps {
  name: string
  web?: string
  size?: number
}

// Deterministic color per business name — keeps lettermarks visually distinct
const PALETTE = [
  '#486C6B', // teal-deep
  '#6B8E5C', // moss
  '#1B3654', // navy
  '#C45A3E', // coral
  '#5F7388', // slate
  '#D4A24E', // sun
]

function pickColor(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return PALETTE[Math.abs(h) % PALETTE.length]
}

function toDomain(web: string): string | null {
  try {
    return new URL(web).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

export default function BizLogo({ name, web, size = 44 }: BizLogoProps) {
  const domain = web ? toDomain(web) : null
  const [failed, setFailed] = useState(false)

  const showImg = !!domain && !failed
  const letter  = name.charAt(0).toUpperCase()
  const color   = pickColor(name)

  return (
    <div
      style={{
        width: size, height: size, borderRadius: 8, flexShrink: 0,
        background: 'var(--sand)', border: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {showImg ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          loading="lazy"
          width={Math.round(size * 0.62)}
          height={Math.round(size * 0.62)}
          style={{ objectFit: 'contain', display: 'block' }}
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
