"use client";

import Link from "next/link";
import { useCarrello } from "@/components/carrello/carrello-provider";
import { IconaCarrello } from "@/components/carrello/icona-carrello";

/**
 * Barra fissa in basso su mobile: carrello sempre raggiungibile e CTA
 * principale sempre visibile. Sopra lg sparisce, lì bastano header e hero.
 *
 * Lo spazio di compensazione è uno spaziatore in coda al footer, in
 * layout.tsx: la barra è fissa, quindi l'ingombro va lasciato in fondo alla
 * pagina, non dentro <main>.
 */
export function BarraMobile() {
  const { totaleArticoli } = useCarrello();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-crema/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link
          href="/la-spesa"
          aria-label={
            totaleArticoli === 0
              ? "Carrello vuoto"
              : `Carrello, ${totaleArticoli} ${totaleArticoli === 1 ? "articolo" : "articoli"}`
          }
          className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-carbone"
        >
          <IconaCarrello className="h-5 w-5" />
          {totaleArticoli > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terra-500 px-1.5 text-[0.65rem] font-bold text-white">
              {totaleArticoli}
            </span>
          ) : null}
        </Link>

        <Link
          href="/la-spesa"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-terra-500 px-6 text-base font-semibold text-white"
        >
          Prenota la spesa
        </Link>
      </div>
    </div>
  );
}
