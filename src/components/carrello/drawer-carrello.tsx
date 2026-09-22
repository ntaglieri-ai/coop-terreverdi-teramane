"use client";

import { useEffect, useRef, useState } from "react";
import { useCarrello } from "@/components/carrello/carrello-provider";
import { CheckoutFlow } from "@/components/carrello/checkout-flow";
import { IconaChiudi } from "@/components/icone-interfaccia";

/** Durata dello scorrimento in chiusura: deve combaciare con `duration-200`. */
const USCITA_MS = 200;

/**
 * Drawer del carrello: un'unica istanza globale (montata nel layout del
 * sito), aperta dall'icona carrello dell'header via CarrelloProvider.
 *
 * Stessa meccanica del drawer contatti mobile — <dialog> + showModal(),
 * uscita animata sulla classe prima della chiusura vera — qui riusata anche
 * per il layer di checkout, che sostituisce la lista voci nello stesso
 * pannello invece di aprirne un altro sopra.
 */
export function DrawerCarrello() {
  const { voci, aperto, chiudi, imposta, rimuovi } = useCarrello();
  const dialogo = useRef<HTMLDialogElement>(null);
  const [uscita, setUscita] = useState(false);
  const [vista, setVista] = useState<"carrello" | "checkout">("carrello");

  function chiudiConAnimazione() {
    if (uscita) return;
    setUscita(true);
    setTimeout(() => {
      setUscita(false);
      chiudi();
      setVista("carrello");
    }, USCITA_MS);
  }

  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;
    if (aperto && !el.open) el.showModal();
    if (!aperto && el.open) el.close();
  }, [aperto]);

  useEffect(() => {
    if (!aperto) return;
    const precedente = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = precedente;
    };
  }, [aperto]);

  const totale = voci.reduce(
    (somma, v) => somma + (v.prezzo ?? 0) * v.quantita,
    0,
  );

  return (
    <dialog
      ref={dialogo}
      onClose={chiudi}
      onCancel={(e) => {
        e.preventDefault();
        chiudiConAnimazione();
      }}
      onClick={(e) => {
        if (e.target === dialogo.current) chiudiConAnimazione();
      }}
      aria-labelledby="titolo-drawer-carrello"
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
            <h2
              id="titolo-drawer-carrello"
              className="font-serif text-xl font-semibold text-verde-900"
            >
              {vista === "carrello" ? "Il tuo carrello" : "Checkout"}
            </h2>
            <button
              type="button"
              onClick={chiudiConAnimazione}
              aria-label="Chiudi"
              className="-mr-1.5 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-pietra-600 transition-colors hover:bg-verde-100 hover:text-verde-800"
            >
              <IconaChiudi className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            {vista === "checkout" ? (
              <CheckoutFlow
                voci={voci}
                totale={totale}
                onIndietro={() => setVista("carrello")}
                onCompletato={chiudiConAnimazione}
              />
            ) : voci.length === 0 ? (
              <p className="py-8 text-center text-sm text-foreground-muted">
                Il carrello è vuoto. Aggiungi qualcosa dal{" "}
                <a
                  href="/la-spesa/catalogo"
                  className="font-semibold text-verde-700 hover:text-terra-600"
                >
                  catalogo
                </a>
                .
              </p>
            ) : (
              <>
                <ul className="mt-4 flex flex-col gap-3">
                  {voci.map((voce) => (
                    <li
                      key={voce.id}
                      className="flex items-center gap-3 rounded-2xl border border-border p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-verde-800">
                          {voce.nome}
                        </p>
                        {voce.prezzo != null ? (
                          <p className="text-xs text-foreground-muted">
                            {voce.prezzo.toFixed(2)} €
                            {voce.unita ? ` / ${voce.unita}` : ""}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-1.5 rounded-full border border-border px-1.5 py-1">
                        <button
                          type="button"
                          onClick={() => imposta(voce.id, voce.quantita - 1)}
                          aria-label={`Diminuisci ${voce.nome}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-verde-700 hover:bg-verde-100"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">
                          {voce.quantita}
                        </span>
                        <button
                          type="button"
                          onClick={() => imposta(voce.id, voce.quantita + 1)}
                          aria-label={`Aumenta ${voce.nome}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-verde-700 hover:bg-verde-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => rimuovi(voce.id)}
                        aria-label={`Rimuovi ${voce.nome} dal carrello`}
                        className="text-xs font-semibold text-pietra-600 hover:text-terra-600"
                      >
                        Rimuovi
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-base">
                  <span className="font-semibold text-carbone">Totale</span>
                  <span className="font-serif text-lg font-semibold text-verde-800">
                    {totale.toFixed(2)} €
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setVista("checkout")}
                  className="mt-4 inline-flex h-13 w-full items-center justify-center rounded-full bg-terra-500 px-6 text-base font-semibold text-white transition-colors hover:bg-terra-600"
                >
                  Procedi al checkout
                </button>
                <p className="mb-5 mt-3 text-center text-xs text-pietra-400">
                  Pagamento in negozio al ritiro. Nessun addebito ora.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
