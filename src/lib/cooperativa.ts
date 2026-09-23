// ===========================================================================
// Dati reali della cooperativa, confermati dal cliente.
//
// Unica fonte di verità per recapiti, orari e composizione del consorzio:
// header, footer, contatti e home leggono da qui.
// ===========================================================================

import { unsplash, type Immagine } from "@/lib/immagini";

export const cooperativa = {
  nome: "Cooperativa Agricola Terre Verdi Teramane",
  nomeBreve: "Terre Verdi Teramane",
  annoFondazione: 2008,
  numeroAziende: 6,
};

/**
 * Foto hero della pagina Chi siamo.
 *
 * 3840, non una misura minore: l'hero è a `fill` con `sizes="100vw"`, quindi
 * su schermi larghi o ad alta densità Next arriva a chiedere fino al
 * deviceSize più grande di default (vedi lo stesso problema risolto per
 * l'hero di /eventi).
 *
 * TODO FOTO — segnaposto: colline coltivate, non le colline teramane vere.
 * Da sostituire quando la cooperativa fornisce una foto reale del territorio.
 */
export const chiSiamoHeroImage: Immagine = {
  src: unsplash("1782070308141-7d35f92f6150", 3840),
  alt: "Cipressi e casale di campagna su colline coltivate, luce dorata al tramonto",
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
  /**
   * TODO CLIENTE — serve un numero di cellulare con WhatsApp attivo: il fisso
   * 085 non funziona su wa.me. Finché resta null il bottone WhatsApp non viene
   * renderizzato, così non pubblichiamo un link morto.
   */
  whatsapp: null as string | null,
  /**
   * TODO CLIENTE — indirizzo email a cui recapitare i messaggi: ancora da
   * ricevere. Finché resta null l'azione "Email" nel drawer dei contatti
   * resta visibile ma disabilitata, invece di aprire un mailto vuoto.
   */
  email: null as string | null,
};

/** Query usata sia per il link a Maps sia per la mappa incorporata. */
const mapsQuery = encodeURIComponent(
  `${puntoVendita.via}, ${puntoVendita.cap} ${puntoVendita.comune} ${puntoVendita.provincia}`,
);

export const mappa = {
  /** Apre Maps in una scheda nuova. */
  link: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  /** Iframe senza API key: Google risponde 301 e reindirizza a /maps/embed. */
  embed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
};

/**
 * TODO CLIENTE — la nota sugli ordini dipende dal modello di ritiro, ancora da
 * confermare (probabile cutoff giornaliero, non slot a capienza). Il testo qui
 * sotto resta volutamente neutro sull'orario limite.
 */
export const notaOrdini =
  "Le prenotazioni si ritirano in negozio durante gli orari di apertura. Ti confermiamo noi quando l'ordine è pronto.";

export type Statistica = { valore: string; etichetta: string };

/** Quattro numeri verificabili dai dati che il cliente ha confermato. */
export const statistiche: Statistica[] = [
  { valore: "6", etichetta: "aziende socie" },
  { valore: "18", etichetta: "anni di attività" },
  { valore: "6", etichetta: "comuni del teramano" },
  { valore: "1", etichetta: "punto vendita" },
];

export const indirizzoCompleto = `${puntoVendita.via}, ${puntoVendita.cap} ${puntoVendita.comune} (${puntoVendita.provincia})`;

export type Fascia = {
  /** Formato 24h con zero iniziale, come vuole Schema.org. */
  apre: string;
  chiude: string;
};

export type GiornoApertura = {
  giorno: string;
  /** Nome inglese del giorno, per openingHoursSpecification. */
  schema: string;
  /** Vuoto = chiuso. */
  fasce: Fascia[];
};

const MATTINA = { apre: "08:00", chiude: "13:00" };

/**
 * Orari strutturati: da qui escono sia la tabella a schermo sia i dati
 * Schema.org. Tenerli come stringhe gia' formattate avrebbe richiesto di
 * riparsarle per il JSON-LD.
 *
 * TODO CLIENTE — orari da riconfermare: raccolti di seconda mano, potrebbero
 * essere solo indicativi.
 */
export const orari: GiornoApertura[] = [
  { giorno: "Lunedì", schema: "Monday", fasce: [] },
  {
    giorno: "Martedì",
    schema: "Tuesday",
    fasce: [MATTINA, { apre: "16:00", chiude: "19:30" }],
  },
  {
    giorno: "Mercoledì",
    schema: "Wednesday",
    fasce: [MATTINA, { apre: "16:00", chiude: "19:30" }],
  },
  {
    giorno: "Giovedì",
    schema: "Thursday",
    fasce: [MATTINA, { apre: "16:00", chiude: "19:30" }],
  },
  {
    giorno: "Venerdì",
    schema: "Friday",
    fasce: [MATTINA, { apre: "16:00", chiude: "20:00" }],
  },
  {
    giorno: "Sabato",
    schema: "Saturday",
    fasce: [
      { apre: "08:00", chiude: "13:30" },
      { apre: "16:00", chiude: "20:00" },
    ],
  },
  {
    giorno: "Domenica",
    schema: "Sunday",
    fasce: [{ apre: "08:30", chiude: "13:00" }],
  },
];

/** "08:00 – 13:00" senza lo zero iniziale, come si scrive in italiano. */
export function formattaFascia(fascia: Fascia) {
  const senzaZero = (ora: string) => ora.replace(/^0/, "");
  return `${senzaZero(fascia.apre)} – ${senzaZero(fascia.chiude)}`;
}

export type AziendaSocia = {
  /** Ragione sociale, dove la conosciamo. */
  nome: string | null;
  attivita: string;
  comune: string;
  produzione: string;
  /** TODO FOTO — segnaposto: servono le foto reali delle aziende e dei soci. */
  immagine: Immagine;
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
    immagine: {
      src: unsplash("1627989147125-a004d05946d3", 800),
      alt: "Cesto di ortaggi di stagione appena raccolti",
    }
  },
  {
    nome: null,
    attivita: "Caseificio",
    comune: "Notaresco",
    produzione: "Pecorino, ricotta e caciotte",
    immagine: {
      src: unsplash("1566935404705-c22355bfa3ac", 800),
      alt: "Forme di formaggio in stagionatura su assi di legno",
    }
  },
  {
    nome: null,
    attivita: "Cantina",
    comune: "Controguerra",
    produzione: "Montepulciano e Pecorino d'Abruzzo",
    immagine: {
      src: unsplash("1759742269093-de3d9fed6714", 800),
      alt: "Grappoli di uva nera maturi appesi alla vite",
    }
  },
  {
    nome: null,
    attivita: "Frantoio",
    comune: "Castellalto",
    produzione: "Olio extravergine e olive",
    immagine: {
      src: unsplash("1474979266404-7eaacbcd87c5", 800),
      alt: "Ampolla di vetro con olio extravergine e olive",
    }
  },
  {
    nome: null,
    attivita: "Forno",
    comune: "Giulianova Paese",
    produzione: "Pane a lievito madre",
    immagine: {
      src: unsplash("1549413468-cd78edb7e75c", 800),
      alt: "Pagnotte di pane rustico infarinate su un telo di juta",
    }
  },
  {
    nome: null,
    attivita: "Salumificio",
    comune: "Bellante",
    produzione: "Salumi",
    immagine: {
      src: unsplash("1786339283123-8c044f3ffc57", 800),
      alt: "Salami interi e insaccati stagionati su un banco",
    }
  },
];

/**
 * Foto del punto vendita.
 *
 * TODO FOTO — segnaposto: serve la foto reale dell'ingresso del Mercato
 * Contadino in Via Galileo Galilei.
 */
export const fotoNegozio: Immagine = {
  src: unsplash("1773049566090-94ec4fe77df7", 1400),
  alt: "Interno di un negozio di ortofrutta con cassette di legno e banco di verdure",
};

/**
 * Il banco, non la vetrina: serve dove `fotoNegozio` comparirebbe due volte
 * nella stessa pagina.
 *
 * TODO FOTO — segnaposto, come le altre.
 */
export const fotoBanco: Immagine = {
  src: unsplash("1591586116988-62fe65164f8d", 1200),
  alt: "Banco di ortaggi freschi con finocchi, ravanelli, cavolfiori e broccoli",
};

/** I comuni del consorzio, per i testi che parlano di territorio. */
export const comuniConsorzio = aziendeSocie.map((a) => a.comune);
