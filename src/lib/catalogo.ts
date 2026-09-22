import { getSupabaseServer } from "@/lib/supabase/server";

export type LottoCatalogo = {
  id: number;
  prezzo: number | null;
  kg_disponibili: number | null;
  comune: string | null;
  data_raccolta: string | null;
};

export type ProdottoCatalogo = {
  id: number;
  nome: string;
  categoria: string;
  descrizione: string | null;
  unita: string;
  immagine: string | null;
  prenotabile: boolean;
  lotti: LottoCatalogo[];
};

/**
 * Prodotti visibili sul catalogo pubblico: esattamente quelli con
 * `prodotti.attivo = true` e almeno un lotto `attivo = true`, letti dal vivo
 * da Supabase — nessun dato inventato qui dentro.
 *
 * Un prodotto attivato/disattivato dal pannello admin (colonna `attivo`)
 * compare o sparisce da qui senza altro intervento: la RLS in
 * `supabase/schema.sql` limita comunque la lettura pubblica alle sole righe
 * attive, questo filtro applicativo è ridondante ma esplicito.
 *
 * In caso di errore (tabella non ancora creata, Supabase non configurato,
 * rete assente) restituisce un elenco vuoto: il catalogo mostra lo stato
 * vuoto onesto, mai un fallback con prodotti finti.
 */
export async function getProdottiCatalogo(): Promise<ProdottoCatalogo[]> {
  const supabase = getSupabaseServer();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("prodotti")
      .select(
        "id, nome, categoria, descrizione, unita, immagine, prenotabile, lotti!inner(id, prezzo, kg_disponibili, comune, data_raccolta, attivo)",
      )
      .eq("attivo", true)
      .eq("lotti.attivo", true)
      .order("nome");

    if (error) throw error;
    return (data ?? []) as unknown as ProdottoCatalogo[];
  } catch {
    return [];
  }
}
