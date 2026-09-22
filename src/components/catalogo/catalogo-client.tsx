"use client";

import { useState } from "react";
import { BadgeOperatore } from "@/components/catalogo/badge-operatore";
import { DrawerProdotto } from "@/components/catalogo/drawer-prodotto";
import type { ProdottoCatalogo } from "@/lib/catalogo";

function prezzoDa(prodotto: ProdottoCatalogo) {
  const prezzi = prodotto.lotti
    .map((l) => l.prezzo)
    .filter((p): p is number => p != null);
  return prezzi.length ? Math.min(...prezzi) : null;
}

export function CatalogoClient({
  prodotti,
}: {
  prodotti: ProdottoCatalogo[];
}) {
  const [selezionato, setSelezionato] = useState<ProdottoCatalogo | null>(
    null,
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-verde-900 sm:text-4xl">
            Catalogo
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            Quello che è pronto in questi giorni. Scegli, prenota, ritiri al
            Mercato Contadino.
          </p>
        </div>
        <BadgeOperatore />
      </div>

      {prodotti.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border-strong bg-surface px-6 py-16 text-center">
          <p className="font-serif text-lg font-semibold text-verde-800">
            Nessun prodotto disponibile al momento
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-foreground-muted">
            Il banco cambia con la stagione: torna a trovarci a breve.
          </p>
        </div>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {prodotti.map((prodotto) => {
            const prezzo = prezzoDa(prodotto);
            return (
              <li key={prodotto.id}>
                <button
                  type="button"
                  onClick={() => setSelezionato(prodotto)}
                  className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left transition-shadow hover:shadow-lg hover:shadow-verde-900/5"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-sabbia">
                    {prodotto.immagine ? (
                      // eslint-disable-next-line @next/next/no-img-element -- host dinamico (Supabase Storage), non noto a build time
                      <img
                        src={prodotto.immagine}
                        alt={prodotto.nome}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-serif text-3xl font-semibold text-verde-300">
                        {prodotto.nome.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-terra-600">
                      {prodotto.categoria}
                    </p>
                    <h2 className="font-serif text-lg font-semibold text-verde-800">
                      {prodotto.nome}
                    </h2>
                    <p className="mt-auto pt-2 text-base font-semibold text-verde-900">
                      {prezzo != null ? `${prezzo.toFixed(2)} €` : "—"}
                      <span className="ml-1 text-sm font-normal text-foreground-muted">
                        / {prodotto.unita}
                      </span>
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <DrawerProdotto prodotto={selezionato} onChiudi={() => setSelezionato(null)} />
    </>
  );
}
