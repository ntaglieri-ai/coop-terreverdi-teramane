import Image from "next/image";
import Link from "next/link";
import { BadgeCarrello } from "@/components/carrello/badge-carrello";
import { AzioniHeaderMobile } from "@/components/mobile/azioni-header";
import { MenuMobile } from "@/components/mobile/menu-mobile";
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
 * Anche sotto lg il wordmark resta visibile, ma in corpo ridotto e con
 * `truncate`: sulla riga mobile lo spazio è conteso con i tre comandi a
 * destra, quindi il testo si può restringere ed eventualmente troncare
 * invece di spingere le icone o restarci addosso.
 *
 * Il sottotitolo segue lo stesso spazio libero: c'è sotto lg, dove il menu
 * è nell'hamburger e la riga ha margine, e torna da 2xl, quando la riga si
 * allarga di nuovo. Nel mezzo (lg-2xl) sparisce perché lì la riga è già
 * piena di voci di menu e CTA.
 *
 * TODO CLIENTE — chiedere il logo in vettoriale (SVG) o PNG trasparente ad
 * alta risoluzione.
 */
function Marchio() {
  return (
    <Link
      href="/"
      aria-label="Mercato Contadino Giulianova, Terre Verdi Teramane, vai alla home"
      className="group flex min-w-0 shrink items-center gap-2 sm:gap-3"
    >
      <Image
        src="/logo-mercato-contadino-mark.png"
        alt=""
        width={147}
        height={141}
        priority
        className="h-9 w-auto shrink-0 sm:h-10"
      />
      <span className="flex min-w-0 flex-col justify-center leading-none">
        <span className="truncate font-serif text-[0.62rem] font-bold uppercase leading-[1.1] tracking-tight text-verde-700 group-hover:text-verde-600 sm:text-[0.8rem] lg:text-sm">
          Mercato Contadino Giulianova
        </span>
        <span className="mt-1 block truncate whitespace-nowrap text-[0.6rem] tracking-[0.1em] text-pietra-600 lg:hidden 2xl:block 2xl:text-[0.65rem] 2xl:tracking-[0.12em]">
          Terre Verdi Teramane
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

          {/* Fra lg e xl il menu desktop è ancora collassato: stesso
              hamburger del mobile (icona, si chiude alla navigazione, con
              Esc e click fuori), non più il vecchio <details> che restava
              aperto. Sotto lg comanda AzioniHeaderMobile. */}
          <div className="hidden lg:block xl:hidden">
            <MenuMobile />
          </div>

          <AzioniHeaderMobile />
        </div>
      </div>
    </header>
  );
}
