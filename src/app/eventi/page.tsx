import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";
import { puntoVendita } from "@/lib/cooperativa";

export const metadata: Metadata = {
  title: "Eventi ed esperienze",
  description:
    "Degustazioni nella Sala Degustazioni e visite nelle aziende socie della Cooperativa Agricola Terre Verdi Teramane. Posti limitati, prenotazione e pagamento online.",
};

export default function EventiPage() {
  return (
    <>
      <PageHero
        eyebrow="Eventi ed esperienze"
        title="Degustazioni in Sala e visite alle aziende socie"
        lead="Appuntamenti a posti limitati: si prenotano online e il posto si conferma con il pagamento."
      />

      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-surface p-8">
            <h2 className="font-serif text-2xl font-semibold text-verde-800">
              Sala Degustazioni
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Lo spazio accanto al {puntoVendita.nome}, dove far incontrare le
              sei filiere della cooperativa in un unico assaggio guidato.
              {/* TODO CLIENTE — servono capienza, durata e formati reali. */}
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-surface p-8">
            <h2 className="font-serif text-2xl font-semibold text-verde-800">
              Nelle aziende socie
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Frantoio, cantina, caseificio e forno aprono le porte per visite e
              raccolte guidate, seguendo il calendario delle lavorazioni.
              {/* TODO CLIENTE — confermare quali aziende accolgono visite. */}
            </p>
          </article>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Placeholder title="Calendario eventi">
            Da implementare: appuntamenti con titolo, data, prezzo e posti
            residui.
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
