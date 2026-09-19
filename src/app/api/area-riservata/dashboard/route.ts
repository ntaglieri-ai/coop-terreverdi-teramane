import { NextResponse } from "next/server";
import type { StatoPrenotazione } from "@/lib/lotti";

export type RigaPrenotazione = {
  id: number;
  nome: string;
  articoli: number;
  stato: StatoPrenotazione;
  ritiro: string;
  creata: string;
};

export type DatiDashboard = {
  /** Finché è true, i numeri non vengono da Supabase. */
  demo: boolean;
  ordiniOggi: number;
  ordiniMese: number;
  prodottiAttivi: number;
  lottiAttivi: number;
  ultimePrenotazioni: RigaPrenotazione[];
};

/**
 * Dati della dashboard.
 *
 * TODO DATI — risposta di esempio: lo schema non è ancora applicato a
 * Supabase e le regole di conteggio dipendono dal modello di ritiro, ancora
 * da confermare col cliente. Quando si collega il database, questa route
 * legge da `prenotazioni`, `prodotti` e `lotti` e `demo` torna false.
 */
export async function GET() {
  const dati: DatiDashboard = {
    demo: true,
    ordiniOggi: 3,
    ordiniMese: 47,
    prodottiAttivi: 24,
    lottiAttivi: 11,
    ultimePrenotazioni: [
      {
        id: 128,
        nome: "Prenotazione di esempio",
        articoli: 4,
        stato: "in_attesa",
        ritiro: "2026-09-19",
        creata: "2026-09-19",
      },
      {
        id: 127,
        nome: "Prenotazione di esempio",
        articoli: 2,
        stato: "confermata",
        ritiro: "2026-09-19",
        creata: "2026-09-18",
      },
      {
        id: 126,
        nome: "Prenotazione di esempio",
        articoli: 7,
        stato: "ritirata",
        ritiro: "2026-09-18",
        creata: "2026-09-17",
      },
      {
        id: 125,
        nome: "Prenotazione di esempio",
        articoli: 1,
        stato: "annullata",
        ritiro: "2026-09-17",
        creata: "2026-09-16",
      },
    ],
  };

  // Niente cache: la dashboard si aggiorna da sola ogni 30 secondi.
  return NextResponse.json(dati, {
    headers: { "Cache-Control": "no-store" },
  });
}
