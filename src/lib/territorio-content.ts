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
import type { Immagine } from "@/lib/immagini";

/**
 * Foto hero della pagina Territorio: vigneto in collina con vista sulla
 * costa adriatica, fornita dal cliente al posto del segnaposto Unsplash
 * (quello era palesemente un altrove — costa atlantica, non adriatica).
 *
 * TODO FOTO — il file è 1170×585: meglio del primo tentativo (735×416), ma
 * ancora sotto le misure che l'hero (fill, sizes="100vw") può arrivare a
 * chiedere su schermi larghi o ad alta densità, quindi su quelli resta un
 * po' d'ingrandimento (stesso meccanismo risolto per l'hero di /eventi, ma
 * lì rialzando la risoluzione della sorgente Unsplash — qui non è possibile
 * perché il file è quello che è). Da sostituire con l'originale ad alta
 * risoluzione appena disponibile.
 */
export const territorioHeroImage: Immagine = {
  src: "/hero-territorio-vigneto.jpg",
  alt: "Filari di vigna in collina con vista sulle colline teramane e la costa adriatica",
};

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
