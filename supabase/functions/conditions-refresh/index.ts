/**
 * conditions-refresh — Supabase Edge Function
 *
 * Scheduled every 15 minutes. Fetches live beach conditions from:
 *   - NOAA Tides: station 8534720 (Atlantic City) or 8534921 (Beach Haven)
 *   - NDBC Buoy: 44091 (Barnegat) for water temp + wave height
 *   - NWS Gridpoint API: air temp, UV index, wind
 *   - NWS Surf Zone Forecast: rip current risk for Ocean County
 *
 * ⚠️ BEFORE IMPLEMENTING: Manually verify each endpoint and confirm field formats,
 *    especially rip_current_risk (may be free text, not a structured value).
 *
 * Writes result to conditions_current (single-row upsert, id = 1).
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // TODO: implement NOAA / NDBC / NWS fetches after endpoint verification
  // Example shape of what to upsert:
  const conditions = {
    id: 1,
    fetched_at: new Date().toISOString(),
    water_temp_f: null,
    air_temp_f: null,
    wind_mph: null,
    wind_dir: null,
    wave_height_ft: null,
    uv_index: null,
    next_high_tide: null,
    next_low_tide: null,
    rip_current_risk: null,
    raw_json: null,
  }

  const { error } = await supabase
    .from('conditions_current')
    .upsert(conditions, { onConflict: 'id' })

  if (error) {
    console.error('conditions-refresh failed:', error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ ok: true, fetched_at: conditions.fetched_at }))
})
