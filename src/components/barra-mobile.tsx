"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCarrello } from "@/components/carrello/carrello-provider";
import {
  IconaCalendario,
  IconaCesto,
  IconaMappa,
} from "@/components/icone-interfaccia";

type Voce = {
  href: string;
  label: string;
  Icona: (props: { className?: string }) => React.JSX.Element;
  /** Solo "Spesa" porta il badge del carrello. */
  conBadge?: boolean;
};

/**
 * Tre voci di pari larghezza. "Dove siamo" punta alla pagina contatti, che
 * contiene indirizzo, orari e mappa incorporata: aprire Google Maps di colpo
 * butterebbe fuori dal sito chi voleva solo sapere dove siamo.
 */
const voci: Voce[] = [
  { href: "/contatti", label: "Dove siamo", Icona: IconaMappa },
  { href: "/la-spesa", label: "Spesa", Icona: IconaCesto, conBadge: true },
  { href: "/eventi", label: "Eventi", Icona: IconaCalendario },
];

/**
 * Bottom navigation fissa su mobile: sostituisce la barra con il pulsante
 * pieno "Prenota la spesa", che occupava mezza riga per una sola rotta e
 * lasciava il resto del sito raggiungibile solo dall'hamburger.
 *
 * Sopra lg sparisce: lì bastano header e hero.
 *
 * Lo spazio di compensazione è uno spaziatore in coda al footer, in
 * layout.tsx: la barra è fissa, quindi l'ingombro va lasciato in fondo alla
 * pagina, non dentro <main>.
 */
export function BarraMobile() {
  const { totaleArticoli } = useCarrello();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigazione rapida"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-crema/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="grid grid-cols-3">
        {voci.map(({ href, label, Icona, conBadge }) => {
          const attiva = pathname === href || pathname.startsWith(`${href}/`);
          const badge = conBadge && totaleArticoli > 0;

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={attiva ? "page" : undefined}
                className={`flex h-16 flex-col items-center justify-center gap-1 transition-colors ${
                  attiva
                    ? "text-verde-700"
                    : "text-pietra-600 hover:text-verde-700"
                }`}
              >
                <span className="relative">
                  <Icona className="h-[1.375rem] w-[1.375rem]" />
                  {badge ? (
                    <span className="absolute -right-2.5 -top-1.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-terra-500 px-1 text-[0.625rem] font-bold leading-none text-white">
                      {totaleArticoli}
                      <span className="sr-only">
                        {totaleArticoli === 1 ? " articolo" : " articoli"} nel
                        carrello
                      </span>
                    </span>
                  ) : null}
                </span>
                <span
                  className={`text-[0.6875rem] leading-none ${attiva ? "font-semibold" : "font-medium"}`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
