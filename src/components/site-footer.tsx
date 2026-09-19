import Link from "next/link";
import { Container } from "@/components/container";
import { areaRiservataItem, footerItems } from "@/lib/navigation";
import { cooperativa, puntoVendita } from "@/lib/cooperativa";

export function SiteFooter() {
  return (
    <footer className="border-t border-verde-800 bg-verde-900 text-verde-100">
      <Container className="grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-semibold text-white">
            {cooperativa.nomeBreve}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-verde-300">
            Cooperativa Agricola
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-verde-200">
            Dal {cooperativa.annoFondazione} riuniamo {cooperativa.numeroAziende}{" "}
            aziende agricole del teramano: orto, caseificio, cantina, frantoio,
            forno e salumeria, in un unico punto vendita.
          </p>
        </div>

        <nav aria-label="Navigazione footer">
          <h2 className="font-serif text-sm font-semibold uppercase tracking-widest text-verde-300">
            Naviga
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {footerItems.map((item) => (
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
            {puntoVendita.nome}
          </h2>
          <address className="mt-5 flex flex-col gap-2 text-sm not-italic text-verde-100">
            <span>{puntoVendita.via}</span>
            <span>
              {puntoVendita.cap} {puntoVendita.comune} ({puntoVendita.provincia})
            </span>
            <a
              href={`tel:${puntoVendita.telefonoHref}`}
              className="transition-colors hover:text-white"
            >
              {puntoVendita.telefono}
            </a>
          </address>
          <Link
            href="/contatti"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-terra-300 transition-colors hover:text-terra-200"
          >
            Orari e mappa
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href={areaRiservataItem.href}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-verde-700 px-4 py-2 text-xs font-medium text-verde-200 transition-colors hover:border-verde-300 hover:text-white"
          >
            {areaRiservataItem.label}
          </Link>
        </div>
      </Container>

      <div className="border-t border-verde-800">
        <Container className="flex flex-col gap-2 py-6 text-xs text-verde-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {cooperativa.nome}
          </p>
          {/* TODO CLIENTE — chiedere P. IVA e dati di registrazione. */}
          <p>P. IVA da definire</p>
        </Container>
      </div>
    </footer>
  );
}
