import Image from "next/image";
import Link from "next/link";
import { BadgeCarrello } from "@/components/carrello/badge-carrello";
import { AzioniHeaderMobile } from "@/components/mobile/azioni-header";
import { VociNav } from "@/components/voci-nav";
import { ctaItems } from "@/lib/navigation";

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
 * Sotto lg resta il solo simbolo: la riga mobile è una sola e lo spazio serve
 * ai tre comandi a destra. Il sottotitolo compare solo da 2xl.
 *
 * TODO CLIENTE — chiedere il logo in vettoriale (SVG) o PNG trasparente ad
 * alta risoluzione.
 */
function Marchio() {
  return (
    <Link
      href="/"
      aria-label="Mercato Contadino delle Terre Verdi Teramane, vai alla home"
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
      <span className="hidden flex-col leading-none lg:flex">
        <span className="font-serif text-sm font-bold uppercase leading-[1.1] tracking-tight text-verde-700 group-hover:text-verde-600 sm:whitespace-nowrap sm:text-base">
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
 * Sotto lg le CTA testuali spariscono: su mobile la spesa e gli eventi hanno
 * la loro voce nella bottom navigation, e il contatto è l'icona in header.
 */
const visibilitaCta = {
  ocra: "hidden lg:inline-flex",
  verde: "hidden lg:inline-flex",
} as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-crema/95 backdrop-blur">
      {/* Container proprio, piu' largo del max-w-6xl delle pagine: marchio,
          otto voci, due CTA e carrello non ci stanno nei 1104px di contenuto.
          Con quelli il menu sbordava di 28px e, per via di justify-center,
          finiva sopra il wordmark a sinistra e sopra i pulsanti a destra. */}
      <div className="mx-auto flex h-16 w-full max-w-[80rem] items-center gap-4 px-4 sm:px-6 lg:h-[4.5rem] xl:gap-6">
        <Marchio />

        {/* Il menu occupa lo spazio fra marchio e pulsanti e ci sta al
            centro. Sotto xl la riga non regge sette voci: collassa
            nell'hamburger, non in una seconda riga. */}
        <nav
          aria-label="Navigazione principale"
          className="hidden min-w-0 flex-1 justify-center overflow-hidden xl:flex"
        >
          <ul className="flex items-center gap-3.5 2xl:gap-4">
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

          <span className="hidden lg:inline-flex">
            <BadgeCarrello />
          </span>

          {/* Fra lg e xl il menu desktop è ancora collassato: resta il
              <details>, invariato. Sotto lg comanda AzioniHeaderMobile. */}
          <details className="group relative hidden lg:block xl:hidden">
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
            </nav>
          </details>

          <AzioniHeaderMobile />
        </div>
      </div>
    </header>
  );
}
