// Service worker della PWA "La spesa".
//
// Vive sotto /la-spesa/ apposta: lo scope di un service worker non può
// superare la cartella del file che lo serve, quindi registrarlo da qui
// tiene fuori il resto del sito senza bisogno dell'header
// Service-Worker-Allowed.
//
// Strategia volutamente minima e network-first: durante lo sviluppo un
// service worker cache-first è la causa più comune di "vedo la versione
// vecchia". Qui la rete vince sempre quando c'è; la cache serve solo da
// riserva offline.

const CACHE = "la-spesa-v1";
const RISORSE_BASE = [
  "/la-spesa/catalogo",
  "/la-spesa/manifest.webmanifest",
  "/icons/catalogo-icon-192.png",
  "/icons/catalogo-icon-512.png",
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(RISORSE_BASE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((chiavi) =>
        Promise.all(
          chiavi.filter((chiave) => chiave !== CACHE).map((chiave) => caches.delete(chiave)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (evento) => {
  const richiesta = evento.request;
  if (richiesta.method !== "GET" || !richiesta.url.startsWith(self.location.origin)) {
    return;
  }

  evento.respondWith(
    fetch(richiesta)
      .then((risposta) => {
        const copia = risposta.clone();
        caches.open(CACHE).then((cache) => cache.put(richiesta, copia));
        return risposta;
      })
      .catch(() => caches.match(richiesta)),
  );
});
