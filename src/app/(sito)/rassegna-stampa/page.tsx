import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Rassegna stampa",
  description:
    "Articoli, servizi e riconoscimenti dedicati alla Cooperativa Agricola Terre Verdi Teramane.",
};

export default function RassegnaStampaPage() {
  return (
    <>
      <PageHero
        eyebrow="Rassegna stampa"
        title="Hanno parlato di noi"
        lead="Raccolta di articoli e servizi sulla cooperativa, aggiornata dal pannello di gestione."
      />

      <Container className="py-16">
        <Placeholder title="Elenco articoli">
          Da implementare: lista aggiornabile con testata, data, titolo,
          eventuale link esterno e immagine.
        </Placeholder>
      </Container>
    </>
  );
}
