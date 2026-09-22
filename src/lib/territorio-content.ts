// ===========================================================================
// Contenuti per le sezioni aggiuntive della pagina Territorio: calendario di
// stagionalità e mappa dei cinque comuni.
//
// TODO CLIENTE — il calendario è costruito su dati generici di stagionalità
// mediterranea italiana, non sul raccolto reale delle aziende socie: va
// verificato e corretto insieme alla cooperativa prima di considerarlo
// definitivo (in particolare i mesi di inizio/fine di ogni prodotto).
// ===========================================================================

import { aziendeSocie } from "@/lib/cooperativa";

export type MeseStagionale = {
  mese: string;
  prodotti: string[];
};

/** Calendario indicativo: dodici mesi, prodotti tipicamente di stagione. */
export const calendarioStagionale: MeseStagionale[] = [
  { mese: "Gennaio", prodotti: ["Cavolfiori", "Verze", "Broccoli", "Finocchi", "Agrumi"] },
  { mese: "Febbraio", prodotti: ["Carciofi", "Finocchi", "Broccoli", "Cavoli", "Agrumi"] },
  { mese: "Marzo", prodotti: ["Carciofi", "Asparagi", "Fave", "Piselli", "Spinaci"] },
  { mese: "Aprile", prodotti: ["Carciofi", "Asparagi", "Fave", "Piselli", "Agretti"] },
  { mese: "Maggio", prodotti: ["Fave", "Piselli", "Zucchine", "Fragole", "Insalate"] },
  { mese: "Giugno", prodotti: ["Pomodori", "Zucchine", "Fagiolini", "Ciliegie", "Albicocche"] },
  { mese: "Luglio", prodotti: ["Pomodori", "Peperoni", "Melanzane", "Cetrioli", "Pesche"] },
  { mese: "Agosto", prodotti: ["Pomodori", "Peperoni", "Melanzane", "Uva da tavola", "Fichi"] },
  { mese: "Settembre", prodotti: ["Pomodori tardivi", "Uva da vino", "Fichi", "Zucca"] },
  { mese: "Ottobre", prodotti: ["Olive", "Uva da vino", "Zucca", "Funghi", "Cavoli"] },
  { mese: "Novembre", prodotti: ["Olive", "Olio nuovo", "Broccoli", "Verze", "Agrumi"] },
  { mese: "Dicembre", prodotti: ["Cavoli", "Broccoli", "Verze", "Agrumi", "Olio nuovo"] },
];

export type ComunePosizione = {
  comune: string;
  /** Posizione indicativa lungo l'asse costa → entroterra, da 1 (più vicino al mare) a 5. */
  ordine: number;
  fascia: string;
  attivita: string;
  produzione: string;
};

/**
 * Posizione schematica dei cinque comuni delle aziende socie lungo l'asse
 * costa → colline. Riusa attività e produzione già presenti in
 * `aziendeSocie`, così i due dati non possono disallinearsi.
 *
 * TODO CLIENTE — l'ordine costa/entroterra è indicativo e non in scala: va
 * confermato con la cooperativa prima di presentarlo come dato di fatto.
 */
export const comuniPosizione: ComunePosizione[] = [
  { comune: "Mosciano Sant'Angelo", ordine: 1, fascia: "Vicino alla costa" },
  { comune: "Castellalto", ordine: 2, fascia: "Fascia collinare" },
  { comune: "Bellante", ordine: 3, fascia: "Fascia collinare" },
  { comune: "Notaresco", ordine: 4, fascia: "Verso l'interno" },
  { comune: "Controguerra", ordine: 5, fascia: "Il più interno" },
].map((posizione) => {
  const azienda = aziendeSocie.find((a) => a.comune === posizione.comune);
  return {
    ...posizione,
    attivita: azienda?.attivita ?? "",
    produzione: azienda?.produzione ?? "",
  };
});
