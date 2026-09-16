import Link from "next/link";
import { Container } from "@/components/container";
import { navItems } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-verde-800 bg-verde-900 text-verde-100">
      <Container className="grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-semibold text-white">
            Terre Verdi Teramane
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-verde-300">
            Cooperativa Agricola
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-verde-200">
            Agricoltura di territorio nelle colline teramane: prodotti di
            stagione, tracciabilità del lotto, accoglienza in cooperativa.
          </p>
        </div>

        <nav aria-label="Navigazione footer">
          <h2 className="font-serif text-sm font-semibold uppercase tracking-widest text-verde-300">
            Naviga
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-verde-100 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-serif text-sm font-semibold uppercase tracking-widest text-verde-300">
            Contatti
          </h2>
          {/* TODO: sostituire con i recapiti reali della cooperativa */}
          <address className="mt-5 flex flex-col gap-2 text-sm not-italic text-verde-100">
            <span>Sede da definire — Provincia di Teramo</span>
            <span>Telefono da definire</span>
            <span>Email da definire</span>
          </address>
        </div>
      </Container>

      <div className="border-t border-verde-800">
        <Container className="flex flex-col gap-2 py-6 text-xs text-verde-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Cooperativa Agricola Terre Verdi
            Teramane
          </p>
          <p>P. IVA da definire</p>
        </Container>
      </div>
    </footer>
  );
}
