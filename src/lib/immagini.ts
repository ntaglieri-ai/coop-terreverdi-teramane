/**
 * Helper per le immagini segnaposto.
 *
 * TODO FOTO — tutte le foto del sito vengono da Unsplash (licenza
 * free-to-use, nessuna attribuzione richiesta) e sono temporanee. Quando la
 * cooperativa fornisce il proprio materiale vanno spostate in /public o su
 * Supabase Storage, e il remotePattern di images.unsplash.com va tolto da
 * next.config.ts.
 */
export function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;
}

export type Immagine = { src: string; alt: string };
