import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";
import { OrariTabella } from "@/components/orari-tabella";
import { indirizzoCompleto, puntoVendita } from "@/lib/cooperativa";

export const metadata: Metadata = {
  title: "La spesa",
  description: `Prenota i prodotti delle aziende socie e ritirali al ${puntoVendita.nome} di ${puntoVendita.comune}. Il pagamento avviene in loco al momento del ritiro.`,
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
      />

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

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          <Placeholder title="Catalogo prodotti">
            Da implementare: elenco dei prodotti attivi con lotto, prezzo, unità
            di misura e disponibilità, letti da Supabase.
          </Placeholder>
          <Placeholder title="Form di prenotazione">
            Da implementare: raccolta dei dati di contatto e del carrello, con
            conferma via email. Il meccanismo di ritiro dipende dalla modalità
            che confermerà la cooperativa.
          </Placeholder>

          <div className="rounded-2xl border border-border bg-surface p-8">
            <h3 className="font-serif text-lg font-semibold text-verde-800">
              Dove si ritira
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              {puntoVendita.nome}, {indirizzoCompleto}
            </p>
            <OrariTabella className="mt-4" />
            <Link
              href="/contatti"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-verde-700 transition-colors hover:text-terra-600"
            >
              Mappa e contatti
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
