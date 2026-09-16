import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "La spesa",
  description:
    "Prenota i prodotti di stagione della cooperativa e ritirali in sede. Il pagamento avviene in loco al momento del ritiro.",
};

export default function LaSpesaPage() {
  return (
    <>
      <PageHero
        eyebrow="La spesa"
        title="Prenota i prodotti, ritira in cooperativa"
        lead="Scegli dal catalogo, prenota uno slot di ritiro e paga in loco: nessun pagamento online, nessuna consegna."
      />

      <Container className="py-16">
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: "1",
              t: "Scegli i prodotti",
              d: "Catalogo aggiornato con i lotti disponibili e la loro provenienza.",
            },
            {
              n: "2",
              t: "Prenota lo slot",
              d: "Selezioni giorno e fascia oraria fra quelli aperti al ritiro.",
            },
            {
              n: "3",
              t: "Ritira e paghi in sede",
              d: "Il pagamento avviene in cooperativa, al momento del ritiro.",
            },
          ].map((step) => (
            <li
              key={step.n}
              className="rounded-2xl border border-border bg-surface p-8"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-verde-100 font-serif text-lg font-semibold text-verde-800">
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

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Placeholder title="Catalogo prodotti">
            Da implementare: elenco prodotti attivi con lotto, prezzo, unità di
            misura e disponibilità, letti da Supabase.
          </Placeholder>
          <Placeholder title="Prenotazione slot di ritiro">
            Da implementare: selezione slot ricorrenti con capienza residua e
            form di prenotazione (pagamento in loco).
          </Placeholder>
        </div>
      </Container>
    </>
  );
}
