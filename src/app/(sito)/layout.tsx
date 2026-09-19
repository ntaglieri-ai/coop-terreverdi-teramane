import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BarraMobile } from "@/components/barra-mobile";
import { CarrelloProvider } from "@/components/carrello/carrello-provider";
import { DatiStrutturati } from "@/components/dati-strutturati";

/** Chrome del sito pubblico. */
export default function SitoLayout({ children }: LayoutProps<"/">) {
  return (
    <>
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
    </>
  );
}
