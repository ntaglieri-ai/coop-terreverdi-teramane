import type { Metadata, Viewport } from "next";
import { Container } from "@/components/container";
import { CatalogoClient } from "@/components/catalogo/catalogo-client";
import { RegistraServiceWorker } from "@/components/catalogo/registra-service-worker";
import { getProdottiCatalogo } from "@/lib/catalogo";

/**
 * Il manifest e le icone qui sotto valgono SOLO per questa pagina: nessun
 * layout genitore li esporta, quindi il resto del sito resta un sito, non
 * un'app installabile. Chi fa "Aggiungi a schermata Home" da qui ottiene
 * l'icona e il nome del catalogo, non quelli della cooperativa.
 */
export const metadata: Metadata = {
  title: "Catalogo",
  description:
    "Il catalogo dei prodotti delle aziende socie disponibili in questi giorni: scegli, prenota, ritira al Mercato Contadino di Giulianova.",
  manifest: "/la-spesa/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "La Spesa",
    statusBarStyle: "default",
  },
  icons: {
    apple: "/icons/catalogo-icon-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e4a30",
};

/**
 * Senza questo la pagina verrebbe prerenderizzata in build: il catalogo
 * resterebbe congelato allo snapshot di allora invece di riflettere in
 * tempo reale le attivazioni/disattivazioni fatte da Supabase.
 */
export const dynamic = "force-dynamic";

export default async function CatalogoPage() {
  const prodotti = await getProdottiCatalogo();

  return (
    <Container className="py-12">
      <CatalogoClient prodotti={prodotti} />
      <RegistraServiceWorker />
    </Container>
  );
}
