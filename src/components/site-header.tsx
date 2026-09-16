import Link from "next/link";
import { Container } from "@/components/container";
import { navItems } from "@/lib/navigation";

/**
 * Il logo non è ancora definito: per ora marchio testuale.
 * Sostituire il blocco <Logo /> quando arriva il file definitivo.
 */
function Logo() {
  return (
    <Link href="/" className="group flex flex-col leading-none">
      <span className="font-serif text-xl font-semibold tracking-tight text-verde-800 group-hover:text-verde-600 sm:text-2xl">
        Terre Verdi Teramane
      </span>
      <span className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-pietra-600">
        Cooperativa Agricola
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-crema/90 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Logo />

        <nav aria-label="Navigazione principale" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-carbone/80 transition-colors hover:text-verde-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/la-spesa"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover lg:inline-block"
        >
          Prenota la spesa
        </Link>

        {/* Menu mobile senza JavaScript: <details> nativo */}
        <details className="group relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-carbone [&::-webkit-details-marker]:hidden">
            Menu
            <span aria-hidden="true" className="transition-transform group-open:rotate-180">
              ▾
            </span>
          </summary>
          <nav
            aria-label="Navigazione principale"
            className="absolute right-0 mt-3 w-64 rounded-2xl border border-border bg-surface p-3 shadow-lg"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-carbone/85 hover:bg-verde-100 hover:text-verde-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </Container>
    </header>
  );
}
