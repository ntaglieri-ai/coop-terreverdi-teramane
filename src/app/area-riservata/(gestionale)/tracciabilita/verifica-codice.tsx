"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ESEMPIO_CODICE_LOTTO,
  codiceLottoValido,
  generaCodiceLotto,
  PREFISSI_FILIERA,
} from "@/lib/lotti";

/** Prova il formato di un codice lotto senza salvare nulla. */
export function VerificaCodice() {
  const [codice, setCodice] = useState("");
  const normalizzato = codice.trim().toUpperCase();
  const valido = normalizzato !== "" && codiceLottoValido(normalizzato);

  return (
    <div className="rounded-2xl bg-surface p-7 shadow-sm">
      <h2 className="font-serif text-lg font-semibold text-verde-800">
        Verifica un codice
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
        Formato: due o tre lettere di filiera, anno, progressivo a tre cifre —
        per esempio <code>{ESEMPIO_CODICE_LOTTO}</code>.
      </p>

      <label
        htmlFor="codice-lotto"
        className="mt-5 block text-sm font-medium text-carbone"
      >
        Codice lotto
      </label>
      <input
        id="codice-lotto"
        value={codice}
        onChange={(e) => setCodice(e.target.value)}
        placeholder={ESEMPIO_CODICE_LOTTO}
        autoComplete="off"
        spellCheck={false}
        className="mt-2 h-12 w-full rounded-xl border border-border bg-crema px-4 font-mono text-sm uppercase text-carbone outline-none focus:border-verde-500"
      />

      {normalizzato === "" ? null : valido ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-verde-100 px-3 py-1 text-xs font-semibold text-verde-800">
            Formato valido
          </span>
          <Link
            href={`/traccia/${normalizzato}`}
            className="text-sm font-semibold text-terra-600 hover:text-terra-700"
          >
            Apri la pagina pubblica →
          </Link>
        </div>
      ) : (
        <p role="alert" className="mt-4 text-sm text-terra-600">
          Formato non valido: servono 2–3 lettere, un trattino, l&apos;anno a 4
          cifre, un trattino e 3 cifre.
        </p>
      )}

      <h3 className="mt-8 font-serif text-base font-semibold text-verde-800">
        Prefissi per filiera
      </h3>
      <ul className="mt-3 flex flex-col gap-2">
        {Object.entries(PREFISSI_FILIERA).map(([filiera, prefisso]) => (
          <li
            key={prefisso}
            className="flex items-baseline justify-between gap-4 border-b border-border py-2 text-sm last:border-b-0"
          >
            <span className="text-foreground-muted">{filiera}</span>
            <code className="font-mono text-carbone">
              {generaCodiceLotto(prefisso, new Date().getFullYear(), 1)}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
}
