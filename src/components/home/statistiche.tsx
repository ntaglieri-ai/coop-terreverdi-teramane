import { Container } from "@/components/container";
import { statistiche } from "@/lib/cooperativa";
import { IconaMotivoSvg } from "@/components/home/icone";
import type { IconaMotivo } from "@/lib/home-content";

/** Un'icona per statistica, nello stesso ordine di `statistiche`. */
const icone: IconaMotivo[] = ["cooperativa", "stagione", "filiera", "lotto"];

export function Statistiche() {
  return (
    <section className="border-b border-border bg-verde-800 text-white">
      <Container>
        <dl className="grid grid-cols-2 divide-verde-700 sm:divide-x lg:grid-cols-4">
          {statistiche.map((stat, i) => (
            <div
              key={stat.etichetta}
              className="flex items-center gap-4 px-2 py-8 sm:justify-center"
            >
              <IconaMotivoSvg
                nome={icone[i]}
                className="h-7 w-7 shrink-0 text-terra-300"
              />
              <div>
                <dt className="sr-only">{stat.etichetta}</dt>
                <dd>
                  <span className="block font-serif text-3xl font-semibold leading-none">
                    {stat.valore}
                  </span>
                  <span className="mt-1.5 block text-xs uppercase tracking-[0.14em] text-verde-200">
                    {stat.etichetta}
                  </span>
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
