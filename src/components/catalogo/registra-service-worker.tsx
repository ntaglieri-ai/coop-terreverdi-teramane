"use client";

import { useEffect } from "react";

/**
 * Registra il service worker della PWA "La spesa", montato solo qui: lo
 * scope resta /la-spesa/, il resto del sito non ne sa nulla.
 */
export function RegistraServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register("/la-spesa/sw.js", { scope: "/la-spesa/" })
      .catch(() => {
        // Nessun blocco per l'utente: la pagina funziona anche senza SW,
        // semplicemente senza supporto offline/installazione.
      });
  }, []);

  return null;
}
