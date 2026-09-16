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
