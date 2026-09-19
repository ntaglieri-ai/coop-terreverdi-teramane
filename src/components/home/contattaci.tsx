"use client";

import { useEffect, useRef, useState } from "react";
import {
  IconaEmail,
  IconaTelefono,
  IconaWhatsApp,
} from "@/components/icone-interfaccia";

/**
 * Le tre vie di contatto.
 *
 * TODO CLIENTE — segnaposto: ogni voce diventerà un <a> con il suo recapito.
 *   WhatsApp → https://wa.me/<numero>  (serve un cellulare, il fisso non va)
 *   Telefono → tel:<numero E.164>      (085 8003412 è già in cooperativa.ts)
 *   Email    → mailto:<indirizzo>      (indirizzo ancora da ricevere)
 * I valori vanno letti da src/lib/cooperativa.ts, non scritti qui.
 */
const opzioni = [
  { id: "whatsapp", etichetta: "WhatsApp", Icona: IconaWhatsApp },
  { id: "telefono", etichetta: "Telefono", Icona: IconaTelefono },
  { id: "email", etichetta: "Email", Icona: IconaEmail },
] as const;

export function Contattaci() {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [aperto, setAperto] = useState(false);

  // showModal() dà focus trap, chiusura con Esc e backdrop nativi: meglio
  // che rifarli a mano su un div.
  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;
    if (aperto && !el.open) el.showModal();
    if (!aperto && el.open) el.close();
  }, [aperto]);

  return (
    <>
      <button
        type="button"
        onClick={() => setAperto(true)}
        className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-terra-500 px-9 text-base font-semibold text-white shadow-lg shadow-verde-900/30 transition-all hover:-translate-y-0.5 hover:bg-terra-600 sm:h-[3.75rem] sm:px-12 sm:text-lg"
      >
        Contattaci
        <span aria-hidden="true">→</span>
      </button>

      <dialog
        ref={dialogo}
        onClose={() => setAperto(false)}
        // Chiude cliccando sul backdrop: il click sul <dialog> stesso arriva
        // solo quando si colpisce l'area fuori dal contenuto.
        onClick={(e) => {
          if (e.target === dialogo.current) setAperto(false);
        }}
        aria-labelledby="titolo-contatti"
        className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-3xl border border-border bg-surface p-0 text-carbone backdrop:bg-verde-900/60 backdrop:backdrop-blur-sm"
      >
        <div className="p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="titolo-contatti"
                className="font-serif text-2xl font-semibold text-verde-900"
              >
                Come preferisci contattarci?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                Scegli il canale che ti è più comodo.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAperto(false)}
              aria-label="Chiudi"
              className="-mr-2 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-pietra-600 transition-colors hover:bg-verde-100 hover:text-verde-800"
            >
              ✕
            </button>
          </div>

          <ul className="mt-6 flex flex-col gap-3">
            {opzioni.map(({ id, etichetta, Icona }) => (
              <li key={id}>
                {/* TODO CLIENTE — diventa un <a href> quando arrivano i recapiti. */}
                <button
                  type="button"
                  className="flex w-full items-center gap-4 rounded-2xl border border-border bg-crema px-5 py-4 text-left transition-colors hover:border-terra-400 hover:bg-grano/50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-verde-100 text-verde-700">
                    <Icona className="h-5 w-5" />
                  </span>
                  <span className="text-base font-semibold text-verde-800">
                    {etichetta}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
