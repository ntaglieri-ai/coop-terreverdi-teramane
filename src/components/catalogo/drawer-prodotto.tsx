"use client";

import { useEffect, useRef, useState } from "react";
import { useCarrello } from "@/components/carrello/carrello-provider";
import { IconaChiudi } from "@/components/icone-interfaccia";
import type { LottoCatalogo, ProdottoCatalogo } from "@/lib/catalogo";

const USCITA_MS = 200;

/** Il lotto attivo più conveniente: è quello che il prodotto "costa" in vetrina. */
function lottoMigliore(prodotto: ProdottoCatalogo) {
  return [...prodotto.lotti].sort(
    (a, b) => (a.prezzo ?? Infinity) - (b.prezzo ?? Infinity),
  )[0];
}

/**
 * Quick view di un prodotto: si apre sopra il catalogo, non cambia pagina.
 * Stessa meccanica <dialog> + showModal() del drawer contatti e del carrello.
 */
export function DrawerProdotto({
  prodotto,
  onChiudi,
}: {
  prodotto: ProdottoCatalogo | null;
  onChiudi: () => void;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [uscita, setUscita] = useState(false);

  const aperto = prodotto !== null;
  const lotto = prodotto ? lottoMigliore(prodotto) : null;

  function chiudiConAnimazione() {
    if (uscita) return;
    setUscita(true);
    setTimeout(() => {
      setUscita(false);
      onChiudi();
    }, USCITA_MS);
  }

  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;
    if (aperto && !el.open) el.showModal();
    if (!aperto && el.open) el.close();
  }, [aperto]);

  if (!prodotto || !lotto) {
    // Il dialog resta montato (per l'animazione di uscita) ma senza contenuto.
    return (
      <dialog
        ref={dialogo}
        onClose={onChiudi}
        className="m-0 h-full max-h-full w-full max-w-none bg-transparent p-0"
      />
    );
  }

  return (
    <dialog
      ref={dialogo}
      onClose={onChiudi}
      onCancel={(e) => {
        e.preventDefault();
        chiudiConAnimazione();
      }}
      onClick={(e) => {
        if (e.target === dialogo.current) chiudiConAnimazione();
      }}
      aria-labelledby="titolo-drawer-prodotto"
      className="m-0 h-full max-h-full w-full max-w-none bg-transparent p-0 text-carbone backdrop:bg-verde-900/60 backdrop:backdrop-blur-sm"
    >
      <div className="pointer-events-none flex h-full flex-col justify-end sm:items-end sm:justify-stretch sm:p-4">
        <div
          className={`pointer-events-auto flex max-h-[85dvh] w-full flex-col overflow-hidden rounded-t-3xl border-t border-border bg-surface shadow-[0_-8px_30px_rgba(17,48,31,0.18)] transition-transform duration-200 ease-out sm:my-auto sm:max-h-[90dvh] sm:w-full sm:max-w-md sm:rounded-3xl sm:border ${
            uscita
              ? "translate-y-full"
              : "translate-y-0 animate-[drawer-sale_200ms_ease-out]"
          }`}
        >
          <div className="flex items-start justify-between gap-4 px-5 pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terra-600">
              {prodotto.categoria}
            </p>
            <button
              type="button"
              onClick={chiudiConAnimazione}
              aria-label="Chiudi"
              className="-mr-1.5 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-pietra-600 transition-colors hover:bg-verde-100 hover:text-verde-800"
            >
              <IconaChiudi className="h-5 w-5" />
            </button>
          </div>

          {/* key sul prodotto: cambiando prodotto il contenuto rimonta da
              zero, quantità e messaggio di conferma ripartono senza bisogno
              di un effetto che sincronizzi lo stato a mano. */}
          <ContenutoProdotto
            key={prodotto.id}
            prodotto={prodotto}
            lotto={lotto}
          />
        </div>
      </div>
    </dialog>
  );
}

function ContenutoProdotto({
  prodotto,
  lotto,
}: {
  prodotto: ProdottoCatalogo;
  lotto: LottoCatalogo;
}) {
  const { aggiungi } = useCarrello();
  const [quantita, setQuantita] = useState(1);
  const [aggiunto, setAggiunto] = useState(false);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <h2
        id="titolo-drawer-prodotto"
        className="mt-1 font-serif text-2xl font-semibold text-verde-900"
      >
        {prodotto.nome}
      </h2>

      {prodotto.descrizione ? (
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          {prodotto.descrizione}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground-muted">
        {lotto.comune ? <span>{lotto.comune}</span> : null}
        {lotto.data_raccolta ? (
          <span>
            · raccolto il{" "}
            {new Date(lotto.data_raccolta).toLocaleDateString("it-IT")}
          </span>
        ) : null}
      </div>

      <p className="mt-4 font-serif text-2xl font-semibold text-verde-800">
        {lotto.prezzo != null ? `${lotto.prezzo.toFixed(2)} €` : "—"}
        <span className="ml-1 text-base font-normal text-foreground-muted">
          / {prodotto.unita}
        </span>
      </p>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-sm font-medium text-carbone">Quantità</span>
        <div className="flex items-center gap-1.5 rounded-full border border-border px-1.5 py-1">
          <button
            type="button"
            onClick={() => setQuantita((q) => Math.max(1, q - 1))}
            aria-label="Diminuisci quantità"
            className="flex h-8 w-8 items-center justify-center rounded-full text-verde-700 hover:bg-verde-100"
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-semibold">
            {quantita}
          </span>
          <button
            type="button"
            onClick={() => setQuantita((q) => q + 1)}
            aria-label="Aumenta quantità"
            className="flex h-8 w-8 items-center justify-center rounded-full text-verde-700 hover:bg-verde-100"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          aggiungi(
            {
              id: String(lotto.id),
              nome: prodotto.nome,
              prezzo: lotto.prezzo ?? undefined,
              unita: prodotto.unita,
              immagine: prodotto.immagine,
            },
            quantita,
          );
          setAggiunto(true);
        }}
        className="mt-6 inline-flex h-13 w-full items-center justify-center rounded-full bg-terra-500 px-6 text-base font-semibold text-white transition-colors hover:bg-terra-600"
      >
        Aggiungi al carrello
      </button>
      {aggiunto ? (
        <p
          role="status"
          className="mb-5 mt-3 text-center text-sm font-semibold text-verde-700"
        >
          Aggiunto al carrello.
        </p>
      ) : (
        <div className="mb-5" />
      )}
    </div>
  );
}
