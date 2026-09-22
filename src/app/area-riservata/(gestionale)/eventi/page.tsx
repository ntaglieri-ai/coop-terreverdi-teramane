import {
  DaCostruire,
  TitoloSezione,
} from "@/app/area-riservata/(gestionale)/sezione-da-costruire";

export default function EventiGestionalePage() {
  return (
    <div>
      <TitoloSezione
        titolo="Eventi"
        sottotitolo="Le degustazioni e le visite pubblicate su /eventi: quali sono in programma, quanti posti restano, quali sono chiuse."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <DaCostruire titolo="Calendario eventi">
          Da implementare: tabella su <code>slot</code> (tipo{" "}
          <code>evento</code>) con data, prezzo, posti totali/occupati e
          l&apos;interruttore <code>attivo</code> — è quello che toglie o
          rimette un evento sul sito pubblico.
        </DaCostruire>
        <DaCostruire titolo="Scheda evento">
          Da implementare: creazione e modifica di titolo, descrizione,
          durata e foto (su Supabase Storage). Il pagamento resta online via
          Stripe, mai in loco.
        </DaCostruire>
      </div>
    </div>
  );
}
