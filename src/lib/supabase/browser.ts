"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase per il browser.
 *
 * Le due variabili sono lette staticamente: Next sostituisce le
 * `process.env.NEXT_PUBLIC_*` a build time solo se il riferimento è letterale,
 * un accesso dinamico non funzionerebbe nel bundle client.
 *
 * Nessun valore di fallback: se manca la configurazione vogliamo un errore
 * esplicito, non un client che punta da qualche altra parte.
 */
let client: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Configurazione Supabase mancante: servono NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  client = createClient(url, anonKey);
  return client;
}
