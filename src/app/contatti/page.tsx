import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Dove si trova la Cooperativa Agricola Terre Verdi Teramane, orari di apertura e come contattarci.",
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title="Vieni a trovarci in cooperativa"
        lead="Qui trovi orari, indirizzo e il modulo per scriverci."
      />

      <Container className="grid gap-6 py-16 md:grid-cols-3">
        <Placeholder title="Orari di apertura">
          Da completare: giorni e fasce orarie di apertura al pubblico e di
          ritiro della spesa.
        </Placeholder>
        <Placeholder title="Dove siamo">
          Da implementare: indirizzo completo e mappa.
        </Placeholder>
        <Placeholder title="Scrivici">
          Da implementare: form di contatto con invio email tramite Resend.
        </Placeholder>
      </Container>
    </>
  );
}
