import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Produttori } from "@/components/produttori";
import { chiSiamoHeroImage, cooperativa, puntoVendita } from "@/lib/cooperativa";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: `Dal ${cooperativa.annoFondazione} la Cooperativa Agricola Terre Verdi Teramane riunisce ${cooperativa.numeroAziende} aziende agricole del teramano in un unico punto vendita a ${puntoVendita.comune}.`,
};

const blocchi = [
  {
    titolo: "Come è nata",
    testo: `Nel ${cooperativa.annoFondazione} sei aziende agricole del teramano hanno scelto di mettersi insieme. Ognuna faceva già il suo mestiere — chi l'orto, chi il formaggio, chi il vino — ma da sola arrivava a un mercato troppo piccolo. La cooperativa è nata per dare loro un banco comune.`,
  },
  {
    titolo: "Cosa facciamo",
    testo: `Coltiviamo, alleviamo e trasformiamo su terreni che stanno tutti entro poche decine di chilometri. Le sei filiere — ortaggi e legumi, formaggi, vino, olio, pane e salumi — confluiscono al ${puntoVendita.nome} di ${puntoVendita.comune}, dove si compra direttamente da chi produce.`,
  },
  {
    titolo: "A cosa teniamo",
    testo:
      "Stagionalità vera, niente passaggi intermedi e la possibilità di risalire sempre a chi ha prodotto cosa e quando. Sono le tre cose su cui la cooperativa non ha mai cambiato idea.",
  },
];

export default function ChiSiamoPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="relative h-[265px] w-full sm:h-[382px]">
          <Image
            src={chiSiamoHeroImage.src}
            alt={chiSiamoHeroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-carbone/85 via-carbone/25 to-transparent"
          />
        </div>

        <Container className="absolute inset-x-0 bottom-0 pb-6 sm:pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-200">
            Chi siamo
          </p>
          <h1 className="mt-2 max-w-2xl font-serif text-3xl font-semibold leading-tight text-white drop-shadow sm:text-4xl">
            Sei aziende agricole, una cooperativa
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90 drop-shadow sm:text-base">
            Dal {cooperativa.annoFondazione} lavoriamo insieme sulle colline
            teramane e vendiamo quello che produciamo al {puntoVendita.nome}{" "}
            di {puntoVendita.comune}.
          </p>
        </Container>
      </section>

      <Container className="grid gap-6 py-16 md:grid-cols-3">
        {blocchi.map((blocco) => (
          <article
            key={blocco.titolo}
            className="rounded-2xl border border-border bg-surface p-8"
          >
            <h2 className="font-serif text-xl font-semibold text-verde-800">
              {blocco.titolo}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              {blocco.testo}
            </p>
          </article>
        ))}
      </Container>

      <Produttori />

      <Container className="pb-24">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/territorio"
            className="inline-flex h-13 items-center justify-center rounded-full bg-verde-700 px-7 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-verde-800"
          >
            Il territorio e il punto vendita
          </Link>
          <Link
            href="/la-spesa/catalogo"
            className="inline-flex h-13 items-center justify-center rounded-full border border-verde-300 px-7 text-base font-semibold text-verde-700 transition-all hover:-translate-y-0.5 hover:border-terra-400 hover:text-terra-600"
          >
            Prenota la spesa
          </Link>
        </div>
      </Container>

      {/* TODO CLIENTE — mancano la storia dettagliata e le foto dei soci. */}
    </>
  );
}
