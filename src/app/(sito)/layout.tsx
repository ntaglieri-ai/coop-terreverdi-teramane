import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BarraMobile } from "@/components/barra-mobile";
import { CarrelloProvider } from "@/components/carrello/carrello-provider";
import { DrawerCarrello } from "@/components/carrello/drawer-carrello";
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
            del footer una volta arrivati in fondo. Misura esatta della bottom
            navigation (h-16) piu' la safe area del device. */}
        <div
          aria-hidden="true"
          className="h-[calc(4rem+env(safe-area-inset-bottom))] lg:hidden"
        />
        <BarraMobile />
        <DrawerCarrello />
      </CarrelloProvider>
    </>
  );
}
