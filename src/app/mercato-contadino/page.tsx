import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { OrariTabella } from "@/components/orari-tabella";
import {
  fotoNegozio,
  indirizzoCompleto,
  notaOrdini,
  puntoVendita,
} from "@/lib/cooperativa";
import { categorieProdotto } from "@/lib/home-content";

export const metadata: Metadata = {
  title: "Il Mercato Contadino",
  description: `Il ${puntoVendita.nome} di ${puntoVendita.comune} è il punto vendita della cooperativa: cosa ci trovi, come funziona la spesa e quando siamo aperti.`,
};

export default function MercatoContadinoPage() {
  return (
    <>
      <PageHero
        eyebrow="Il Mercato Contadino"
        title="Il banco dove finiscono tutte le nostre filiere"
        lead={`Un solo negozio, in ${indirizzoCompleto}, con quello che le sei aziende socie producono in quel momento.`}
      />

      <section className="bg-crema py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold leading-tight text-verde-900">
                Che cos&apos;è
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-foreground-muted">
                <p>
                  Il {puntoVendita.nome} non è un negozio che compra da altri
                  per rivendere: è il punto in cui le sei aziende della
                  cooperativa portano direttamente quello che coltivano,
                  allevano e trasformano.
                </p>
                <p>
                  Per questo il banco cambia di settimana in settimana. Quello
                  che trovi dipende da cosa è pronto nei campi e nei
                  laboratori, non da un assortimento deciso a tavolino.
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={fotoNegozio.src}
                alt={fotoNegozio.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-verde-900/70 via-verde-900/10 to-transparent"
              />
              <p className="absolute bottom-6 left-6 right-6 font-serif text-xl font-semibold text-white">
                {puntoVendita.nome}, {puntoVendita.comune}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-24">
        <Container>
          <h2 className="text-3xl font-semibold leading-tight text-verde-900">
            Cosa ci trovi
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categorieProdotto.map((categoria) => (
              <li
                key={categoria.nome}
                className="rounded-2xl border border-border p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-verde-800">
                  {categoria.nome}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {categoria.descrizione}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-sabbia py-24">
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-verde-900">
              Come funziona
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground-muted">
              Puoi passare in negozio negli orari di apertura, oppure prenotare
              in anticipo quello che ti serve e ritirarlo già pronto.{" "}
              {notaOrdini}
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground-muted">
              Il pagamento avviene sempre in cooperativa, al ritiro: non c&apos;è
              pagamento online e non facciamo consegne a domicilio.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/la-spesa"
                className="inline-flex h-13 items-center justify-center rounded-full bg-terra-500 px-7 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-terra-600"
              >
                Prenota la spesa
              </Link>
              <Link
                href="/contatti"
                className="inline-flex h-13 items-center justify-center rounded-full border border-verde-300 px-7 text-base font-semibold text-verde-700 transition-all hover:-translate-y-0.5 hover:border-terra-400 hover:text-terra-600"
              >
                Mappa e contatti
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-8">
            <h3 className="font-serif text-lg font-semibold text-verde-800">
              Orari di apertura
            </h3>
            <OrariTabella className="mt-4" />
          </div>
        </Container>
      </section>
    </>
  );
}
