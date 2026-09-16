import { Container } from "@/components/container";
import { aziendeSocie } from "@/lib/cooperativa";

/**
 * Le sei aziende socie.
 *
 * TODO CLIENTE — di cinque su sei conosciamo solo l'attività: quando arrivano
 * le ragioni sociali basta riempire `nome` in cooperativa.ts, la card la mostra
 * da sé.
 */
export function Produttori() {
  return (
    <section className="bg-sabbia py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
            I nostri produttori
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

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aziendeSocie.map((azienda) => (
            <li
              key={`${azienda.attivita}-${azienda.comune}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-terra-300"
            >
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
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
