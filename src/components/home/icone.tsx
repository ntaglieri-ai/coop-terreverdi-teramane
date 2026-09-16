import type { IconaMotivo } from "@/lib/home-content";

const props = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Set minimale di icone a tratto, coerenti fra loro. */
export function IconaMotivoSvg({
  nome,
  className = "",
}: {
  nome: IconaMotivo;
  className?: string;
}) {
  switch (nome) {
    // Percorso breve: due punti collegati da una linea.
    case "filiera":
      return (
        <svg {...props} className={className}>
          <circle cx="5" cy="18" r="2.5" />
          <circle cx="19" cy="6" r="2.5" />
          <path d="M7.2 16.2 16.8 7.8" />
        </svg>
      );
    // Foglia con nervatura.
    case "stagione":
      return (
        <svg {...props} className={className}>
          <path d="M20 4c0 8-5 12-11 12H5c0-7 5-11 11-11 1.6 0 3-.4 4-1Z" />
          <path d="M4 20c2-4.5 5-7.5 9-9.5" />
        </svg>
      );
    // Tre figure affiancate.
    case "cooperativa":
      return (
        <svg {...props} className={className}>
          <circle cx="12" cy="8" r="2.6" />
          <path d="M7.5 19a4.5 4.5 0 0 1 9 0" />
          <path d="M4 17.5a3.4 3.4 0 0 1 2.6-3.3" />
          <path d="M20 17.5a3.4 3.4 0 0 0-2.6-3.3" />
        </svg>
      );
    // Etichetta di tracciabilita' con foro.
    case "lotto":
      return (
        <svg {...props} className={className}>
          <path d="M12.6 3.6H20v7.4l-8.6 8.6a2 2 0 0 1-2.8 0l-4.6-4.6a2 2 0 0 1 0-2.8Z" />
          <circle cx="16.4" cy="7.6" r="1.2" />
        </svg>
      );
  }
}
