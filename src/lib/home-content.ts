// ===========================================================================
// Contenuti della home.
//
// TODO FOTO — Tutte le immagini qui sotto sono SEGNAPOSTO da Unsplash
// (licenza free-to-use, nessuna attribuzione richiesta). Vanno sostituite
// appena la cooperativa fornisce le foto reali del territorio, dei campi e
// dei prodotti: a quel punto conviene spostarle in /public o su Supabase
// Storage e togliere il remotePattern di images.unsplash.com da next.config.ts.
//
// TODO COPY — I testi sono una prima stesura: vanno validati con la
// cooperativa (in particolare storia, comuni e nomi delle esperienze).
// ===========================================================================

/** URL Unsplash ottimizzato: formato automatico, crop, larghezza e qualità. */
function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;
}

export const heroImage = {
  src: unsplash("1601397702554-ce9ecbebc514", 2000),
  alt: "Uliveto su una collina con un borgo di pietra e le montagne sullo sfondo",
};

export const territorioImage = {
  src: unsplash("1758903179366-b01ee06e7230", 1200),
  alt: "Pini che incorniciano un panorama di colline coltivate",
};

export type IconaMotivo = "filiera" | "stagione" | "cooperativa" | "lotto";

export type Motivo = {
  titolo: string;
  testo: string;
  icona: IconaMotivo;
};

export const motivi: Motivo[] = [
  {
    icona: "filiera",
    titolo: "Filiera corta",
    testo:
      "Dal campo al banco di ritiro non c'è nessun passaggio intermedio: raccogliamo, prepariamo e consegniamo noi.",
  },
  {
    icona: "stagione",
    titolo: "Solo stagionalità",
    testo:
      "Il catalogo cambia con i mesi. Trovi quello che la terra dà davvero in quel momento, non un assortimento fisso.",
  },
  {
    icona: "cooperativa",
    titolo: "Cooperativa di territorio",
    testo:
      "Siamo soci che lavorano gli stessi terreni: le scelte si prendono insieme e il valore resta nelle colline teramane.",
  },
  {
    icona: "lotto",
    titolo: "Ogni lotto tracciato",
    testo:
      "Per ogni partita sai campo, comune e data di raccolta. La tracciabilità è la nostra idea di genuinità.",
  },
];

export type CategoriaProdotto = {
  nome: string;
  descrizione: string;
  image: { src: string; alt: string };
};

export const categorieProdotto: CategoriaProdotto[] = [
  {
    nome: "Ortaggi di stagione",
    descrizione: "Pomodori, zucchine, fagiolini e verdure a foglia raccolti in giornata.",
    image: {
      src: unsplash("1627989147125-a004d05946d3", 800),
      alt: "Cesto di vimini pieno di pomodori, zucchine e fagiolini appena raccolti",
    },
  },
  {
    nome: "Olio extravergine",
    descrizione: "Dalle olive dei nostri uliveti, franto a freddo poco dopo la raccolta.",
    image: {
      src: unsplash("1474979266404-7eaacbcd87c5", 800),
      alt: "Ampolla di vetro con olio extravergine, olive e foglie d'ulivo",
    },
  },
  {
    nome: "Cereali e legumi",
    descrizione: "Grani e legumi coltivati in rotazione sui campi della cooperativa.",
    image: {
      src: unsplash("1529511582893-2d7e684dd128", 800),
      alt: "Campo di grano maturo sotto un cielo azzurro",
    },
  },
  {
    nome: "Cesta mista",
    descrizione: "La selezione della settimana, composta da noi con il meglio del raccolto.",
    image: {
      src: unsplash("1690934167884-08c184b6c606", 800),
      alt: "Cesta di vimini con frutta e verdura miste appoggiata sull'erba",
    },
  },
];

export type EventoInEvidenza = {
  titolo: string;
  luogo: string;
  periodo: string;
  descrizione: string;
  image: { src: string; alt: string };
};

/**
 * TODO DATI — segnaposto statici: da sostituire con gli slot di tipo 'evento'
 * letti da Supabase, con data e posti residui reali.
 */
export const eventiInEvidenza: EventoInEvidenza[] = [
  {
    titolo: "Degustazione in Sala",
    luogo: "Sala Degustazioni",
    periodo: "Date da definire",
    descrizione:
      "Un percorso guidato fra olio, conserve e pane, con i soci che raccontano ogni lotto.",
    image: {
      src: unsplash("1788660601189-861106e99899", 800),
      alt: "Tavolo conviviale con pane, olive e calici di vino condivisi fra più persone",
    },
  },
  {
    titolo: "Raccolta guidata nell'uliveto",
    luogo: "Campi della cooperativa",
    periodo: "Stagione della raccolta",
    descrizione:
      "Una mattina fra gli alberi: si raccoglie insieme e si segue il percorso fino al frantoio.",
    image: {
      src: unsplash("1635097087993-1dbe24dbc2f9", 800),
      alt: "Mani che selezionano olive verdi e nere appena raccolte",
    },
  },
  {
    titolo: "Pranzo sotto la pergola",
    luogo: "Corte della cooperativa",
    periodo: "Da giugno a settembre",
    descrizione:
      "Tavolate all'ombra della vite, con i piatti costruiti sul raccolto del giorno.",
    image: {
      src: unsplash("1784230804391-371d10702a54", 800),
      alt: "Tavoli e sedie di legno apparecchiati sotto un pergolato di vite",
    },
  },
];

export type VoceRassegna = {
  testata: string;
  data: string;
  titolo: string;
};

/** TODO DATI — da sostituire con la lista aggiornabile dal pannello. */
export const rassegnaInEvidenza: VoceRassegna[] = [
  {
    testata: "Testata da definire",
    data: "Data da definire",
    titolo: "Titolo dell'articolo in evidenza",
  },
  {
    testata: "Testata da definire",
    data: "Data da definire",
    titolo: "Secondo articolo in evidenza",
  },
];
