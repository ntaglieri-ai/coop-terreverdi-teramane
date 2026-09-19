import { BadgeCarrello } from "@/components/carrello/badge-carrello";
import { DrawerContatti } from "@/components/mobile/drawer-contatti";
import { MenuMobile } from "@/components/mobile/menu-mobile";

/**
 * I tre comandi a destra nell'header mobile: contatti, carrello, menu.
 *
 * Icone nude con hover/focus discreto invece di tre pastiglie circolari: in
 * fila su 320px sarebbero state tre macchie pesanti accanto al marchio.
 * Ogni comando resta comunque 44×44.
 */
export function AzioniHeaderMobile() {
  return (
    <div className="flex items-center gap-0.5 lg:hidden">
      <DrawerContatti />
      <BadgeCarrello variante="pulita" />
      <MenuMobile />
    </div>
  );
}
