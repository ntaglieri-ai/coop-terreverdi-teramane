"use client";

import { useEffect, useRef, useState } from "react";
import {
  IconaChiudi,
  IconaEmail,
  IconaTelefono,
  IconaWhatsApp,
} from "@/components/icone-interfaccia";
import { puntoVendita } from "@/lib/cooperativa";

type Opzione = {
  id: string;
  etichetta: string;
  /** Il recapito vero, mostrato sotto l'etichetta. */
  recapito: string;
  /** null = recapito mancante: la voce resta visibile ma disabilitata. */
  href: string | null;
  esterno?: boolean;
  Icona: (props: { className?: string }) => React.JSX.Element;
};

/**
 * Le tre vie di contatto, lette da `src/lib/cooperativa.ts`: qui non si
 * scrivono recapiti a mano.
 *
 * TODO CLIENTE — mancano il cellulare WhatsApp e l'indirizzo email. Finché
 * `puntoVendita.whatsapp` / `puntoVendita.email` sono null le due voci sono
 * rese come pulsanti disabilitati, con la ragione scritta a schermo: meglio
 * che nascondere l'opzione o pubblicare un link morto.
 */
const opzioni: Opzione[] = [
  {
    id: "chiama",
    etichetta: "Chiama",
    recapito: puntoVendita.telefono,
    href: `tel:${puntoVendita.telefonoHref}`,
    Icona: IconaTelefono,
  },
  {
    id: "whatsapp",
    etichetta: "WhatsApp",
    recapito: puntoVendita.whatsapp ?? "Non ancora disponibile",
    href: puntoVendita.whatsapp ? `https://wa.me/${puntoVendita.whatsapp}` : null,
    esterno: true,
    Icona: IconaWhatsApp,
  },
  {
    id: "email",
    etichetta: "Email",
    recapito: puntoVendita.email ?? "Non ancora disponibile",
    href: puntoVendita.email ? `mailto:${puntoVendita.email}` : null,
    Icona: IconaEmail,
  },
];

/** Durata dello scorrimento in chiusura: deve combaciare con `duration-200`. */
const USCITA_MS = 200;

/**
 * Icona "Contattaci" nell'header mobile + bottom drawer con i tre canali.
 *
 * Il contenitore è un <dialog> aperto con showModal(): focus trap, chiusura
 * con Esc e backdrop sono nativi, e al close il focus torna da solo al
 * pulsante che l'ha aperto. Esc viene intercettato (`onCancel`) solo per far
 * suonare l'animazione di uscita prima della chiusura vera.
 */
export function DrawerContatti() {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [aperto, setAperto] = useState(false);
  /** Il pannello sta scorrendo via: il <dialog> chiude a fine corsa. */
  const [uscita, setUscita] = useState(false);

  function chiudi() {
    if (uscita) return;
    setUscita(true);
    setTimeout(() => {
      setUscita(false);
      setAperto(false);
    }, USCITA_MS);
  }

  // L'effetto tiene allineato il DOM allo stato, nient'altro: showModal() e
  // close() sono API esterne a React.
  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;
    if (aperto && !el.open) el.showModal();
    if (!aperto && el.open) el.close();
  }, [aperto]);

  // showModal() rende inerte la pagina ma su iOS il body scorre comunque
  // sotto al drawer: lo blocchiamo a mano.
  useEffect(() => {
    if (!aperto) return;
    const precedente = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = precedente;
    };
  }, [aperto]);

  return (
    <>
      <button
        type="button"
        onClick={() => setAperto(true)}
        aria-haspopup="dialog"
        aria-expanded={aperto}
        aria-label="Contattaci"
        title="Contattaci"
        className="flex h-11 w-11 items-center justify-center rounded-xl text-carbone transition-colors hover:bg-verde-100 hover:text-verde-800"
      >
        <IconaTelefono className="h-[1.375rem] w-[1.375rem]" />
      </button>

      <dialog
        ref={dialogo}
        onClose={() => setAperto(false)}
        onCancel={(e) => {
          // Esc: la chiusura nativa sarebbe istantanea, qui passa dall'uscita.
          e.preventDefault();
          chiudi();
        }}
        // Click sull'overlay: sul <dialog> arriva solo colpendo l'area fuori
        // dal pannello, che qui occupa la parte alta dello schermo.
        onClick={(e) => {
          if (e.target === dialogo.current) chiudi();
        }}
        aria-labelledby="titolo-drawer-contatti"
        className="m-0 h-full max-h-full w-full max-w-none bg-transparent p-0 text-carbone backdrop:bg-verde-900/60 backdrop:backdrop-blur-sm"
      >
        {/* Il pannello si appoggia in basso e si dimensiona sul contenuto. */}
        <div className="pointer-events-none flex h-full flex-col justify-end">
          <div
            className={`pointer-events-auto max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-border bg-surface shadow-[0_-8px_30px_rgba(17,48,31,0.18)] transition-transform duration-200 ease-out ${
              uscita
                ? "translate-y-full"
                : "translate-y-0 animate-[drawer-sale_200ms_ease-out]"
            }`}
          >
            <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="titolo-drawer-contatti"
                    className="font-serif text-xl font-semibold text-verde-900"
                  >
                    Come preferisci contattarci?
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                    Scegli il canale che ti è più comodo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={chiudi}
                  aria-label="Chiudi"
                  className="-mr-1.5 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-pietra-600 transition-colors hover:bg-verde-100 hover:text-verde-800"
                >
                  <IconaChiudi className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-5 flex flex-col gap-2.5">
                {opzioni.map(({ id, etichetta, recapito, href, esterno, Icona }) => {
                  const contenuto = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-verde-100 text-verde-700">
                        <Icona className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-base font-semibold text-verde-800">
                          {etichetta}
                        </span>
                        <span className="block truncate text-sm text-foreground-muted">
                          {recapito}
                        </span>
                      </span>
                    </>
                  );

                  const base =
                    "flex w-full items-center gap-4 rounded-2xl border border-border px-4 py-3 text-left";

                  return (
                    <li key={id}>
                      {href ? (
                        <a
                          href={href}
                          {...(esterno
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : null)}
                          onClick={chiudi}
                          className={`${base} bg-crema transition-colors hover:border-terra-400 hover:bg-grano/50`}
                        >
                          {contenuto}
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          aria-disabled="true"
                          className={`${base} cursor-not-allowed bg-sabbia opacity-60`}
                        >
                          {contenuto}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
