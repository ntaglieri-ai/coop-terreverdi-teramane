// ===========================================================================
// Contenuti della home.
//
// La copy è scritta da zero sui fatti reali della cooperativa (vedi
// src/lib/cooperativa.ts). Nessun testo proviene da materiale di terzi.
//
// TODO FOTO — Tutte le immagini sono SEGNAPOSTO da Unsplash (licenza
// free-to-use, nessuna attribuzione richiesta). Vanno sostituite appena la
// cooperativa fornisce le foto reali del territorio, del Mercato Contadino e
// dei prodotti delle aziende socie: a quel punto conviene spostarle in
// /public o su Supabase Storage e togliere il remotePattern di
// images.unsplash.com da next.config.ts.
// ===========================================================================

import { unsplash, type Immagine } from "@/lib/immagini";

/**
 * Foto del banco, fornita dal cliente.
 *
 * Il componente Hero importa il file direttamente (serve import statico,
 * non questo `src`, per il blur-up automatico) — questo resta solo per il
 * testo alternativo e come riferimento.
 *
 * TODO CLIENTE — il file è 1200×800: su schermi larghi viene ingrandito.
 * Chiedere l'originale ad alta risoluzione, e una foto del banco reale del
 * Mercato Contadino appena disponibile.
 */
export const heroImage: Immagine = {
  src: "/hero-mercato-contadino.webp",
  alt: "Banco di mercato con cassette di pomodori, peperoni, zucchine, cetrioli, melanzane e carciofi",
};

export const territorioImage: Immagine = {
  src: unsplash("1758903179366-b01ee06e7230", 1200),
  alt: "Pini che incorniciano un panorama di colline coltivate",
};

export type IconaMotivo = "filiera" | "stagione" | "cooperativa" | "lotto";

export type CategoriaProdotto = {
  nome: string;
  descrizione: string;
  image: { src: string; alt: string };
};

/** Le sei filiere della cooperativa, una per azienda socia. */
export const categorieProdotto: CategoriaProdotto[] = [
  {
    nome: "Ortaggi e legumi",
    descrizione:
      "Verdure di stagione e legumi dalla nostra azienda orticola, raccolti a pochi chilometri dal banco.",
    image: {
      src: unsplash("1627989147125-a004d05946d3", 800),
      alt: "Cesto di vimini pieno di pomodori, zucchine e fagiolini appena raccolti",
    },
  },
  {
    nome: "Formaggi",
    descrizione:
      "Pecorino, ricotta e caciotte dal caseificio socio, prodotti con il latte delle greggi del teramano.",
    image: {
      src: unsplash("1566935404705-c22355bfa3ac", 800),
      alt: "Forme di formaggio in stagionatura su assi di legno",
    },
  },
  {
    nome: "Vino",
    descrizione:
      "Montepulciano e Pecorino d'Abruzzo dalla cantina della cooperativa, sulle colline verso il confine marchigiano.",
    image: {
      src: unsplash("1759742269093-de3d9fed6714", 800),
      alt: "Grappoli di uva nera maturi appesi alla vite in un vigneto",
    },
  },
  {
    nome: "Olio extravergine e olive",
    descrizione:
      "Dalle olive dei nostri uliveti, franto a freddo poco dopo la raccolta.",
    image: {
      src: unsplash("1474979266404-7eaacbcd87c5", 800),
      alt: "Ampolla di vetro con olio extravergine, olive e foglie d'ulivo",
    },
  },
  {
    nome: "Pane a lievito madre",
    descrizione:
      "Pagnotte a lunga lievitazione dal forno socio, sfornate ogni mattina.",
    image: {
      src: unsplash("1549413468-cd78edb7e75c", 800),
      alt: "Pagnotte di pane rustico infarinate appoggiate su un telo di juta",
    },
  },
  {
    nome: "Salumi",
    descrizione:
      "Insaccati stagionati dal salumificio della cooperativa, lavorati secondo le ricette di casa.",
    image: {
      src: unsplash("1786339283123-8c044f3ffc57", 800),
      alt: "Salami interi e insaccati stagionati esposti su un banco di mercato",
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

export type EventoInEvidenza = {
  titolo: string;
  luogo: string;
  periodo: string;
  descrizione: string;
  image: { src: string; alt: string };
};

/**
 * TODO CLIENTE — proposte, non calendario confermato: i tre appuntamenti qui
 * sotto sono costruiti sulle filiere reali della cooperativa ma vanno validati
 * con il cliente.
 *
 * TODO DATI — una volta definito il modello, vanno letti dagli slot di tipo
 * 'evento' su Supabase, con data e posti residui reali.
 */
export const eventiInEvidenza: EventoInEvidenza[] = [
  {
    titolo: "Degustazione in Sala",
    luogo: "Sala Degustazioni",
    periodo: "Date da definire",
    descrizione:
      "Un percorso guidato fra formaggi, salumi, pane e olio, raccontato da chi li produce.",
    image: {
      src: unsplash("1788660601189-861106e99899", 800),
      alt: "Tavolo conviviale con pane, olive e calici di vino condivisi fra più persone",
    },
  },
  {
    titolo: "Giornata al frantoio",
    luogo: "Frantoio della cooperativa",
    periodo: "Stagione della raccolta",
    descrizione:
      "Si raccoglie insieme fra gli ulivi e si segue il percorso delle olive fino alla molitura.",
    image: {
      src: unsplash("1635097087993-1dbe24dbc2f9", 800),
      alt: "Mani che selezionano olive verdi e nere appena raccolte",
    },
  },
  {
    titolo: "Tra i filari",
    luogo: "Vigne di Controguerra",
    periodo: "Da settembre a ottobre",
    descrizione:
      "Visita in vigna nel periodo della vendemmia, con assaggio di Montepulciano e Pecorino.",
    image: {
      src: unsplash("1784230804391-371d10702a54", 800),
      alt: "Tavoli e sedie di legno apparecchiati sotto un pergolato di vite",
    },
  },
];

/**
 * Slideshow della home: sei scatti che attraversano le filiere della
 * cooperativa, dal banco al campo.
 *
 * TODO FOTO — segnaposto: vanno sostituiti con foto reali del mercato, delle
 * aziende socie e degli eventi.
 */
export const slideshow: Immagine[] = [
  {
    src: unsplash("1591586116988-62fe65164f8d", 1600),
    alt: "Banco di ortaggi freschi con finocchi, ravanelli, cavolfiori e broccoli",
  },
  {
    src: unsplash("1635097087993-1dbe24dbc2f9", 1600),
    alt: "Mani che selezionano olive verdi e nere appena raccolte",
  },
  {
    src: unsplash("1761489179799-c8ecad6ec719", 1600),
    alt: "Filari di vite controluce al tramonto",
  },
  {
    src: unsplash("1788660601189-861106e99899", 1600),
    alt: "Tavolo conviviale con pane, olive e calici di vino condivisi fra più persone",
  },
  {
    src: unsplash("1566935404705-c22355bfa3ac", 1600),
    alt: "Forme di formaggio in stagionatura su assi di legno",
  },
  {
    src: unsplash("1549413468-cd78edb7e75c", 1600),
    alt: "Pagnotte di pane rustico infarinate su un telo di juta",
  },
];
