import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "La storia della Cooperativa Agricola Terre Verdi Teramane, cosa facciamo e i valori che guidano il nostro lavoro.",
};

export default function ChiSiamoPage() {
  return (
    <>
      <PageHero
        eyebrow="Chi siamo"
        title="Una cooperativa nata dalla terra teramana"
        lead="Soci, campi e un modo di lavorare che mette al centro stagionalità e tracciabilità."
      />

      <Container className="grid gap-6 py-16 md:grid-cols-3">
        <Placeholder title="La nostra storia">
          Da completare: come nasce la cooperativa, i soci fondatori, le tappe
          principali.
        </Placeholder>
        <Placeholder title="Cosa facciamo">
          Da completare: colture, lavorazioni, filiera e rapporto con il
          territorio.
        </Placeholder>
        <Placeholder title="I nostri valori">
          Da completare: agricoltura sostenibile, lavoro cooperativo,
          tracciabilità di ogni lotto.
        </Placeholder>
      </Container>
    </>
  );
}
