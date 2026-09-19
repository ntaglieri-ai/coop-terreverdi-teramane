import Image from "next/image";
import { Container } from "@/components/container";
import { OrariTabella } from "@/components/orari-tabella";
import {
  fotoNegozio,
  indirizzoCompleto,
  mappa,
  notaOrdini,
  puntoVendita,
} from "@/lib/cooperativa";

function IconaEsterna() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function DoveSiamo() {
  return (
    <section className="bg-crema py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
              Dove siamo
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
              {puntoVendita.nome}
            </h2>
            <address className="mt-6 text-base not-italic leading-relaxed text-foreground-muted">
              {indirizzoCompleto}
            </address>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${puntoVendita.telefonoHref}`}
                className="inline-flex h-13 items-center justify-center rounded-full bg-verde-700 px-7 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-verde-800"
              >
                {puntoVendita.telefono}
              </a>

              <a
                href={mappa.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-verde-300 px-7 text-base font-semibold text-verde-700 transition-all hover:-translate-y-0.5 hover:border-terra-400 hover:text-terra-600"
              >
                Apri in Google Maps
                <IconaEsterna />
              </a>

              {/* Il bottone compare solo quando c'è un numero WhatsApp vero:
                  un wa.me verso il fisso sarebbe un link morto. */}
              {puntoVendita.whatsapp ? (
                <a
                  href={`https://wa.me/${puntoVendita.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-verde-300 px-7 text-base font-semibold text-verde-700 transition-all hover:-translate-y-0.5 hover:border-terra-400 hover:text-terra-600"
                >
                  Scrivici su WhatsApp
                  <IconaEsterna />
                </a>
              ) : null}
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-serif text-base font-semibold text-verde-800">
                Sugli ordini
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {notaOrdini}
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-serif text-base font-semibold text-verde-800">
                Orari di apertura
              </h3>
              <OrariTabella className="mt-3" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
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
                className="absolute inset-0 bg-gradient-to-t from-verde-900/80 via-verde-900/15 to-transparent"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-xl font-semibold text-white">
                  {puntoVendita.nome}
                </p>
                <p className="mt-1 text-sm text-verde-100">
                  {puntoVendita.via}, {puntoVendita.comune}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border">
              <iframe
                src={mappa.embed}
                title={`Mappa del ${puntoVendita.nome} in ${indirizzoCompleto}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full border-0"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
