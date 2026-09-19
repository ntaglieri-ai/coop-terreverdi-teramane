import Link from "next/link";
import { IconaCasa } from "@/components/icona-casa";
import { areaRiservataItem, navItems } from "@/lib/navigation";

/**
 * Le voci del menu principale, in due vesti: `compatto` per i pannelli a
 * tendina (header stretto e menu mobile), altrimenti la riga desktop.
 *
 * Vive in un file suo perché sia l'header (server) sia il menu mobile
 * (client) la renderizzano: tenerla dentro `site-header.tsx` creerebbe un
 * import circolare.
 */
export function VociNav({
  compatto = false,
  onNaviga,
}: {
  compatto?: boolean;
  /** Chiamato dopo il click su una voce: serve a chiudere il menu mobile. */
  onNaviga?: () => void;
}) {
  return (
    <>
      <li>
        <Link
          href="/"
          aria-label="Home"
          onClick={onNaviga}
          className={
            compatto
              ? "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-carbone/85 hover:bg-verde-100 hover:text-verde-800"
              : "flex items-center text-carbone/80 transition-colors hover:text-verde-700"
          }
        >
          <IconaCasa className={compatto ? "h-4 w-4" : "h-[1.15rem] w-[1.15rem]"} />
          {compatto ? "Home" : null}
        </Link>
      </li>

      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNaviga}
            className={
              compatto
                ? "block rounded-xl px-3 py-2.5 text-sm font-medium text-carbone/85 hover:bg-verde-100 hover:text-verde-800"
                : "whitespace-nowrap text-[0.8125rem] font-medium text-carbone/80 transition-colors hover:text-verde-700"
            }
          >
            {item.label}
          </Link>
        </li>
      ))}

      <li className={compatto ? "mt-1 border-t border-border pt-1" : "flex items-center"}>
        <Link
          href={areaRiservataItem.href}
          onClick={onNaviga}
          className={
            compatto
              ? "block rounded-xl px-3 py-2.5 text-sm font-medium text-pietra-600 hover:bg-verde-100 hover:text-verde-800"
              : "whitespace-nowrap border-l border-border pl-4 text-[0.8125rem] font-medium text-pietra-600 transition-colors hover:text-verde-700"
          }
        >
          {areaRiservataItem.label}
        </Link>
      </li>
    </>
  );
}
