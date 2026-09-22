import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";
import { DoveSiamo } from "@/components/dove-siamo";
import { categorieProdotto } from "@/lib/home-content";
import { fotoBanco, indirizzoCompleto, puntoVendita } from "@/lib/cooperativa";

export const metadata: Metadata = {
  title: "La spesa",
  description: `Prenota i prodotti delle aziende socie e ritirali al ${puntoVendita.nome} di ${puntoVendita.comune}: cosa trovi al banco, come funziona il ritiro, orari e indirizzo. Il pagamento avviene in loco al momento del ritiro.`,
};

/*
 * TODO CLIENTE — modalità di ritiro ancora da confermare: probabile cutoff
 * giornaliero ("ordina entro un orario, ritiri in giornata"), non slot orari a
 * capienza fissa. Finché non arriva la conferma questa pagina resta neutra sul
 * meccanismo e lo schema `slot` / `prenotazioni` non va toccato.
 */
const passaggi = [
  {
    n: "1",
    t: "Scegli i prodotti",
    d: "Il catalogo segue la stagione e mostra cosa c'è davvero al banco in questi giorni.",
  },
  {
    n: "2",
    t: "Invia la prenotazione",
    d: "Lasci nome, telefono ed eventuali note: ti confermiamo noi quando è pronta.",
  },
  {
    n: "3",
    t: "Ritiri e paghi in negozio",
    d: `Passi al ${puntoVendita.nome} negli orari di apertura e paghi lì: nessun pagamento online, nessuna consegna.`,
  },
];

export default function LaSpesaPage() {
  return (
    <>
      <PageHero
        eyebrow="La spesa"
        title="Prenota i prodotti, ritira in negozio"
        lead={`Ortaggi, formaggi, vino, olio, pane e salumi delle aziende socie, da ritirare al ${puntoVendita.nome} di ${puntoVendita.comune}.`}
      >
        <a
          href="#catalogo"
          className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-terra-500 px-8 text-base font-semibold text-white shadow-lg shadow-terra-500/20 transition-all hover:-translate-y-0.5 hover:bg-terra-600"
        >
          Vai al catalogo
          <span aria-hidden="true">→</span>
        </a>
      </PageHero>

      {/* ------------------------------------------------------------------
          Come funziona: i tre passaggi della prenotazione.
          ------------------------------------------------------------------ */}
      <Container className="py-16">
        <ol className="grid gap-6 md:grid-cols-3">
          {passaggi.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl border border-border bg-surface p-8"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terra-200/60 font-serif text-lg font-semibold text-terra-700">
                {step.n}
              </span>
              <h2 className="mt-5 font-serif text-xl font-semibold text-verde-800">
                {step.t}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {step.d}
              </p>
            </li>
          ))}
        </ol>
      </Container>

      {/* ------------------------------------------------------------------
          Il punto vendita: portato qui dalla pagina /territorio, perché
          racconta cosa si compra ed è il posto giusto prima del catalogo.
          ------------------------------------------------------------------ */}
      <section id="mercato-contadino" className="bg-surface py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:order-last">
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

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
                Il punto vendita
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
                Il {puntoVendita.nome}
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-foreground-muted">
                <p>
                  Non è un negozio che compra da altri per rivendere: è il punto
                  in cui le sei aziende della cooperativa portano direttamente
                  quello che coltivano, allevano e trasformano.
                </p>
                <p>
                  Per questo il banco cambia di settimana in settimana. Quello
                  che trovi dipende da cosa è pronto nei campi e nei
                  laboratori, non da un assortimento deciso a tavolino.
                </p>
              </div>
            </div>
          </div>

          <h3 className="mt-16 font-serif text-2xl font-semibold text-verde-800">
            Cosa ci trovi
          </h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categorieProdotto.map((categoria) => (
              <li
                key={categoria.nome}
                className="rounded-2xl border border-border p-6"
              >
                <h4 className="font-serif text-lg font-semibold text-verde-800">
                  {categoria.nome}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {categoria.descrizione}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------------
          Catalogo e prenotazione: il cuore della pagina, raggiunto dalla CTA
          in hero.
          ------------------------------------------------------------------ */}
      <section id="catalogo" className="scroll-mt-20 bg-crema py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
            Catalogo
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
            Cosa prenoti oggi
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted">
            Il catalogo e il form qui sotto sono la parte della pagina ancora
            da costruire: qui arriveranno l&apos;elenco dei prodotti attivi e
            la prenotazione vera e propria.
          </p>

          <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
            <Placeholder title="Catalogo prodotti">
              Da implementare: elenco dei prodotti attivi con lotto, prezzo,
              unità di misura e disponibilità, letti da Supabase.
            </Placeholder>
            <Placeholder title="Form di prenotazione">
              Da implementare: raccolta dei dati di contatto e del carrello,
              con conferma via email. Il meccanismo di ritiro dipende dalla
              modalità che confermerà la cooperativa.
            </Placeholder>
          </div>
        </Container>
      </section>

      <DoveSiamo />
    </>
  );
}
