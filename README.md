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
    home/              sezioni della home
  lib/                 dati e utility condivise
supabase/
  schema.sql           schema DB + policy RLS (bozza, non ancora applicata)
```

## Sitemap

| Percorso           | Pagina                                            |
| ------------------ | ------------------------------------------------- |
| `/`                | Home — hero, 3 ingressi, rassegna stampa          |
| `/chi-siamo`       | Storia, cosa facciamo, valori                     |
| `/la-spesa`        | Catalogo, slot di ritiro — pagamento in loco      |
| `/eventi`          | Sala Degustazioni e attività — pagamento Stripe   |
| `/rassegna-stampa` | Articoli e servizi                                |
| `/contatti`        | Orari, mappa, form                                |

## Home

La home segue questo ritmo di sezioni, con sfondi alternati (crema → sabbia →
bianco → verde scuro → sabbia → crema) per dare scansione visiva allo scroll:

1. Hero — foto a tutta larghezza con overlay a gradiente, badge ocra, due CTA appaiate
2. Il nostro territorio — testo + immagine
3. Perché sceglierci — quattro card con icone
4. I nostri prodotti — anteprima categorie, link al catalogo
5. Eventi in evidenza — fascia scura, tre card
6. Rassegna stampa in evidenza
7. CTA finale doppia — spesa vs eventi/contatto

Contenuti e immagini stanno in [`src/lib/home-content.ts`](src/lib/home-content.ts).

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

## Palette

Le variabili CSS vivono in [`src/app/globals.css`](src/app/globals.css) e sono
esposte come utility Tailwind (`verde-*`, `terra-*`, `grano`, `crema`,
`pietra-*`, `carbone`) più i token semantici `background`, `surface`,
`foreground`, `primary`, `accent`, `border`.

Il logo non è ancora definito: l'header usa un marchio testuale segnaposto.

## Regole del progetto

- **Nessun segreto nel codice**, nemmeno come fallback. Solo env var, con
  errore esplicito se mancanti.
- `SUPABASE_SERVICE_ROLE_KEY` è **solo server-side**: mai `NEXT_PUBLIC_`, mai
  importata in un Client Component.
- Il pagamento online riguarda **solo gli eventi**. La spesa si paga in loco al
  ritiro.
- I permessi del pannello admin si esprimono con **RLS su Postgres**, non con
  controlli manuali in ogni API route.
