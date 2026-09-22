"use client";

import { useState } from "react";

/**
 * Toggle "Sei un operatore economico?" in alto a destra sul catalogo.
 *
 * Nessuna logica collegata di proposito: cambia solo l'aspetto del pulsante,
 * non applica prezzi diversi né filtra il catalogo. Predisposto per essere
 * agganciato in futuro a un listino B2B, quando sarà definito.
 */
export function BadgeOperatore() {
  const [operatore, setOperatore] = useState(false);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={operatore}
      onClick={() => setOperatore((v) => !v)}
      className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
        operatore
          ? "border-verde-700 bg-verde-700 text-white"
          : "border-verde-300 bg-surface text-verde-700 hover:border-terra-400 hover:text-terra-600"
      }`}
    >
      Sei un operatore economico?
    </button>
  );
}
