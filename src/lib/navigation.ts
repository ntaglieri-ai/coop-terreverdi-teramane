export type NavItem = {
  href: string;
  label: string;
  /** Descrizione breve usata nel footer e nelle anteprime. */
  description: string;
};

/**
 * Menu principale.
 *
 * "Chi siamo" raccoglie anche il racconto del punto vendita: le due pagine
 * separate sono state unite, /mercato-contadino ora reindirizza qui.
 */
export const navItems: NavItem[] = [
  {
    href: "/chi-siamo",
    label: "Chi siamo",
    description:
      "Le sei aziende socie, la storia dal 2008 e il Mercato Contadino di Giulianova.",
  },
  {
    href: "/la-spesa",
    label: "La spesa",
    description:
      "Prenota i prodotti delle aziende socie e ritirali al Mercato Contadino. Pagamento in loco.",
  },
  {
    href: "/eventi",
    label: "Eventi & Degustazioni",
    description:
      "Degustazioni in Sala e visite alle aziende socie. Posti limitati, prenotazione online.",
  },
  {
    href: "/rassegna-stampa",
    label: "Rassegna stampa",
    description: "Articoli, servizi e riconoscimenti che parlano di noi.",
  },
  {
    href: "/social",
    label: "Social",
    description: "Dove seguirci e cosa raccontiamo giorno per giorno.",
  },
  {
    href: "/gallery",
    label: "Gallery & Media",
    description: "Foto e video del mercato, delle aziende socie e degli eventi.",
  },
  {
    href: "/contatti",
    label: "Contatti",
    description:
      "Indirizzo del Mercato Contadino a Giulianova, orari di apertura e recapiti.",
  },
];

export type CtaItem = {
  href: string;
  label: string;
  variante: "ocra" | "verde";
};

/** I due pulsanti appaiati in header: pieni entrambi, colori diversi. */
export const ctaItems: CtaItem[] = [
  { href: "/la-spesa", label: "Prenota la spesa", variante: "ocra" },
  { href: "/eventi", label: "Eventi", variante: "verde" },
];

export const areaRiservataItem: NavItem = {
  href: "/area-riservata",
  label: "Area riservata",
  description: "Accesso al pannello per gli operatori della cooperativa.",
};

/** Nel footer l'elenco del menu, per esteso. */
export const footerItems: NavItem[] = navItems;
