import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

export function CtaFinale() {
  return (
    <section className="bg-crema py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
            Come vuoi iniziare
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
            Due modi per incontrarci
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col rounded-3xl bg-verde-800 p-10 text-white">
              <h3 className="font-serif text-2xl font-semibold">
                Prenota la spesa
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-verde-100">
                Scegli dal catalogo di stagione, prenoti la fascia di ritiro e
                paghi in cooperativa al momento del ritiro. Nessun pagamento
                online, nessuna consegna.
              </p>
              <Link
                href="/la-spesa"
                className="mt-8 inline-flex h-13 items-center justify-center rounded-full bg-terra-500 px-8 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-terra-600"
              >
                Vai al catalogo
              </Link>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-10">
              <h3 className="font-serif text-2xl font-semibold text-verde-800">
                Vieni a trovarci
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground-muted">
                Degustazioni in Sala, raccolte guidate e attività nei campi: i
                posti sono limitati e si prenotano online. Per gruppi e scuole
                scrivici, costruiamo il programma insieme.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/eventi"
                  className="inline-flex h-13 flex-1 items-center justify-center rounded-full bg-verde-700 px-6 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-verde-800"
                >
                  Vedi gli eventi
                </Link>
                <Link
                  href="/contatti"
                  className="inline-flex h-13 flex-1 items-center justify-center rounded-full border border-verde-300 px-6 text-base font-semibold text-verde-700 transition-all hover:-translate-y-0.5 hover:border-terra-400 hover:text-terra-600"
                >
                  Contattaci
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
