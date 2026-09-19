"use client";

import Link from "next/link";
import { useCarrello } from "@/components/carrello/carrello-provider";
import { IconaCarrello } from "@/components/carrello/icona-carrello";

export function BadgeCarrello({ className = "" }: { className?: string }) {
  const { totaleArticoli } = useCarrello();

  return (
    <Link
      href="/la-spesa"
      aria-label={
        totaleArticoli === 0
          ? "Carrello vuoto"
          : `Carrello, ${totaleArticoli} ${totaleArticoli === 1 ? "articolo" : "articoli"}`
      }
      className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-carbone transition-colors hover:border-terra-400 hover:text-terra-600 ${className}`}
    >
      <IconaCarrello className="h-5 w-5" />
      {totaleArticoli > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terra-500 px-1.5 text-[0.65rem] font-bold text-white">
          {totaleArticoli}
        </span>
      ) : null}
    </Link>
  );
}
