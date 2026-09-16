import Link from "next/link";
import { Container } from "@/components/container";
import { homeEntryPoints } from "@/lib/navigation";

/** Segnaposto: sostituire con i dati reali della rassegna stampa. */
const rassegnaInEvidenza = [
  {
    testata: "Testata da definire",
    titolo: "Titolo dell'articolo in evidenza",
    data: "Data da definire",
  },
  {
    testata: "Testata da definire",
    titolo: "Secondo articolo in evidenza",
    data: "Data da definire",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-verde-900 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-verde-900 via-verde-800 to-verde-700"
        />
        <Container className="relative py-24 sm:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-300">
            Colline teramane · Abruzzo
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
            Coltiviamo il territorio, una stagione alla volta
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-verde-100">
            Siamo una cooperativa agricola: portiamo in tavola prodotti di
            stagione tracciati dal campo al ritiro e apriamo i nostri spazi a
            degustazioni ed esperienze.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/la-spesa"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-verde-900 transition-colors hover:bg-verde-100"
            >
              Prenota la spesa
            </Link>
            <Link
              href="/eventi"
              className="rounded-full border border-verde-300/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Scopri gli eventi
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {homeEntryPoints.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-2xl border border-border bg-surface p-8 transition-all hover:-translate-y-1 hover:border-verde-300 hover:shadow-lg"
              >
                <h2 className="font-serif text-2xl font-semibold text-verde-800">
                  {item.label}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground-muted">
                  {item.description}
                </p>
                <span className="mt-6 text-sm font-semibold text-terra-600 transition-transform group-hover:translate-x-1">
                  Vai alla pagina →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="rounded-3xl bg-surface-muted p-10 sm:p-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
                  Rassegna stampa
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-verde-900">
                  Hanno parlato di noi
                </h2>
              </div>
              <Link
                href="/rassegna-stampa"
                className="text-sm font-semibold text-verde-700 hover:text-verde-900"
              >
                Tutta la rassegna →
              </Link>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {rassegnaInEvidenza.map((voce, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-pietra-400">
                    {voce.testata} · {voce.data}
                  </p>
                  <p className="mt-3 font-serif text-lg font-semibold text-verde-800">
                    {voce.titolo}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
