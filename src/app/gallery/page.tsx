import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Gallery & Media",
  description:
    "Foto e video del Mercato Contadino, delle aziende socie e degli eventi della Cooperativa Agricola Terre Verdi Teramane.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery & Media"
        title="Foto e video della cooperativa"
        lead="Il mercato, i campi, le lavorazioni e gli eventi, raccolti in un posto solo."
      />

      <Container className="grid items-start gap-6 py-16 md:grid-cols-2">
        <Placeholder title="Galleria fotografica">
          Da implementare: griglia di foto con apertura a schermo intero,
          caricate su Supabase Storage e gestite dal pannello operatori.
        </Placeholder>
        <Placeholder title="Video">
          Da implementare: sezione video. Per scelta i video stanno qui e non in
          home.
          {/* TODO CLIENTE — la pagina resta vuota finché non arriva materiale
              reale: non ha senso riempirla di stock. */}
        </Placeholder>
      </Container>
    </>
  );
}
