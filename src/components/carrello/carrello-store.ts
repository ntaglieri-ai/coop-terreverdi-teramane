export type VoceCarrello = {
  /** Id del lotto. */
  id: string;
  nome: string;
  quantita: number;
  /**
   * Istantanea di prezzo e unità al momento dell'aggiunta, solo per mostrarli
   * nel carrello: al momento della prenotazione vanno riletti dal server, mai
   * fidarsi di questi valori per il totale definitivo.
   */
  prezzo?: number;
  unita?: string;
  immagine?: string | null;
};

const CHIAVE = "tvt-carrello";

/** Riferimento stabile: getSnapshot non deve restituire array nuovi ogni volta. */
const VUOTO: VoceCarrello[] = [];

let cacheVoci: VoceCarrello[] = VUOTO;
let cacheGrezza: string | null = null;
const ascoltatori = new Set<() => void>();

function leggiGrezzo(): string | null {
  try {
    return window.localStorage.getItem(CHIAVE);
  } catch {
    // Finestra privata o storage bloccato: il carrello semplicemente non
    // sopravvive al reload.
    return null;
  }
}

/**
 * Lo snapshot deve essere referenzialmente stabile finché il contenuto non
 * cambia, altrimenti useSyncExternalStore rientra in loop.
 */
export function getSnapshot(): VoceCarrello[] {
  const grezzo = leggiGrezzo();
  if (grezzo !== cacheGrezza) {
    cacheGrezza = grezzo;
    try {
      cacheVoci = grezzo ? (JSON.parse(grezzo) as VoceCarrello[]) : VUOTO;
    } catch {
      cacheVoci = VUOTO;
    }
  }
  return cacheVoci;
}

/** In SSR e in prerenderizzazione il carrello è sempre vuoto. */
export function getServerSnapshot(): VoceCarrello[] {
  return VUOTO;
}

export function subscribe(ascoltatore: () => void) {
  ascoltatori.add(ascoltatore);
  // 'storage' arriva dalle altre schede aperte sullo stesso sito.
  window.addEventListener("storage", ascoltatore);
  return () => {
    ascoltatori.delete(ascoltatore);
    window.removeEventListener("storage", ascoltatore);
  };
}

export function scrivi(voci: VoceCarrello[]) {
  try {
    window.localStorage.setItem(CHIAVE, JSON.stringify(voci));
  } catch {
    // Non possiamo persistere: lo stato in memoria resta comunque valido
    // per questa navigazione.
  }
  cacheVoci = voci;
  cacheGrezza = JSON.stringify(voci);
  for (const ascoltatore of ascoltatori) ascoltatore();
}
