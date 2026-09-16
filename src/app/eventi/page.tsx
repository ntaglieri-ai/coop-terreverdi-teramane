import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Eventi ed esperienze",
  description:
    "Degustazioni nella Sala Degustazioni e attività nei campi della cooperativa. Posti limitati, prenotazione e pagamento online.",
};

export default function EventiPage() {
  return (
    <>
      <PageHero
        eyebrow="Eventi ed esperienze"
        title="Degustazioni in Sala e attività nei campi"
        lead="Un calendario di appuntamenti a posti limitati: prenoti online e confermi il posto con il pagamento."
      />

      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-surface p-8">
            <h2 className="font-serif text-2xl font-semibold text-verde-800">
              Sala Degustazioni
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Da completare: descrizione dello spazio, formati di degustazione,
              capienza e durata.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-surface p-8">
            <h2 className="font-serif text-2xl font-semibold text-verde-800">
              Attività esterne
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Da completare: visite ai campi, raccolte guidate, laboratori e
              attività per scuole e gruppi.
            </p>
          </article>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Placeholder title="Calendario eventi">
            Da implementare: slot di tipo evento con titolo, data, prezzo e
            posti residui.
          </Placeholder>
          <Placeholder title="Prenotazione con pagamento">
            Da implementare: form di prenotazione e checkout Stripe. Il
            pagamento online vale solo per gli eventi, mai per la spesa.
          </Placeholder>
        </div>
      </Container>
    </>
  );
}
