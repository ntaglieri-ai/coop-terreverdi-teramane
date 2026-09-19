import {
  DaCostruire,
  TitoloSezione,
} from "@/app/area-riservata/(gestionale)/sezione-da-costruire";
import { OrariTabella } from "@/components/orari-tabella";
import { indirizzoCompleto, puntoVendita } from "@/lib/cooperativa";

export default function ImpostazioniPage() {
  return (
    <div>
      <TitoloSezione
        titolo="Impostazioni"
        sottotitolo="Recapiti, orari di apertura e regole di prenotazione."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl bg-surface p-7 shadow-sm">
          <h2 className="font-serif text-lg font-semibold text-verde-800">
            Punto vendita
          </h2>
          <dl className="mt-4 flex flex-col gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-pietra-600">Nome</dt>
              <dd className="text-right text-carbone">{puntoVendita.nome}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-pietra-600">Indirizzo</dt>
              <dd className="text-right text-carbone">{indirizzoCompleto}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-pietra-600">Telefono</dt>
              <dd className="text-right text-carbone">
                {puntoVendita.telefono}
              </dd>
            </div>
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-pietra-400">
            Oggi questi valori stanno nel codice, in{" "}
            <code>src/lib/cooperativa.ts</code>. Diventeranno modificabili da
            qui quando ci sarà la tabella impostazioni.
          </p>
        </div>

        <div className="rounded-2xl bg-surface p-7 shadow-sm">
          <h2 className="font-serif text-lg font-semibold text-verde-800">
            Orari di apertura
          </h2>
          <OrariTabella className="mt-4" />
        </div>

        <DaCostruire titolo="Regole di prenotazione">
          Da implementare: orario limite per prenotare il ritiro in giornata e
          giorni in cui le prenotazioni sono chiuse.
          {/* TODO CLIENTE — serve la conferma del modello: cutoff giornaliero
              o slot a capienza. Da quella risposta dipende anche lo schema. */}
        </DaCostruire>

        <DaCostruire titolo="Operatori">
          Da implementare: elenco degli operatori con ruolo, collegato alla
          tabella <code>operatori</code> e agli utenti di Supabase Auth.
        </DaCostruire>
      </div>
    </div>
  );
}
