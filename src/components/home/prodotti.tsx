import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { categorieProdotto } from "@/lib/home-content";

export function Prodotti() {
  return (
    <section className="bg-surface py-24">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
                I nostri prodotti
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
                Sei filiere, un solo banco
              </h2>
            </div>
            <Link
              href="/la-spesa"
              className="inline-flex items-center gap-2 rounded-full border border-verde-300 px-6 py-3 text-sm font-semibold text-verde-700 transition-colors hover:border-terra-400 hover:bg-terra-500 hover:text-white"
            >
              Vai al catalogo
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categorieProdotto.map((categoria, i) => (
            <Reveal key={categoria.nome} delay={i * 0.08}>
              <Link
                href="/la-spesa"
                className="group block h-full overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-terra-300 hover:shadow-xl hover:shadow-verde-900/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={categoria.image.src}
                    alt={categoria.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-semibold text-verde-800">
                    {categoria.nome}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {categoria.descrizione}
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
