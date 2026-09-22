export type NavItem = {
  href: string;
  label: string;
  /** Descrizione breve usata nel footer e nelle anteprime. */
  description: string;
};

/**
 * Menu principale.
 *
 * Ogni voce e' una route propria, non un'ancora della home: pagine con
 * contenuto sostanziale devono restare indicizzabili e citabili una per una.
 *
 * "Rassegna stampa" non e' qui per scelta: resta una pagina reale, raggiunta
 * dal ticker in hero e dal footer.
 */
export const navItems: NavItem[] = [
  {
    href: "/chi-siamo",
    label: "Chi siamo",
    description:
      "Le sei aziende socie, la storia dal 2008 e il modo in cui lavoriamo insieme.",
  },
  {
    href: "/territorio",
    label: "Territorio",
    description:
      "Le colline teramane fra i cinque comuni delle aziende socie e il calendario di stagionalità.",
  },
  {
    href: "/la-spesa",
    label: "La spesa",
    description:
      "Prenota i prodotti delle aziende socie e ritirali al Mercato Contadino di Giulianova. Pagamento in loco.",
  },
  {
    href: "/eventi",
    label: "Eventi",
    description:
      "Degustazioni in Sala e visite alle aziende socie. Posti limitati, prenotazione online.",
  },
  {
    href: "/social-media",
    label: "Social & Media",
    description:
      "I nostri canali, le foto e i video del mercato, dei soci e degli eventi.",
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
  { href: "/la-spesa/catalogo", label: "Prenota la spesa", variante: "ocra" },
  { href: "/eventi", label: "Eventi", variante: "verde" },
];

export const rassegnaItem: NavItem = {
  href: "/rassegna-stampa",
  label: "Rassegna stampa",
  description: "Articoli, servizi e riconoscimenti che parlano di noi.",
};

export const areaRiservataItem: NavItem = {
  href: "/area-riservata/dashboard",
  label: "Area riservata",
  description: "Accesso al pannello per gli operatori della cooperativa.",
};

/** Nel footer l'elenco e' completo: li' la rassegna stampa deve esserci. */
export const footerItems: NavItem[] = [...navItems, rassegnaItem];
