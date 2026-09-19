import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { BadgeCarrello } from "@/components/carrello/badge-carrello";
import { ctaItems, navItems, areaRiservataItem } from "@/lib/navigation";
import { IconaCasa } from "@/components/icona-casa";

/**
 * Marchio: rosetta del logo del cliente + wordmark tipografico.
 *
 * Il file fornito è un lockup completo a 316×274 px — troppo piccolo per
 * usarlo come immagine del titolo. Qui viene usata solo la rosetta e il testo
 * è vera tipografia, così resta nitido a ogni densità.
 *
 * Il ritaglio è esatto sui pixel opachi (147×141 dall'originale, offset 84,0):
 * con margini trasparenti asimmetrici il box dell'immagine non coincide con
 * la rosetta e `items-center` centra il box, non il disegno.
 *
 * Il sottotitolo compare solo da 2xl: sotto, in riga singola, lo spazio serve
 * al menu.
 *
 * TODO CLIENTE — chiedere il logo in vettoriale (SVG) o PNG trasparente ad
 * alta risoluzione.
 */
function Marchio() {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
    >
      <Image
        src="/logo-mercato-contadino-mark.png"
        alt=""
        width={147}
        height={141}
        priority
        className="h-9 w-auto shrink-0 sm:h-10"
      />
      <span className="hidden flex-col leading-none sm:flex">
        <span className="font-serif text-sm font-bold uppercase leading-[1.1] tracking-tight text-verde-700 group-hover:text-verde-600 sm:whitespace-nowrap sm:text-base 2xl:text-lg">
          Mercato Contadino
        </span>
        <span className="mt-1 hidden whitespace-nowrap text-[0.65rem] tracking-[0.12em] text-pietra-600 2xl:block">
          delle Terre Verdi Teramane
        </span>
      </span>
    </Link>
  );
}

const classiCta = {
  ocra: "bg-terra-500 text-white hover:bg-terra-600",
  // Un solo pieno per riga: il secondo è outline, stessa altezza e peso.
  verde:
    "border border-verde-400 bg-transparent text-verde-700 hover:border-verde-700 hover:bg-verde-100",
} as const;

/**
 * La CTA principale resta visibile a ogni larghezza, come il marchio e il
 * carrello; la secondaria compare quando c'è spazio.
 */
const visibilitaCta = {
  ocra: "inline-flex",
  verde: "hidden lg:inline-flex",
} as const;

function VociNav({ compatto = false }: { compatto?: boolean }) {
  return (
    <>
      <li>
        <Link
          href="/"
          aria-label="Home"
          className={
            compatto
              ? "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-carbone/85 hover:bg-verde-100 hover:text-verde-800"
              : "flex items-center text-carbone/80 transition-colors hover:text-verde-700"
          }
        >
          <IconaCasa className={compatto ? "h-4 w-4" : "h-[1.15rem] w-[1.15rem]"} />
          {compatto ? "Home" : null}
        </Link>
      </li>

      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={
              compatto
                ? "block rounded-xl px-3 py-2.5 text-sm font-medium text-carbone/85 hover:bg-verde-100 hover:text-verde-800"
                : "whitespace-nowrap text-[0.8125rem] font-medium text-carbone/80 transition-colors hover:text-verde-700"
            }
          >
            {item.label}
          </Link>
        </li>
      ))}

      <li className={compatto ? "mt-1 border-t border-border pt-1" : "flex items-center"}>
        <Link
          href={areaRiservataItem.href}
          className={
            compatto
              ? "block rounded-xl px-3 py-2.5 text-sm font-medium text-pietra-600 hover:bg-verde-100 hover:text-verde-800"
              : "whitespace-nowrap border-l border-border pl-4 text-[0.8125rem] font-medium text-pietra-600 transition-colors hover:text-verde-700"
          }
        >
          {areaRiservataItem.label}
        </Link>
      </li>
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-crema/95 backdrop-blur">
      <Container className="flex h-16 items-center gap-4 lg:h-[4.5rem] xl:gap-6">
        <Marchio />

        {/* Il menu occupa lo spazio fra marchio e pulsanti e ci sta al
            centro. Sotto xl la riga non regge sette voci: collassa
            nell'hamburger, non in una seconda riga. */}
        <nav
          aria-label="Navigazione principale"
          className="hidden min-w-0 flex-1 justify-center xl:flex"
        >
          <ul className="flex items-center gap-3.5 2xl:gap-5">
            <VociNav />
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0 xl:gap-2.5">
          {ctaItems.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className={`h-10 items-center whitespace-nowrap rounded-full px-3.5 text-[0.8125rem] font-semibold transition-colors sm:px-5 ${visibilitaCta[cta.variante]} ${classiCta[cta.variante]}`}
            >
              {cta.label}
            </Link>
          ))}

          <BadgeCarrello />

          <details className="group relative xl:hidden">
            <summary
              aria-label="Apri il menu"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center gap-2 rounded-full border border-border text-sm font-medium text-carbone md:w-auto md:px-4 [&::-webkit-details-marker]:hidden"
            >
              <span aria-hidden="true" className="md:hidden">
                ☰
              </span>
              <span className="hidden md:inline">Menu</span>
              <span
                aria-hidden="true"
                className="hidden transition-transform group-open:rotate-180 md:inline"
              >
                ▾
              </span>
            </summary>
            <nav
              aria-label="Navigazione principale"
              className="absolute right-0 mt-3 w-72 rounded-2xl border border-border bg-surface p-3 shadow-lg"
            >
              <ul className="flex flex-col">
                <VociNav compatto />
              </ul>
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3 lg:hidden">
                {ctaItems.map((cta) => (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold ${classiCta[cta.variante]}`}
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
