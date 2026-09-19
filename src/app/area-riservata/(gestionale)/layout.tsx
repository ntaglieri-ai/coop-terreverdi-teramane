import Link from "next/link";
import {
  SidebarGestionale,
  MenuGestionaleMobile,
} from "@/app/area-riservata/(gestionale)/nav-gestionale";

/**
 * Chrome del gestionale: sidebar a sinistra su desktop, drawer su mobile.
 *
 * Volutamente fuori dal layout `(sito)`: qui non servono header pubblico,
 * footer e barra carrello.
 *
 * TODO AUTH — queste pagine sono raggiungibili senza login. L'accesso via
 * Supabase Auth arriva in un passaggio successivo: finché non c'è, il
 * gestionale non deve andare in produzione.
 */
export default function GestionaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-sabbia">
      <header className="relative flex items-center justify-between gap-4 bg-verde-900 px-5 py-3 text-white">
        <div className="flex items-center gap-4">
          <MenuGestionaleMobile />
          <p className="font-serif text-base font-semibold">
            Gestione cooperativa
          </p>
        </div>
        <Link
          href="/"
          className="rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
        >
          Torna al sito
        </Link>
      </header>

      <div className="flex flex-1">
        <SidebarGestionale />

        <div className="min-w-0 flex-1">
          <p
            role="status"
            className="border-b border-terra-300 bg-grano px-6 py-2.5 text-xs text-terra-700"
          >
            Accesso non protetto: l&apos;autenticazione non è ancora attiva.
          </p>
          <main className="p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
