import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { DoveSiamo } from "@/components/dove-siamo";
import { cooperativa, indirizzoCompleto, puntoVendita } from "@/lib/cooperativa";
import { categorieProdotto, territorioImage } from "@/lib/home-content";
import { fotoBanco } from "@/lib/cooperativa";

export const metadata: Metadata = {
  title: "Territorio",
  description: `Le colline teramane fra Mosciano Sant'Angelo, Notaresco, Controguerra, Castellalto e Bellante, e il ${puntoVendita.nome} di ${puntoVendita.comune}: dove siamo, orari e come raggiungerci.`,
};

export default function TerritorioPage() {
  return (
    <>
      <PageHero
        eyebrow="Territorio"
        title="Dalle colline teramane al mare"
        lead="Poche decine di chilometri in cui il terreno cambia carattere salendo dalla costa verso l'interno. È da qui che viene tutto quello che trovi al banco."
      />

      <section className="bg-crema py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
                Una zona che non permette monocolture
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-foreground-muted">
                <p>
                  Le nostre campagne stanno fra Mosciano Sant&apos;Angelo,
                  Notaresco, Controguerra, Castellalto e Bellante, nell&apos;area
                  del GAL Terreverdi Teramane. Salendo dalla costa verso il Gran
                  Sasso il terreno cambia in pochi chilometri: cambia
                  l&apos;esposizione, cambia l&apos;acqua, cambia quello che
                  conviene piantare.
                </p>
                <p>
                  Per questo ogni appezzamento chiede la sua coltura e il suo
                  tempo, e per questo le sei aziende socie fanno mestieri
                  diversi invece di rincorrere lo stesso prodotto. Dal{" "}
                  {cooperativa.annoFondazione} mettiamo in comune il raccolto e
                  un unico punto vendita.
                </p>
                <p>
                  Coltiviamo in rotazione, raccogliamo quando il prodotto è
                  pronto e non prima, e teniamo traccia di ogni lotto: campo,
                  comune, data di raccolta.
                </p>
              </div>
              <Link
                href="/chi-siamo"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-verde-700 transition-colors hover:text-terra-600"
              >
                Le sei aziende socie
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-verde-900/10">
              <Image
                src={territorioImage.src}
                alt={territorioImage.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------
          Il punto vendita: era la pagina "Il Mercato Contadino", ora vive qui.
          ------------------------------------------------------------------ */}
      <section id="mercato-contadino" className="bg-surface py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:order-last">
              <Image
                src={fotoBanco.src}
                alt={fotoBanco.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-verde-900/70 via-verde-900/10 to-transparent"
              />
              <p className="absolute bottom-6 left-6 right-6 font-serif text-lg font-semibold text-white">
                {indirizzoCompleto}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
                Il punto vendita
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
                Il {puntoVendita.nome}
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-foreground-muted">
                <p>
                  Non è un negozio che compra da altri per rivendere: è il punto
                  in cui le sei aziende della cooperativa portano direttamente
                  quello che coltivano, allevano e trasformano.
                </p>
                <p>
                  Per questo il banco cambia di settimana in settimana. Quello
                  che trovi dipende da cosa è pronto nei campi e nei
                  laboratori, non da un assortimento deciso a tavolino.
                </p>
              </div>
            </div>
          </div>

          <h3 className="mt-16 font-serif text-2xl font-semibold text-verde-800">
            Cosa ci trovi
          </h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categorieProdotto.map((categoria) => (
              <li
                key={categoria.nome}
                className="rounded-2xl border border-border p-6"
              >
                <h4 className="font-serif text-lg font-semibold text-verde-800">
                  {categoria.nome}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {categoria.descrizione}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <DoveSiamo />
    </>
  );
}
