import {
  DaCostruire,
  TitoloSezione,
} from "@/app/area-riservata/(gestionale)/sezione-da-costruire";

export default function ProdottiPage() {
  return (
    <div>
      <TitoloSezione
        titolo="Prodotti"
        sottotitolo="Il catalogo delle sei filiere: cosa è a banco, cosa è prenotabile e cosa è nascosto."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <DaCostruire titolo="Elenco prodotti">
          Da implementare: tabella su <code>prodotti</code> con categoria,
          unità di misura e interruttori <code>attivo</code> e{" "}
          <code>prenotabile</code>.
        </DaCostruire>
        <DaCostruire titolo="Scheda prodotto">
          Da implementare: creazione e modifica, con immagine su Supabase
          Storage.
        </DaCostruire>
      </div>
    </div>
  );
}
