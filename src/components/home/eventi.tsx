import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { eventiInEvidenza } from "@/lib/home-content";

export function EventiInEvidenza() {
  return (
    <section className="bg-verde-900 py-24 text-white">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-300">
                Eventi ed esperienze
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                La cooperativa si visita, non solo si acquista
              </h2>
            </div>
            <Link
              href="/eventi"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-verde-900"
            >
              Tutti gli eventi
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {eventiInEvidenza.map((evento, i) => (
            <Reveal key={evento.titolo} delay={i * 0.08}>
              <Link
                href="/eventi"
                className="group block h-full overflow-hidden rounded-2xl border border-verde-700 bg-verde-800 transition-all hover:-translate-y-1 hover:border-terra-400"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={evento.image.src}
                    alt={evento.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-terra-300">
                    {evento.luogo}
                  </p>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-verde-300">
                    {evento.periodo}
                  </p>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-white">
                    {evento.titolo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-verde-200">
                    {evento.descrizione}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
