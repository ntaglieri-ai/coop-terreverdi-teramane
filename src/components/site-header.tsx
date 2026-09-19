import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { BadgeCarrello } from "@/components/carrello/badge-carrello";
import { ctaItems, navItems, areaRiservataItem } from "@/lib/navigation";

/**
 * Marchio: rosetta del logo del cliente + wordmark tipografico su due righe.
 *
 * Il file fornito è un lockup completo a 316×274 px — troppo piccolo per
 * usarlo come immagine del titolo. Qui viene usata solo la rosetta e il testo
 * è vera tipografia, così resta nitido a ogni densità.
 *
 * Il ritaglio è esatto sui pixel opachi (147×141 dall'originale, offset 84,0):
 * con margini trasparenti asimmetrici il box dell'immagine non coincide con
 * la rosetta e `items-center` centra il box, non il disegno.
 *
 * TODO CLIENTE — chiedere il logo in vettoriale (SVG) o PNG trasparente ad
 * alta risoluzione.
 */
function Marchio() {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
      <Image
        src="/logo-mercato-contadino-mark.png"
        alt=""
        width={147}
        height={141}
        priority
        className="h-9 w-auto shrink-0 sm:h-11 lg:h-12"
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-sm font-bold uppercase leading-[1.1] tracking-tight text-verde-700 group-hover:text-verde-600 sm:whitespace-nowrap sm:text-xl">
          Mercato Contadino
        </span>
        <span className="mt-1 hidden whitespace-nowrap text-[0.7rem] tracking-[0.12em] text-pietra-600 sm:block">
          delle Terre Verdi Teramane
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-crema/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-5 py-3.5">
        <Marchio />

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 xl:mr-16">
          <div className="hidden items-center gap-2 lg:flex">
            {ctaItems.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={
                  cta.variante === "ocra"
                    ? "inline-flex h-11 items-center whitespace-nowrap rounded-full bg-terra-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-terra-600"
                    : "inline-flex h-11 items-center whitespace-nowrap rounded-full bg-verde-700 px-9 text-sm font-semibold text-white transition-colors hover:bg-verde-800"
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>

          {/* Sopra xl il carrello sta nella seconda riga, accanto a Contatti. */}
          <BadgeCarrello className="xl:hidden" />

          {/* Menu compatto sotto xl: le sette voci non stanno in riga. */}
          <details className="group relative xl:hidden">
            <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-carbone [&::-webkit-details-marker]:hidden">
              Menu
              <span
                aria-hidden="true"
                className="transition-transform group-open:rotate-180"
              >
                ▾
              </span>
            </summary>
            <nav
              aria-label="Navigazione principale"
              className="absolute right-0 mt-3 w-72 rounded-2xl border border-border bg-surface p-3 shadow-lg"
            >
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-carbone/85 hover:bg-verde-100 hover:text-verde-800"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
                {ctaItems.map((cta) => (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className={
                      cta.variante === "ocra"
                        ? "inline-flex h-11 items-center justify-center rounded-full bg-terra-500 px-6 text-sm font-semibold text-white"
                        : "inline-flex h-11 items-center justify-center rounded-full bg-verde-700 px-6 text-sm font-semibold text-white"
                    }
                  >
                    {cta.label}
                  </Link>
                ))}
                <Link
                  href={areaRiservataItem.href}
                  className="mt-1 px-3 py-2 text-xs font-medium text-pietra-600 hover:text-verde-700"
                >
                  {areaRiservataItem.label}
                </Link>
              </div>
            </nav>
          </details>
        </div>
      </Container>

      {/* Seconda riga sopra xl: le sette voci hanno bisogno di una riga loro,
          altrimenti vanno a capo accanto a marchio e pulsanti. */}
      <div className="hidden border-t border-border/70 xl:block">
        <Container>
          <div className="flex items-center justify-center gap-7 py-1.5 pr-16">
            <nav aria-label="Navigazione principale">
              <ul className="flex items-center gap-7">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="whitespace-nowrap text-sm font-medium text-carbone/80 transition-colors hover:text-verde-700"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <BadgeCarrello />
          </div>
        </Container>
      </div>
    </header>
  );
}
