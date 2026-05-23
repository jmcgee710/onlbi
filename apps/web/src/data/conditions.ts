export const conditions = {
  waterTempF: 72,
  airTempF: 81,
  windSpeed: 12,
  windDir: 'SSW',
  uvIndex: 8,
  ripCurrentRisk: 'Low' as 'Low' | 'Moderate' | 'High',
  bridgeWaitMin: 12,
  beachesOpen: 6,
  beachesTotal: 6,
  updatedAt: '8:42 AM',
}

export const beachDayScore = {
  score: 88,
  label: 'Great day 🤙',
  high: 81,
  low: 68,
  icon: '☀️',
  wind: 'SSW 12',
}

export const tideChart = [
  { hour: '12a', ft: 2.1 }, { hour: '2a', ft: 0.8 }, { hour: '4a', ft: 0.3 },
  { hour: '6a', ft: 1.2 }, { hour: '8a', ft: 2.9 }, { hour: '10a', ft: 4.8 },
  { hour: '12p', ft: 3.9 }, { hour: '2p', ft: 1.8 }, { hour: '4p', ft: 0.5 },
  { hour: '6p', ft: 1.4 }, { hour: '8p', ft: 3.2 }, { hour: '10p', ft: 4.6 },
]

export const tideKeyTimes = [
  { time: '4:22 AM', type: 'Low' as const, ft: '0.3ft' },
  { time: '10:45 AM', type: 'High' as const, ft: '4.8ft' },
  { time: '5:01 PM', type: 'Low' as const, ft: '0.5ft' },
  { time: '11:18 PM', type: 'High' as const, ft: '4.6ft' },
]

export const forecast = [
  { day: 'Today', icon: '☀️', high: 81, low: 68, wind: 'SSW 12', swell: '2–3ft', uvIdx: 8, rip: 'Low', score: 88 },
  { day: 'Sun',   icon: '⛅', high: 78, low: 66, wind: 'S 15',   swell: '3–4ft', uvIdx: 6, rip: 'Moderate', score: 71 },
  { day: 'Mon',   icon: '🌧️', high: 72, low: 63, wind: 'NE 20',  swell: '4–5ft', uvIdx: 2, rip: 'High', score: 34 },
  { day: 'Tue',   icon: '⛅', high: 75, low: 64, wind: 'SW 10',  swell: '2–3ft', uvIdx: 5, rip: 'Low', score: 74 },
  { day: 'Wed',   icon: '☀️', high: 83, low: 69, wind: 'S 8',    swell: '1–2ft', uvIdx: 9, rip: 'Low', score: 94 },
]
