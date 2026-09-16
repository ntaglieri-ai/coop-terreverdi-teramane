import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { motivi } from "@/lib/home-content";
import { IconaMotivoSvg } from "@/components/home/icone";

export function Motivi() {
  return (
    <section className="bg-sabbia py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
            Perché sceglierci
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
            Quattro cose su cui non transigiamo
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {motivi.map((motivo, i) => (
            <Reveal key={motivo.titolo} delay={i * 0.08}>
              <article className="group h-full rounded-2xl border border-border bg-surface p-8 transition-all hover:-translate-y-1 hover:border-terra-300 hover:shadow-lg hover:shadow-verde-900/5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-terra-200/60 text-terra-700 transition-colors group-hover:bg-terra-500 group-hover:text-white">
                  <IconaMotivoSvg nome={motivo.icona} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-serif text-xl font-semibold text-verde-800 lg:min-h-14">
                  {motivo.titolo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {motivo.testo}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
