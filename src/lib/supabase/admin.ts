import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase con la service role key: bypassa le policy RLS.
 *
 * Da importare SOLO in Route Handler o altro codice server-only (mai in un
 * Client Component, mai in un modulo che finisce nel bundle browser). Serve
 * per gli inserimenti su `prenotazioni`, che la RLS riserva agli operatori:
 * l'inserimento dal sito pubblico passa da qui, non da un client anon.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
