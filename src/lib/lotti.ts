// ===========================================================================
// Codici di lotto e tracciabilità.
//
// Il formato e la validazione riprendono un pattern già collaudato su un
// altro progetto; il modello di dominio sotto è il nostro (ritiro in
// negozio, nessuna spedizione).
// ===========================================================================

/**
 * Formato del codice lotto: due o tre lettere di filiera, anno, progressivo.
 * Esempi: `ORT-2026-001`, `OLI-2026-014`.
 */
export const FORMATO_CODICE_LOTTO = /^[A-Z]{2,3}-\d{4}-\d{3}$/;

export const ESEMPIO_CODICE_LOTTO = "ORT-2026-001";

export function codiceLottoValido(codice: string): boolean {
  return FORMATO_CODICE_LOTTO.test(codice.trim().toUpperCase());
}

/** Prefisso per ciascuna delle sei filiere della cooperativa. */
export const PREFISSI_FILIERA: Record<string, string> = {
  "Ortaggi e legumi": "ORT",
  Formaggi: "FOR",
  Vino: "VIN",
  "Olio extravergine e olive": "OLI",
  "Pane a lievito madre": "PAN",
  Salumi: "SAL",
};

export function generaCodiceLotto(
  prefisso: string,
  anno: number,
  progressivo: number,
) {
  const p = prefisso.trim().toUpperCase().slice(0, 3);
  return `${p}-${anno}-${String(progressivo).padStart(3, "0")}`;
}

export type LottoTracciato = {
  codice: string;
  prodotto: string;
  filiera: string;
  azienda: string;
  campo: string;
  comune: string;
  dataRaccolta: string;
};

/**
 * TODO DATI — lotti di esempio, non dati reali: servono a far vedere la
 * pagina /traccia finché la tabella `lotti` su Supabase non è collegata.
 * Da rimuovere insieme al banner "dati di esempio".
 */
export const lottiDemo: LottoTracciato[] = [
  {
    codice: "ORT-2026-001",
    prodotto: "Pomodori da salsa",
    filiera: "Ortaggi e legumi",
    azienda: "Orto di Colle Verde",
    campo: "Campo Alto",
    comune: "Mosciano Sant'Angelo",
    dataRaccolta: "2026-08-12",
  },
  {
    codice: "OLI-2026-014",
    prodotto: "Olio extravergine di oliva",
    filiera: "Olio extravergine e olive",
    azienda: "Frantoio della cooperativa",
    campo: "Uliveto di mezza costa",
    comune: "Castellalto",
    dataRaccolta: "2026-11-03",
  },
];

export function trovaLotto(codice: string): LottoTracciato | undefined {
  const normalizzato = codice.trim().toUpperCase();
  return lottiDemo.find((lotto) => lotto.codice === normalizzato);
}

/** Gli stati di una prenotazione nel nostro modello: si ritira, non si spedisce. */
export const STATI_PRENOTAZIONE = [
  "in_attesa",
  "confermata",
  "ritirata",
  "annullata",
] as const;

export type StatoPrenotazione = (typeof STATI_PRENOTAZIONE)[number];

export const etichettaStato: Record<StatoPrenotazione, string> = {
  in_attesa: "In attesa",
  confermata: "Confermata",
  ritirata: "Ritirata",
  annullata: "Annullata",
};

/** Classi del badge, una per stato. */
export const coloreStato: Record<StatoPrenotazione, string> = {
  in_attesa: "bg-grano text-terra-700",
  confermata: "bg-verde-100 text-verde-800",
  ritirata: "bg-verde-700 text-white",
  annullata: "bg-pietra-200 text-pietra-600",
};
