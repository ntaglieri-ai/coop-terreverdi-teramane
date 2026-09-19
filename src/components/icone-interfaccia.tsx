/**
 * Icone di interfaccia condivise (header mobile, drawer contatti, bottom nav).
 *
 * Il progetto non ha `lucide-react` fra le dipendenze e non lo aggiungiamo per
 * tre icone: i tracciati qui sotto sono quelli di Lucide (licenza ISC),
 * ridisegnati come SVG inline nello stesso stile delle icone già presenti
 * (`icona-casa.tsx`, `carrello/icona-carrello.tsx`, `home/icone.tsx`).
 * Se un giorno la dipendenza entrerà nel progetto, questi export si sostituiscono
 * uno a uno con gli originali.
 */

const tratto = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

type Props = { className?: string };

/** Lucide `map-pin`. */
export function IconaMappa({ className = "" }: Props) {
  return (
    <svg {...tratto} className={className}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/** Lucide `shopping-basket`. */
export function IconaCesto({ className = "" }: Props) {
  return (
    <svg {...tratto} className={className}>
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </svg>
  );
}

/** Lucide `calendar-days`. */
export function IconaCalendario({ className = "" }: Props) {
  return (
    <svg {...tratto} className={className}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

/** Lucide `menu`. */
export function IconaMenu({ className = "" }: Props) {
  return (
    <svg {...tratto} className={className}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

/** Lucide `x`. */
export function IconaChiudi({ className = "" }: Props) {
  return (
    <svg {...tratto} className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

/** Lucide `message-circle`: il punto d'ingresso "Contattaci". */
export function IconaContatti({ className = "" }: Props) {
  return (
    <svg {...tratto} className={className}>
      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.412-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-5.776-4.719" />
    </svg>
  );
}

export function IconaTelefono({ className = "" }: Props) {
  return (
    <svg {...tratto} className={className}>
      <path d="M6.5 3.5h3l1.5 4-2 1.3a12.5 12.5 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function IconaEmail({ className = "" }: Props) {
  return (
    <svg {...tratto} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

/** Glifo di marca: pieno, non a tratto, come vuole WhatsApp. */
export function IconaWhatsApp({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.22-8.24 8.22Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.55-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04 0 1.2.87 2.36.99 2.53.12.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}
