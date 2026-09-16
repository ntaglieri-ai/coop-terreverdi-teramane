// ===========================================================================
// Dati reali della cooperativa, confermati dal cliente.
//
// Unica fonte di verità per recapiti, orari e composizione del consorzio:
// header, footer, contatti e home leggono da qui.
// ===========================================================================

export const cooperativa = {
  nome: "Cooperativa Agricola Terre Verdi Teramane",
  nomeBreve: "Terre Verdi Teramane",
  annoFondazione: 2008,
  numeroAziende: 6,
};

export const puntoVendita = {
  nome: "Mercato Contadino",
  via: "Via Galileo Galilei 24",
  cap: "64021",
  comune: "Giulianova",
  provincia: "TE",
  telefono: "085 8003412",
  /** Formato E.164 per il link tel:. */
  telefonoHref: "+390858003412",
};

export const indirizzoCompleto = `${puntoVendita.via}, ${puntoVendita.cap} ${puntoVendita.comune} (${puntoVendita.provincia})`;

export type GiornoApertura = {
  giorno: string;
  /** Vuoto = chiuso. */
  fasce: string[];
};

/**
 * TODO CLIENTE — orari da riconfermare: sono stati raccolti di seconda mano
 * e potrebbero essere solo indicativi.
 */
export const orari: GiornoApertura[] = [
  { giorno: "Lunedì", fasce: [] },
  { giorno: "Martedì", fasce: ["8:00 – 13:00", "16:00 – 19:30"] },
  { giorno: "Mercoledì", fasce: ["8:00 – 13:00", "16:00 – 19:30"] },
  { giorno: "Giovedì", fasce: ["8:00 – 13:00", "16:00 – 19:30"] },
  { giorno: "Venerdì", fasce: ["8:00 – 13:00", "16:00 – 20:00"] },
  { giorno: "Sabato", fasce: ["8:00 – 13:30", "16:00 – 20:00"] },
  { giorno: "Domenica", fasce: ["8:30 – 13:00"] },
];

export type AziendaSocia = {
  /** Ragione sociale, dove la conosciamo. */
  nome: string | null;
  attivita: string;
  comune: string;
  produzione: string;
};

/**
 * Le sei aziende socie.
 *
 * TODO DECISIONE — non ancora renderizzate da nessuna parte: resta da
 * decidere se la home debba elencarle singolarmente (sezione "I nostri
 * produttori") o restare a livello di cooperativa. I dati stanno qui pronti.
 *
 * TODO CLIENTE — di cinque su sei conosciamo solo l'attività, non la ragione
 * sociale: vanno chiesti i nomi prima di pubblicarle.
 */
export const aziendeSocie: AziendaSocia[] = [
  {
    nome: "Orto di Colle Verde",
    attivita: "Azienda orticola",
    comune: "Mosciano Sant'Angelo",
    produzione: "Ortaggi e legumi",
  },
  {
    nome: null,
    attivita: "Caseificio",
    comune: "Notaresco",
    produzione: "Pecorino, ricotta e caciotte",
  },
  {
    nome: null,
    attivita: "Cantina",
    comune: "Controguerra",
    produzione: "Montepulciano e Pecorino d'Abruzzo",
  },
  {
    nome: null,
    attivita: "Frantoio",
    comune: "Castellalto",
    produzione: "Olio extravergine e olive",
  },
  {
    nome: null,
    attivita: "Forno",
    comune: "Giulianova Paese",
    produzione: "Pane a lievito madre",
  },
  {
    nome: null,
    attivita: "Salumificio",
    comune: "Bellante",
    produzione: "Salumi",
  },
];

/** I comuni del consorzio, per i testi che parlano di territorio. */
export const comuniConsorzio = aziendeSocie.map((a) => a.comune);
