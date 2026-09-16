import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { rassegnaInEvidenza } from "@/lib/home-content";

export function Rassegna() {
  return (
    <section className="bg-sabbia py-24">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
                Rassegna stampa
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
                Hanno parlato di noi
              </h2>
            </div>
            <Link
              href="/rassegna-stampa"
              className="inline-flex items-center gap-2 text-sm font-semibold text-verde-700 transition-colors hover:text-terra-600"
            >
              Tutta la rassegna
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {rassegnaInEvidenza.map((voce, i) => (
            <Reveal key={`${voce.titolo}-${i}`} delay={i * 0.08}>
              <li className="h-full rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-terra-300">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-pietra-400">
                  {voce.testata} · {voce.data}
                </p>
                <p className="mt-3 font-serif text-lg font-semibold text-verde-800">
                  {voce.titolo}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
