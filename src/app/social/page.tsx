import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Social",
  description:
    "I canali social della Cooperativa Agricola Terre Verdi Teramane e del Mercato Contadino di Giulianova.",
};

export default function SocialPage() {
  return (
    <>
      <PageHero
        eyebrow="Social"
        title="Il banco, giorno per giorno"
        lead="Quello che arriva in negozio cambia in continuazione: sui social lo raccontiamo mano a mano."
      />

      <Container className="grid items-start gap-6 py-16 md:grid-cols-2">
        <Placeholder title="Canali">
          Da implementare: link ai profili della cooperativa.
          {/* TODO CLIENTE — servono gli handle reali (Facebook, Instagram,
              eventuali altri) e la conferma che siano attivi. */}
        </Placeholder>
        <Placeholder title="Ultimi post">
          Da implementare: feed o selezione di post recenti.
          {/* TODO CLIENTE — punto aperto del brief: chi inserisce e aggiorna i
              contenuti social, un operatore dedicato o si caricano a mano dopo.
              Da questa risposta dipende se serve un embed automatico o una
              lista gestita dal pannello. */}
        </Placeholder>
      </Container>
    </>
  );
}
