"use client";

import Link from "next/link";
import useSWR from "swr";
import type { DatiDashboard } from "@/app/api/area-riservata/dashboard/route";
import { coloreStato, etichettaStato } from "@/lib/lotti";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const schede = [
  { chiave: "ordiniOggi", etichetta: "Prenotazioni oggi" },
  { chiave: "ordiniMese", etichetta: "Prenotazioni del mese" },
  { chiave: "prodottiAttivi", etichetta: "Prodotti attivi" },
  { chiave: "lottiAttivi", etichetta: "Lotti attivi" },
] as const;

function formattaData(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR<DatiDashboard>(
    "/api/area-riservata/dashboard",
    fetcher,
    { refreshInterval: 30_000 },
  );

  if (isLoading) {
    return <p className="text-sm text-foreground-muted">Caricamento…</p>;
  }

  if (error || !data) {
    return (
      <p role="alert" className="rounded-xl bg-terra-200/50 p-6 text-sm text-terra-700">
        Non è stato possibile caricare la dashboard.
      </p>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-verde-900">
        Dashboard
      </h1>
      {data.demo ? (
        <p className="mt-2 text-sm text-pietra-600">
          Numeri di esempio: il database non è ancora collegato.
        </p>
      ) : null}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {schede.map((scheda) => (
          <div
            key={scheda.chiave}
            className="rounded-2xl border-l-4 border-terra-400 bg-surface p-6 shadow-sm"
          >
            <p className="font-serif text-4xl font-semibold leading-none text-verde-800">
              {data[scheda.chiave]}
            </p>
            <p className="mt-3 text-sm text-foreground-muted">
              {scheda.etichetta}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-2xl bg-surface p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-xl font-semibold text-verde-800">
            Ultime prenotazioni
          </h2>
          <Link
            href="/area-riservata/ordini"
            className="text-sm font-semibold text-terra-600 hover:text-terra-700"
          >
            Vedi tutte →
          </Link>
        </div>

        {data.ultimePrenotazioni.length === 0 ? (
          <p className="py-8 text-center text-sm text-foreground-muted">
            Nessuna prenotazione recente.
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border">
                  {["ID", "Cliente", "Articoli", "Stato", "Ritiro"].map((c) => (
                    <th
                      key={c}
                      className="px-2 py-3 text-xs font-semibold uppercase tracking-wider text-pietra-600"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.ultimePrenotazioni.map((riga) => (
                  <tr key={riga.id} className="border-b border-border">
                    <td className="px-2 py-3.5 text-sm font-semibold text-verde-800">
                      #{riga.id}
                    </td>
                    <td className="px-2 py-3.5 text-sm text-carbone">
                      {riga.nome}
                    </td>
                    <td className="px-2 py-3.5 text-sm text-foreground-muted">
                      {riga.articoli}
                    </td>
                    <td className="px-2 py-3.5">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${coloreStato[riga.stato]}`}
                      >
                        {etichettaStato[riga.stato]}
                      </span>
                    </td>
                    <td className="px-2 py-3.5 text-sm text-foreground-muted">
                      {formattaData(riga.ritiro)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
