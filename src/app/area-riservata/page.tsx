import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SceltaGestione } from "@/app/area-riservata/scelta-gestione";

export const metadata: Metadata = {
  title: "Area riservata",
  description:
    "Accesso al pannello di gestione per gli operatori della Cooperativa Agricola Terre Verdi Teramane.",
  robots: { index: false, follow: false },
};

export default function AreaRiservataPage() {
  return (
    <>
      <PageHero
        eyebrow="Area riservata"
        title="Accesso operatori"
        lead="Da qui si gestiscono catalogo, prenotazioni ed eventi. L'accesso è riservato ai soci e agli operatori della cooperativa."
      />

      <Container className="py-16">
        <div className="mx-auto max-w-2xl">
          <SceltaGestione />
        </div>
      </Container>
    </>
  );
}
