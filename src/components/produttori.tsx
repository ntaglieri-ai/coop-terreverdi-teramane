import Image from "next/image";
import { Container } from "@/components/container";
import { aziendeSocie } from "@/lib/cooperativa";

/**
 * Le sei aziende socie, in un carosello orizzontale con scroll-snap.
 *
 * Niente JavaScript: lo scorrimento è quello nativo del browser, quindi
 * funziona con trackpad, dito, rotella e tastiera senza stato da gestire.
 *
 * TODO CLIENTE — di cinque su sei conosciamo solo l'attività: riempiendo
 * `nome` in cooperativa.ts la card mostra la ragione sociale da sé. Mancano
 * anche i nomi dei soci e le foto reali: non ne inventiamo.
 */
export function Produttori() {
  return (
    <section className="bg-sabbia py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
            I nostri soci
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
            Sei aziende, sei mestieri
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground-muted">
            Ognuna lavora i propri terreni e porta al banco comune quello che sa
            fare meglio. Sono tutte entro poche decine di chilometri dal punto
            vendita.
          </p>
        </div>

        {/* -mx-6 px-6: la barra di scorrimento arriva ai bordi del container,
            ma le card restano allineate alla griglia del testo. */}
        <ul className="-mx-6 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:thin]">
          {aziendeSocie.map((azienda) => (
            <li
              key={`${azienda.attivita}-${azienda.comune}`}
              className="flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-surface sm:w-80"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={azienda.immagine.src}
                  alt={azienda.immagine.alt}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-terra-600">
                  {azienda.comune}
                </p>
                <h3 className="mt-3 font-serif text-xl font-semibold text-verde-800">
                  {azienda.nome ?? azienda.attivita}
                </h3>
                {azienda.nome ? (
                  <p className="mt-1 text-sm text-pietra-400">
                    {azienda.attivita}
                  </p>
                ) : null}
                <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                  {azienda.produzione}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-2 text-xs text-pietra-400">
          Scorri per vedere tutte le aziende →
        </p>
      </Container>
    </section>
  );
}
