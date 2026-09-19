"use client";

import { useEffect, useRef, useState } from "react";

function IconaWhatsApp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.22-8.24 8.22Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.55-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04 0 1.2.87 2.36.99 2.53.12.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

function IconaTelefono({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.5 3.5h3l1.5 4-2 1.3a12.5 12.5 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

function IconaEmail({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

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
                Come preferisci scriverci?
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
