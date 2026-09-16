import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Produttori } from "@/components/produttori";
import { cooperativa, puntoVendita } from "@/lib/cooperativa";

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
      <PageHero
        eyebrow="Chi siamo"
        title="Sei aziende agricole, una cooperativa"
        lead={`Dal ${cooperativa.annoFondazione} lavoriamo insieme sulle colline teramane e vendiamo quello che produciamo al ${puntoVendita.nome} di ${puntoVendita.comune}.`}
      />

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

      {/* TODO CLIENTE — mancano la storia dettagliata e le foto dei soci. */}
    </>
  );
}
