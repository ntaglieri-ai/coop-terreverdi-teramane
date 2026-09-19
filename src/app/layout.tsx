import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { cooperativa, puntoVendita } from "@/lib/cooperativa";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: cooperativa.nome,
    template: `%s — ${cooperativa.nomeBreve}`,
  },
  description: `Dal ${cooperativa.annoFondazione} riuniamo ${cooperativa.numeroAziende} aziende agricole del teramano. Ortaggi, formaggi, vino, olio, pane e salumi al ${puntoVendita.nome} di ${puntoVendita.comune}, con degustazioni ed esperienze nelle aziende socie.`,
};

/**
 * Root layout ridotto all'osso: html, body e font.
 *
 * Le due chrome stanno nei layout sotto — `(sito)` per le pagine pubbliche,
 * `area-riservata/(gestionale)` per il pannello — perche' il gestionale non
 * deve ereditare header, footer e barra carrello del sito.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
