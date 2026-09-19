import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Social & Media",
  description:
    "I canali social della Cooperativa Agricola Terre Verdi Teramane, con foto e video del Mercato Contadino, delle aziende socie e degli eventi.",
};

export default function SocialMediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Social & Media"
        title="Il banco, giorno per giorno"
        lead="Quello che arriva in negozio cambia in continuazione: sui canali lo raccontiamo mano a mano, e qui raccogliamo foto e video."
      />

      <Container className="grid items-start gap-6 py-16 md:grid-cols-2">
        <Placeholder title="I nostri canali">
          Da implementare: link ai profili della cooperativa.
          {/* TODO CLIENTE — servono gli handle reali (Facebook, Instagram,
              eventuali altri) e la conferma che siano attivi. Vanno anche in
              `sameAs` dentro i dati strutturati. */}
        </Placeholder>
        <Placeholder title="Ultimi post">
          Da implementare: feed o selezione di post recenti.
          {/* TODO CLIENTE — punto aperto: chi inserisce e aggiorna i contenuti
              social. Da quella risposta dipende se serve un embed automatico o
              una lista gestita dal pannello. */}
        </Placeholder>
        <Placeholder title="Galleria fotografica">
          Da implementare: griglia di foto con apertura a schermo intero,
          caricate su Supabase Storage e gestite dal pannello operatori.
        </Placeholder>
        <Placeholder title="Video">
          Da implementare: sezione video. Per scelta i video stanno qui e non in
          home.
          {/* TODO CLIENTE — resta vuota finche' non arriva materiale reale:
              non ha senso riempirla di stock. */}
        </Placeholder>
      </Container>

      <Container className="pb-16">
        <p className="text-sm leading-relaxed text-foreground-muted">
          Gli articoli e i servizi che parlano di noi stanno invece nella{" "}
          <a
            href="/rassegna-stampa"
            className="font-semibold text-verde-700 underline-offset-4 hover:underline"
          >
            rassegna stampa
          </a>
          : sono contenuti diversi e restano separati.
        </p>
      </Container>
    </>
  );
}
