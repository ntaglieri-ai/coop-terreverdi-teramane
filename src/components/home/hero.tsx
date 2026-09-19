import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { heroImage } from "@/lib/home-content";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[96svh] items-end overflow-hidden sm:min-h-[80vh]">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        /* object-position alto: sposta il ritaglio verso il basso della foto,
           cioe' fa salire il borgo e libera la distesa di uliveto per il
           testo. Su mobile l'immagine copre esattamente in altezza, quindi
           qui non ha effetto: li' il blocco scende sotto le case. */
        className="object-cover object-[center_72%]"
      />

      {/* Doppio strato: gradiente verticale per il testo in basso, velo verde
          per legare la foto alla palette. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-verde-900 via-verde-900/75 via-60% to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-verde-900/12 mix-blend-multiply"
      />

      <Container className="relative z-10 pb-28 pt-32 sm:pb-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-terra-300/60 bg-verde-900/50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-terra-200 backdrop-blur-sm">
          Dal 2008 · Colline teramane
        </span>

        <h1 className="mt-5 max-w-3xl text-[2rem] font-semibold leading-[1.1] text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
          Coltiviamo il territorio, una stagione alla volta
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-verde-100 sm:text-lg">
          Sei aziende agricole del teramano in un&apos;unica cooperativa. Quello
          che coltiviamo e lavoriamo si trova al Mercato Contadino, a
          Giulianova.
        </p>

        {/* Le due CTA hanno la stessa altezza e lo stesso peso nel layout:
            cambia lo stile, non l'importanza. */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/la-spesa"
            className="inline-flex h-13 items-center justify-center rounded-full bg-terra-500 px-6 text-sm font-semibold text-white shadow-lg shadow-verde-900/30 transition-all hover:-translate-y-0.5 hover:bg-terra-600 sm:px-8 sm:text-base"
          >
            Prenota la spesa
          </Link>
          <Link
            href="/eventi"
            className="inline-flex h-13 items-center justify-center rounded-full border border-white/60 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/15 sm:px-8 sm:text-base"
          >
            Scopri gli eventi
          </Link>
        </div>
      </Container>
    </section>
  );
}
