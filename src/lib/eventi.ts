import type { Immagine } from "@/lib/immagini";
import { getSupabaseServer } from "@/lib/supabase/server";

/**
 * Foto hero della pagina Eventi, fornita dal cliente: terrazza di
 * degustazione la sera, tende a vela e luci a bulbo, ospiti seduti ai
 * tavoli — coerente con "Serate piccole, i produttori seduti al tavolo con
 * te". Non più un segnaposto Unsplash.
 *
 * Ritagliata rispetto all'originale (2000×1333 → 1540×1333): lo scatto del
 * cliente aveva persone in movimento sfocate sul lato sinistro — mosso da
 * tempo di posa lungo, non un problema di risoluzione, quindi non
 * correggibile via codice — tolte tagliando quella porzione, non ridisegnate.
 *
 * TODO FOTO — sotto il deviceSize più grande che l'hero (fill,
 * sizes="100vw") può arrivare a chiedere su schermi ad alta densità (3840px
 * di default). Da sostituire con l'originale a risoluzione ancora più alta
 * se disponibile.
 */
export const eventiHeroImage: Immagine = {
  src: "/hero-eventi-degustazione.jpg",
  alt: "Terrazza di degustazione la sera, tende a vela e luci a bulbo, ospiti seduti ai tavoli",
};

export type EventoPubblico = {
  id: number;
  data: string;
  fasciaOraria: string | null;
  durataMinuti: number | null;
  titolo: string;
  descrizione: string | null;
  immagine: string | null;
  prezzo: number | null;
  postiDisponibili: number;
};

/** Sotto questa soglia il badge "Ultimi posti" compare in vetrina. */
const SOGLIA_ULTIMI_POSTI = 5;

export function ultimiPosti(evento: EventoPubblico) {
  return evento.postiDisponibili > 0 && evento.postiDisponibili <= SOGLIA_ULTIMI_POSTI;
}

/** "2 ore" oppure "1 ora e 30", come si scrive in italiano. */
export function formattaDurata(minuti: number) {
  const ore = Math.floor(minuti / 60);
  const resto = minuti % 60;
  const parteOre = ore > 0 ? `${ore} ${ore === 1 ? "ora" : "ore"}` : "";
  const parteMinuti = resto > 0 ? `${resto}` : "";
  if (parteOre && parteMinuti) return `${parteOre} e ${parteMinuti}`;
  return parteOre || `${minuti} min`;
}

/** "Venerdì 26 settembre, ore 19:00". */
export function formattaDataEvento(evento: EventoPubblico) {
  const giorno = new Date(`${evento.data}T00:00:00`).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const capitalizzato = giorno.charAt(0).toUpperCase() + giorno.slice(1);
  return evento.fasciaOraria
    ? `${capitalizzato}, ore ${evento.fasciaOraria}`
    : capitalizzato;
}

/**
 * Eventi pubblicati dall'area riservata (tabella `slot`, tipo 'evento'),
 * ordinati dal più vicino. Nessun evento inventato qui: se la lettura fallisce
 * o non c'è nulla di attivo, la pagina mostra lo stesso stato vuoto onesto del
 * catalogo prodotti.
 */
export async function getEventiAttivi(): Promise<EventoPubblico[]> {
  const supabase = getSupabaseServer();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("slot")
      .select(
        "id, data, fascia_oraria, durata_minuti, titolo, descrizione, immagine, prezzo, capacita_max, capacita_occupata",
      )
      .eq("tipo", "evento")
      .eq("attivo", true)
      .gte("data", new Date().toISOString().slice(0, 10))
      .order("data", { ascending: true });

    if (error) throw error;

    return (data ?? []).map((riga) => ({
      id: riga.id,
      data: riga.data,
      fasciaOraria: riga.fascia_oraria,
      durataMinuti: riga.durata_minuti,
      titolo: riga.titolo ?? "Evento",
      descrizione: riga.descrizione,
      immagine: riga.immagine,
      prezzo: riga.prezzo,
      postiDisponibili: Math.max(0, riga.capacita_max - (riga.capacita_occupata ?? 0)),
    }));
  } catch {
    return [];
  }
}
