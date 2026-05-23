/* Lightweight icon set — stroke-based, coastal feel. No emoji. */
const Icon = {
  Wave: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M2 16c2 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" strokeLinecap="round"/>
      <path d="M2 11c2 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  Sun: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" strokeLinecap="round"/>
    </svg>
  ),
  Cloud: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M7 17h11a3.5 3.5 0 0 0 .5-7 5.5 5.5 0 0 0-10.7-1.2A3.5 3.5 0 0 0 7 17z" strokeLinejoin="round"/>
    </svg>
  ),
  CloudSun: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="8" cy="8" r="2.5"/>
      <path d="M8 3.5V5M3.5 8H5M11.5 8H13M5 5l1 1M11 5l-1 1" strokeLinecap="round"/>
      <path d="M9 19h9a3 3 0 0 0 .4-6 4.5 4.5 0 0 0-8.9-.8A3 3 0 0 0 9 19z" strokeLinejoin="round"/>
    </svg>
  ),
  Rain: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M6 15h12a3 3 0 0 0 .5-6 5 5 0 0 0-9.7-1A3 3 0 0 0 6 15z" strokeLinejoin="round"/>
      <path d="M9 19l-1 2M13 19l-1 2M17 19l-1 2" strokeLinecap="round"/>
    </svg>
  ),
  Wind: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M3 8h12a3 3 0 1 0-3-3M3 14h16a3 3 0 1 1-3 3M3 11h7" strokeLinecap="round"/>
    </svg>
  ),
  Bridge: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M3 18V8M21 18V8M3 12c4 0 6-4 9-4s5 4 9 4M3 18h18" strokeLinecap="round"/>
    </svg>
  ),
  UV: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6" strokeLinecap="round"/>
    </svg>
  ),
  Compass: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M15.5 8.5L13 13l-4.5 2.5L11 11z" strokeLinejoin="round"/>
    </svg>
  ),
  Lighthouse: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M10 21h4M9 17h6M10 17l1-6h2l1 6M11 11V8h2v3M12 8V5M9 5h6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 8l-2-1M17 8l2-1M7 5l-2 0M17 5l2 0" strokeLinecap="round"/>
    </svg>
  ),
  Umbrella: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M3 12a9 9 0 0 1 18 0H3z" strokeLinejoin="round"/>
      <path d="M12 12v6a2 2 0 0 1-4 0" strokeLinecap="round"/>
    </svg>
  ),
  Fork: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M6 3v8a2 2 0 0 0 2 2v8M6 3v6M10 3v6M8 9v4" strokeLinecap="round"/>
      <path d="M16 3c-2 0-3 2-3 6s1 5 3 5v7" strokeLinecap="round"/>
    </svg>
  ),
  Bike: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="6" cy="17" r="3.5"/>
      <circle cx="18" cy="17" r="3.5"/>
      <path d="M6 17l4-8h6l2 8M10 9h-3M14 9l2-3h2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Bus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="4" y="5" width="16" height="13" rx="2"/>
      <path d="M4 12h16M8 18v2M16 18v2" strokeLinecap="round"/>
      <circle cx="8" cy="15" r="1" fill="currentColor"/>
      <circle cx="16" cy="15" r="1" fill="currentColor"/>
    </svg>
  ),
  Wheelchair: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="11" cy="6" r="1.5"/>
      <path d="M11 9v4h4l2 5M11 13c-3 0-5 2-5 5s2 4 5 4 5-1 5-4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Parking: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="4" y="4" width="16" height="16" rx="3"/>
      <path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Bell: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1 2H5l1-2zM10 19a2 2 0 0 0 4 0" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="11" cy="11" r="6"/>
      <path d="M16 16l4 4" strokeLinecap="round"/>
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowUpRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Calendar: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2"/>
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round"/>
    </svg>
  ),
  Music: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M9 18V5l11-2v13" strokeLinejoin="round"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="17" cy="16" r="3"/>
    </svg>
  ),
  Fish: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M3 12c3-5 8-5 12 0-4 5-9 5-12 0zM15 12c2-3 4-4 6-4l-1 4 1 4c-2 0-4-1-6-4z" strokeLinejoin="round"/>
      <circle cx="8" cy="11" r="0.8" fill="currentColor"/>
    </svg>
  ),
  Anchor: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v13M8 11h8M5 17a7 7 0 0 0 14 0" strokeLinecap="round"/>
    </svg>
  ),
  Settings: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.65 1.65 0 0 0-1.8-.3 1.65 1.65 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.65 1.65 0 0 0-1-1.5 1.65 1.65 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.65 1.65 0 0 0 .3-1.8 1.65 1.65 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.65 1.65 0 0 0 1.5-1 1.65 1.65 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.65 1.65 0 0 0 1.8.3h.1a1.65 1.65 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.65 1.65 0 0 0 1 1.5 1.65 1.65 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.65 1.65 0 0 0-.3 1.8v.1a1.65 1.65 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.65 1.65 0 0 0-1.5 1z" strokeLinejoin="round"/>
    </svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...p}>
      <path d="M12 3l2.4 5.8 6.2.5-4.7 4.1 1.5 6.1L12 16.3l-5.4 3.2 1.5-6.1L3.4 9.3l6.2-.5z"/>
    </svg>
  )
};

window.Icon = Icon;
