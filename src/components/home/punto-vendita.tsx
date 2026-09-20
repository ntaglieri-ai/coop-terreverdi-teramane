import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { fotoBanco, indirizzoCompleto, puntoVendita } from "@/lib/cooperativa";

/**
 * Il punto vendita, portato qui dalla pagina /territorio (sezione
 * "mercato-contadino"): stesso racconto e stessa foto. Non ripete "Cosa ci
 * trovi" perché in home la sezione Prodotti, subito dopo, mostra le stesse
 * sei filiere con le foto — elencarle di nuovo qui sarebbe ridondante.
 */
export function PuntoVenditaHome() {
  return (
    <section className="bg-sabbia py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-verde-900/10">
              <Image
                src={fotoBanco.src}
                alt={fotoBanco.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-verde-900/70 via-verde-900/10 to-transparent"
              />
              <p className="absolute bottom-6 left-6 right-6 font-serif text-lg font-semibold text-white">
                {indirizzoCompleto}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
              Il punto vendita
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
              Il {puntoVendita.nome}
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-foreground-muted">
              <p>
                Non è un negozio che compra da altri per rivendere: è il
                punto in cui le sei aziende della cooperativa portano
                direttamente quello che coltivano, allevano e trasformano.
              </p>
              <p>
                Per questo il banco cambia di settimana in settimana. Quello
                che trovi dipende da cosa è pronto nei campi e nei
                laboratori, non da un assortimento deciso a tavolino.
              </p>
            </div>
            <Link
              href="/territorio#mercato-contadino"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-verde-700 transition-colors hover:text-terra-600"
            >
              Tutti i dettagli sul punto vendita
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
