import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { territorioImage } from "@/lib/home-content";

export function Territorio() {
  return (
    <section className="bg-crema py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
              Il nostro territorio
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
              Le colline fra il Gran Sasso e l&apos;Adriatico
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-foreground-muted">
              <p>
                Lavoriamo nell&apos;area del GAL Terreverdi Teramane, dove i
                campi salgono dal mare verso la montagna e cambiano carattere
                ogni pochi chilometri. È una zona che non permette monocolture:
                ogni appezzamento chiede la sua coltura e il suo tempo.
              </p>
              <p>
                Da qui viene il nostro modo di lavorare. Coltiviamo in
                rotazione, raccogliamo quando il prodotto è pronto e non prima,
                e teniamo traccia di ogni lotto: campo, comune, data di
                raccolta.
              </p>
            </div>
            <Link
              href="/chi-siamo"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-verde-700 transition-colors hover:text-terra-600"
            >
              Conosci la cooperativa
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-verde-900/10">
              <Image
                src={territorioImage.src}
                alt={territorioImage.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
