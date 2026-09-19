"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { IconaChiudi, IconaMenu } from "@/components/icone-interfaccia";
import { VociNav } from "@/components/voci-nav";

/**
 * Hamburger dell'header mobile: apre la navigazione completa.
 *
 * Sostituisce il <details> usato prima, che non sapeva richiudersi dopo il
 * click su una voce. Qui il pannello si chiude alla navigazione, con Esc e
 * cliccando fuori.
 */
export function MenuMobile() {
  const [aperto, setAperto] = useState(false);
  const contenitore = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [rottaDiApertura, setRottaDiApertura] = useState(pathname);

  // Rete di sicurezza per la navigazione che non passa dalle voci (back del
  // browser, redirect): aggiustare lo stato in render invece che in un
  // effetto evita il giro di render in piu'.
  if (aperto && rottaDiApertura !== pathname) {
    setRottaDiApertura(pathname);
    setAperto(false);
  }

  useEffect(() => {
    if (!aperto) return;

    const suTasto = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAperto(false);
    };
    const suClickFuori = (e: MouseEvent) => {
      if (!contenitore.current?.contains(e.target as Node)) setAperto(false);
    };

    document.addEventListener("keydown", suTasto);
    document.addEventListener("pointerdown", suClickFuori);
    return () => {
      document.removeEventListener("keydown", suTasto);
      document.removeEventListener("pointerdown", suClickFuori);
    };
  }, [aperto]);

  return (
    <div ref={contenitore} className="relative">
      <button
        type="button"
        onClick={() => {
          setRottaDiApertura(pathname);
          setAperto((v) => !v);
        }}
        aria-expanded={aperto}
        aria-label={aperto ? "Chiudi il menu" : "Apri il menu"}
        title="Menu"
        className="flex h-11 w-11 items-center justify-center rounded-xl text-carbone transition-colors hover:bg-verde-100 hover:text-verde-800"
      >
        {aperto ? (
          <IconaChiudi className="h-[1.375rem] w-[1.375rem]" />
        ) : (
          <IconaMenu className="h-[1.375rem] w-[1.375rem]" />
        )}
      </button>

      {aperto ? (
        <nav
          aria-label="Navigazione principale"
          // `right-0` più la larghezza fissa: a 320px resta dentro lo schermo
          // perché il pannello non supera la larghezza della viewport.
          className="absolute right-0 mt-2 w-[min(18rem,calc(100vw-1.5rem))] rounded-2xl border border-border bg-surface p-3 shadow-lg"
        >
          <ul className="flex flex-col">
            <VociNav compatto onNaviga={() => setAperto(false)} />
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
