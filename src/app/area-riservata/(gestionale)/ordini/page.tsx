import {
  DaCostruire,
  TitoloSezione,
} from "@/app/area-riservata/(gestionale)/sezione-da-costruire";
import { STATI_PRENOTAZIONE, coloreStato, etichettaStato } from "@/lib/lotti";

export default function OrdiniPage() {
  return (
    <div>
      <TitoloSezione
        titolo="Prenotazioni"
        sottotitolo="Le prenotazioni della spesa e degli eventi, filtrabili per stato."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        <span className="rounded-full bg-verde-800 px-4 py-2 text-sm font-medium text-white">
          Tutte
        </span>
        {STATI_PRENOTAZIONE.map((stato) => (
          <span
            key={stato}
            className={`rounded-full px-4 py-2 text-sm font-medium ${coloreStato[stato]}`}
          >
            {etichettaStato[stato]}
          </span>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <DaCostruire titolo="Elenco prenotazioni">
          Da implementare: tabella con filtro per stato e dettaglio espandibile
          per riga, letta da <code>prenotazioni</code>.
        </DaCostruire>
        <DaCostruire titolo="Avanzamento stato">
          Da implementare: passaggio fra in attesa, confermata, ritirata e
          annullata.
          {/* TODO CLIENTE — le regole di passaggio dipendono dal modello di
              ritiro, ancora da confermare (probabile cutoff giornaliero). Il
              meccanismo va progettato sul nostro modello di ritiro in negozio,
              non ripreso da un flusso di spedizione. */}
        </DaCostruire>
      </div>
    </div>
  );
}
