/**
 * nj511-traffic — Supabase Edge Function
 *
 * Scheduled every 10 min during peak season (Fri 2pm–Mon 7pm, Memorial Day–Labor Day).
 * Fetches NJ511 events feed filtered to Route 72 Manahawkin Bay Bridges.
 * Auto-creates/expires traffic alerts in the alerts table.
 *
 * ⚠️ Requires an NJ511 API key: https://www.511nj.org/developers
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
  const nj511Key = Deno.env.get('NJ511_API_KEY')

  if (!nj511Key) {
    return new Response(JSON.stringify({ error: 'NJ511_API_KEY not set' }), { status: 500 })
  }

  // TODO: implement NJ511 fetch + alert upsert after verifying the events feed
  // Endpoint to investigate: https://www.511nj.org/api/

  return new Response(JSON.stringify({ ok: true, message: 'nj511-traffic stub — not yet implemented' }))
})
