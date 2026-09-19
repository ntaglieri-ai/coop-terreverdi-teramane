"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { VoceRassegna } from "@/lib/home-content";

/**
 * Fascia scorrevole con le ultime voci della rassegna stampa.
 *
 * Se non c'e' niente da mostrare non renderizza nulla: quando sara'
 * collegata alla tabella `rassegna_stampa`, una tabella vuota fara' sparire
 * la striscia da se', senza segnaposto vuoti in pagina.
 *
 * Lo scorrimento e' un loop continuo: la lista e' duplicata e l'animazione
 * trasla del 50%, cosi' il punto di ricongiunzione non si vede.
 */
export function TickerRassegna({ voci }: { voci: VoceRassegna[] }) {
  const shouldReduceMotion = useReducedMotion();

  if (voci.length === 0) return null;

  // Piu' voci ci sono, piu' lungo il nastro: la velocita' resta costante.
  const durata = voci.length * 9;
  const nastro = [...voci, ...voci];

  return (
    <div className="border-t border-white/15 bg-verde-900/70 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
        <span className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-terra-300 sm:block">
          Dicono di noi
        </span>

        <div className="relative flex-1 overflow-hidden">
          <motion.ul
            className="flex w-max items-center gap-10"
            animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: durata, ease: "linear", repeat: Infinity }
            }
          >
            {nastro.map((voce, i) => (
              <li key={`${voce.titolo}-${i}`} className="shrink-0">
                <Link
                  href="/rassegna-stampa"
                  className="group flex items-baseline gap-3 whitespace-nowrap text-sm text-verde-100 transition-colors hover:text-white"
                  // Il nastro e' duplicato: la seconda copia e' decorativa.
                  aria-hidden={i >= voci.length}
                  tabIndex={i >= voci.length ? -1 : undefined}
                >
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-terra-300">
                    {voce.testata}
                  </span>
                  <span className="group-hover:underline">{voce.titolo}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>

        <Link
          href="/rassegna-stampa"
          className="hidden shrink-0 text-xs font-semibold text-terra-300 transition-colors hover:text-terra-200 sm:block"
        >
          Tutta la rassegna →
        </Link>
      </div>
    </div>
  );
}
