"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getServerSnapshot,
  getSnapshot,
  scrivi,
  subscribe,
  type VoceCarrello,
} from "@/components/carrello/carrello-store";

export type { VoceCarrello };

type CarrelloContextValue = {
  voci: VoceCarrello[];
  totaleArticoli: number;
  aggiungi: (voce: Omit<VoceCarrello, "quantita">, quantita?: number) => void;
  rimuovi: (id: string) => void;
  imposta: (id: string, quantita: number) => void;
  svuota: () => void;
  /** Drawer del carrello: un'unica istanza globale, apribile da più punti
   * dell'header (icona desktop e mobile) senza duplicare il dialog. */
  aperto: boolean;
  apri: () => void;
  chiudi: () => void;
};

const CarrelloContext = createContext<CarrelloContextValue | null>(null);

/**
 * Carrello multi-prodotto persistente durante la navigazione.
 *
 * Lo stato vive in localStorage, letto con useSyncExternalStore: in SSR lo
 * snapshot è vuoto e React riallinea dopo l'idratazione, senza mismatch.
 *
 * È una comodità per chi naviga, non una fonte di verità: quando il catalogo
 * sarà collegato a Supabase, prezzi e disponibilità vanno riletti dal server
 * al momento della prenotazione, mai presi da qui.
 */
export function CarrelloProvider({ children }: { children: ReactNode }) {
  const voci = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const aggiungi = useCallback(
    (voce: Omit<VoceCarrello, "quantita">, quantita = 1) => {
      const correnti = getSnapshot();
      const esistente = correnti.find((v) => v.id === voce.id);
      scrivi(
        esistente
          ? correnti.map((v) =>
              v.id === voce.id ? { ...v, quantita: v.quantita + quantita } : v,
            )
          : [...correnti, { ...voce, quantita }],
      );
    },
    [],
  );

  const rimuovi = useCallback((id: string) => {
    scrivi(getSnapshot().filter((v) => v.id !== id));
  }, []);

  const imposta = useCallback((id: string, quantita: number) => {
    if (quantita <= 0) {
      scrivi(getSnapshot().filter((v) => v.id !== id));
      return;
    }
    scrivi(getSnapshot().map((v) => (v.id === id ? { ...v, quantita } : v)));
  }, []);

  const svuota = useCallback(() => scrivi([]), []);

  const [aperto, setAperto] = useState(false);
  const apri = useCallback(() => setAperto(true), []);
  const chiudi = useCallback(() => setAperto(false), []);

  const value = useMemo<CarrelloContextValue>(
    () => ({
      voci,
      totaleArticoli: voci.reduce((somma, v) => somma + v.quantita, 0),
      aggiungi,
      rimuovi,
      imposta,
      svuota,
      aperto,
      apri,
      chiudi,
    }),
    [voci, aggiungi, rimuovi, imposta, svuota, aperto, apri, chiudi],
  );

  return (
    <CarrelloContext.Provider value={value}>{children}</CarrelloContext.Provider>
  );
}

export function useCarrello() {
  const context = useContext(CarrelloContext);
  if (!context) {
    throw new Error("useCarrello va usato dentro <CarrelloProvider>");
  }
  return context;
}
