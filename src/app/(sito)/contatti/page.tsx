import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero, Placeholder } from "@/components/page-hero";
import { DoveSiamo } from "@/components/dove-siamo";
import { indirizzoCompleto, puntoVendita } from "@/lib/cooperativa";

export const metadata: Metadata = {
  title: "Contatti",
  description: `Il ${puntoVendita.nome} della Cooperativa Agricola Terre Verdi Teramane è in ${indirizzoCompleto}. Orari di apertura, mappa e recapiti.`,
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title={`Vieni a trovarci al ${puntoVendita.nome}`}
        lead={`Siamo in ${indirizzoCompleto}, aperti sei giorni su sette.`}
      />

      <DoveSiamo />

      <section className="bg-sabbia py-24">
        <Container className="grid items-start gap-6 md:grid-cols-2">
          <Placeholder title="Scrivici">
            Da implementare: form di contatto con invio email tramite Resend.
            {/* TODO CLIENTE — serve l'indirizzo email a cui recapitare i
                messaggi. */}
          </Placeholder>
          <Placeholder title="Gruppi, scuole e forniture">
            Da implementare: richiesta dedicata per visite di gruppo e forniture
            continuative, che non passano dal carrello.
          </Placeholder>
        </Container>
      </section>
    </>
  );
}
