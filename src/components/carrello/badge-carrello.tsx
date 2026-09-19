"use client";

import Link from "next/link";
import { useCarrello } from "@/components/carrello/carrello-provider";
import { IconaCarrello } from "@/components/carrello/icona-carrello";

/**
 * Etichetta del carrello, condivisa fra header desktop e header mobile.
 *
 * Su mobile i comandi in riga sono tre: tre pastiglie bordate sarebbero
 * pesanti, quindi la variante `pulita` toglie il bordo e lascia solo l'icona
 * con un hover discreto. L'area di tocco resta 44×44, e proprio per questo il
 * badge si aggancia all'icona e non al riquadro: sui 44px il numero finirebbe
 * a mezz'aria contro il bordo dell'header.
 *
 * La variante `bordata` è quella dell'header desktop e resta com'era.
 */
export function BadgeCarrello({
  variante = "bordata",
  className = "",
}: {
  variante?: "bordata" | "pulita";
  className?: string;
}) {
  const { totaleArticoli } = useCarrello();

  const pulita = variante === "pulita";

  const stile = pulita
    ? "h-11 w-11 rounded-xl text-carbone hover:bg-verde-100 hover:text-verde-800"
    : "h-10 w-10 rounded-full border border-border text-carbone hover:border-terra-400 hover:text-terra-600";

  const descrizione =
    totaleArticoli === 0
      ? "Carrello vuoto"
      : `Carrello, ${totaleArticoli} ${totaleArticoli === 1 ? "articolo" : "articoli"}`;

  return (
    <Link
      href="/la-spesa"
      aria-label={descrizione}
      // Tooltip solo sulla variante mobile: l'header desktop resta com'era.
      title={pulita ? descrizione : undefined}
      className={`relative inline-flex items-center justify-center transition-colors ${stile} ${className}`}
    >
      {pulita ? (
        <span className="relative">
          <IconaCarrello className="h-5 w-5" />
          {totaleArticoli > 0 ? (
            <span className="absolute -right-2 -top-2 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-terra-500 px-1 text-[0.625rem] font-bold leading-none text-white">
              {totaleArticoli}
            </span>
          ) : null}
        </span>
      ) : (
        <>
          <IconaCarrello className="h-5 w-5" />
          {totaleArticoli > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terra-500 px-1.5 text-[0.65rem] font-bold text-white">
              {totaleArticoli}
            </span>
          ) : null}
        </>
      )}
    </Link>
  );
}
