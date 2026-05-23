import { useState, useEffect } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  ocean:   "#0077b6",
  sky:     "#00b4d8",
  sand:    "#f4e3b2",
  seafoam: "#90e0ef",
  dark:    "#0d1b2a",
  card:    "#ffffff",
  bg:      "#f0f6ff",
  muted:   "#6b7a90",
  green:   "#16a34a",
  amber:   "#d97706",
  red:     "#dc2626",
  access:  "#7c3aed",
  coral:   "#e76f51",
  teal:    "#2a9d8f",
};

const NAV = ["🌊","🏖️","🍽️","🎉","🏄","🚌","🚻","♿","👥","🛠️"];
const NAV_LABELS = ["Home","Beaches","Eats & HH","What's On","Activities","Getting Around","Restrooms","Access","Community","Admin"];

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const BEACHES = [
  { name:"Beach Haven", town:"Beach Haven", temp:"72°F", surf:"2-3ft", wind:"SSW 12mph", status:"green", badge:"🏆 Best Today", parking:"Lot A: Open · Lot B: Full", fee:"$8/day", badgeReq:true, mat:true, lifeguard:true },
  { name:"Ship Bottom", town:"Ship Bottom", temp:"71°F", surf:"1-2ft", wind:"S 9mph", status:"green", badge:"", parking:"Street: Open", fee:"$6/day", badgeReq:true, mat:false, lifeguard:true },
  { name:"Surf City", town:"Surf City", temp:"70°F", surf:"2-3ft", wind:"SW 14mph", status:"amber", badge:"⚠️ Rip Risk", parking:"Lot 1: Limited", fee:"$7/day", badgeReq:true, mat:true, lifeguard:true },
  { name:"Harvey Cedars", town:"Harvey Cedars", temp:"71°F", surf:"1-2ft", wind:"S 10mph", status:"green", badge:"", parking:"Street: Open", fee:"$5/day", badgeReq:true, mat:false, lifeguard:true },
  { name:"Barnegat Light", town:"Barnegat Light", temp:"69°F", surf:"3-4ft", wind:"NE 18mph", status:"amber", badge:"🌊 Choppy", parking:"State Park: Open", fee:"Free", badgeReq:false, mat:false, lifeguard:false },
  { name:"Holgate", town:"Long Beach Twp", temp:"70°F", surf:"1-2ft", wind:"S 8mph", status:"green", badge:"🦅 Wildlife Area", parking:"Limited: Open", fee:"$5/day", badgeReq:true, mat:false, lifeguard:false },
];

const TIDES = [
  { time:"4:22 AM", type:"Low", height:"0.3ft" },
  { time:"10:45 AM", type:"High", height:"4.8ft" },
  { time:"5:01 PM", type:"Low", height:"0.5ft" },
  { time:"11:18 PM", type:"High", height:"4.6ft" },
];

const EVENTS_DATA = [
  { title:"ChowderFest", venue:"Beach Haven", time:"10 AM – 6 PM", cat:"Food", icon:"🍲" },
  { title:"LBI Triathlon", venue:"Ship Bottom", time:"7 AM Start", cat:"Sports", icon:"🏃" },
  { title:"Viking Village Fish Market", venue:"Barnegat Light", time:"6 AM – 2 PM", cat:"Market", icon:"🐟" },
  { title:"Live Jazz at Buckalew's", venue:"Beach Haven", time:"8 PM – 11 PM", cat:"Music", icon:"🎷" },
  { title:"Kayak Tour – Barnegat Bay", venue:"Surf City", time:"9 AM & 2 PM", cat:"Activity", icon:"🛶" },
  { title:"Sunset Yoga on the Beach", venue:"Harvey Cedars", time:"6:30 PM", cat:"Wellness", icon:"🧘" },
];

// ─── HAPPY HOUR DATA ──────────────────────────────────────────────────────────
const HAPPY_HOURS = [
  {
    id:1, name:"Buckalew's Restaurant & Bar", town:"Beach Haven", emoji:"🍺",
    hours:"4 PM – 6 PM", daysActive:[1,2,3,4,5],
    deals:["$2 off all drafts","$5 house cocktails","$1 oysters (limit 12)","Half-price apps"],
    tags:["Drafts","Cocktails","Oysters","Food"],
    status:"active", opensIn:null, closesIn:"Ends in 38 min",
    vibe:"Lively bar, outdoor deck", priceRange:"$$", phone:"(609) 492-1065",
    tip:"🦪 Oysters go fast — get there by 4:15",
  },
  {
    id:2, name:"Daddy O Hotel & Bar", town:"Beach Haven", emoji:"🍹",
    hours:"5 PM – 7 PM", daysActive:[1,2,3,4,5,6,7],
    deals:["$6 craft cocktails","$4 house wine","$5 local drafts","$8 flatbreads"],
    tags:["Cocktails","Wine","Food","Daily"],
    status:"active", opensIn:null, closesIn:"Ends in 1h 22min",
    vibe:"Chic boutique hotel bar, rooftop views", priceRange:"$$$", phone:"(609) 492-1300",
    tip:"💡 Rooftop fills up — grab a spot early on weekends",
  },
  {
    id:3, name:"Blue Water Bar & Grill", town:"Surf City", emoji:"🌊",
    hours:"3 PM – 5 PM", daysActive:[1,2,3,4,5],
    deals:["$3 domestic bottles","$5 frozen drinks","$6 margaritas","Shrimp cocktail $8"],
    tags:["Beer","Frozen Drinks","Seafood"],
    status:"upcoming", opensIn:"Opens in 1h 10min", closesIn:null,
    vibe:"Casual waterfront, bay views", priceRange:"$$", phone:"(609) 494-7555",
    tip:"🌅 Best bay sunset views on the island during HH",
  },
  {
    id:4, name:"The Bayview Bistro", town:"Ship Bottom", emoji:"🥂",
    hours:"4:30 PM – 6:30 PM", daysActive:[3,4,5,6,7],
    deals:["$7 signature sangria","$5 draft beer","Half-off charcuterie board","$9 lobster bisque"],
    tags:["Wine","Cocktails","Food","Weekends"],
    status:"upcoming", opensIn:"Opens in 1h 45min", closesIn:null,
    vibe:"Upscale casual, bay-side patio", priceRange:"$$$", phone:"(609) 494-3474",
    tip:"🧀 The charcuterie board is massive — great to share",
  },
  {
    id:5, name:"Harvey Cedars Shellfish Co.", town:"Harvey Cedars", emoji:"🦞",
    hours:"4 PM – 6 PM", daysActive:[5,6,7],
    deals:["$1.50 littleneck clams","$2 oysters on the half shell","$5 local craft beer","$6 white wine"],
    tags:["Seafood","Beer","Wine","Weekends"],
    status:"upcoming", opensIn:"Opens in 38 min", closesIn:null,
    vibe:"Raw bar paradise, no-frills picnic tables", priceRange:"$$", phone:"(609) 494-7112",
    tip:"🐚 Best raw bar on the island, hands down — locals only secret",
  },
  {
    id:6, name:"Black Whale Bar & Fish House", town:"Beach Haven", emoji:"🐋",
    hours:"3 PM – 6 PM", daysActive:[1,2,3,4,5,6,7],
    deals:["$3 off all cocktails","$5 wine","$4 domestic beer","$10 fish tacos"],
    tags:["Cocktails","Beer","Food","Daily"],
    status:"closed", opensIn:"Opens tomorrow 3 PM", closesIn:null,
    vibe:"Nautical-themed, locals' favorite", priceRange:"$$", phone:"(609) 492-0025",
    tip:"🌮 Fish tacos are the move every time",
  },
  {
    id:7, name:"Kubel's Too", town:"Barnegat Light", emoji:"🦀",
    hours:"4 PM – 6 PM", daysActive:[1,2,3,4,5,6,7],
    deals:["$4 domestic drafts","$6 frozen drinks","Buy-one-get-one appetizers","$5 house wine"],
    tags:["Beer","Frozen Drinks","Food","Daily"],
    status:"upcoming", opensIn:"Opens in 1h 38min", closesIn:null,
    vibe:"Casual neighborhood bar, North end", priceRange:"$", phone:"(609) 494-2627",
    tip:"🦀 Best spot on the north end — worth the drive up",
  },
  {
    id:8, name:"The Terrace Tavern", town:"Beach Haven", emoji:"🎸",
    hours:"5 PM – 7 PM", daysActive:[5,6,7],
    deals:["$3 well drinks","$4 drafts","$5 house wine","$7 appetizer specials"],
    tags:["Beer","Cocktails","Live Music","Weekends"],
    status:"upcoming", opensIn:"Opens in 2h 05min", closesIn:null,
    vibe:"Dive-ish with live music on weekends", priceRange:"$", phone:"(609) 492-4400",
    tip:"🎸 Live music starts at 6 PM on Fridays and Saturdays",
  },
];

// ─── RESTROOMS DATA ───────────────────────────────────────────────────────────
const RESTROOMS = [
  { name:"Beach Haven Boardwalk Facility", town:"Beach Haven", hours:"8 AM – 10 PM", condition:"good", changing:true, accessible:true, showers:true, enclosed:true, note:"Changing table in family restroom" },
  { name:"Fantasy Island Area Restroom", town:"Beach Haven", hours:"9 AM – 9 PM", condition:"good", changing:true, accessible:true, showers:false, enclosed:true, note:"Large family restroom available" },
  { name:"Surf City Municipal Beach", town:"Surf City", hours:"8 AM – 8 PM", condition:"fair", changing:false, accessible:true, showers:true, enclosed:true, note:"Outdoor rinse showers only" },
  { name:"Ship Bottom Beach Facility", town:"Ship Bottom", hours:"9 AM – 7 PM", condition:"good", changing:true, accessible:true, showers:true, enclosed:true, note:"Best maintained on the island" },
  { name:"Harvey Cedars Beach Access", town:"Harvey Cedars", hours:"9 AM – 6 PM", condition:"fair", changing:false, accessible:false, showers:false, enclosed:false, note:"Basic facility, no frills" },
  { name:"Barnegat Light State Park", town:"Barnegat Light", hours:"Dawn – Dusk", condition:"good", changing:false, accessible:true, showers:false, enclosed:true, note:"Park-style facility near lighthouse" },
  { name:"Bay Village Restrooms", town:"Beach Haven", hours:"9 AM – 8 PM", condition:"good", changing:true, accessible:true, showers:false, enclosed:true, note:"Koala changing station available" },
  { name:"Holgate Wildlife Refuge", town:"Holgate", hours:"Sunrise – Sunset", condition:"basic", changing:false, accessible:false, showers:false, enclosed:false, note:"Portable only — plan accordingly" },
];

const CAM_FEEDS = [
  { name:"Beach Haven Boardwalk", desc:"Ocean Ave & Bay Ave intersection", status:"live", location:"Beach Haven" },
  { name:"Ship Bottom Bridge Cam", desc:"Route 72 Causeway approach", status:"live", location:"Ship Bottom" },
  { name:"Barnegat Inlet", desc:"Lighthouse point & inlet channel", status:"live", location:"Barnegat Light" },
  { name:"Surf City Beach", desc:"Ocean-facing, 9th St access", status:"live", location:"Surf City" },
  { name:"Harvey Cedars Bay", desc:"Barnegat Bay waterfront", status:"offline", location:"Harvey Cedars" },
  { name:"Beach Haven Gear", desc:"Main St & Centre St", status:"live", location:"Beach Haven" },
];

const SHUTTLE_ROUTES = [
  { route:"North Loop", stops:["Beach Haven","Surf City","Ship Bottom","Harvey Cedars","Barnegat Light"], freq:"Every 30 min", firstRun:"8:00 AM", lastRun:"11:00 PM", fare:"$2/ride or $8 day pass" },
  { route:"South Express", stops:["Ship Bottom","Brant Beach","Beach Haven","Holgate"], freq:"Every 45 min", firstRun:"9:00 AM", lastRun:"10:00 PM", fare:"$2/ride or $8 day pass" },
  { route:"Bay Connector", stops:["Beach Haven Yacht Club","Viking Village","Tuckerton Seaport"], freq:"3x daily", firstRun:"10:00 AM", lastRun:"6:00 PM", fare:"$5/ride" },
];

const NOTIF_TYPES = {
  poll:    { label:"Community Poll",   icon:"🗳️", color:"#0077b6", bg:"#e0f2fe", border:"#7dd3fc" },
  digest:  { label:"Morning Digest",   icon:"🌅", color:"#e09b00", bg:"#fff8e0", border:"#fde68a" },
  weather: { label:"Beach Conditions", icon:"🌊", color:"#0077b6", bg:"#e0f2fe", border:"#7dd3fc" },
  traffic: { label:"Traffic & Bridge", icon:"🚗", color:"#dc2626", bg:"#fff1f1", border:"#fca5a5" },
  community:{ label:"Community",       icon:"👥", color:"#7c3aed", bg:"#f3f0ff", border:"#c4b5fd" },
  access:  { label:"Accessibility",    icon:"♿", color:"#16a34a", bg:"#f0fdf4", border:"#86efac" },
};

const INIT_NOTIFS = [
  { id:1, type:"weather", title:"🌊 Beach Conditions Update", body:"Surf City — rip current advisory in effect. Swim near lifeguards.", time:"8 min ago", read:false },
  { id:2, type:"digest", title:"🌅 Good Morning, LBI!", body:"Today: High tide 10:45 AM · Water 72°F · UV Index 8 · Bridge wait 12 min", time:"2 hrs ago", read:false },
  { id:3, type:"community", title:"👥 New Photo Approved", body:"Your beach chair photo at Beach Haven was approved and is now live.", time:"3 hrs ago", read:true },
  { id:4, type:"traffic", title:"🚗 Bridge Traffic Alert", body:"Route 72 eastbound — 25 min delay due to accident. Use Route 539 alternate.", time:"Yesterday", read:true },
];

const NOTIF_PREFS_INIT = { poll:true, digest:true, weather:true, traffic:true, community:true, access:true };

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function Pill({ label, active, onClick, color }) {
  return (
    <button onClick={onClick} style={{
      padding:"5px 12px", borderRadius:20, border:`1.5px solid ${active ? (color||C.ocean) : "#d1d5db"}`,
      background: active ? (color||C.ocean) : "#fff", color: active ? "#fff" : C.muted,
      fontSize:12, fontWeight:600, cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap",
    }}>{label}</button>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background:C.card, borderRadius:16, padding:"14px 16px", boxShadow:"0 2px 8px rgba(0,0,0,0.07)", marginBottom:12, ...style }}>
      {children}
    </div>
  );
}

function StatChip({ label, value, color }) {
  return (
    <div style={{ flex:1, background:"#f8faff", borderRadius:12, padding:"8px 6px", textAlign:"center", minWidth:60 }}>
      <div style={{ fontSize:16, fontWeight:800, color: color||C.ocean }}>{value}</div>
      <div style={{ fontSize:9, color:C.muted, fontWeight:600, marginTop:1 }}>{label}</div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ onNavigate }) {
  const nowHH = HAPPY_HOURS.filter(h => h.status === "active");
  return (
    <div style={{ padding:"0 0 16px" }}>
      {/* Hero */}
      <div style={{ background:`linear-gradient(160deg, ${C.ocean} 0%, ${C.sky} 100%)`, padding:"28px 20px 24px", marginBottom:16, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }}/>
        <div style={{ position:"absolute", bottom:-20, left:-20, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
        <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.75)", letterSpacing:2, marginBottom:4 }}>LONG BEACH ISLAND</div>
        <div style={{ fontSize:28, fontWeight:900, color:"#fff", lineHeight:1.1, marginBottom:6 }}>On LBI</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.85)" }}>Saturday · May 9 · Your island guide</div>
        <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
          {[{v:"72°F",l:"Water"},{v:"81°F",l:"Air"},{v:"UV 8",l:"Index"},{v:"SSW 12",l:"Wind"}].map(s=>(
            <div key={s.l} style={{ background:"rgba(255,255,255,0.18)", borderRadius:10, padding:"6px 10px", backdropFilter:"blur(4px)" }}>
              <div style={{ fontSize:14, fontWeight:800, color:"#fff" }}>{s.v}</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)", fontWeight:600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>
        {/* Happy Hour NOW banner */}
        {nowHH.length > 0 && (
          <div onClick={() => onNavigate && onNavigate(2)} style={{ background:`linear-gradient(120deg, #e76f51, #f4a261)`, borderRadius:14, padding:"12px 16px", marginBottom:14, cursor:"pointer" }}>
            <div style={{ fontSize:11, fontWeight:800, color:"rgba(255,255,255,0.85)", letterSpacing:1.5 }}>🍹 HAPPY HOUR ACTIVE NOW</div>
            <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginTop:3 }}>{nowHH.length} spot{nowHH.length>1?"s":"" } running deals right now</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.85)", marginTop:2 }}>Tap to see all specials →</div>
          </div>
        )}

        {/* Beach Day Score */}
        <div style={{
          background:`linear-gradient(135deg, ${scoreColor(FORECAST[0].score)}22, ${scoreColor(FORECAST[0].score)}08)`,
          border:`2px solid ${scoreColor(FORECAST[0].score)}44`,
          borderRadius:16, padding:"14px 16px", marginBottom:12,
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:1.5 }}>BEACH DAY SCORE</div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:8, marginTop:4 }}>
                <div style={{ fontSize:52, fontWeight:900, color:scoreColor(FORECAST[0].score), lineHeight:1 }}>{FORECAST[0].score}</div>
                <div style={{ paddingBottom:6 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:scoreColor(FORECAST[0].score) }}>{scoreLabel(FORECAST[0].score)}</div>
                  <div style={{ fontSize:10, color:C.muted }}>out of 100</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:24 }}>{FORECAST[0].icon}</div>
              <div style={{ fontSize:11, fontWeight:700, color:C.dark, marginTop:4 }}>{FORECAST[0].high}° / {FORECAST[0].low}°</div>
              <div style={{ fontSize:10, color:C.muted }}>💨 {FORECAST[0].wind}</div>
            </div>
          </div>
          <div style={{ height:6, background:"#e5e7eb", borderRadius:4, overflow:"hidden", marginTop:10 }}>
            <div style={{ height:"100%", width:`${FORECAST[0].score}%`, background:scoreColor(FORECAST[0].score), borderRadius:4 }}/>
          </div>
        </div>

        {/* Today's Tides — visual chart */}
        <Card>
          <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:12 }}>🌊 Today's Tides</div>
          <TideChart />
        </Card>

        {/* Beach Status Quick View */}
        <Card>
          <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:10 }}>🏖️ Beach Status</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {BEACHES.slice(0,4).map((b,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background: b.status==="green"?C.green:C.amber, flexShrink:0 }}/>
                  <div style={{ fontSize:13, fontWeight:600, color:C.dark }}>{b.name}</div>
                  {b.badge && <div style={{ fontSize:10, background:"#fef9c3", color:"#92400e", borderRadius:6, padding:"1px 6px", fontWeight:600 }}>{b.badge}</div>}
                </div>
                <div style={{ fontSize:12, color:C.muted }}>{b.temp} · {b.surf}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Events */}
        <Card>
          <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:10 }}>🎉 Happening Today</div>
          {EVENTS_DATA.slice(0,3).map((e,i) => (
            <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:i<2?10:0 }}>
              <div style={{ fontSize:22 }}>{e.icon}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{e.title}</div>
                <div style={{ fontSize:11, color:C.muted }}>{e.venue} · {e.time}</div>
              </div>
            </div>
          ))}
        </Card>

        {/* Quick stat strip */}
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          <StatChip label="Bridge Wait" value="12 min" color={C.amber} />
          <StatChip label="Water Temp" value="72°F" color={C.ocean} />
          <StatChip label="UV Index" value="High 8" color="#dc2626" />
          <StatChip label="Beaches Open" value="6/6" color={C.green} />
        </div>
      </div>
    </div>
  );
}

// ─── BEACHES PAGE ─────────────────────────────────────────────────────────────
// ─── WEATHER & SURF DATA ─────────────────────────────────────────────────────
const FORECAST = [
  { day:"Today",   icon:"☀️",  high:81, low:68, ocean:72, wind:"SSW 12", swell:"2–3ft", period:"8s", uvIdx:8,  rip:"Low",    score:88 },
  { day:"Sun",     icon:"⛅",  high:78, low:66, ocean:71, wind:"S 15",   swell:"3–4ft", period:"9s", uvIdx:6,  rip:"Moderate", score:71 },
  { day:"Mon",     icon:"🌧️",  high:72, low:63, ocean:70, wind:"NE 20",  swell:"4–5ft", period:"10s",uvIdx:2,  rip:"High",   score:34 },
  { day:"Tue",     icon:"⛅",  high:75, low:64, ocean:70, wind:"SW 10",  swell:"2–3ft", period:"8s", uvIdx:5,  rip:"Low",    score:74 },
  { day:"Wed",     icon:"☀️",  high:83, low:69, ocean:73, wind:"S 8",    swell:"1–2ft", period:"7s", uvIdx:9,  rip:"Low",    score:94 },
];

const TIDES_CHART = [
  { hour:"12a", ft:2.1 }, { hour:"2a",  ft:0.8 }, { hour:"4a",  ft:0.3 },
  { hour:"6a",  ft:1.2 }, { hour:"8a",  ft:2.9 }, { hour:"10a", ft:4.8 },
  { hour:"12p", ft:3.9 }, { hour:"2p",  ft:1.8 }, { hour:"4p",  ft:0.5 },
  { hour:"6p",  ft:1.4 }, { hour:"8p",  ft:3.2 }, { hour:"10p", ft:4.6 },
];

const SURF_BREAKS = [
  { name:"Beach Haven Inlet", town:"Beach Haven",    level:"Intermediate", desc:"Punchy beach break, best on S–SW swell. Gets crowded by 9 AM.", rating:"⭐⭐⭐⭐" },
  { name:"Ship Bottom Pier",  town:"Ship Bottom",    level:"Beginner",      desc:"Mellow, long rides. Ideal for lessons. Lifeguard-patrolled.", rating:"⭐⭐⭐" },
  { name:"Surf City 9th St",  town:"Surf City",      level:"Intermediate",  desc:"Consistent peaks, good shape on today's SSW. Go early.", rating:"⭐⭐⭐⭐" },
  { name:"Harvey Cedars",     town:"Harvey Cedars",  level:"Intermediate",  desc:"Less crowded alternative, hollow at low tide.", rating:"⭐⭐⭐" },
  { name:"Barnegat Inlet",    town:"Barnegat Light", level:"Advanced",      desc:"Powerful, fast break near the jetty. Experts only. Rip risk.", rating:"⭐⭐⭐⭐⭐" },
];

// Beach Day Score helpers
function scoreColor(s) { return s>=80?C.green:s>=60?C.amber:s>=40?"#f97316":C.red; }
function scoreLabel(s) { return s>=80?"Great day 🤙":s>=60?"Decent day":"Skip it ⛈️"; }
function scoreBg(s)    { return s>=80?"#dcfce7":s>=60?"#fef9c3":s>=40?"#fff7ed":"#fee2e2"; }

function TideChart() {
  const max = Math.max(...TIDES_CHART.map(t=>t.ft));
  const now = 10; // index approx current hour (10am)
  return (
    <div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:60, marginBottom:4 }}>
        {TIDES_CHART.map((t, i) => {
          const pct = t.ft / max;
          const isNow = i === now;
          return (
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
              <div style={{
                width:"100%", borderRadius:"3px 3px 0 0",
                height: `${pct * 52}px`,
                background: isNow
                  ? `linear-gradient(180deg, ${C.sky}, ${C.ocean})`
                  : `linear-gradient(180deg, #bae6fd, #e0f2fe)`,
                position:"relative",
                boxShadow: isNow ? `0 0 6px ${C.ocean}88` : "none",
              }}>
                {isNow && (
                  <div style={{ position:"absolute", top:-16, left:"50%", transform:"translateX(-50%)", fontSize:8, fontWeight:800, color:C.ocean, whiteSpace:"nowrap" }}>NOW</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* X axis labels */}
      <div style={{ display:"flex", gap:3 }}>
        {TIDES_CHART.map((t,i) => (
          <div key={i} style={{ flex:1, textAlign:"center", fontSize:7, color: i===now?C.ocean:C.muted, fontWeight: i===now?800:400 }}>{t.hour}</div>
        ))}
      </div>
      {/* Tide key moments */}
      <div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
        {[{time:"4:22 AM",type:"Low",ft:"0.3ft"},{time:"10:45 AM",type:"High",ft:"4.8ft"},{time:"5:01 PM",type:"Low",ft:"0.5ft"},{time:"11:18 PM",type:"High",ft:"4.6ft"}].map((t,i)=>(
          <div key={i} style={{ flex:1, minWidth:60, textAlign:"center", background:t.type==="High"?"#e0f2fe":"#f0fdf4", borderRadius:8, padding:"5px 4px" }}>
            <div style={{ fontSize:9, fontWeight:800, color:t.type==="High"?C.ocean:C.green, letterSpacing:0.5 }}>{t.type.toUpperCase()}</div>
            <div style={{ fontSize:11, fontWeight:800, color:C.dark }}>{t.time}</div>
            <div style={{ fontSize:9, color:C.muted }}>{t.ft}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeachesPage() {
  const [innerTab, setInnerTab] = useState("conditions");
  const [filter, setFilter]     = useState("All");

  const today = FORECAST[0];
  const filters = ["All","🟢 Clear","⚠️ Advisory","No Badge Required"];
  const filtered = BEACHES.filter(b => {
    if (filter === "🟢 Clear") return b.status === "green";
    if (filter === "⚠️ Advisory") return b.status === "amber";
    if (filter === "No Badge Required") return !b.badgeReq;
    return true;
  });

  // rip current info
  const ripInfo = {
    Low:      { color:C.green,  bg:"#dcfce7", text:"Safe for most swimmers. Swim near lifeguards and stay aware." },
    Moderate: { color:C.amber,  bg:"#fef9c3", text:"Caution advised. Rip currents possible — stay near lifeguard stands." },
    High:     { color:C.red,    bg:"#fee2e2", text:"Dangerous conditions. Only strong swimmers. Heed all warnings." },
  };
  const rip = ripInfo[today.rip];

  return (
    <div style={{ padding:"0 0 24px" }}>
      {/* Inner tab switcher */}
      <div style={{ padding:"14px 16px 0" }}>
        <div style={{ display:"flex", gap:0, background:"#f0f6ff", borderRadius:12, padding:3, marginBottom:16 }}>
          {[["conditions","🏖️ Conditions"],["weather","🌤️ Weather & Surf"]].map(([k,l])=>(
            <button key={k} onClick={()=>setInnerTab(k)} style={{
              flex:1, padding:"9px 4px", borderRadius:10,
              background: innerTab===k?"#fff":"transparent", border:"none",
              fontSize:13, fontWeight:700,
              color: innerTab===k?(k==="weather"?"#0369a1":C.ocean):C.muted,
              boxShadow: innerTab===k?"0 1px 4px rgba(0,0,0,0.1)":"none",
              cursor:"pointer", transition:"all 0.15s",
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* ── CONDITIONS TAB ── */}
      {innerTab === "conditions" && (
        <div style={{ padding:"0 16px" }}>
          <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>Updated as of 8:42 AM today</div>
          <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:8, marginBottom:14 }}>
            {filters.map(f=><Pill key={f} label={f} active={filter===f} onClick={()=>setFilter(f)} />)}
          </div>
          <Card style={{ background:"#fffbeb", border:"1px solid #fde68a" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#92400e" }}>🎫 Beach Badge Info — 2025 Season</div>
            <div style={{ fontSize:11, color:"#78350f", marginTop:4, lineHeight:1.5 }}>Daily $8 · Weekly $20 · Season $60 · Kids under 12 free · Available at each borough office and most beaches</div>
          </Card>
          {filtered.map((b,i)=>(
            <Card key={i}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <div>
                  <div style={{ fontSize:16, fontWeight:800, color:C.dark }}>{b.name}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{b.town}</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:b.status==="green"?C.green:C.amber }}/>
                  {b.badge && <div style={{ fontSize:10, background:"#fef9c3", color:"#92400e", borderRadius:6, padding:"2px 7px", fontWeight:700 }}>{b.badge}</div>}
                </div>
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
                {[{l:"🌡️ Water",v:b.temp},{l:"🌊 Surf",v:b.surf},{l:"💨 Wind",v:b.wind}].map(s=>(
                  <div key={s.l} style={{ background:"#f0f6ff", borderRadius:8, padding:"4px 8px" }}>
                    <div style={{ fontSize:9, color:C.muted, fontWeight:600 }}>{s.l}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:C.dark }}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>🅿️ {b.parking}</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {b.lifeguard && <span style={{ fontSize:10, background:"#dcfce7", color:"#15803d", borderRadius:6, padding:"2px 8px", fontWeight:600 }}>🛟 Lifeguard On Duty</span>}
                {b.mat && <span style={{ fontSize:10, background:"#f3f0ff", color:"#7c3aed", borderRadius:6, padding:"2px 8px", fontWeight:600 }}>♿ Beach Mat Available</span>}
                {!b.badgeReq && <span style={{ fontSize:10, background:"#fef9c3", color:"#92400e", borderRadius:6, padding:"2px 8px", fontWeight:600 }}>🎫 No Badge Required</span>}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── WEATHER & SURF TAB ── */}
      {innerTab === "weather" && (
        <div style={{ padding:"0 16px" }}>

          {/* Beach Day Score hero */}
          <div style={{
            background: `linear-gradient(135deg, ${scoreColor(today.score)}22, ${scoreColor(today.score)}11)`,
            border: `2px solid ${scoreColor(today.score)}44`,
            borderRadius:20, padding:"18px 20px", marginBottom:14, position:"relative", overflow:"hidden",
          }}>
            <div style={{ position:"absolute", right:-10, top:-10, fontSize:80, opacity:0.08 }}>🌊</div>
            <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:1.5, marginBottom:6 }}>TODAY'S BEACH DAY SCORE</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:12 }}>
              <div style={{ fontSize:72, fontWeight:900, color:scoreColor(today.score), lineHeight:1 }}>{today.score}</div>
              <div style={{ paddingBottom:8 }}>
                <div style={{ fontSize:18, fontWeight:800, color:scoreColor(today.score) }}>{scoreLabel(today.score)}</div>
                <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>out of 100 · updated 8:42 AM</div>
              </div>
            </div>
            {/* Score breakdown bar */}
            <div style={{ marginTop:12, height:8, background:"#e5e7eb", borderRadius:4, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${today.score}%`, background:`linear-gradient(90deg, ${scoreColor(today.score)}88, ${scoreColor(today.score)})`, borderRadius:4, transition:"width 1s ease" }}/>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
              <div style={{ fontSize:9, color:C.muted }}>Stay home</div>
              <div style={{ fontSize:9, color:C.muted }}>Perfect day</div>
            </div>
          </div>

          {/* Key stats grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
            {[
              { icon:"🌡️", label:"Air Temp",   value:`${today.high}°F`,     sub:`Low ${today.low}°F` },
              { icon:"🌊", label:"Water Temp", value:`${today.ocean}°F`,    sub:"Ocean surface" },
              { icon:"☀️", label:"UV Index",   value:`${today.uvIdx}`,      sub:today.uvIdx>=8?"Very High":today.uvIdx>=6?"High":"Moderate" },
              { icon:"💨", label:"Wind",        value:today.wind,           sub:"Surface" },
              { icon:"🏄", label:"Swell",       value:today.swell,          sub:`Period ${today.period}` },
              { icon:"🌅", label:"Sunrise",     value:"5:48 AM",            sub:"Sunset 7:56 PM" },
            ].map((s,i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:12, padding:"10px 10px", boxShadow:"0 1px 4px rgba(0,0,0,0.07)", textAlign:"center" }}>
                <div style={{ fontSize:18 }}>{s.icon}</div>
                <div style={{ fontSize:14, fontWeight:800, color:C.dark, marginTop:4 }}>{s.value}</div>
                <div style={{ fontSize:9, color:C.muted, fontWeight:600, marginTop:1 }}>{s.label}</div>
                <div style={{ fontSize:9, color:C.muted, marginTop:1 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Rip current alert */}
          <div style={{ background:rip.bg, borderRadius:14, padding:"12px 14px", marginBottom:14, border:`1.5px solid ${rip.color}44` }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <div style={{ fontSize:16 }}>🌀</div>
              <div style={{ fontSize:13, fontWeight:800, color:rip.color }}>Rip Current Risk: {today.rip}</div>
            </div>
            <div style={{ fontSize:12, color:C.dark, lineHeight:1.5 }}>{rip.text}</div>
            <div style={{ fontSize:11, color:C.muted, marginTop:6 }}>If caught in a rip: swim parallel to shore, not against the current.</div>
          </div>

          {/* Tide chart */}
          <Card>
            <div style={{ fontSize:13, fontWeight:800, color:C.dark, marginBottom:12 }}>🌊 Tide Chart — Today</div>
            <TideChart />
          </Card>

          {/* Bay vs Ocean */}
          <Card>
            <div style={{ fontSize:13, fontWeight:800, color:C.dark, marginBottom:10 }}>🗺️ Bay vs. Ocean Conditions</div>
            <div style={{ display:"flex", gap:10 }}>
              {[
                { name:"Ocean Side", icon:"🌊", temp:"72°F", wave:"2–3ft", wind:"SSW 12mph", swim:"Moderate", color:C.ocean },
                { name:"Bay Side",   icon:"⚓", temp:"76°F", wave:"Calm",  wind:"SSW 8mph",  swim:"Calm",     color:C.teal  },
              ].map((side,i)=>(
                <div key={i} style={{ flex:1, background:`${side.color}11`, borderRadius:12, padding:"12px 10px", border:`1.5px solid ${side.color}33` }}>
                  <div style={{ fontSize:16, marginBottom:4 }}>{side.icon}</div>
                  <div style={{ fontSize:12, fontWeight:800, color:side.color }}>{side.name}</div>
                  <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:4 }}>
                    {[["🌡️","Temp",side.temp],["🏄","Waves",side.wave],["💨","Wind",side.wind],["🏊","Swim",side.swim]].map(([ic,l,v])=>(
                      <div key={l} style={{ display:"flex", justifyContent:"space-between" }}>
                        <div style={{ fontSize:10, color:C.muted }}>{ic} {l}</div>
                        <div style={{ fontSize:10, fontWeight:700, color:C.dark }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 5-day forecast */}
          <Card>
            <div style={{ fontSize:13, fontWeight:800, color:C.dark, marginBottom:12 }}>📅 5-Day Forecast</div>
            <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4 }}>
              {FORECAST.map((d,i)=>(
                <div key={i} style={{
                  flexShrink:0, textAlign:"center", padding:"10px 8px", borderRadius:12,
                  background: i===0 ? `${scoreColor(d.score)}15` : "#f8faff",
                  border: i===0 ? `1.5px solid ${scoreColor(d.score)}44` : "1.5px solid #f0f0f0",
                  minWidth:62,
                }}>
                  <div style={{ fontSize:10, fontWeight:800, color:i===0?C.ocean:C.muted }}>{d.day}</div>
                  <div style={{ fontSize:22, margin:"6px 0" }}>{d.icon}</div>
                  <div style={{ fontSize:12, fontWeight:800, color:C.dark }}>{d.high}°</div>
                  <div style={{ fontSize:10, color:C.muted }}>{d.low}°</div>
                  <div style={{ fontSize:10, color:C.ocean, marginTop:4, fontWeight:600 }}>{d.swell}</div>
                  {/* Mini score pill */}
                  <div style={{
                    marginTop:6, fontSize:9, fontWeight:800, borderRadius:6, padding:"2px 5px",
                    background:scoreBg(d.score), color:scoreColor(d.score),
                  }}>{d.score}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:10, color:C.muted, marginTop:10, textAlign:"center" }}>Score = Beach Day Score out of 100</div>
          </Card>

          {/* Surf breaks */}
          <Card>
            <div style={{ fontSize:13, fontWeight:800, color:C.dark, marginBottom:4 }}>🏄 Best Surf Breaks Today</div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:12 }}>Ranked for today's {today.swell} swell, {today.wind} wind</div>
            {SURF_BREAKS.map((b,i)=>(
              <div key={i} style={{ marginBottom: i<SURF_BREAKS.length-1?12:0, paddingBottom:i<SURF_BREAKS.length-1?12:0, borderBottom:i<SURF_BREAKS.length-1?"1px solid #f1f5f9":"none" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:800, color:C.dark }}>{b.name}</div>
                    <div style={{ fontSize:10, color:C.muted }}>{b.town}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                    <span style={{ fontSize:11 }}>{b.rating}</span>
                    <span style={{ fontSize:9, fontWeight:700, borderRadius:6, padding:"1px 7px",
                      background: b.level==="Beginner"?"#dcfce7":b.level==="Intermediate"?"#fef9c3":"#fee2e2",
                      color: b.level==="Beginner"?C.green:b.level==="Intermediate"?"#92400e":C.red,
                    }}>{b.level}</span>
                  </div>
                </div>
                <div style={{ fontSize:11, color:"#374151", marginTop:4, lineHeight:1.5 }}>{b.desc}</div>
              </div>
            ))}
          </Card>

          {/* UV & sun safety */}
          <Card style={{ background:"#fff7ed", border:"1px solid #fed7aa" }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#c2410c", marginBottom:8 }}>☀️ UV Index {today.uvIdx} — {today.uvIdx>=8?"Very High":"High"}</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {["SPF 30+ recommended","Reapply every 2 hours","Seek shade 11 AM–3 PM","Sunglasses & hat essential"].map((t,i)=>(
                <span key={i} style={{ fontSize:10, background:"#fff", border:"1px solid #fed7aa", borderRadius:6, padding:"3px 8px", color:"#92400e", fontWeight:600 }}>{t}</span>
              ))}
            </div>
          </Card>

        </div>
      )}
    </div>
  );
}

// ─── EATS PAGE ────────────────────────────────────────────────────────────────
const EATS = [
  { name:"Kubel's", town:"Barnegat Light", cat:"Seafood", wait:"20 min", rating:4.7, price:"$$", open:true, note:"Cash only, BYOB, legendary crab cakes", icon:"🦀" },
  { name:"Black Whale", town:"Beach Haven", cat:"Bar & Grill", wait:"35 min", rating:4.5, price:"$$", open:true, note:"Best fish tacos on the island", icon:"🐋" },
  { name:"Daddy O", town:"Beach Haven", cat:"Upscale", wait:"45 min", rating:4.8, price:"$$$", open:true, note:"Farm-to-table, amazing cocktails", icon:"🍽️" },
  { name:"The Chicken or the Egg", town:"Beach Haven", cat:"Breakfast", wait:"25 min", rating:4.6, price:"$", open:true, note:"Best breakfast spot, get there early", icon:"🍳" },
  { name:"Buckalew's", town:"Beach Haven", cat:"Sports Bar", wait:"15 min", rating:4.3, price:"$$", open:true, note:"Great deck, lively atmosphere", icon:"🍺" },
  { name:"Stefano's", town:"Beach Haven", cat:"Italian", wait:"50 min", rating:4.7, price:"$$$", open:true, note:"BYOB Italian, reservations strongly advised", icon:"🍝" },
  { name:"Harvey Cedars Shellfish", town:"Harvey Cedars", cat:"Raw Bar", wait:"10 min", rating:4.9, price:"$$", open:false, note:"Opens 4 PM · Raw bar perfection", icon:"🦪" },
  { name:"Scojo's", town:"Surf City", cat:"Casual", wait:"20 min", rating:4.4, price:"$", open:true, note:"Great wraps and sandwiches", icon:"🌯" },
];

function EatsPage() {
  const [innerTab, setInnerTab] = useState("eats");
  // — Eats state —
  const [filter, setFilter] = useState("All");
  const [openOnly, setOpenOnly] = useState(false);
  // — Happy Hour state —
  const [townFilter, setTownFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const cats = ["All","Seafood","Bar & Grill","Breakfast","Italian","Raw Bar"];
  const filteredEats = EATS.filter(e => {
    if (openOnly && !e.open) return false;
    if (filter !== "All" && e.cat !== filter) return false;
    return true;
  });

  const towns = ["All","Beach Haven","Surf City","Ship Bottom","Harvey Cedars","Barnegat Light"];
  const allTags = ["All","Drafts","Cocktails","Oysters","Food","Wine","Seafood","Live Music","Daily"];
  const statuses = ["All","🟢 Active Now","🕐 Opening Soon"];
  const filteredHH = HAPPY_HOURS.filter(h => {
    if (townFilter !== "All" && h.town !== townFilter) return false;
    if (tagFilter !== "All" && !h.tags.includes(tagFilter)) return false;
    if (statusFilter === "🟢 Active Now" && h.status !== "active") return false;
    if (statusFilter === "🕐 Opening Soon" && h.status !== "upcoming") return false;
    return true;
  });
  const activeCount = HAPPY_HOURS.filter(h => h.status === "active").length;
  const statusLabel = (h) => h.status==="active"?`🟢 ${h.closesIn}`:h.status==="upcoming"?`🕐 ${h.opensIn}`:`⚫ ${h.opensIn}`;
  const statusBg = (s) => s==="active"?"#dcfce7":s==="upcoming"?"#fffbeb":"#f3f4f6";
  const statusText = (s) => s==="active"?"#15803d":s==="upcoming"?"#92400e":C.muted;

  return (
    <div style={{ padding:"0 0 24px" }}>
      {/* Page header + inner tab switcher */}
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ fontSize:20, fontWeight:800, color:C.dark, marginBottom:12 }}>🍽️ Eats & Happy Hour</div>
        <div style={{ display:"flex", gap:0, background:"#f0f6ff", borderRadius:12, padding:3, marginBottom:16 }}>
          {[["eats","🍽️ Restaurants"],["hh","🍹 Happy Hour"]].map(([k,l])=>(
            <button key={k} onClick={()=>setInnerTab(k)} style={{
              flex:1, padding:"9px 4px", borderRadius:10,
              background: innerTab===k ? "#fff" : "transparent", border:"none",
              fontSize:13, fontWeight:700,
              color: innerTab===k ? (k==="hh"?"#e76f51":C.ocean) : C.muted,
              boxShadow: innerTab===k ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              cursor:"pointer", transition:"all 0.15s",
            }}>{l}{k==="hh" && activeCount>0 && <span style={{ marginLeft:5, fontSize:10, background:"#e76f51", color:"#fff", borderRadius:10, padding:"1px 6px" }}>{activeCount} live</span>}</button>
          ))}
        </div>
      </div>

      {/* ── RESTAURANTS TAB ── */}
      {innerTab === "eats" && (
        <div style={{ padding:"0 16px" }}>
          <div style={{ fontSize:12, color:C.muted, marginBottom:10 }}>Live wait times updated by staff</div>
          <div style={{ display:"flex", gap:8, marginBottom:10 }}>
            <button onClick={()=>setOpenOnly(!openOnly)} style={{
              padding:"5px 12px", borderRadius:20, border:`1.5px solid ${openOnly?C.green:"#d1d5db"}`,
              background:openOnly?C.green:"#fff", color:openOnly?"#fff":C.muted,
              fontSize:12, fontWeight:600, cursor:"pointer"
            }}>🟢 Open Now</button>
          </div>
          <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:8, marginBottom:14 }}>
            {cats.map(c=><Pill key={c} label={c} active={filter===c} onClick={()=>setFilter(c)} />)}
          </div>
          {filteredEats.map((e,i) => (
            <Card key={i} style={{ opacity: e.open ? 1 : 0.7 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <div style={{ fontSize:26 }}>{e.icon}</div>
                  <div>
                    <div style={{ fontSize:15, fontWeight:800, color:C.dark }}>{e.name}</div>
                    <div style={{ fontSize:11, color:C.muted }}>{e.town} · {e.cat} · {e.price}</div>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  {e.open
                    ? <div style={{ fontSize:11, background:"#dcfce7", color:"#15803d", borderRadius:8, padding:"3px 8px", fontWeight:700 }}>⏱ {e.wait}</div>
                    : <div style={{ fontSize:11, background:"#fee2e2", color:"#991b1b", borderRadius:8, padding:"3px 8px", fontWeight:700 }}>Closed</div>
                  }
                  <div style={{ fontSize:11, color:"#f59e0b", marginTop:4, fontWeight:700 }}>★ {e.rating}</div>
                </div>
              </div>
              <div style={{ fontSize:11, color:C.muted, marginTop:8, fontStyle:"italic" }}>💡 {e.note}</div>
            </Card>
          ))}
        </div>
      )}

      {/* ── HAPPY HOUR TAB ── */}
      {innerTab === "hh" && (
        <div>
          {/* HH hero strip */}
          <div style={{ background:`linear-gradient(135deg, #e76f51 0%, #f4a261 60%, #e9c46a 100%)`, padding:"14px 20px 16px", margin:"0 0 16px" }}>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.85)", fontWeight:700 }}>Every active deal · Barnegat Light to Holgate</div>
            <div style={{ display:"flex", gap:10, marginTop:10 }}>
              {[{v:HAPPY_HOURS.filter(h=>h.status==="active").length,l:"ACTIVE NOW"},{v:HAPPY_HOURS.filter(h=>h.status==="upcoming").length,l:"OPENING SOON"},{v:HAPPY_HOURS.length,l:"TOTAL SPOTS"}].map((s,i)=>(
                <div key={i} style={{ flex:1, background:"rgba(255,255,255,0.22)", borderRadius:10, padding:"8px 10px", backdropFilter:"blur(4px)" }}>
                  <div style={{ fontSize:20, fontWeight:900, color:"#fff" }}>{s.v}</div>
                  <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.85)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding:"0 16px" }}>
            {/* Status filter */}
            <div style={{ display:"flex", gap:8, marginBottom:10, overflowX:"auto", paddingBottom:4 }}>
              {statuses.map(s=>(
                <button key={s} onClick={()=>setStatusFilter(s)} style={{
                  padding:"6px 14px", borderRadius:20, whiteSpace:"nowrap",
                  border:`1.5px solid ${statusFilter===s?"#e76f51":"#d1d5db"}`,
                  background: statusFilter===s?"#e76f51":"#fff",
                  color: statusFilter===s?"#fff":C.muted,
                  fontSize:12, fontWeight:700, cursor:"pointer",
                }}>{s}</button>
              ))}
            </div>
            {/* Town filter */}
            <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6, marginBottom:6 }}>
              {towns.map(t=><Pill key={t} label={t} active={townFilter===t} onClick={()=>setTownFilter(t)} color="#e76f51" />)}
            </div>
            {/* Tag filter */}
            <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:8, marginBottom:14 }}>
              {allTags.map(t=><Pill key={t} label={t} active={tagFilter===t} onClick={()=>setTagFilter(t)} color={C.teal} />)}
            </div>

            <div style={{ fontSize:12, color:C.muted, fontWeight:600, marginBottom:10 }}>
              {filteredHH.length} spot{filteredHH.length!==1?"s":""} {townFilter!=="All"?`in ${townFilter}`:"across LBI"}
            </div>

            {filteredHH.length===0 && (
              <div style={{ textAlign:"center", padding:"40px 20px", color:C.muted }}>
                <div style={{ fontSize:32 }}>🍹</div>
                <div style={{ fontSize:14, fontWeight:600, marginTop:8 }}>No spots match your filters</div>
              </div>
            )}

            {filteredHH.map((h) => {
              const isOpen = expanded === h.id;
              return (
                <div key={h.id} style={{
                  background:"#fff", borderRadius:16, marginBottom:12,
                  boxShadow: h.status==="active" ? "0 2px 12px rgba(231,111,81,0.18)" : "0 2px 8px rgba(0,0,0,0.07)",
                  border: h.status==="active" ? "1.5px solid #f4a261" : "1.5px solid transparent",
                  overflow:"hidden",
                }}>
                  {h.status==="active" && (
                    <div style={{ background:"linear-gradient(90deg, #e76f51, #f4a261)", padding:"5px 16px" }}>
                      <div style={{ fontSize:10, fontWeight:800, color:"#fff", letterSpacing:1.5 }}>🟢 HAPPY HOUR ACTIVE NOW</div>
                    </div>
                  )}
                  <div style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                        <div style={{ fontSize:26 }}>{h.emoji}</div>
                        <div>
                          <div style={{ fontSize:15, fontWeight:800, color:C.dark, lineHeight:1.2 }}>{h.name}</div>
                          <div style={{ fontSize:11, color:C.muted }}>{h.town} · {h.priceRange}</div>
                        </div>
                      </div>
                      <div style={{ background:statusBg(h.status), color:statusText(h.status), fontSize:10, fontWeight:700, borderRadius:8, padding:"3px 8px", whiteSpace:"nowrap", flexShrink:0, marginLeft:8 }}>{statusLabel(h)}</div>
                    </div>
                    <div style={{ fontSize:11, fontWeight:700, color:C.ocean, marginBottom:10 }}>🕐 {h.hours} · {h.daysActive.length===7?"Daily":`${h.daysActive.length} days/wk`}</div>
                    <div style={{ marginBottom:10 }}>
                      {h.deals.slice(0,2).map((d,i)=>(
                        <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                          <div style={{ width:6, height:6, borderRadius:"50%", background:"#f4a261", flexShrink:0 }}/>
                          <div style={{ fontSize:12, color:C.dark, fontWeight:600 }}>{d}</div>
                        </div>
                      ))}
                      {h.deals.length>2 && !isOpen && <div style={{ fontSize:11, color:"#e76f51", fontWeight:700 }}>+{h.deals.length-2} more deals</div>}
                    </div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
                      {h.tags.map((t,i)=><span key={i} style={{ fontSize:10, background:"#fff7ed", color:"#c2410c", borderRadius:6, padding:"2px 7px", fontWeight:600 }}>{t}</span>)}
                    </div>
                    {isOpen && (
                      <div style={{ borderTop:"1px solid #f1f5f9", paddingTop:12, marginTop:4 }}>
                        <div style={{ fontSize:12, fontWeight:700, color:C.dark, marginBottom:8 }}>All Deals:</div>
                        {h.deals.map((d,i)=>(
                          <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                            <div style={{ width:6, height:6, borderRadius:"50%", background:"#f4a261", flexShrink:0 }}/>
                            <div style={{ fontSize:13, color:C.dark, fontWeight:600 }}>{d}</div>
                          </div>
                        ))}
                        <div style={{ background:"#fff7ed", borderRadius:10, padding:"10px 12px", marginTop:12, border:"1px solid #fed7aa" }}>
                          <div style={{ fontSize:11, fontWeight:700, color:"#c2410c", marginBottom:2 }}>LOCAL TIP</div>
                          <div style={{ fontSize:12, color:"#92400e" }}>{h.tip}</div>
                        </div>
                        <div style={{ marginTop:10, fontSize:12, color:C.muted }}>📞 {h.phone}</div>
                      </div>
                    )}
                    <button onClick={()=>setExpanded(isOpen?null:h.id)} style={{
                      width:"100%", marginTop:8, padding:"8px", borderRadius:10,
                      background: isOpen?"#f8faff":"#fff7ed",
                      border:`1px solid ${isOpen?"#e2e8f0":"#fed7aa"}`,
                      color: isOpen?C.muted:"#c2410c",
                      fontSize:12, fontWeight:700, cursor:"pointer",
                    }}>{isOpen?"▲ Show less":"▼ See all deals + local tip"}</button>
                  </div>
                </div>
              );
            })}

            <div style={{ background:"#f8faff", borderRadius:16, padding:"16px", border:"1.5px dashed #bfdbfe", marginTop:4, textAlign:"center" }}>
              <div style={{ fontSize:20 }}>🍺</div>
              <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginTop:6 }}>Know about a happy hour we're missing?</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>Business owners can claim their listing to add specials anytime</div>
              <button style={{ marginTop:10, padding:"8px 20px", borderRadius:20, background:C.ocean, color:"#fff", border:"none", fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Submit a Special</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WHATS HAPPENING PAGE ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const ALL_EVENTS = [
  { title:"ChowderFest", venue:"Beach Haven Boardwalk", time:"10 AM – 6 PM", cat:"Food", icon:"🍲", desc:"Annual chowder competition with 20+ restaurants, live music, and merchant market.", free:false, price:"$15 admission" },
  { title:"LBI Triathlon", venue:"Ship Bottom Beach", time:"7 AM Start", cat:"Sports", icon:"🏃", desc:"Ocean swim, bike through island, run to finish. All skill levels welcome.", free:false, price:"$75 registration" },
  { title:"Viking Village Fish Market", venue:"Barnegat Light", time:"6 AM – 2 PM", cat:"Market", icon:"🐟", desc:"Fresh-off-the-boat seafood directly from commercial fishing fleet. Cash preferred.", free:true, price:"Free entry" },
  { title:"Live Jazz at Buckalew's", venue:"Beach Haven", time:"8 PM – 11 PM", cat:"Music", icon:"🎷", desc:"Local jazz quartet on the outdoor deck. Full bar and food service.", free:true, price:"No cover" },
  { title:"Kayak Tour – Barnegat Bay", venue:"Surf City Marina", time:"9 AM & 2 PM", cat:"Activity", icon:"🛶", desc:"Guided 2-hour tour through the bay. Equipment provided. Advance booking required.", free:false, price:"$45/person" },
  { title:"Sunset Yoga on the Beach", venue:"Harvey Cedars", time:"6:30 PM", cat:"Wellness", icon:"🧘", desc:"One-hour flow class facing the ocean. Bring your own mat. All levels.", free:false, price:"$20/class" },
  { title:"HopSauce Festival", venue:"Beach Haven", time:"12 PM – 8 PM", cat:"Food", icon:"🌶️", desc:"Craft beer and artisan hot sauce pairing event with live music.", free:false, price:"$25 admission" },
  { title:"Lighthouse Climb", venue:"Barnegat Light State Park", time:"10 AM – 4 PM", cat:"Activity", icon:"🗼", desc:"Climb the historic Barnegat Lighthouse for panoramic island views.", free:false, price:"$5/adult, kids free" },
];

// ─── ACTIVITIES DATA ──────────────────────────────────────────────────────────
const ACTIVITIES = [
  // ON THE WATER
  {
    id:1, name:"Barnegat Bay Kayak Tours", cat:"On the Water", icon:"🛶", town:"Surf City",
    price:"$45/person", duration:"2 hrs", groupSize:"2–8", bookingRequired:true,
    seasonal:"May–Oct", rating:4.9, reviews:142,
    desc:"Guided paddle through the back-bay marshes. See osprey nests, dolphins in season, and the skyline of LBI from the water. All skill levels — equipment included.",
    tags:["Guided","Family Friendly","Dolphin Watching","All Levels"],
    tip:"🐬 Dolphin sightings are common on the morning tour June–August. Book the 8 AM slot.",
    phone:"(609) 494-7890", featured:true, availability:"Available today",
  },
  {
    id:2, name:"LBI Surf School", cat:"On the Water", icon:"🏄", town:"Ship Bottom",
    price:"$65/person", duration:"90 min", groupSize:"1–4", bookingRequired:true,
    seasonal:"Jun–Sep", rating:4.8, reviews:98,
    desc:"Private and group lessons for all ages. Foam boards and wetsuits provided. Instructors have taught thousands of first-timers over 15 seasons.",
    tags:["Lessons","Beginner Friendly","Kids OK","Equipment Included"],
    tip:"🌊 Book the 7 AM lesson — glassier water and smaller crowds than afternoon.",
    phone:"(609) 494-2233", featured:true, availability:"2 spots left today",
  },
  {
    id:3, name:"Barnegat Bay Sailing Charters", cat:"On the Water", icon:"⛵", town:"Beach Haven",
    price:"$120/person", duration:"3 hrs", groupSize:"2–6", bookingRequired:true,
    seasonal:"May–Oct", rating:4.7, reviews:67,
    desc:"Sunset and afternoon sails on a classic 38ft sloop. Captain provides narration on bay ecology and LBI history. BYOB welcome.",
    tags:["Scenic","Adults","BYOB","Sunset Sail"],
    tip:"🌅 The Friday sunset sail sells out every week — book a week ahead.",
    phone:"(609) 492-8811", featured:false, availability:"Available tomorrow",
  },
  {
    id:4, name:"Jet Ski & Waverunner Rentals", cat:"On the Water", icon:"🚤", town:"Surf City",
    price:"$90/hr", duration:"1 hr min", groupSize:"1–2 per ski", bookingRequired:false,
    seasonal:"Jun–Sep", rating:4.5, reviews:203,
    desc:"Self-guided waverunner rentals on Barnegat Bay. Quick safety briefing included. Must be 18+ to operate, 16+ with adult.",
    tags:["Thrill Seekers","No Experience Needed","Walk-in OK"],
    tip:"⛽ Fuel is included — they'll try to upsell you on an extra hour, which is usually worth it.",
    phone:"(609) 494-5500", featured:false, availability:"Walk-ins welcome",
  },
  {
    id:5, name:"Stand-Up Paddleboard Rentals", cat:"On the Water", icon:"🧍", town:"Harvey Cedars",
    price:"$30/hr", duration:"Flexible", groupSize:"Any", bookingRequired:false,
    seasonal:"May–Oct", rating:4.6, reviews:88,
    desc:"Flat-water SUP on the bay side. Perfect for beginners. Half and full-day rentals available. Delivery to bay beach access points.",
    tags:["Beginner Friendly","Solo or Group","Delivery Available","Kids OK"],
    tip:"🌊 Bay side only — much calmer than the ocean side. Great for kids.",
    phone:"(609) 494-3311", featured:false, availability:"Walk-ins welcome",
  },
  {
    id:6, name:"Back Bay Fishing Charters", cat:"On the Water", icon:"🎣", town:"Barnegat Light",
    price:"$95/person", duration:"4 hrs", groupSize:"4–8", bookingRequired:true,
    seasonal:"Apr–Nov", rating:4.8, reviews:176,
    desc:"Head boat and private fishing trips out of Viking Village. Flounder, striped bass, bluefish in season. Rods, bait, and cleaning included.",
    tags:["Fishing","All Ages","Equipment Included","Early Morning"],
    tip:"🐟 First mate knows every flounder hole in the bay. Tip well and ask questions.",
    phone:"(609) 494-0055", featured:true, availability:"Available today",
  },
  // ON LAND
  {
    id:7, name:"Bike Rentals — Island Pedals", cat:"On Land", icon:"🚲", town:"Beach Haven",
    price:"$20/day", duration:"Full day", groupSize:"Any", bookingRequired:false,
    seasonal:"Apr–Oct", rating:4.7, reviews:312,
    desc:"Beach cruisers, tandems, kids bikes, and tag-alongs. Helmet and lock included. Delivery to rental properties available for groups of 4+.",
    tags:["Family Friendly","Delivery Available","Kids OK","No Experience Needed"],
    tip:"🚲 The bike path runs 18 miles end-to-end — riding from Beach Haven to Barnegat Light is a bucket list LBI experience.",
    phone:"(609) 492-7433", featured:true, availability:"Walk-ins welcome",
  },
  {
    id:8, name:"Fantasy Island Amusement Park", cat:"On Land", icon:"🎡", town:"Beach Haven",
    price:"$5–$30", duration:"2–4 hrs", groupSize:"Any", bookingRequired:false,
    seasonal:"Jun–Sep", rating:4.6, reviews:891,
    desc:"Classic boardwalk rides, games, and arcade. 18 rides for all ages from toddlers to thrill-seekers. Free admission, pay per ride or buy a ride pass.",
    tags:["Family Friendly","Kids","Boardwalk","Rain or Shine"],
    tip:"🎠 Buy the unlimited wristband if you have kids under 10 — it pays for itself in 4 rides.",
    phone:"(609) 492-4000", featured:false, availability:"Open daily 6 PM–11 PM",
  },
  {
    id:9, name:"Thundering Surf Water Park", cat:"On Land", icon:"💦", town:"Beach Haven",
    price:"$32/adult · $26/child", duration:"Full day", groupSize:"Any", bookingRequired:false,
    seasonal:"Jun–Labor Day", rating:4.5, reviews:534,
    desc:"World's longest-operating waterpark. 8 giant slides, lazy river, splash zone for toddlers. The tipping bucket alone is worth the price of admission.",
    tags:["Family Friendly","Kids","Thrills","Full Day"],
    tip:"💦 Go on a Tuesday or Wednesday — weekends get very crowded by 11 AM.",
    phone:"(609) 492-0869", featured:false, availability:"Open 10 AM–6 PM",
  },
  {
    id:10, name:"Barnegat Lighthouse Climb", cat:"On Land", icon:"🗼", town:"Barnegat Light",
    price:"$5/adult · Kids free", duration:"1–2 hrs", groupSize:"Any", bookingRequired:false,
    seasonal:"Memorial Day–Labor Day", rating:4.9, reviews:1204,
    desc:"Climb 172 steps to the top of 'Old Barney' for 360° views of LBI, the inlet, and Island Beach State Park. Maritime forest trail at the base included.",
    tags:["Historic","Views","Family Friendly","Free for Kids","Walking Trail"],
    tip:"🌅 Go at sunrise for zero crowds and the best light. Parking lot opens at dawn.",
    phone:"(609) 494-2016", featured:true, availability:"Open daily 9 AM–4:30 PM",
  },
  {
    id:11, name:"Mini Golf — Putt-Putt LBI", cat:"On Land", icon:"⛳", town:"Beach Haven",
    price:"$12/adult · $9/child", duration:"1 hr", groupSize:"Any", bookingRequired:false,
    seasonal:"May–Sep", rating:4.4, reviews:267,
    desc:"18-hole nautical-themed course steps from the beach. Night glow golf on Friday and Saturday evenings after 8 PM.",
    tags:["Family Friendly","Evening Activity","Kids","All Ages"],
    tip:"⛳ Glow golf on Friday nights is legitimately fun even for adults.",
    phone:"(609) 492-1800", featured:false, availability:"Open daily 10 AM–10 PM",
  },
  // NATURE & WILDLIFE
  {
    id:12, name:"Holgate Wildlife Refuge Walk", cat:"Nature & Wildlife", icon:"🦅", town:"Holgate",
    price:"Free", duration:"1–3 hrs", groupSize:"Any", bookingRequired:false,
    seasonal:"Year round (nesting closures apply)", rating:4.8, reviews:445,
    desc:"Hike the southern tip of LBI through undeveloped barrier island habitat. Piping plovers, ospreys, herons, and migratory shorebirds. Bring water — no facilities.",
    tags:["Free","Nature","Birding","Dogs Allowed off-season","Year Round"],
    tip:"🦅 Binoculars are a must. The piping plover nesting area closes May–Aug but the rest is spectacular.",
    phone:"N/A — no reservations", featured:false, availability:"Dawn to dusk",
  },
  {
    id:13, name:"Viking Village Dock Tour", cat:"Nature & Wildlife", icon:"🐟", town:"Barnegat Light",
    price:"Free to walk around", duration:"1 hr", groupSize:"Any", bookingRequired:false,
    seasonal:"Year round", rating:4.7, reviews:328,
    desc:"NJ's largest commercial fishing port. Watch the fleet come in, buy fresh catch direct from boats, and browse the artist studios and galleries in the converted fish houses.",
    tags:["Free","Unique","Local Experience","Fresh Seafood","Year Round"],
    tip:"🚢 Fleet comes in around 6–8 AM. Show up early to watch them unload and buy straight off the boat.",
    phone:"N/A", featured:false, availability:"Best 6 AM–10 AM",
  },
  {
    id:14, name:"Dolphin & Whale Watch Cruises", cat:"Nature & Wildlife", icon:"🐬", town:"Beach Haven",
    price:"$38/adult · $25/child", duration:"2.5 hrs", groupSize:"Up to 40", bookingRequired:true,
    seasonal:"Jun–Sep", rating:4.7, reviews:189,
    desc:"Naturalist-guided offshore trips to spot bottlenose dolphins, harbor porpoises, and occasional humpback whales. 95% dolphin sighting rate in peak season.",
    tags:["Wildlife","Guided","Family Friendly","Ocean Trip"],
    tip:"🐳 Bring layers — it's 15° colder offshore even on hot days.",
    phone:"(609) 492-0333", featured:true, availability:"10 AM & 2 PM daily",
  },
];

const ACT_CATEGORIES = ["All","On the Water","On Land","Nature & Wildlife"];

// ─── ACTIVITIES PAGE ──────────────────────────────────────────────────────────
function ActivitiesPage() {
  const [cat, setCat] = useState("All");
  const [town, setTown] = useState("All");
  const [bookableOnly, setBookableOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const towns = ["All","Beach Haven","Surf City","Ship Bottom","Harvey Cedars","Barnegat Light","Holgate"];

  const filtered = ACTIVITIES.filter(a => {
    if (cat !== "All" && a.cat !== cat) return false;
    if (town !== "All" && a.town !== town) return false;
    if (bookableOnly && !a.bookingRequired) return false;
    if (freeOnly && a.price !== "Free") return false;
    return true;
  });

  const featured = ACTIVITIES.filter(a => a.featured);

  const catColor = (c) => c==="On the Water"?C.ocean:c==="On Land"?C.teal:C.green;
  const catBg = (c) => c==="On the Water"?"#e0f2fe":c==="On Land"?"#f0fdfa":"#f0fdf4";

  return (
    <div style={{ padding:"0 0 24px" }}>
      {/* Hero */}
      <div style={{ background:`linear-gradient(160deg, ${C.teal} 0%, ${C.ocean} 100%)`, padding:"22px 20px 20px" }}>
        <div style={{ fontSize:11, fontWeight:800, color:"rgba(255,255,255,0.75)", letterSpacing:2 }}>LONG BEACH ISLAND</div>
        <div style={{ fontSize:24, fontWeight:900, color:"#fff", marginTop:2 }}>🏄 Things To Do</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.9)", marginTop:4 }}>Water, land, wildlife — the full island experience</div>
        {/* Category quick-select */}
        <div style={{ display:"flex", gap:8, marginTop:14 }}>
          {ACT_CATEGORIES.map(c => (
            <button key={c} onClick={()=>setCat(c)} style={{
              padding:"7px 12px", borderRadius:20, fontSize:11, fontWeight:700,
              background: cat===c ? "#fff" : "rgba(255,255,255,0.18)",
              color: cat===c ? (c==="All"?C.dark:catColor(c)) : "#fff",
              border:"none", cursor:"pointer", whiteSpace:"nowrap",
              backdropFilter:"blur(4px)",
            }}>{c==="On the Water"?"🌊 Water":c==="On Land"?"🌴 Land":c==="Nature & Wildlife"?"🦅 Nature":"🗺️ All"}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:"16px 16px 0" }}>

        {/* Featured strip — only show when no filters active */}
        {cat==="All" && town==="All" && !bookableOnly && !freeOnly && (
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:12, fontWeight:800, color:C.dark, letterSpacing:0.5, marginBottom:10 }}>⭐ FEATURED THIS WEEK</div>
            <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:4 }}>
              {featured.map(a => (
                <div key={a.id} onClick={()=>setExpanded(expanded===a.id?null:a.id)} style={{
                  flexShrink:0, width:160, background:catBg(a.cat),
                  borderRadius:14, padding:"12px", cursor:"pointer",
                  border:`1.5px solid ${cat===a.cat?"transparent":"transparent"}`,
                  boxShadow:"0 2px 8px rgba(0,0,0,0.08)",
                }}>
                  <div style={{ fontSize:28, marginBottom:6 }}>{a.icon}</div>
                  <div style={{ fontSize:12, fontWeight:800, color:C.dark, lineHeight:1.3 }}>{a.name}</div>
                  <div style={{ fontSize:10, color:catColor(a.cat), fontWeight:700, marginTop:4 }}>{a.cat}</div>
                  <div style={{ fontSize:11, fontWeight:700, color:C.dark, marginTop:6 }}>{a.price}</div>
                  <div style={{ fontSize:10, color:C.muted, marginTop:2 }}>{a.duration}</div>
                  <div style={{ fontSize:10, background: a.availability.includes("left")?"#fef9c3":a.availability.includes("welcome")?"#f0fdf4":"#f0f6ff",
                    color: a.availability.includes("left")?"#92400e":a.availability.includes("welcome")?C.green:C.ocean,
                    borderRadius:6, padding:"2px 6px", fontWeight:700, marginTop:8, display:"inline-block" }}>{a.availability}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters row */}
        <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
          <button onClick={()=>setBookableOnly(!bookableOnly)} style={{
            padding:"5px 12px", borderRadius:20,
            border:`1.5px solid ${bookableOnly?C.ocean:"#d1d5db"}`,
            background:bookableOnly?C.ocean:"#fff", color:bookableOnly?"#fff":C.muted,
            fontSize:12, fontWeight:600, cursor:"pointer"
          }}>📅 Book in Advance</button>
          <button onClick={()=>setFreeOnly(!freeOnly)} style={{
            padding:"5px 12px", borderRadius:20,
            border:`1.5px solid ${freeOnly?C.green:"#d1d5db"}`,
            background:freeOnly?C.green:"#fff", color:freeOnly?"#fff":C.muted,
            fontSize:12, fontWeight:600, cursor:"pointer"
          }}>🆓 Free Activities</button>
        </div>

        {/* Town filter */}
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:8, marginBottom:14 }}>
          {towns.map(t=><Pill key={t} label={t} active={town===t} onClick={()=>setTown(t)} color={C.teal} />)}
        </div>

        {/* Results count + category label */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          <div style={{ fontSize:12, color:C.muted, fontWeight:600 }}>
            {filtered.length} activit{filtered.length!==1?"ies":"y"}{town!=="All"?` in ${town}`:""}
          </div>
          {cat!=="All" && (
            <div style={{ fontSize:11, fontWeight:700, color:catColor(cat), background:catBg(cat), borderRadius:8, padding:"3px 10px" }}>{cat}</div>
          )}
        </div>

        {filtered.length===0 && (
          <div style={{ textAlign:"center", padding:"40px 20px", color:C.muted }}>
            <div style={{ fontSize:36 }}>🏄</div>
            <div style={{ fontSize:14, fontWeight:600, marginTop:8 }}>Nothing matches those filters</div>
            <div style={{ fontSize:12, marginTop:4 }}>Try a different category or town</div>
          </div>
        )}

        {/* Activity cards */}
        {filtered.map(a => {
          const isExp = expanded === a.id;
          return (
            <div key={a.id} style={{
              background:"#fff", borderRadius:16, marginBottom:12,
              boxShadow: a.featured ? "0 2px 12px rgba(0,119,182,0.14)" : "0 2px 8px rgba(0,0,0,0.07)",
              border: a.featured ? `1.5px solid ${catColor(a.cat)}22` : "1.5px solid transparent",
              overflow:"hidden",
            }}>
              {/* Category color bar */}
              <div style={{ height:3, background:`linear-gradient(90deg, ${catColor(a.cat)}, ${catColor(a.cat)}88)` }}/>

              <div style={{ padding:"14px 16px" }}>
                {/* Header row */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <div style={{ fontSize:28 }}>{a.icon}</div>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <div style={{ fontSize:15, fontWeight:800, color:C.dark, lineHeight:1.2 }}>{a.name}</div>
                        {a.featured && <span style={{ fontSize:9, background:"#fef9c3", color:"#92400e", borderRadius:6, padding:"1px 6px", fontWeight:800 }}>⭐ FEATURED</span>}
                      </div>
                      <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>{a.town} · {a.cat}</div>
                    </div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0, marginLeft:8 }}>
                    <div style={{ fontSize:13, fontWeight:800, color:C.dark }}>{a.price}</div>
                    <div style={{ fontSize:10, color:C.muted }}>{a.duration}</div>
                  </div>
                </div>

                {/* Quick stat chips */}
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
                  <span style={{ fontSize:10, background:"#f0f6ff", color:C.ocean, borderRadius:6, padding:"2px 8px", fontWeight:600 }}>👥 {a.groupSize}</span>
                  <span style={{ fontSize:10, background: a.bookingRequired?"#fef9c3":"#f0fdf4", color:a.bookingRequired?"#92400e":C.green, borderRadius:6, padding:"2px 8px", fontWeight:600 }}>
                    {a.bookingRequired?"📅 Book ahead":"🚶 Walk-in OK"}
                  </span>
                  <span style={{ fontSize:10, background:"#f3f4f6", color:C.muted, borderRadius:6, padding:"2px 8px", fontWeight:600 }}>📅 {a.seasonal}</span>
                  <span style={{ fontSize:10, background:"#fff8e0", color:"#92400e", borderRadius:6, padding:"2px 8px", fontWeight:600 }}>★ {a.rating} ({a.reviews})</span>
                </div>

                {/* Description */}
                <div style={{ fontSize:12, color:"#374151", lineHeight:1.6, marginBottom:10 }}>{a.desc}</div>

                {/* Tags */}
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
                  {a.tags.map((t,i)=>(
                    <span key={i} style={{ fontSize:10, background:catBg(a.cat), color:catColor(a.cat), borderRadius:6, padding:"2px 7px", fontWeight:600 }}>{t}</span>
                  ))}
                </div>

                {/* Availability pill */}
                <div style={{ marginBottom:10 }}>
                  <span style={{ fontSize:11, fontWeight:700,
                    background: a.availability.includes("left")?"#fef9c3":a.availability.includes("welcome")?"#dcfce7":"#e0f2fe",
                    color: a.availability.includes("left")?"#92400e":a.availability.includes("welcome")?C.green:C.ocean,
                    borderRadius:8, padding:"3px 10px"
                  }}>🕐 {a.availability}</span>
                </div>

                {/* Expanded: local tip + phone */}
                {isExp && (
                  <div style={{ borderTop:"1px solid #f1f5f9", paddingTop:12, marginTop:4 }}>
                    <div style={{ background:"#f0fdf4", borderRadius:10, padding:"10px 12px", marginBottom:10, border:"1px solid #86efac" }}>
                      <div style={{ fontSize:11, fontWeight:800, color:C.green, marginBottom:2 }}>LOCAL TIP</div>
                      <div style={{ fontSize:12, color:"#166534" }}>{a.tip}</div>
                    </div>
                    {a.phone !== "N/A" && a.phone !== "N/A — no reservations" && (
                      <div style={{ fontSize:13, color:C.ocean, fontWeight:700 }}>📞 {a.phone}</div>
                    )}
                  </div>
                )}

                {/* Expand toggle */}
                <button onClick={()=>setExpanded(isExp?null:a.id)} style={{
                  width:"100%", marginTop:8, padding:"8px", borderRadius:10,
                  background: isExp?"#f8faff":catBg(a.cat),
                  border:`1px solid ${isExp?"#e2e8f0":catColor(a.cat)+"33"}`,
                  color: isExp?C.muted:catColor(a.cat),
                  fontSize:12, fontWeight:700, cursor:"pointer",
                }}>{isExp?"▲ Show less":"▼ Local tip + contact"}</button>
              </div>
            </div>
          );
        })}

        {/* Partner CTA */}
        <div style={{ background:"#f0fdfa", borderRadius:16, padding:"16px", border:"1.5px dashed #5eead4", marginTop:4, textAlign:"center" }}>
          <div style={{ fontSize:22 }}>🎣</div>
          <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginTop:6 }}>Run a tour, rental, or activity?</div>
          <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>Get listed and reach thousands of visitors looking for exactly what you offer</div>
          <button style={{ marginTop:10, padding:"8px 20px", borderRadius:20, background:C.teal, color:"#fff", border:"none", fontSize:12, fontWeight:700, cursor:"pointer" }}>
            + List Your Activity
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── WHATS HAPPENING PAGE ─────────────────────────────────────────────────────
function WhatsHappeningPage() {
  const [catFilter, setCatFilter] = useState("All");
  const [freeOnly, setFreeOnly] = useState(false);
  const cats = ["All","Food","Sports","Music","Activity","Wellness","Market"];
  const filtered = ALL_EVENTS.filter(e => {
    if (catFilter !== "All" && e.cat !== catFilter) return false;
    if (freeOnly && !e.free) return false;
    return true;
  });
  return (
    <div style={{ padding:"16px 16px 24px" }}>
      <div style={{ fontSize:20, fontWeight:800, color:C.dark, marginBottom:4 }}>🎉 What's Happening</div>
      <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>Saturday, May 9 · All day</div>
      <div style={{ display:"flex", gap:8, marginBottom:10 }}>
        <button onClick={()=>setFreeOnly(!freeOnly)} style={{
          padding:"5px 12px", borderRadius:20,
          border:`1.5px solid ${freeOnly?C.green:"#d1d5db"}`,
          background:freeOnly?C.green:"#fff", color:freeOnly?"#fff":C.muted,
          fontSize:12, fontWeight:600, cursor:"pointer"
        }}>🆓 Free Only</button>
      </div>
      <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:8, marginBottom:14 }}>
        {cats.map(c=><Pill key={c} label={c} active={catFilter===c} onClick={()=>setCatFilter(c)} />)}
      </div>
      {filtered.map((e,i) => (
        <Card key={i}>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <div style={{ fontSize:30 }}>{e.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ fontSize:15, fontWeight:800, color:C.dark, lineHeight:1.2 }}>{e.title}</div>
                <div style={{ fontSize:10, background: e.free?"#dcfce7":"#eff6ff", color: e.free?"#15803d":C.ocean, borderRadius:8, padding:"2px 8px", fontWeight:700, whiteSpace:"nowrap", marginLeft:8 }}>{e.price}</div>
              </div>
              <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>📍 {e.venue} · 🕐 {e.time}</div>
              <div style={{ fontSize:12, color:"#374151", marginTop:6, lineHeight:1.5 }}>{e.desc}</div>
              <div style={{ marginTop:6 }}>
                <span style={{ fontSize:10, background:"#f0f6ff", color:C.ocean, borderRadius:6, padding:"2px 8px", fontWeight:600 }}>{e.cat}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── GETTING AROUND PAGE ──────────────────────────────────────────────────────
function GetAroundPage() {
  const [tab, setTab] = useState("transit");
  return (
    <div style={{ padding:"16px 16px 24px" }}>
      <div style={{ fontSize:20, fontWeight:800, color:C.dark, marginBottom:14 }}>🚌 Getting Around</div>
      <div style={{ display:"flex", gap:0, background:"#f0f6ff", borderRadius:12, padding:3, marginBottom:16 }}>
        {[["transit","🚌 Transit"],["traffic","🚗 Traffic"],["parking","🅿️ Parking"],["cams","📷 Cams"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{
            flex:1, padding:"8px 2px", borderRadius:10,
            background: tab===k ? "#fff" : "transparent",
            border:"none", fontSize:11, fontWeight:700,
            color: tab===k ? C.ocean : C.muted,
            boxShadow: tab===k ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            cursor:"pointer", transition:"all 0.15s",
          }}>{l}</button>
        ))}
      </div>

      {tab === "transit" && (
        <div>
          <Card style={{ background:"#e0f2fe", border:"1px solid #bae6fd" }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.ocean }}>🎟️ LBI Beach Shuttle</div>
            <div style={{ fontSize:11, color:"#0c4a6e", marginTop:4 }}>Memorial Day – Labor Day · Day passes available at kiosks</div>
          </Card>
          {SHUTTLE_ROUTES.map((r,i) => (
            <Card key={i}>
              <div style={{ fontSize:15, fontWeight:800, color:C.dark, marginBottom:4 }}>{r.route}</div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:8 }}>🔄 {r.freq} · First: {r.firstRun} · Last: {r.lastRun} · {r.fare}</div>
              <div style={{ display:"flex", alignItems:"center", gap:0, overflowX:"auto" }}>
                {r.stops.map((s,j) => (
                  <div key={j} style={{ display:"flex", alignItems:"center", flexShrink:0 }}>
                    <div style={{ background:"#e0f2fe", borderRadius:8, padding:"4px 8px", fontSize:10, fontWeight:700, color:C.ocean, whiteSpace:"nowrap" }}>{s}</div>
                    {j < r.stops.length-1 && <div style={{ fontSize:12, color:C.muted, margin:"0 4px" }}>→</div>}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "traffic" && (
        <div>
          <Card style={{ background:"#fef9c3", border:"1px solid #fde68a" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#92400e" }}>🚗 Route 72 Causeway — Live Status</div>
            <div style={{ display:"flex", gap:10, marginTop:10 }}>
              {[{d:"Eastbound (to LBI)",w:"12 min",s:"normal"},{d:"Westbound (off LBI)",w:"8 min",s:"normal"}].map((r,i)=>(
                <div key={i} style={{ flex:1, background:"#fff", borderRadius:10, padding:"8px 10px" }}>
                  <div style={{ fontSize:10, color:C.muted, fontWeight:600 }}>{r.d}</div>
                  <div style={{ fontSize:18, fontWeight:900, color:r.s==="normal"?C.green:C.red, marginTop:2 }}>{r.w}</div>
                  <div style={{ fontSize:9, color:C.green, fontWeight:700 }}>Normal flow</div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:8 }}>⏱️ Best Times to Cross</div>
            {[{t:"Before 10 AM",s:"green",l:"Light traffic — best window"},{t:"10 AM – 2 PM",s:"amber",l:"Moderate, allow extra time"},{t:"2 PM – 5 PM",s:"red",l:"Heavy — peak arrival"},{t:"After 7 PM",s:"green",l:"Clears out quickly"}].map((b,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:b.s==="green"?C.green:b.s==="amber"?C.amber:C.red, flexShrink:0 }}/>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:C.dark }}>{b.t}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{b.l}</div>
                </div>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:6 }}>💡 Local Tips</div>
            {["Park & Ride at Stafford Township reduces causeway stress on busy Saturdays","Route 539 south is a useful alternate if the Parkway is backed up","LBI beach badge zones are enforced starting Memorial Day weekend"].map((t,i)=>(
              <div key={i} style={{ fontSize:12, color:"#374151", marginBottom:6, paddingLeft:14, position:"relative" }}>
                <span style={{ position:"absolute", left:0, color:C.ocean }}>•</span>{t}
              </div>
            ))}
          </Card>
        </div>
      )}

      {tab === "parking" && (
        <div>
          {[
            { loc:"Beach Haven Lot A — Ocean Ave", avail:42, cap:60, status:"good" },
            { loc:"Beach Haven Lot B — Bay Ave", avail:0, cap:45, status:"full" },
            { loc:"Ship Bottom Municipal — 8th St", avail:12, cap:80, status:"low" },
            { loc:"Surf City — 9th St Access", avail:28, cap:40, status:"good" },
            { loc:"Barnegat Light State Park", avail:55, cap:120, status:"good" },
            { loc:"Harvey Cedars Beach Lot", avail:8, cap:30, status:"low" },
          ].map((p,i) => {
            const pct = Math.round((p.avail/p.cap)*100);
            const barColor = p.status==="full"?C.red:p.status==="low"?C.amber:C.green;
            return (
              <Card key={i}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.dark, flex:1 }}>{p.loc}</div>
                  <div style={{ fontSize:11, fontWeight:800, color:barColor, marginLeft:8 }}>
                    {p.status==="full"?"FULL":`${p.avail} open`}
                  </div>
                </div>
                <div style={{ height:6, background:"#f0f0f0", borderRadius:4, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:barColor, borderRadius:4, transition:"width 0.5s" }}/>
                </div>
                <div style={{ fontSize:10, color:C.muted, marginTop:4 }}>{p.avail}/{p.cap} spots available</div>
              </Card>
            );
          })}
        </div>
      )}
      {tab === "cams" && (
        <div>
          <div style={{ fontSize:12, color:C.muted, marginBottom:12 }}>{CAM_FEEDS.filter(c=>c.status==="live").length} of {CAM_FEEDS.length} cameras online</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {CAM_FEEDS.map((cam,i) => (
              <div key={i} style={{
                background: cam.status==="live" ? "#0d1b2a" : "#f3f4f6",
                borderRadius:14, overflow:"hidden",
                boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
              }}>
                <div style={{ height:80, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:24 }}>{cam.status==="live"?"🔴":"⚫"}</div>
                    <div style={{ fontSize:9, color: cam.status==="live"?"#fff":"#9ca3af", marginTop:2, fontWeight:700 }}>
                      {cam.status==="live"?"LIVE":"OFFLINE"}
                    </div>
                  </div>
                </div>
                <div style={{ padding:"8px 10px", background: cam.status==="live"?"rgba(255,255,255,0.05)":"#f9fafb" }}>
                  <div style={{ fontSize:11, fontWeight:700, color: cam.status==="live"?"#fff":"#374151", lineHeight:1.2 }}>{cam.name}</div>
                  <div style={{ fontSize:9, color: cam.status==="live"?"rgba(255,255,255,0.5)":"#9ca3af", marginTop:2 }}>{cam.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


// ─── RESTROOMS PAGE ───────────────────────────────────────────────────────────
function RestroomsPage() {
  const [filterChanging, setFilterChanging] = useState(false);
  const [filterAccess, setFilterAccess] = useState(false);
  const [filterShower, setFilterShower] = useState(false);
  const filtered = RESTROOMS.filter(r => {
    if (filterChanging && !r.changing) return false;
    if (filterAccess && !r.accessible) return false;
    if (filterShower && !r.showers) return false;
    return true;
  });
  const conditionColor = (c) => c==="good"?C.green:c==="fair"?C.amber:C.red;
  return (
    <div style={{ padding:"16px 16px 24px" }}>
      <div style={{ fontSize:20, fontWeight:800, color:C.dark, marginBottom:4 }}>🚻 Restrooms</div>
      <div style={{ fontSize:12, color:C.muted, marginBottom:12 }}>Community-maintained info · Tap to report an issue</div>
      {/* Stats bar */}
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <StatChip label="Total" value={RESTROOMS.length} />
        <StatChip label="Changing" value={RESTROOMS.filter(r=>r.changing).length} color={C.teal} />
        <StatChip label="Accessible" value={RESTROOMS.filter(r=>r.accessible).length} color={C.access} />
        <StatChip label="Showers" value={RESTROOMS.filter(r=>r.showers).length} color={C.sky} />
      </div>
      {/* Filters */}
      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
        <Pill label="👶 Changing Station" active={filterChanging} onClick={()=>setFilterChanging(!filterChanging)} color={C.teal} />
        <Pill label="♿ Accessible" active={filterAccess} onClick={()=>setFilterAccess(!filterAccess)} color={C.access} />
        <Pill label="🚿 Has Showers" active={filterShower} onClick={()=>setFilterShower(!filterShower)} color={C.sky} />
      </div>
      {filtered.map((r,i) => (
        <Card key={i}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{r.name}</div>
              <div style={{ fontSize:11, color:C.muted }}>{r.town} · {r.hours}</div>
            </div>
            <div style={{ width:10, height:10, borderRadius:"50%", background:conditionColor(r.condition), marginTop:4, flexShrink:0 }}/>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
            {[["👶 Changing",r.changing],["♿ Accessible",r.accessible],["🚿 Showers",r.showers],["🏠 Enclosed",r.enclosed]].map(([l,v],j)=>(
              <span key={j} style={{ fontSize:10, background:v?"#f0fdf4":"#f9fafb", color:v?C.green:C.muted, borderRadius:6, padding:"2px 8px", fontWeight:600, border:`1px solid ${v?"#86efac":"#e5e7eb"}` }}>{v?"✅":"✗"} {l}</span>
            ))}
          </div>
          <div style={{ fontSize:11, color:C.muted, fontStyle:"italic" }}>💬 {r.note}</div>
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <button style={{ flex:1, padding:"6px", borderRadius:8, background:"#f0fdf4", border:"1px solid #86efac", color:C.green, fontSize:11, fontWeight:700, cursor:"pointer" }}>✓ Still accurate</button>
            <button style={{ flex:1, padding:"6px", borderRadius:8, background:"#fff1f1", border:"1px solid #fca5a5", color:C.red, fontSize:11, fontWeight:700, cursor:"pointer" }}>⚑ Report issue</button>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── ACCESSIBILITY PAGE ───────────────────────────────────────────────────────
const ACCESS_SPOTS = [
  { name:"Beach Haven — Corbetta Ave", type:"Beach Mat", status:"Available", town:"Beach Haven", desc:"Full mat to waterline, HC parking 50ft" },
  { name:"Ship Bottom — 7th St", type:"Accessible Ramp", status:"Available", town:"Ship Bottom", desc:"Paved ramp, 3 HC spaces, near restrooms" },
  { name:"Surf City — 9th St", type:"Beach Mat", status:"In Use", town:"Surf City", desc:"Mat deployed, chairs available at booth" },
  { name:"Harvey Cedars — 80th St", type:"HC Parking", status:"Available", town:"Harvey Cedars", desc:"4 HC spaces, ocean-side access path" },
  { name:"Barnegat Light State Park", type:"Full Access Zone", status:"Available", town:"Barnegat Light", desc:"Paved paths to beach, beach wheelchair loan" },
  { name:"Beach Haven — Taylor Ave", type:"Beach Wheelchair", status:"Available", town:"Beach Haven", desc:"Free beach wheelchair loan, ID required" },
];

function AccessibilityPage({ approvedPhotos }) {
  const photos = approvedPhotos || [];
  return (
    <div style={{ padding:"16px 16px 24px" }}>
      <div style={{ fontSize:20, fontWeight:800, color:C.access, marginBottom:4 }}>♿ Accessibility</div>
      <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>Beach mats · HC parking · Wheelchair loan · Accessible restrooms</div>
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <StatChip label="Mats Out" value="4" color={C.access} />
        <StatChip label="HC Spaces" value="24" color={C.ocean} />
        <StatChip label="Wheelchairs" value="3 free" color={C.teal} />
        <StatChip label="Ramps" value="8" color={C.green} />
      </div>
      {ACCESS_SPOTS.map((s,i) => (
        <Card key={i}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{s.name}</div>
              <div style={{ fontSize:11, color:C.muted }}>{s.type} · {s.town}</div>
            </div>
            <div style={{ fontSize:10, fontWeight:700, background:s.status==="Available"?"#f3f0ff":"#fef9c3", color:s.status==="Available"?C.access:"#92400e", borderRadius:8, padding:"3px 8px" }}>{s.status}</div>
          </div>
          <div style={{ fontSize:12, color:"#374151" }}>{s.desc}</div>
        </Card>
      ))}
      {photos.length > 0 && (
        <div style={{ marginTop:8 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:8 }}>📸 Community Photos</div>
          <div style={{ display:"flex", gap:8, overflowX:"auto" }}>
            {photos.map((p,i)=>(
              <div key={i} style={{ width:80, height:80, borderRadius:10, background:"#e0f2fe", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ fontSize:24 }}>🏖️</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── COMMUNITY PAGE ───────────────────────────────────────────────────────────
const INIT_FEED = [
  { id:1, type:"photo", user:"SandyToes22", userType:"visitor", avatar:"🌊", content:"Perfect morning at Beach Haven! Water is crystal clear today 🏖️", time:"14 min ago", likes:23, loc:"Beach Haven", approved:true },
  { id:2, type:"tip", user:"LBILocal_Mike", userType:"local", avatar:"🦀", content:"Pro tip: Harvey Cedars Shellfish is opening for happy hour at 4 PM today. Get there early — oysters sell out fast 🦪", time:"1 hr ago", likes:47, loc:"Harvey Cedars", approved:true },
  { id:3, type:"report", user:"BeachDad_NJ", userType:"visitor", avatar:"👨‍👧", content:"Parking lot B in Beach Haven is completely full as of 9 AM. Recommend lot A or street parking on Centre St.", time:"2 hrs ago", likes:31, loc:"Beach Haven", approved:true },
  { id:4, type:"photo", user:"SurferGirl_LBI", userType:"local", avatar:"🏄", content:"Surf report: waist-high sets this morning, glassy conditions until noon. Get out there!", time:"3 hrs ago", likes:58, loc:"Surf City", approved:true },
];

function CommunityPage({ feed, setFeed, pending, setPending, userVote, userType }) {
  const [postText, setPostText] = useState("");
  const [postType, setPostType] = useState("tip");
  const [likedIds, setLikedIds] = useState([]);
  const allPosts = [...(feed||[]), ...INIT_FEED];

  const handlePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(), type: postType, user:"You", userType: userType||"visitor",
      avatar:"⭐", content: postText, time:"Just now", likes:0, loc:"LBI", approved:true
    };
    setFeed && setFeed([newPost, ...(feed||[])]);
    setPostText("");
  };

  const toggleLike = (id) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };

  const typeIcon = (t) => t==="photo"?"📸":t==="tip"?"💡":t==="report"?"⚠️":"💬";
  const typeColor = (t) => t==="tip"?C.amber:t==="report"?C.red:C.ocean;
  const localBadge = (ut) => ut==="local"
    ? <span style={{ fontSize:9, background:"#fef9c3", color:"#92400e", borderRadius:6, padding:"1px 6px", fontWeight:700, marginLeft:4 }}>🦀 Local</span>
    : <span style={{ fontSize:9, background:"#e0f2fe", color:C.ocean, borderRadius:6, padding:"1px 6px", fontWeight:700, marginLeft:4 }}>🌊 Visitor</span>;

  return (
    <div style={{ padding:"16px 16px 24px" }}>
      <div style={{ fontSize:20, fontWeight:800, color:C.dark, marginBottom:14 }}>👥 Community</div>

      {/* Post composer */}
      <Card style={{ border:`1.5px solid ${C.sky}` }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:8 }}>Share something with the island</div>
        <div style={{ display:"flex", gap:6, marginBottom:10 }}>
          {[["tip","💡 Tip"],["report","⚠️ Report"],["photo","📸 Photo"]].map(([k,l])=>(
            <button key={k} onClick={()=>setPostType(k)} style={{
              padding:"4px 10px", borderRadius:12, fontSize:11, fontWeight:700, cursor:"pointer",
              background:postType===k?typeColor(k):"#f0f6ff",
              color:postType===k?"#fff":C.muted, border:"none"
            }}>{l}</button>
          ))}
        </div>
        <textarea
          value={postText}
          onChange={e=>setPostText(e.target.value)}
          placeholder={postType==="tip"?"Share a local tip...":postType==="report"?"Report a beach/parking/condition issue...":"Describe your beach photo..."}
          style={{ width:"100%", minHeight:70, border:"1px solid #e2e8f0", borderRadius:10, padding:"8px 10px", fontSize:13, resize:"vertical", fontFamily:"inherit", boxSizing:"border-box" }}
        />
        <button onClick={handlePost} style={{
          marginTop:8, width:"100%", padding:"9px", borderRadius:10,
          background:C.ocean, color:"#fff", border:"none", fontSize:13, fontWeight:700, cursor:"pointer"
        }}>Post to Community</button>
      </Card>

      {/* Feed */}
      {allPosts.filter(p=>p.approved).map((p,i) => (
        <Card key={p.id||i}>
          <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
            <div style={{ fontSize:24, flexShrink:0 }}>{p.avatar}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:4, marginBottom:2 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{p.user}</div>
                {localBadge(p.userType)}
                <div style={{ fontSize:10, color:C.muted, marginLeft:"auto" }}>{p.time}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:4 }}>
                <span style={{ fontSize:10 }}>{typeIcon(p.type)}</span>
                <span style={{ fontSize:10, color:typeColor(p.type), fontWeight:700 }}>{p.type.charAt(0).toUpperCase()+p.type.slice(1)}</span>
                <span style={{ fontSize:10, color:C.muted }}>· 📍 {p.loc}</span>
              </div>
              <div style={{ fontSize:13, color:"#374151", lineHeight:1.5 }}>{p.content}</div>
              <button onClick={()=>toggleLike(p.id)} style={{
                marginTop:8, padding:"4px 12px", borderRadius:10, border:"1px solid #e2e8f0",
                background: likedIds.includes(p.id)?"#fee2e2":"#f9fafb",
                color: likedIds.includes(p.id)?C.red:C.muted,
                fontSize:11, fontWeight:700, cursor:"pointer"
              }}>❤️ {p.likes + (likedIds.includes(p.id)?1:0)}</button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
function AdminPage({ feed, setFeed, pending, setPending }) {
  const [adminTab, setAdminTab] = useState("queue");
  const pendingPosts = (pending||[]).filter(p=>!p.approved);
  const handleApprove = (id) => {
    const post = (pending||[]).find(p=>p.id===id);
    if (post) {
      setFeed && setFeed([{ ...post, approved:true }, ...(feed||[])]);
      setPending && setPending((pending||[]).filter(p=>p.id!==id));
    }
  };
  const handleReject = (id) => setPending && setPending((pending||[]).filter(p=>p.id!==id));

  return (
    <div style={{ padding:"16px 16px 24px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
        <div style={{ fontSize:20, fontWeight:800, color:"#dc2626" }}>🛠️ Admin Panel</div>
        <div style={{ fontSize:10, background:"#fef2f2", color:"#dc2626", borderRadius:8, padding:"2px 8px", fontWeight:700 }}>STAFF ONLY</div>
      </div>
      <div style={{ display:"flex", gap:0, background:"#f0f6ff", borderRadius:12, padding:3, marginBottom:16 }}>
        {[["queue",`📋 Queue${pendingPosts.length>0?` (${pendingPosts.length})`:""}"`],["manage","📝 Content"],["settings","⚙️ Settings"]].map(([k,l])=>(
          <button key={k} onClick={()=>setAdminTab(k)} style={{
            flex:1, padding:"8px 4px", borderRadius:10,
            background:adminTab===k?"#fff":"transparent", border:"none",
            fontSize:11, fontWeight:700, color:adminTab===k?"#dc2626":C.muted,
            boxShadow:adminTab===k?"0 1px 4px rgba(0,0,0,0.1)":"none", cursor:"pointer"
          }}>{l}</button>
        ))}
      </div>

      {adminTab === "queue" && (
        <div>
          {pendingPosts.length === 0 ? (
            <Card style={{ textAlign:"center", padding:"30px 16px" }}>
              <div style={{ fontSize:28 }}>✅</div>
              <div style={{ fontSize:14, fontWeight:700, color:C.dark, marginTop:8 }}>Queue is clear</div>
              <div style={{ fontSize:12, color:C.muted, marginTop:4 }}>All community posts have been reviewed</div>
            </Card>
          ) : pendingPosts.map((p,i)=>(
            <Card key={i}>
              <div style={{ fontSize:13, color:C.dark, marginBottom:10 }}>{p.content}</div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:10 }}>By {p.user} · {p.type} · {p.loc}</div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>handleApprove(p.id)} style={{ flex:1, padding:"7px", borderRadius:8, background:"#dcfce7", border:"1px solid #86efac", color:C.green, fontSize:12, fontWeight:700, cursor:"pointer" }}>✓ Approve</button>
                <button onClick={()=>handleReject(p.id)} style={{ flex:1, padding:"7px", borderRadius:8, background:"#fee2e2", border:"1px solid #fca5a5", color:C.red, fontSize:12, fontWeight:700, cursor:"pointer" }}>✕ Reject</button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {adminTab === "manage" && (
        <div>
          {[
            { section:"Happy Hours", count:`${HAPPY_HOURS.length} listings`, icon:"🍹", note:"Last updated: today" },
            { section:"Beach Conditions", count:"6 beaches", icon:"🏖️", note:"Last updated: 8:42 AM" },
            { section:"Events", count:`${ALL_EVENTS.length} events`, icon:"🎉", note:"Last updated: yesterday" },
            { section:"Restaurants", count:`${EATS.length} listings`, icon:"🍽️", note:"Wait times: live" },
            { section:"Restrooms", count:`${RESTROOMS.length} facilities`, icon:"🚻", note:"Community-maintained" },
            { section:"Live Cams", count:`${CAM_FEEDS.filter(c=>c.status==="live").length}/${CAM_FEEDS.length} online`, icon:"📷", note:"5 of 6 live" },
          ].map((s,i)=>(
            <Card key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ fontSize:24 }}>{s.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{s.section}</div>
                <div style={{ fontSize:11, color:C.muted }}>{s.count} · {s.note}</div>
              </div>
              <button style={{ padding:"6px 12px", borderRadius:8, background:"#f0f6ff", border:"1px solid #bfdbfe", color:C.ocean, fontSize:11, fontWeight:700, cursor:"pointer" }}>Edit</button>
            </Card>
          ))}
        </div>
      )}

      {adminTab === "settings" && (
        <div>
          {[
            { label:"Maintenance Mode", desc:"Redirect users to maintenance page", on:false },
            { label:"Happy Hour Alerts", desc:"Push notifications when HH starts", on:true },
            { label:"Require Photo Approval", desc:"All community photos need admin review", on:true },
            { label:"Live Cam Overlay", desc:"Show weather overlay on cam feeds", on:false },
            { label:"Badge Price Banner", desc:"Show current badge prices on home screen", on:true },
          ].map((s,i)=>{
            const [on, setOn] = useState(s.on);
            return (
              <Card key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{s.label}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{s.desc}</div>
                </div>
                <button onClick={()=>setOn(!on)} style={{
                  width:44, height:24, borderRadius:12,
                  background: on ? C.green : "#d1d5db",
                  border:"none", cursor:"pointer", position:"relative", transition:"background 0.2s",
                }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:"#fff", position:"absolute", top:3, left: on?23:3, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
                </button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── NOTIFICATION DRAWER ──────────────────────────────────────────────────────
// ─── SEARCH OVERLAY ───────────────────────────────────────────────────────────
const SEARCH_INDEX = [
  ...BEACHES.map(b => ({
    type:"Beach", icon:"🏖️", name:b.name, sub:`${b.town} · Water ${b.temp} · ${b.surf}`,
    tags:[b.town,"beach","swimming","surf",b.status==="green"?"clear":"advisory"],
    tab:1, color:C.ocean, bg:"#e0f2fe",
  })),
  ...EATS.map(e => ({
    type:"Restaurant", icon:e.icon, name:e.name, sub:`${e.town} · ${e.cat} · ${e.price} · ${e.open?"Open — "+e.wait+" wait":"Closed"}`,
    tags:[e.town,e.cat,"food","eat","restaurant","dinner","lunch",e.price],
    tab:2, color:C.coral, bg:"#fff7ed",
  })),
  ...HAPPY_HOURS.map(h => ({
    type:"Happy Hour", icon:h.emoji, name:h.name, sub:`${h.town} · ${h.hours} · ${h.status==="active"?"🟢 Active now":h.opensIn||""}`,
    tags:[h.town,"happy hour","drinks","bar","specials",...h.tags.map(t=>t.toLowerCase())],
    tab:2, color:"#e76f51", bg:"#fff7ed", hhTab:true,
  })),
  ...ALL_EVENTS.map(e => ({
    type:"Event", icon:e.icon, name:e.title, sub:`${e.venue} · ${e.time} · ${e.price}`,
    tags:[e.venue,e.cat,"event","today","happening"],
    tab:3, color:"#7c3aed", bg:"#f3f0ff",
  })),
  ...ACTIVITIES.map(a => ({
    type:"Activity", icon:a.icon, name:a.name, sub:`${a.town} · ${a.price} · ${a.duration}`,
    tags:[a.town,a.cat,"activity","things to do",...a.tags.map(t=>t.toLowerCase())],
    tab:4, color:C.teal, bg:"#f0fdfa",
  })),
  { type:"Page", icon:"🚌", name:"Getting Around", sub:"Transit · Traffic · Parking · Live Cams", tags:["transit","bus","shuttle","parking","traffic","bridge","cams","cameras"], tab:5, color:C.ocean, bg:"#e0f2fe" },
  { type:"Page", icon:"🚻", name:"Restrooms & Facilities", sub:"Find restrooms, changing stations, showers", tags:["restroom","bathroom","toilet","changing","shower","facilities"], tab:6, color:C.teal, bg:"#f0fdfa" },
  { type:"Page", icon:"♿", name:"Accessibility", sub:"Beach mats, HC parking, wheelchair loan", tags:["accessibility","handicap","wheelchair","mat","accessible"], tab:7, color:C.access, bg:"#f3f0ff" },
  { type:"Page", icon:"👥", name:"Community", sub:"Tips, photos, reports from locals & visitors", tags:["community","tips","locals","photos","reports"], tab:8, color:C.ocean, bg:"#e0f2fe" },
];

const QUICK_SEARCHES = [
  { label:"🌊 Surf report", q:"surf" },
  { label:"🍹 Happy hour now", q:"happy hour" },
  { label:"🚲 Bike rentals", q:"bike" },
  { label:"🦞 Seafood", q:"seafood" },
  { label:"🅿️ Parking", q:"parking" },
  { label:"🐬 Dolphin watch", q:"dolphin" },
  { label:"🆓 Free activities", q:"free" },
  { label:"🦪 Oysters", q:"oysters" },
];

function SearchOverlay({ open, onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const [inputRef] = useState(() => ({ current: null }));

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  const q = query.trim().toLowerCase();

  const results = q.length < 2 ? [] : SEARCH_INDEX.filter(item => {
    if (item.name.toLowerCase().includes(q)) return true;
    if (item.sub.toLowerCase().includes(q)) return true;
    if (item.tags.some(t => t.includes(q))) return true;
    return false;
  });

  // Group by type
  const grouped = {};
  results.forEach(r => {
    if (!grouped[r.type]) grouped[r.type] = [];
    grouped[r.type].push(r);
  });
  const groupOrder = ["Beach","Restaurant","Happy Hour","Activity","Event","Page"];

  const handleResult = (item) => {
    onNavigate(item.tab);
    onClose();
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex", flexDirection:"column" }}>
      {/* Backdrop */}
      <div style={{ position:"absolute", inset:0, background:"rgba(13,27,42,0.7)", backdropFilter:"blur(3px)" }} onClick={onClose} />

      {/* Panel */}
      <div style={{
        position:"relative", margin:"0", width:"100%", maxWidth:430, alignSelf:"center",
        background:"#fff", display:"flex", flexDirection:"column",
        height:"100%", boxShadow:"0 8px 40px rgba(0,0,0,0.25)",
      }}>
        {/* Search bar */}
        <div style={{ padding:"12px 16px 10px", background:C.dark, display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontSize:16 }}>🔍</div>
          <input
            ref={el => inputRef.current = el}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search beaches, eats, activities, events…"
            style={{
              flex:1, background:"rgba(255,255,255,0.12)", border:"none", borderRadius:10,
              padding:"9px 12px", fontSize:14, color:"#fff", outline:"none",
              fontFamily:"inherit",
            }}
          />
          {query.length > 0
            ? <button onClick={()=>setQuery("")} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.6)", fontSize:18, cursor:"pointer", padding:0 }}>×</button>
            : <button onClick={onClose} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.6)", fontSize:13, fontWeight:700, cursor:"pointer", padding:0 }}>Cancel</button>
          }
        </div>

        {/* Content area */}
        <div style={{ flex:1, overflowY:"auto", background:C.bg }}>

          {/* Empty state — quick searches */}
          {q.length < 2 && (
            <div style={{ padding:"16px" }}>
              <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:1, marginBottom:12 }}>QUICK SEARCHES</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {QUICK_SEARCHES.map((qs, i) => (
                  <button key={i} onClick={() => setQuery(qs.q)} style={{
                    padding:"7px 14px", borderRadius:20, background:"#fff",
                    border:"1.5px solid #e2e8f0", fontSize:12, fontWeight:600,
                    color:C.dark, cursor:"pointer", boxShadow:"0 1px 3px rgba(0,0,0,0.06)",
                  }}>{qs.label}</button>
                ))}
              </div>

              <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:1, marginBottom:12, marginTop:22 }}>BROWSE BY SECTION</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[
                  { icon:"🏖️", label:"Beaches & Conditions", tab:1, color:C.ocean },
                  { icon:"🍽️", label:"Eats & Happy Hour", tab:2, color:C.coral },
                  { icon:"🎉", label:"What's On Today", tab:3, color:"#7c3aed" },
                  { icon:"🏄", label:"Things To Do", tab:4, color:C.teal },
                  { icon:"🚌", label:"Getting Around", tab:5, color:C.ocean },
                ].map((s,i) => (
                  <button key={i} onClick={()=>{ onNavigate(s.tab); onClose(); }} style={{
                    display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                    background:"#fff", borderRadius:12, border:"none", cursor:"pointer",
                    boxShadow:"0 1px 4px rgba(0,0,0,0.07)", textAlign:"left",
                  }}>
                    <div style={{ fontSize:20 }}>{s.icon}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{s.label}</div>
                    <div style={{ marginLeft:"auto", fontSize:16, color:C.muted }}>›</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {q.length >= 2 && results.length === 0 && (
            <div style={{ textAlign:"center", padding:"48px 20px", color:C.muted }}>
              <div style={{ fontSize:36 }}>🔍</div>
              <div style={{ fontSize:15, fontWeight:700, color:C.dark, marginTop:12 }}>No results for "{query}"</div>
              <div style={{ fontSize:12, marginTop:6 }}>Try "surf", "oysters", "kayak", or "parking"</div>
            </div>
          )}

          {q.length >= 2 && results.length > 0 && (
            <div style={{ padding:"12px 16px" }}>
              <div style={{ fontSize:11, fontWeight:800, color:C.muted, letterSpacing:1, marginBottom:12 }}>
                {results.length} RESULT{results.length !== 1 ? "S" : ""} FOR "{query.toUpperCase()}"
              </div>
              {groupOrder.filter(g => grouped[g]).map(groupName => (
                <div key={groupName} style={{ marginBottom:16 }}>
                  <div style={{ fontSize:10, fontWeight:800, color:C.muted, letterSpacing:1.5, marginBottom:8, paddingLeft:2 }}>
                    {groupName.toUpperCase()}{grouped[groupName].length > 1 ? `S (${grouped[groupName].length})` : ""}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {grouped[groupName].map((item, i) => (
                      <button key={i} onClick={()=>handleResult(item)} style={{
                        display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                        background:"#fff", borderRadius:12, border:"none", cursor:"pointer",
                        boxShadow:"0 1px 4px rgba(0,0,0,0.07)", textAlign:"left", width:"100%",
                      }}>
                        <div style={{
                          width:40, height:40, borderRadius:10, background:item.bg,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:20, flexShrink:0,
                        }}>{item.icon}</div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:13, fontWeight:700, color:C.dark, lineHeight:1.3 }}>{item.name}</div>
                          <div style={{ fontSize:11, color:C.muted, marginTop:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.sub}</div>
                        </div>
                        <div style={{ fontSize:10, fontWeight:700, color:item.color, background:item.bg, borderRadius:6, padding:"2px 8px", flexShrink:0 }}>{item.type}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotifDrawer({ open, onClose, notifs, setNotifs, prefs, setPrefs }) {
  const [view, setView] = useState("list");
  const unread = notifs.filter(n=>!n.read).length;
  const markRead = (id) => setNotifs(notifs.map(n=>n.id===id?{...n,read:true}:n));
  const markAll = () => setNotifs(notifs.map(n=>({...n,read:true})));
  if (!open) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200 }} onClick={onClose}>
      <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)" }}/>
      <div onClick={e=>e.stopPropagation()} style={{
        position:"absolute", top:0, right:0, width:"90%", maxWidth:380, height:"100%",
        background:"#fff", boxShadow:"-4px 0 24px rgba(0,0,0,0.15)", display:"flex", flexDirection:"column",
      }}>
        <div style={{ padding:"16px", borderBottom:"1px solid #f0f0f0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:C.dark }}>🔔 Notifications</div>
            {unread>0 && <div style={{ fontSize:11, color:C.muted }}>{unread} unread</div>}
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {unread>0 && <button onClick={markAll} style={{ fontSize:11, color:C.ocean, fontWeight:700, background:"none", border:"none", cursor:"pointer" }}>Mark all read</button>}
            <button onClick={onClose} style={{ fontSize:20, background:"none", border:"none", cursor:"pointer", color:C.muted }}>×</button>
          </div>
        </div>
        <div style={{ display:"flex", gap:0, padding:"8px 16px", borderBottom:"1px solid #f0f0f0" }}>
          {[["list","Notifications"],["prefs","Settings"]].map(([k,l])=>(
            <button key={k} onClick={()=>setView(k)} style={{
              flex:1, padding:"6px", borderRadius:8, border:"none", cursor:"pointer",
              background:view===k?"#f0f6ff":"transparent",
              color:view===k?C.ocean:C.muted, fontSize:12, fontWeight:700
            }}>{l}</button>
          ))}
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"12px 16px" }}>
          {view === "list" && notifs.map(n=>{
            const t = NOTIF_TYPES[n.type]||NOTIF_TYPES.community;
            return (
              <div key={n.id} onClick={()=>markRead(n.id)} style={{
                background: n.read?"#fafafa":t.bg, border:`1px solid ${n.read?"#f0f0f0":t.border}`,
                borderRadius:12, padding:"12px", marginBottom:10, cursor:"pointer",
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{n.title}</div>
                  {!n.read && <div style={{ width:8, height:8, borderRadius:"50%", background:t.color, flexShrink:0, marginLeft:8, marginTop:4 }}/>}
                </div>
                <div style={{ fontSize:12, color:"#374151", marginTop:4, lineHeight:1.5 }}>{n.body}</div>
                <div style={{ fontSize:10, color:C.muted, marginTop:6 }}>{n.time}</div>
              </div>
            );
          })}
          {view === "prefs" && (
            <div>
              <div style={{ fontSize:12, color:C.muted, marginBottom:12 }}>Choose which alerts you receive</div>
              {Object.entries(NOTIF_TYPES).map(([key,t])=>(
                <div key={key} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                  <div style={{ fontSize:20 }}>{t.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{t.label}</div>
                  </div>
                  <button onClick={()=>setPrefs({...prefs,[key]:!prefs[key]})} style={{
                    width:44, height:24, borderRadius:12,
                    background: prefs[key] ? C.ocean : "#d1d5db",
                    border:"none", cursor:"pointer", position:"relative", transition:"background 0.2s",
                  }}>
                    <div style={{ width:18, height:18, borderRadius:"50%", background:"#fff", position:"absolute", top:3, left:prefs[key]?23:3, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function OnLBIApp() {
  const [tab, setTab] = useState(0);
  const [notifs, setNotifs] = useState(INIT_NOTIFS);
  const [notifPrefs, setNotifPrefs] = useState(NOTIF_PREFS_INIT);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [feed, setFeed] = useState([]);
  const [pending, setPending] = useState([]);
  const [approvedPhotos, setApprovedPhotos] = useState([]);

  const unreadCount = notifs.filter(n=>!n.read).length;
  const isAdmin = tab === 9;

  const pages = [
    <HomePage onNavigate={setTab} />,                      // 0 Home
    <BeachesPage />,                                        // 1 Beaches
    <EatsPage />,                                           // 2 Eats & HH
    <WhatsHappeningPage />,                                 // 3 What's On
    <ActivitiesPage />,                                     // 4 Activities
    <GetAroundPage />,                                      // 5 Getting Around
    <RestroomsPage />,                                      // 6 Restrooms
    <AccessibilityPage approvedPhotos={approvedPhotos} />,  // 7 Access
    <CommunityPage feed={feed} setFeed={setFeed} pending={pending} setPending={setPending} userType="visitor" />, // 8 Community
    <AdminPage feed={feed} setFeed={setFeed} pending={pending} setPending={setPending} />, // 9 Admin
  ];

  return (
    <div style={{ maxWidth:430, margin:"0 auto", height:"100vh", display:"flex", flexDirection:"column", background:C.bg, fontFamily:"'Georgia', serif", position:"relative", overflow:"hidden" }}>
      {/* Top bar */}
      <div style={{ background: isAdmin ? "#1a0a0a" : C.dark, padding:"10px 16px 8px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, zIndex:10 }}>
        <div style={{ fontSize:16, fontWeight:900, color:"#fff", letterSpacing:-0.5 }}>
          {isAdmin ? "🛠️ Admin" : "On LBI"}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          {!isAdmin && (
            <button onClick={()=>setSearchOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, fontSize:18 }}>🔍</button>
          )}
          {!isAdmin && (
            <button onClick={()=>setDrawerOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", position:"relative", padding:4 }}>
              <div style={{ fontSize:20 }}>🔔</div>
              {unreadCount > 0 && (
                <div style={{ position:"absolute", top:0, right:0, width:16, height:16, borderRadius:"50%", background:"#dc2626", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:9, color:"#fff", fontWeight:800 }}>{unreadCount}</span>
                </div>
              )}
            </button>
          )}
          <button onClick={()=>setTab(9)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:16 }}>⚙️</button>
        </div>
      </div>

      {/* Page content */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {pages[tab]}
      </div>

      {/* Bottom nav */}
      <div style={{ background: isAdmin?"#1a0a0a":C.dark, borderTop:`2px solid ${isAdmin?"#3d0000":"rgba(255,255,255,0.1)"}`, padding:"6px 0 8px", flexShrink:0 }}>
        <div style={{ display:"flex", justifyContent:"space-around" }}>
          {NAV.map((icon,i) => {
            const label = NAV_LABELS[i];
            const isActive = tab === i;
            const activeCol = i===4?C.teal:i===7?C.access:i===9?"#dc2626":C.sky;
            return (
              <button key={i} onClick={()=>setTab(i)} style={{
                flex:1, background:"none", border:"none", cursor:"pointer",
                display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"4px 0",
              }}>
                <div style={{ fontSize:14, lineHeight:1, filter:isActive?"none":"grayscale(0.6) opacity(0.4)", transform:isActive?"scale(1.18) translateY(-2px)":"scale(1)", transition:"all 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}>{icon}</div>
                <div style={{ fontSize:6.5, fontWeight:isActive?700:400, color:isActive?activeCol:"#6b7a90", lineHeight:1 }}>{label}</div>
                {isActive && <div style={{ width:12, height:2, background:activeCol, borderRadius:2 }}/>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification drawer */}
      <NotifDrawer
        open={drawerOpen}
        onClose={()=>setDrawerOpen(false)}
        notifs={notifs}
        setNotifs={setNotifs}
        prefs={notifPrefs}
        setPrefs={setNotifPrefs}
      />

      {/* Search overlay */}
      <SearchOverlay
        open={searchOpen}
        onClose={()=>setSearchOpen(false)}
        onNavigate={(tab)=>{ setTab(tab); setSearchOpen(false); }}
      />
    </div>
  );
}
