"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormAccesso } from "@/app/area-riservata/form-accesso";
import {
  IconaCalendario,
  IconaCesto,
} from "@/components/icone-interfaccia";

type Destinazione = "prodotti" | "eventi";

const opzioni: {
  id: Destinazione;
  titolo: string;
  descrizione: string;
  Icona: (props: { className?: string }) => React.JSX.Element;
}[] = [
  {
    id: "prodotti",
    titolo: "Gestione Catalogo e Magazzino",
    descrizione:
      "Prodotti, lotti, disponibilità e prezzi del Mercato Contadino.",
    Icona: IconaCesto,
  },
  {
    id: "eventi",
    titolo: "Gestione Eventi",
    descrizione:
      "Degustazioni e visite: calendario, posti e schede evento.",
    Icona: IconaCalendario,
  },
];

/**
 * Layer prima del login: l'operatore sceglie quale area vuole gestire, poi
 * vede il form di accesso. Un solo login condiviso (Supabase Auth, nessun
 * ruolo per sezione ancora nello schema) — la scelta serve solo a sapere dove
 * mandarlo appena la sessione è valida, non a limitare cosa può vedere.
 */
export function SceltaGestione() {
  const [destinazione, setDestinazione] = useState<Destinazione | null>(null);
  const router = useRouter();

  if (!destinazione) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {opzioni.map(({ id, titolo, descrizione, Icona }) => (
          <button
            key={id}
            type="button"
            onClick={() => setDestinazione(id)}
            className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-7 text-left transition-all hover:-translate-y-0.5 hover:border-terra-400 hover:shadow-lg hover:shadow-verde-900/5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-verde-100 text-verde-700">
              <Icona className="h-6 w-6" />
            </span>
            <span>
              <span className="block font-serif text-xl font-semibold text-verde-800">
                {titolo}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-foreground-muted">
                {descrizione}
              </span>
            </span>
          </button>
        ))}
      </div>
    );
  }

  const opzioneScelta = opzioni.find((o) => o.id === destinazione)!;

  return (
    <div>
      <button
        type="button"
        onClick={() => setDestinazione(null)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-verde-700 hover:text-terra-600"
      >
        <span aria-hidden="true">←</span> Cambia sezione
      </button>
      <p className="mx-auto mb-6 max-w-md text-center text-sm text-foreground-muted">
        Stai per accedere a <strong>{opzioneScelta.titolo}</strong>.
      </p>
      <FormAccesso
        onAccesso={() => router.push(`/area-riservata/${destinazione}`)}
      />
    </div>
  );
}
