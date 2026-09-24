import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { NuovaPasswordForm } from "@/app/area-riservata/nuova-password/nuova-password-form";

export const metadata: Metadata = {
  title: "Rinnova password",
  description: "Imposta una nuova password per l'accesso all'area riservata.",
  robots: { index: false, follow: false },
};

export default function NuovaPasswordPage() {
  return (
    <>
      <PageHero
        eyebrow="Area riservata"
        title="Rinnova password"
        lead="Imposta la nuova password da usare per accedere al pannello di gestione."
      />

      <Container className="py-16">
        <NuovaPasswordForm />
      </Container>
    </>
  );
}
