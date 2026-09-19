export type NavItem = {
  href: string;
  label: string;
  /** Descrizione breve usata nel footer e nelle anteprime. */
  description: string;
};

/**
 * Menu principale. "Eventi" non compare qui: è diventato un pulsante dedicato
 * in header, accanto a "Prenota la spesa", e ripeterlo nel menu sarebbe un
 * doppione.
 */
export const navItems: NavItem[] = [
  {
    href: "/chi-siamo",
    label: "Chi siamo",
    description:
      "Le sei aziende socie, la storia dal 2008 e il modo in cui lavoriamo insieme.",
  },
  {
    href: "/mercato-contadino",
    label: "Il Mercato Contadino",
    description:
      "Cosa trovi al punto vendita di Giulianova e come funziona la spesa.",
  },
  {
    href: "/la-spesa",
    label: "La spesa",
    description:
      "Prenota i prodotti delle aziende socie e ritirali al Mercato Contadino. Pagamento in loco.",
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

export type CtaItem = { href: string; label: string; variante: "piena" | "outline" };

/** I due pulsanti appaiati in header. */
export const ctaItems: CtaItem[] = [
  { href: "/la-spesa", label: "Prenota la spesa", variante: "piena" },
  { href: "/eventi", label: "Eventi", variante: "outline" },
];

export const eventiItem: NavItem = {
  href: "/eventi",
  label: "Eventi ed esperienze",
  description:
    "Degustazioni in Sala e visite alle aziende socie. Posti limitati, prenotazione online.",
};

export const areaRiservataItem: NavItem = {
  href: "/area-riservata",
  label: "Area riservata",
  description: "Accesso al pannello per gli operatori della cooperativa.",
};

/** Nel footer l'elenco è completo: lì Eventi e Area riservata devono esserci. */
export const footerItems: NavItem[] = [...navItems, eventiItem];
