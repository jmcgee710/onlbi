/* App.jsx — ON LBI coastal dashboard */
const { useState, useMemo, useEffect } = React;

// ---------- DATA ----------
const NAV = [
  { id: 'today', label: 'Today', icon: 'Sun' },
  { id: 'beaches', label: 'Beaches', icon: 'Umbrella', meta: '6 open' },
  { id: 'eat', label: 'Eat & Drink', icon: 'Fork', meta: 'Happy hr' },
  { id: 'things', label: 'Things To Do', icon: 'Anchor' },
  { id: 'around', label: 'Getting Around', icon: 'Bus' },
  { id: 'parking', label: 'Parking', icon: 'Parking' },
  { id: 'access', label: 'Accessibility', icon: 'Wheelchair' },
  { id: 'alerts', label: 'Alerts', icon: 'Bell', dot: true },
];

const BEACHES = [
  { name: 'Beach Haven', status: 'ok', tag: 'best', tagLabel: 'Best Today', temp: 72 },
  { name: 'Ship Bottom', status: 'ok', temp: 71 },
  { name: 'Surf City', status: 'warn', tag: 'rip', tagLabel: 'Rip Risk', temp: 70 },
  { name: 'Harvey Cedars', status: 'ok', temp: 71 },
  { name: 'Barnegat Light', status: 'warn', tag: 'choppy', tagLabel: 'Choppy', temp: 69 },
  { name: 'Holgate', status: 'ok', tag: 'wild', tagLabel: 'Wildlife', temp: 70 },
];

const EVENTS = [
  { hour: '10', ap: 'am', title: 'Chowder Festival', meta: 'Beach Haven · 10 am – 6 pm', price: '$15', icon: 'Fork' },
  { hour: '7', ap: 'am', title: 'LBI Triathlon', meta: 'Ship Bottom · 7 am start', price: '$75', icon: 'Bike' },
  { hour: '6', ap: 'am', title: 'Viking Village Fish Market', meta: 'Barnegat Light · 6 am – 2 pm', price: 'Free', free: true, icon: 'Fish' },
  { hour: '8', ap: 'pm', title: "Live Jazz at Buckalew's", meta: 'Beach Haven · 8 pm – 11 pm', price: 'Free', free: true, icon: 'Music' },
];

const FORECAST = [
  { dow: 'Today', hi: 81, lo: 65, ico: 'Sun', score: 88 },
  { dow: 'Sun', hi: 78, lo: 62, ico: 'CloudSun', score: 71 },
  { dow: 'Mon', hi: 72, lo: 60, ico: 'Rain', score: 34 },
  { dow: 'Tue', hi: 75, lo: 61, ico: 'Cloud', score: 74 },
  { dow: 'Wed', hi: 83, lo: 66, ico: 'Sun', score: 94 },
];

const TIDES = [
  { lab: 'Low', time: '4:22 AM', ft: '0.3 ft' },
  { lab: 'High', time: '10:45 AM', ft: '4.8 ft' },
  { lab: 'Low', time: '5:01 PM', ft: '0.5 ft' },
  { lab: 'High', time: '11:18 PM', ft: '4.6 ft' },
];

// ---------- helpers ----------
function IconC({ name, ...p }) {
  const Cmp = Icon[name];
  return Cmp ? <Cmp {...p} /> : null;
}

// ---------- TIDE CHART ----------
function TideChart() {
  // Build a smooth wave through tide points + a "now" marker at ~46% (10:30am)
  const points = [
    { t: 0, y: 0.85 },     // 12am
    { t: 0.18, y: 1.0 },   // 4:22am low
    { t: 0.45, y: 0.05 },  // 10:45am high
    { t: 0.71, y: 0.95 },  // 5:01pm low
    { t: 0.97, y: 0.1 },   // 11:18pm high
    { t: 1.0, y: 0.15 },
  ];
  const W = 600, H = 120;
  const x = (t) => t * W;
  const y = (yy) => 14 + yy * (H - 28);

  // smooth path
  let path = `M ${x(points[0].t)} ${y(points[0].y)}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1], p1 = points[i];
    const dx = (p1.t - p0.t) * W;
    const cx1 = x(p0.t) + dx / 2;
    const cx2 = x(p1.t) - dx / 2;
    path += ` C ${cx1} ${y(p0.y)}, ${cx2} ${y(p1.y)}, ${x(p1.t)} ${y(p1.y)}`;
  }
  const fillPath = `${path} L ${W} ${H} L 0 ${H} Z`;

  const nowT = 0.42; // ~10 am
  // sample y at nowT
  let ny = 0.2;
  for (let i = 1; i < points.length; i++) {
    if (points[i].t >= nowT) {
      const p0 = points[i - 1], p1 = points[i];
      const tt = (nowT - p0.t) / (p1.t - p0.t);
      // approximation via cubic; use ease
      const e = tt * tt * (3 - 2 * tt);
      ny = p0.y + (p1.y - p0.y) * e;
      break;
    }
  }

  return (
    <div className="tide-chart">
      <svg viewBox={`0 0 ${W} ${H + 8}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="tideFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B8CDC8" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#B8CDC8" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="tideLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6B9694"/>
            <stop offset="50%" stopColor="#1B3654"/>
            <stop offset="100%" stopColor="#6B9694"/>
          </linearGradient>
        </defs>
        <path d={fillPath} fill="url(#tideFill)"/>
        <path d={path} fill="none" stroke="url(#tideLine)" strokeWidth="2" strokeLinecap="round"/>
        {/* now marker */}
        <line x1={x(nowT)} x2={x(nowT)} y1={0} y2={H} stroke="#C45A3E" strokeWidth="1" strokeDasharray="2 3" opacity="0.6"/>
        <circle cx={x(nowT)} cy={y(ny)} r="5" fill="#C45A3E"/>
        <circle cx={x(nowT)} cy={y(ny)} r="9" fill="#C45A3E" opacity="0.18"/>
        {/* tide event markers */}
        <circle cx={x(0.18)} cy={y(1.0) - 2} r="3" fill="#6B9694"/>
        <circle cx={x(0.45)} cy={y(0.05) + 2} r="3" fill="#1B3654"/>
        <circle cx={x(0.71)} cy={y(0.95) - 2} r="3" fill="#6B9694"/>
        <circle cx={x(0.97)} cy={y(0.1) + 2} r="3" fill="#1B3654"/>
      </svg>
      <div className="tide-marks">
        <span>12a</span><span>4a</span><span>8a</span>
        <span style={{ color: '#C45A3E', fontWeight: 700 }}>Now 10:18a</span>
        <span>4p</span><span>8p</span><span>12a</span>
      </div>
    </div>
  );
}

// ---------- SIDEBAR ----------
function Sidebar({ current, setCurrent }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><img src="assets/logo.png" alt="ON LBI"/></div>
        <div className="brand-meta">
          <span className="wordmark">on lbi</span>
          <span className="tagline">Long Beach Island</span>
        </div>
      </div>

      <div>
        <div className="nav-section-label">The Island</div>
        <nav className="nav">
          {NAV.slice(0, 4).map(n => (
            <button key={n.id} className="nav-item" aria-current={current === n.id}
              onClick={() => setCurrent(n.id)}>
              <IconC name={n.icon}/>
              <span>{n.label}</span>
              {n.meta && <span className="nav-meta">{n.meta}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div>
        <div className="nav-section-label">Practical</div>
        <nav className="nav">
          {NAV.slice(4).map(n => (
            <button key={n.id} className="nav-item" aria-current={current === n.id}
              onClick={() => setCurrent(n.id)}>
              <IconC name={n.icon}/>
              <span>{n.label}</span>
              {n.dot && <span className="nav-dot"/>}
              {n.meta && <span className="nav-meta">{n.meta}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-foot">
        <span className="live-dot">Live · just now</span>
        <span>Real-time beach data for LBI, NJ</span>
      </div>
    </aside>
  );
}

// ---------- TOPBAR ----------
function Topbar({ date }) {
  return (
    <div className="topbar">
      <div className="crumbs"><strong>Today</strong> · Saturday, May 9</div>
      <span className="spacer"/>
      <button className="icon-btn"><Icon.Search/> Search the island</button>
      <button className="icon-btn"><Icon.Calendar/> Tomorrow</button>
      <button className="icon-btn primary"><Icon.Bell/> 1 Alert</button>
    </div>
  );
}

// ---------- BEACH SCORE ----------
function BeachScore() {
  return (
    <div className="card score-card">
      <div className="card-head">
        <div>
          <h2 className="card-title">Beach Day Score</h2>
          <div className="card-sub" style={{ marginTop: 4 }}>How LBI feels right now</div>
        </div>
        <button className="section-link">Methodology <Icon.ArrowUpRight/></button>
      </div>

      <div className="score-grid">
        <div className="score-num">88<sub>/100</sub></div>
        <div className="score-meta">
          <div className="score-verdict">A great day to be on the sand.</div>
          <div className="score-bullets">
            <span>Calm SSW breeze · steady at 12 mph</span>
            <span>Water warming through afternoon</span>
            <span className="warn">UV 8 — sunscreen + reapply by 1 pm</span>
          </div>
        </div>
      </div>

      <div className="score-bar">
        <div className="score-bar-track">
          <div className="score-bar-fill" style={{ width: '88%' }}/>
        </div>
        <div className="score-bar-labels">
          <span>Stormy</span><span>Decent</span><span>Great</span><span>Peak</span>
        </div>
      </div>

      <div className="rip-status">
        <span><Icon.Wave style={{ width: 16, height: 16, verticalAlign: -3, marginRight: 8 }}/>
          Rip current risk · <strong>Low across the island</strong></span>
        <span style={{ fontSize: 11, opacity: 0.7, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Updated 8:42 am</span>
      </div>
    </div>
  );
}

// ---------- TIDES CARD ----------
function TidesCard() {
  return (
    <div className="card">
      <div className="card-head">
        <h2 className="card-title">Today's Tides</h2>
        <span className="card-sub">High slack 10:45 am</span>
      </div>
      <TideChart/>
      <div className="tide-events">
        {TIDES.map((t, i) => (
          <div key={i} className={`tide-event ${i === 1 ? 'now' : ''}`}>
            <div className="lab">{t.lab}{i === 1 ? ' · Now' : ''}</div>
            <div className="time">{t.time}</div>
            <div className="ft">{t.ft}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- FORECAST ----------
function Forecast({ activeIdx, setActiveIdx }) {
  return (
    <div className="card">
      <div className="card-head">
        <h2 className="card-title">Five-day outlook</h2>
        <button className="section-link">Hourly <Icon.ArrowRight/></button>
      </div>
      <div className="forecast">
        {FORECAST.map((d, i) => (
          <div key={d.dow} className={`day ${i === activeIdx ? 'active' : ''}`}
            onClick={() => setActiveIdx(i)}>
            <div className="dow">{d.dow}</div>
            <div className="ico"><IconC name={d.ico}/></div>
            <div className="hi">{d.hi}°</div>
            <div className="lo">{d.lo}°</div>
            <div className="scorechip">{d.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- METRICS ----------
function MetricsGrid() {
  const items = [
    { ico: 'Bridge', val: 12, suf: 'min', lab: 'Bridge wait' },
    { ico: 'Wave', val: 72, suf: '°', lab: 'Water temp' },
    { ico: 'UV', val: 8, suf: '', lab: 'UV index · high' },
    { ico: 'Umbrella', val: '6/6', suf: '', lab: 'Beaches open' },
  ];
  return (
    <div className="metrics">
      {items.map((m, i) => (
        <div className="metric" key={i}>
          <div className="metric-ico"><IconC name={m.ico}/></div>
          <div>
            <div className="metric-val">{m.val}<small>{m.suf && ' ' + m.suf}</small></div>
            <div className="metric-lab">{m.lab}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- BEACH STATUS ----------
function BeachStatus() {
  return (
    <div className="card">
      <div className="card-head">
        <h2 className="card-title">Beach status</h2>
        <button className="section-link">All beaches <Icon.ArrowRight/></button>
      </div>
      <div className="beaches">
        {BEACHES.map((b, i) => (
          <div className="beach" key={i}>
            <span className={`beach-status ${b.status === 'warn' ? 'warn' : ''}`}/>
            <div className="beach-name">
              {b.name}
              {b.tag && <span className={`beach-tag ${b.tag}`}>{b.tagLabel}</span>}
            </div>
            <div className="beach-temp">{b.temp}°</div>
            <div className="beach-go"><Icon.ArrowRight/></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- EVENTS ----------
function Happening() {
  return (
    <div className="card">
      <div className="card-head">
        <h2 className="card-title">Happening today</h2>
        <button className="section-link">Full calendar <Icon.ArrowRight/></button>
      </div>
      <div className="events">
        {EVENTS.map((e, i) => (
          <div className="event" key={i}>
            <div className="event-time">
              <span className="h">{e.hour}</span>
              <span className="ap">{e.ap}</span>
            </div>
            <div>
              <div className="event-title">{e.title}</div>
              <div className="event-meta">{e.meta}</div>
            </div>
            <span className={`event-price ${e.free ? 'free' : ''}`}>{e.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- HERO ----------
function Hero({ tweaks }) {
  return (
    <div className="hero">
      <div className="hero-row">
        <div>
          <div className="hero-eyebrow">Long Beach Island · Saturday May 9</div>
          <h1>Today <em>on</em><br/>the island.</h1>
          <div className="hero-sub">
            Clear skies and a soft southwest breeze. <strong>High tide at 10:45.</strong> The bridge is moving — go now if you're going.
          </div>
        </div>
        <div>
          <div className="hero-temps">
            <span className="big">81</span><span className="deg">°</span>
            <span className="lo">/ 65°</span>
          </div>
          <div className="hero-condition">Sunny · feels 84°</div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <div className="label">Water</div>
          <div className="val">72<small>°F</small></div>
          <div className="sub">Warming through 3 pm</div>
        </div>
        <div className="hero-stat">
          <div className="label">Wind</div>
          <div className="val">SSW 12</div>
          <div className="sub">Light, steady</div>
        </div>
        <div className="hero-stat">
          <div className="label">UV Index</div>
          <div className="val">8<small>/11</small></div>
          <div className="sub">High · reapply at 1 pm</div>
        </div>
        <div className="hero-stat">
          <div className="label">Bridge</div>
          <div className="val">12<small> min</small></div>
          <div className="sub">Causeway WB · light</div>
        </div>
      </div>
    </div>
  );
}

// ---------- APP ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "coastal",
  "density": "comfortable",
  "showHero": true
}/*EDITMODE-END*/;

function App() {
  const [current, setCurrent] = useState('today');
  const [activeDay, setActiveDay] = useState(0);
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  // Palette tweak
  useEffect(() => {
    const root = document.documentElement;
    if (tweaks.palette === 'sunset') {
      root.style.setProperty('--navy', '#3A2A4E');
      root.style.setProperty('--navy-deep', '#241934');
      root.style.setProperty('--teal', '#C2856F');
      root.style.setProperty('--teal-deep', '#9A5A42');
      root.style.setProperty('--seafoam', '#E8C9B8');
      root.style.setProperty('--foam', '#F4E6DC');
      root.style.setProperty('--coral', '#B83A3A');
    } else if (tweaks.palette === 'classic') {
      root.style.setProperty('--navy', '#0F2540');
      root.style.setProperty('--navy-deep', '#081830');
      root.style.setProperty('--teal', '#3E6E8E');
      root.style.setProperty('--teal-deep', '#244E6E');
      root.style.setProperty('--seafoam', '#B8C9D6');
      root.style.setProperty('--foam', '#E0E8EF');
      root.style.setProperty('--coral', '#B5402C');
    } else {
      // coastal default
      root.style.setProperty('--navy', '#1B3654');
      root.style.setProperty('--navy-deep', '#102742');
      root.style.setProperty('--teal', '#6B9694');
      root.style.setProperty('--teal-deep', '#486C6B');
      root.style.setProperty('--seafoam', '#B8CDC8');
      root.style.setProperty('--foam', '#E8EFEA');
      root.style.setProperty('--coral', '#C45A3E');
    }
  }, [tweaks.palette]);

  // Density tweak
  useEffect(() => {
    const root = document.documentElement;
    if (tweaks.density === 'compact') {
      root.style.setProperty('--r-lg', '14px');
      root.style.setProperty('--r-md', '10px');
    } else {
      root.style.setProperty('--r-lg', '22px');
      root.style.setProperty('--r-md', '16px');
    }
  }, [tweaks.density]);

  return (
    <div className="app" data-screen-label="Today on LBI">
      <Sidebar current={current} setCurrent={setCurrent}/>
      <main className="main">
        <Topbar/>
        <div className="content">
          <div className="col">
            {tweaks.showHero && <Hero tweaks={tweaks}/>}
            <button className="banner">
              <span className="banner-tag">Happy Hour</span>
              <span className="banner-text"><strong>Two spots running deals right now</strong> — Black Whale & The Gables, til 7 pm</span>
              <Icon.ArrowRight className="banner-arrow"/>
            </button>
            <BeachScore/>
            <TidesCard/>
            <Forecast activeIdx={activeDay} setActiveIdx={setActiveDay}/>
          </div>
          <div className="col">
            <MetricsGrid/>
            <BeachStatus/>
            <Happening/>
          </div>
        </div>
      </main>

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Palette">
            <window.TweakRadio label="Theme" value={tweaks.palette} onChange={v => setTweak('palette', v)}
              options={[
                { label: 'Coastal', value: 'coastal' },
                { label: 'Sunset', value: 'sunset' },
                { label: 'Classic', value: 'classic' },
              ]}/>
          </window.TweakSection>
          <window.TweakSection label="Layout">
            <window.TweakRadio label="Density" value={tweaks.density} onChange={v => setTweak('density', v)}
              options={[
                { label: 'Soft', value: 'comfortable' },
                { label: 'Tight', value: 'compact' },
              ]}/>
            <window.TweakToggle label="Show hero" value={tweaks.showHero} onChange={v => setTweak('showHero', v)}/>
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

window.App = App;
