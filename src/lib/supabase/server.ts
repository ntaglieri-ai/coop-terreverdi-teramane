import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase per letture pubbliche da Server Component (anon key,
 * nessuna sessione da mantenere).
 *
 * A differenza di `browser.ts` non lancia se la configurazione manca: le
 * pagine pubbliche che leggono da qui devono degradare a uno stato vuoto
 * onesto, non rompersi in produzione per una variabile d'ambiente assente.
 */
export function getSupabaseServer(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
