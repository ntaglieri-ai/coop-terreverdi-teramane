export type NavItem = {
  href: string;
  label: string;
  /** Descrizione breve usata nei box di ingresso in home e nel footer. */
  description: string;
};

export const navItems: NavItem[] = [
  {
    href: "/chi-siamo",
    label: "Chi siamo",
    description:
      "Le sei aziende socie, la storia dal 2008 e il modo in cui lavoriamo insieme.",
  },
  {
    href: "/la-spesa",
    label: "La spesa",
    description:
      "Prenota i prodotti delle aziende socie e ritirali al Mercato Contadino. Pagamento in loco.",
  },
  {
    href: "/eventi",
    label: "Eventi ed esperienze",
    description:
      "Degustazioni in Sala e visite alle aziende socie. Posti limitati, prenotazione online.",
  },
  {
    href: "/rassegna-stampa",
    label: "Rassegna stampa",
    description: "Articoli, servizi e riconoscimenti che parlano di noi.",
  },
  {
    href: "/contatti",
    label: "Contatti",
    description: "Indirizzo del Mercato Contadino a Giulianova, orari di apertura e recapiti.",
  },
];
