"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const vociGestionale = [
  { href: "/area-riservata/dashboard", label: "Dashboard" },
  { href: "/area-riservata/ordini", label: "Prenotazioni" },
  { href: "/area-riservata/prodotti", label: "Prodotti" },
  { href: "/area-riservata/tracciabilita", label: "Tracciabilità" },
  { href: "/area-riservata/impostazioni", label: "Impostazioni" },
];

function Voci({ onNaviga }: { onNaviga?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col">
      {vociGestionale.map((voce) => {
        const attiva =
          pathname === voce.href || pathname?.startsWith(`${voce.href}/`);
        return (
          <li key={voce.href}>
            <Link
              href={voce.href}
              onClick={onNaviga}
              aria-current={attiva ? "page" : undefined}
              className={`block border-l-[3px] px-5 py-3.5 text-sm transition-colors ${
                attiva
                  ? "border-terra-400 bg-white/10 font-semibold text-white"
                  : "border-transparent text-verde-200 hover:bg-white/5 hover:text-white"
              }`}
            >
              {voce.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SidebarGestionale() {
  return (
    <aside className="hidden w-64 shrink-0 bg-verde-900 lg:block">
      <div className="sticky top-0 py-6">
        <p className="px-5 pb-4 text-[0.65rem] uppercase tracking-[0.18em] text-verde-300">
          Gestione
        </p>
        <nav aria-label="Navigazione gestionale">
          <Voci />
        </nav>
      </div>
    </aside>
  );
}

export function MenuGestionaleMobile() {
  const [aperto, setAperto] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setAperto((v) => !v)}
        aria-expanded={aperto}
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-white/10 px-3 text-sm font-medium text-white"
      >
        {aperto ? "✕" : "☰"} Menu
      </button>

      {aperto ? (
        <nav
          aria-label="Navigazione gestionale"
          className="absolute inset-x-0 top-full z-30 border-t border-verde-700 bg-verde-900 shadow-lg"
        >
          <Voci onNaviga={() => setAperto(false)} />
        </nav>
      ) : null}
    </div>
  );
}
