import {
  DaCostruire,
  TitoloSezione,
} from "@/app/area-riservata/(gestionale)/sezione-da-costruire";
import { VerificaCodice } from "@/app/area-riservata/(gestionale)/tracciabilita/verifica-codice";

export default function TracciabilitaPage() {
  return (
    <div>
      <TitoloSezione
        titolo="Tracciabilità"
        sottotitolo="Ogni partita ha un codice di lotto: da lì si risale ad azienda, campo, comune e data di raccolta. È il codice che finisce nel QR sull'etichetta."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <VerificaCodice />

        <div className="flex flex-col gap-5">
          <DaCostruire titolo="Elenco lotti">
            Da implementare: tabella su <code>lotti</code> con codice, prodotto,
            campo, comune, data di raccolta e disponibilità.
          </DaCostruire>
          <DaCostruire titolo="Nuovo lotto">
            Da implementare: form con generazione automatica del codice dal
            prefisso di filiera e dal progressivo dell&apos;anno.
          </DaCostruire>
          <DaCostruire titolo="Etichette QR">
            Da implementare: generazione del QR che punta a{" "}
            <code>/traccia/[codice]</code>, pronto per la stampa.
          </DaCostruire>
        </div>
      </div>
    </div>
  );
}
