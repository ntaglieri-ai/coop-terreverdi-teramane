import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { heroImage } from "@/lib/home-content";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Doppio strato: gradiente verticale per il testo in basso, velo verde
          per legare la foto alla palette. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-verde-900 via-verde-900/70 via-45% to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-verde-900/12 mix-blend-multiply"
      />

      <Container className="relative z-10 pb-20 pt-32 sm:pb-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-terra-300/60 bg-verde-900/50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-terra-200 backdrop-blur-sm">
          Dal 2008 · Colline teramane
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] text-white drop-shadow-sm sm:text-6xl">
          Coltiviamo il territorio, una stagione alla volta
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-verde-100">
          Sei aziende agricole del teramano in un&apos;unica cooperativa. Quello
          che coltiviamo e lavoriamo si trova al Mercato Contadino, a
          Giulianova.
        </p>

        {/* Le due CTA hanno la stessa altezza e lo stesso peso nel layout:
            cambia lo stile, non l'importanza. */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/la-spesa"
            className="inline-flex h-13 items-center justify-center rounded-full bg-terra-500 px-8 text-base font-semibold text-white shadow-lg shadow-verde-900/30 transition-all hover:-translate-y-0.5 hover:bg-terra-600"
          >
            Prenota la spesa
          </Link>
          <Link
            href="/eventi"
            className="inline-flex h-13 items-center justify-center rounded-full border border-white/60 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/15"
          >
            Scopri gli eventi
          </Link>
        </div>
      </Container>
    </section>
  );
}
