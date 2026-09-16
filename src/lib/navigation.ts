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
      "La storia della cooperativa, i soci, i campi e i valori che guidano il nostro lavoro.",
  },
  {
    href: "/la-spesa",
    label: "La spesa",
    description:
      "Prenota i prodotti dell'orto e ritirali in cooperativa. Pagamento in loco al ritiro.",
  },
  {
    href: "/eventi",
    label: "Eventi ed esperienze",
    description:
      "Degustazioni in Sala e attività nei campi. Posti limitati, prenotazione online.",
  },
  {
    href: "/rassegna-stampa",
    label: "Rassegna stampa",
    description: "Articoli, servizi e riconoscimenti che parlano di noi.",
  },
  {
    href: "/contatti",
    label: "Contatti",
    description: "Dove siamo, quando siamo aperti e come raggiungerci.",
  },
];

/** I tre ingressi principali mostrati in home. */
export const homeEntryPoints: NavItem[] = navItems.filter((item) =>
  ["/chi-siamo", "/la-spesa", "/eventi"].includes(item.href),
);
