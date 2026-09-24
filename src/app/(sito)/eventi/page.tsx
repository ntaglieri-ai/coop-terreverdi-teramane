import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import {
  IconaCalendario,
  IconaOrologio,
  IconaPersone,
} from "@/components/icone-interfaccia";
import {
  eventiHeroImage,
  formattaDataEvento,
  formattaDurata,
  getEventiAttivi,
  ultimiPosti,
  type EventoPubblico,
} from "@/lib/eventi";
import eventiHeroFoto from "../../../../public/hero-eventi-degustazione.webp";

export const metadata: Metadata = {
  title: "Eventi & Degustazioni",
  description:
    "Degustazioni nella Sala Degustazioni e visite nelle aziende socie della Cooperativa Agricola Terre Verdi Teramane. Posti limitati, prenotazione e pagamento online.",
};

/** Come per il catalogo: mai prerenderizzata, sennò gli eventi pubblicati
 * dall'area riservata si vedrebbero solo al prossimo deploy. */
export const dynamic = "force-dynamic";

function CardEvento({ evento }: { evento: EventoPubblico }) {
  const esaurito = evento.postiDisponibili <= 0;

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-sabbia">
        {evento.immagine ? (
          // eslint-disable-next-line @next/next/no-img-element -- host dinamico (Supabase Storage), non noto a build time
          <img
            src={evento.immagine}
            alt={evento.titolo}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-3xl font-semibold text-verde-300">
            {evento.titolo.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-verde-100 px-3 py-1 text-xs font-semibold text-verde-800">
            Pagamento online richiesto
          </span>
          {esaurito ? (
            <span className="inline-flex items-center rounded-full bg-pietra-200 px-3 py-1 text-xs font-semibold text-pietra-600">
              Esaurito
            </span>
          ) : ultimiPosti(evento) ? (
            <span className="inline-flex items-center rounded-full bg-terra-500 px-3 py-1 text-xs font-semibold text-white">
              Ultimi posti
            </span>
          ) : null}
        </div>

        <h2 className="mt-4 font-serif text-xl font-semibold text-verde-900">
          {evento.titolo}
        </h2>
        {evento.descrizione ? (
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            {evento.descrizione}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground-muted">
          <span className="inline-flex items-center gap-1.5">
            <IconaCalendario className="h-4 w-4 text-terra-600" />
            {formattaDataEvento(evento)}
          </span>
          {evento.durataMinuti ? (
            <span className="inline-flex items-center gap-1.5">
              <IconaOrologio className="h-4 w-4 text-terra-600" />
              {formattaDurata(evento.durataMinuti)}
            </span>
          ) : null}
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-sm text-foreground-muted">
          <span className="inline-flex items-center gap-1.5">
            <IconaPersone className="h-4 w-4 text-terra-600" />
            Posti disponibili: {evento.postiDisponibili}
          </span>
          {evento.prezzo != null ? (
            <span className="text-base font-semibold text-verde-900">
              {evento.prezzo.toFixed(2)} €{" "}
              <span className="text-sm font-normal text-foreground-muted">
                a persona
              </span>
            </span>
          ) : null}
        </div>

        {esaurito ? (
          <span className="mt-6 inline-flex h-13 w-full items-center justify-center rounded-full bg-pietra-200 px-6 text-base font-semibold text-pietra-600">
            Posti esauriti
          </span>
        ) : (
          <Link
            href="/contatti"
            className="mt-6 inline-flex h-13 w-full items-center justify-center rounded-full bg-verde-700 px-6 text-base font-semibold text-white transition-colors hover:bg-verde-800"
          >
            Prenota il posto
          </Link>
        )}
      </div>
    </article>
  );
}

export default async function EventiPage() {
  const eventi = await getEventiAttivi();

  return (
    <>
      <section className="relative isolate overflow-hidden">
        {/* Altezza a `clamp()`, non un pixel fisso per breakpoint: su schermi
            molto larghi (desktop grandi, ultrawide) un valore fisso lascia
            l'hero larghissima e bassa, "a striscia" — qui cresce con la
            larghezza fino a un tetto, così l'inquadratura resta proporzionata
            invece di schiacciarsi.
            Più alta delle altre due hero (base e tetto più alti): la foto è
            un primo piano di bicchieri, con un taglio basso il vetro in
            primo piano riempie quasi tutta l'inquadratura — serve più
            respiro verticale per non sembrare uno zoom esagerato. */}
        <div className="relative h-[clamp(360px,36vw,680px)] w-full">
          {/* unoptimized: vedi lo stesso commento in Hero (home) — file già
              pre-compresso in WebP, servito come asset statico invece che
              dall'ottimizzatore on-demand di Vercel. */}
          <Image
            src={eventiHeroFoto}
            alt={eventiHeroImage.alt}
            fill
            priority
            placeholder="blur"
            unoptimized
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-carbone/95 via-carbone/60 to-carbone/20"
          />
        </div>

        <Container className="absolute inset-x-0 bottom-0 pb-6 sm:pb-8 lg:pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-200 lg:text-sm">
            Sala Degustazioni
          </p>
          <h1 className="mt-2 max-w-2xl font-serif text-3xl font-semibold leading-tight text-white drop-shadow sm:text-4xl lg:max-w-3xl lg:text-5xl 2xl:text-6xl">
            Eventi &amp; degustazioni
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90 drop-shadow sm:text-base lg:max-w-2xl lg:text-lg">
            Serate piccole, i produttori seduti al tavolo con te. I posti si
            prenotano e si pagano online.
          </p>
        </Container>
      </section>

      <Container className="py-16">
        {eventi.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border-strong bg-surface px-6 py-16 text-center">
            <p className="font-serif text-lg font-semibold text-verde-800">
              Nessun evento in programma al momento
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-foreground-muted">
              Il calendario si aggiorna con le stagioni delle aziende socie:
              torna a trovarci a breve.
            </p>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {eventi.map((evento) => (
              <li key={evento.id}>
                <CardEvento evento={evento} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
