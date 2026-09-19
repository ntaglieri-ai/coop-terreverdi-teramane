# Cooperativa Agricola Terre Verdi Teramane

Sito web della cooperativa: presentazione, prenotazione della spesa con ritiro
in sede e prenotazione di eventi ed esperienze.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- **Supabase** — Postgres, Auth (multi-operatore con RLS), Storage immagini
- **Resend** — email transazionali
- **Stripe Checkout** — solo per il modulo eventi
- **Vercel** — deploy

## Avvio locale

```bash
cp .env.example .env.local   # poi riempi i valori
npm install
npm run dev
```

## Branch

| Branch    | Ruolo                                                  |
| --------- | ------------------------------------------------------ |
| `main`    | produzione — Production Branch su Vercel               |
| `develop` | sviluppo — ogni push genera un Preview Deployment      |

Si lavora su `develop`; `main` si aggiorna via merge quando si va in produzione.

## Struttura

```
src/
  app/                 route App Router, una cartella per pagina della sitemap
  components/          componenti condivisi (header, footer, hero, container)
    carrello/          stato del carrello, badge e icona
    home/              sezioni della home
  lib/                 dati e utility condivise
supabase/
  schema.sql           schema DB + policy RLS (bozza, non ancora applicata)
```

## Sitemap

| Percorso           | Pagina                                                |
| ------------------ | ----------------------------------------------------- |
| `/`                | Home (hero con ticker rassegna stampa)                |
| `/chi-siamo`       | Storia, valori e carosello delle sei aziende socie    |
| `/territorio`      | Colline teramane, Mercato Contadino e "Dove siamo"    |
| `/la-spesa`        | Catalogo e prenotazione — pagamento in loco           |
| `/eventi`          | Sala Degustazioni e visite — pagamento Stripe         |
| `/social-media`    | Canali, foto e video                                  |
| `/contatti`        | Recapiti, orari, mappa, form                          |
| `/rassegna-stampa` | Articoli e servizi — **fuori dal menu**               |
| `/area-riservata`  | Login operatori, fuori dal menu                       |

Menu principale: 🏠 · Chi siamo · Territorio · La spesa · Eventi ·
Social & Media · Contatti, più il badge carrello.

`Rassegna stampa` non sta nel menu per scelta: resta una pagina reale, con
title e meta propri, raggiunta dal ticker in hero e dal footer.

Redirect permanenti in [`next.config.ts`](next.config.ts):
`/mercato-contadino` → `/territorio#mercato-contadino`, `/social` e
`/gallery` → `/social-media`.

### SEO e GEO

Ogni pagina con contenuto sostanziale resta una **route propria** con title e
meta description dedicati: non vanno trasformate in ancore della home. Vale
per il posizionamento classico e per la citabilità da parte dei motori
generativi, che preferiscono URL mirate a un singolo argomento.

[`dati-strutturati.tsx`](src/components/dati-strutturati.tsx) emette il JSON-LD
in ogni pagina: un nodo `Organization` per la cooperativa e uno `GroceryStore`
per il Mercato Contadino, con indirizzo, telefono e
`openingHoursSpecification` generata dagli orari strutturati di
`cooperativa.ts`. È la leva più diretta sulle domande che un'attività locale
riceve davvero — orari, indirizzo, cosa si vende.

## Home

La home segue questo ritmo di sezioni, con sfondi alternati (crema → sabbia →
bianco → verde scuro → sabbia → crema) per dare scansione visiva allo scroll:

1. Hero — foto a tutta larghezza con overlay a gradiente, badge ocra, due CTA
   appaiate, "Contattaci" come azione terziaria e, in coda alla sezione, il
   ticker della rassegna stampa
2. Barra statistiche — quattro numeri con icona, su fascia verde
3. Il nostro territorio — testo + immagine, rimanda a `/territorio`
4. Perché sceglierci — quattro card con icone
5. I nostri prodotti — le sei filiere, link al catalogo
6. Slideshow — sei foto, pallini, autoplay che si ferma su hover e sotto
   `prefers-reduced-motion`
7. Eventi in evidenza — fascia scura, tre card
8. Rassegna stampa in evidenza
9. CTA finale doppia — spesa vs eventi/contatto

Per scelta **in home non c'è una sezione video**: i video stanno su
[`/gallery`](src/app/gallery).

Contenuti e immagini stanno in [`src/lib/home-content.ts`](src/lib/home-content.ts).

## Dati della cooperativa

Recapiti, orari, punto vendita e composizione del consorzio stanno in un solo
posto: [`src/lib/cooperativa.ts`](src/lib/cooperativa.ts). Header, footer,
home, contatti e la spesa leggono da lì — non duplicare indirizzo o orari nelle
pagine.

Fatti confermati: cooperativa attiva dal 2008, sei aziende agricole del
teramano (orto a Mosciano Sant'Angelo, caseificio a Notaresco, cantina a
Controguerra, frantoio a Castellalto, forno a Giulianova Paese, salumificio a
Bellante), punto vendita "Mercato Contadino" in Via Galileo Galilei 24,
Giulianova (TE), tel. 085 8003412.

### Aperto col cliente

I punti ancora da chiudere sono marcati `TODO CLIENTE` nel codice:

- **Modalità di ritiro della spesa** — probabile cutoff giornaliero, non slot a
  capienza. Finché non è confermato, le pagine restano neutre sul meccanismo e
  lo schema `slot` / `prenotazioni` non va toccato.
- **Ragioni sociali delle aziende socie** — ne conosciamo una su sei. Le sei
  sono elencate su `/chi-siamo` (sezione "I nostri produttori") per attività e
  comune; quando arrivano i nomi basta riempire `nome` in `cooperativa.ts`.
- **Orari** — raccolti di seconda mano, da riconfermare.
- **Calendario eventi** — i tre appuntamenti in home sono proposte, non
  programmazione confermata.
- **Numero WhatsApp** — il fisso 085 non funziona su `wa.me`. Serve un
  cellulare: finché `puntoVendita.whatsapp` resta `null` il bottone non viene
  renderizzato, per non pubblicare un link morto.
- **Logo in alta risoluzione** — il file fornito è un lockup a 316×274 px,
  troppo piccolo per usarlo come immagine del titolo. Serve un SVG o un PNG
  trasparente grande.
- Email di contatto, P. IVA, chi gestirà news e social, account Stripe.

### Foto segnaposto

Tutte le immagini sono **segnaposto temporanei** presi da Unsplash (licenza
free-to-use, nessuna attribuzione richiesta) e caricati via `next/image` dal
dominio `images.unsplash.com`, autorizzato in
[`next.config.ts`](next.config.ts).

Quando la cooperativa fornisce le foto reali del territorio, dei campi e dei
prodotti: sostituirle in `src/lib/home-content.ts`, spostarle in `/public` o su
Supabase Storage e rimuovere il `remotePatterns` di Unsplash. I punti da
toccare sono marcati con `TODO FOTO` nel codice.

Le micro-animazioni di ingresso usano `framer-motion` tramite
[`src/components/reveal.tsx`](src/components/reveal.tsx) e rispettano
`prefers-reduced-motion`.

## Carrello

La spesa è pensata come carrello multi-prodotto persistente durante la
navigazione, non come form singolo. Lo stato vive in `localStorage`, letto con
`useSyncExternalStore`
([`carrello-store.ts`](src/components/carrello/carrello-store.ts)): in SSR lo
snapshot è vuoto e React riallinea dopo l'idratazione, senza mismatch.

È una comodità di navigazione, **non una fonte di verità**: quando il catalogo
sarà collegato a Supabase, prezzi e disponibilità vanno riletti dal server al
momento della prenotazione. Il contatore compare nel badge in header e nella
barra fissa mobile.

## Area riservata

[`/area-riservata`](src/app/area-riservata) è il login operatori su Supabase
Auth. Il form apre solo la sessione: **i permessi stanno nelle policy RLS su
Postgres**, non in controlli applicativi sparsi.

Il pannello di gestione non esiste ancora e **nessun utente Supabase è stato
creato**: si fa quando il pannello è pronto da testare.

## Palette

Le variabili CSS vivono in [`src/app/globals.css`](src/app/globals.css) e sono
esposte come utility Tailwind (`verde-*`, `terra-*`, `grano`, `crema`,
`pietra-*`, `carbone`) più i token semantici `background`, `surface`,
`foreground`, `primary`, `accent`, `border`.

Il logo del cliente sta in [`public/`](public/):
`logo-terre-verdi-teramane.png` è il lockup completo,
`logo-mercato-contadino-mark.png` è la sola rosetta, ritagliata per l'header.
Il wordmark accanto è composto in tipografia, non è un'immagine.

## Regole del progetto

- **Nessun segreto nel codice**, nemmeno come fallback. Solo env var, con
  errore esplicito se mancanti.
- `SUPABASE_SERVICE_ROLE_KEY` è **solo server-side**: mai `NEXT_PUBLIC_`, mai
  importata in un Client Component.
- Il pagamento online riguarda **solo gli eventi**. La spesa si paga in loco al
  ritiro.
- I permessi del pannello admin si esprimono con **RLS su Postgres**, non con
  controlli manuali in ogni API route.
