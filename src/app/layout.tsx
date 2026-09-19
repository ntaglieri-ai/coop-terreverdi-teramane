import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BarraMobile } from "@/components/barra-mobile";
import { CarrelloProvider } from "@/components/carrello/carrello-provider";
import { DatiStrutturati } from "@/components/dati-strutturati";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <DatiStrutturati />
        <CarrelloProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          {/* Spazio in coda: senza, la barra fissa coprirebbe l'ultima riga
              del footer una volta arrivati in fondo. */}
          <div aria-hidden="true" className="h-20 lg:hidden" />
          <BarraMobile />
        </CarrelloProvider>
      </body>
    </html>
  );
}
