import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { aziendeSocie, cooperativa, fotoNegozio, puntoVendita } from "@/lib/cooperativa";

/**
 * Versione-riassunto della pagina /chi-siamo: stesso racconto (nascita,
 * cosa facciamo, a cosa teniamo) condensato in due paragrafi con foto
 * laterale, più la griglia dei sei soci — qui in griglia e non a scroll
 * orizzontale come su /chi-siamo, cosi in home si vedono tutti insieme
 * senza dover scorrere.
 *
 * La pagina /chi-siamo resta invariata: chi vuole il dettaglio completo ci
 * arriva dal link in fondo al primo blocco.
 */
export function ChiSiamoHome() {
  return (
    <section className="bg-surface py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
              Chi siamo
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
              Sei aziende agricole, una cooperativa
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-foreground-muted">
              <p>
                Dal {cooperativa.annoFondazione} sei aziende agricole del
                teramano lavorano insieme invece di farsi concorrenza.
                Coltiviamo, alleviamo e trasformiamo su terreni che stanno
                tutti entro poche decine di chilometri: le sei filiere —
                ortaggi e legumi, formaggi, vino, olio, pane e salumi —
                confluiscono al {puntoVendita.nome} di {puntoVendita.comune},
                dove si compra direttamente da chi produce.
              </p>
              <p>
                Stagionalità vera, niente passaggi intermedi e la possibilità
                di risalire sempre a chi ha prodotto cosa e quando: sono le
                tre cose su cui la cooperativa non ha mai cambiato idea.
              </p>
            </div>
            <Link
              href="/chi-siamo"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-verde-700 transition-colors hover:text-terra-600"
            >
              Scopri la nostra storia
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-verde-900/10">
              <Image
                src={fotoNegozio.src}
                alt={fotoNegozio.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-20">
          <h3 className="font-serif text-2xl font-semibold text-verde-800">
            Sei aziende, sei mestieri
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-muted">
            Ognuna lavora i propri terreni e porta al banco comune quello che
            sa fare meglio. Sono tutte entro poche decine di chilometri dal
            punto vendita.
          </p>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aziendeSocie.map((azienda) => (
              <li
                key={`${azienda.attivita}-${azienda.comune}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-crema"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={azienda.immagine.src}
                    alt={azienda.immagine.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-terra-600">
                    {azienda.comune}
                  </p>
                  <h4 className="mt-3 font-serif text-lg font-semibold text-verde-800">
                    {azienda.nome ?? azienda.attivita}
                  </h4>
                  {azienda.nome ? (
                    <p className="mt-1 text-sm text-pietra-400">
                      {azienda.attivita}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {azienda.produzione}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
