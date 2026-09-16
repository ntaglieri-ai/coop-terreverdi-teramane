import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";
import { OrariTabella } from "@/components/orari-tabella";
import { indirizzoCompleto, puntoVendita } from "@/lib/cooperativa";

export const metadata: Metadata = {
  title: "Contatti",
  description: `Il ${puntoVendita.nome} della Cooperativa Agricola Terre Verdi Teramane è in ${indirizzoCompleto}. Orari di apertura e recapiti.`,
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title={`Vieni a trovarci al ${puntoVendita.nome}`}
        lead={`Siamo in ${indirizzoCompleto}, aperti sei giorni su sette.`}
      />

      <Container className="grid items-start gap-6 py-16 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="font-serif text-lg font-semibold text-verde-800">
            Dove siamo
          </h2>
          <address className="mt-4 flex flex-col gap-2 text-sm not-italic leading-relaxed text-foreground-muted">
            <span className="font-medium text-carbone">
              {puntoVendita.nome}
            </span>
            <span>{puntoVendita.via}</span>
            <span>
              {puntoVendita.cap} {puntoVendita.comune} ({puntoVendita.provincia})
            </span>
          </address>
          <a
            href={`tel:${puntoVendita.telefonoHref}`}
            className="mt-6 inline-flex h-13 items-center justify-center rounded-full bg-verde-700 px-7 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-verde-800"
          >
            {puntoVendita.telefono}
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="font-serif text-lg font-semibold text-verde-800">
            Orari di apertura
          </h2>
          <OrariTabella className="mt-4" />
          {/* TODO CLIENTE — orari raccolti di seconda mano, da riconfermare. */}
        </div>

        <div className="flex flex-col gap-6">
          <Placeholder title="Mappa">
            Da implementare: mappa del {puntoVendita.nome}, con indicazioni per
            arrivare e parcheggio.
          </Placeholder>
          <Placeholder title="Scrivici">
            Da implementare: form di contatto con invio email tramite Resend.
            {/* TODO CLIENTE — serve l'indirizzo email a cui recapitare i messaggi. */}
          </Placeholder>
        </div>
      </Container>
    </>
  );
}
