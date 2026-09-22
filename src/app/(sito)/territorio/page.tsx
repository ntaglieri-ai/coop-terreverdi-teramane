import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { cooperativa } from "@/lib/cooperativa";
import { territorioImage } from "@/lib/home-content";
import { calendarioStagionale, comuniPosizione } from "@/lib/territorio-content";

export const metadata: Metadata = {
  title: "Territorio",
  description:
    "Le colline teramane fra Mosciano Sant'Angelo, Notaresco, Controguerra, Castellalto e Bellante: da dove viene tutto quello che trovi al banco, mese per mese.",
};

export default function TerritorioPage() {
  return (
    <>
      <PageHero
        eyebrow="Territorio"
        title="Dalle colline teramane al mare"
        lead="Poche decine di chilometri in cui il terreno cambia carattere salendo dalla costa verso l'interno. È da qui che viene tutto quello che trovi al banco."
      />

      <section className="bg-crema py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
                Una zona che non permette monocolture
              </h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-foreground-muted">
                <p>
                  Le nostre campagne stanno fra Mosciano Sant&apos;Angelo,
                  Notaresco, Controguerra, Castellalto e Bellante, nell&apos;area
                  del GAL Terreverdi Teramane. Salendo dalla costa verso il Gran
                  Sasso il terreno cambia in pochi chilometri: cambia
                  l&apos;esposizione, cambia l&apos;acqua, cambia quello che
                  conviene piantare.
                </p>
                <p>
                  Per questo ogni appezzamento chiede la sua coltura e il suo
                  tempo, e per questo le sei aziende socie fanno mestieri
                  diversi invece di rincorrere lo stesso prodotto. Dal{" "}
                  {cooperativa.annoFondazione} mettiamo in comune il raccolto e
                  un unico punto vendita.
                </p>
                <p>
                  Coltiviamo in rotazione, raccogliamo quando il prodotto è
                  pronto e non prima, e teniamo traccia di ogni lotto: campo,
                  comune, data di raccolta.
                </p>
              </div>
              <Link
                href="/chi-siamo"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-verde-700 transition-colors hover:text-terra-600"
              >
                Le sei aziende socie
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-verde-900/10">
              <Image
                src={territorioImage.src}
                alt={territorioImage.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------
          Calendario di stagionalità: cosa trovi al banco mese per mese.
          ------------------------------------------------------------------ */}
      <section className="bg-crema py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
            Calendario di stagionalità
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
            Il banco cambia con i campi
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground-muted">
            Ogni mese porta un raccolto diverso: questo calendario è
            indicativo, costruito sulla stagionalità tipica di orti, uliveti e
            vigneti del centro Italia, e va preso come punto di partenza più
            che come garanzia. Per i prodotti che maturano nei campi puoi
            saltare la fila: se sono segnati come{" "}
            <Link
              href="/la-spesa"
              className="font-semibold text-verde-700 underline decoration-verde-300 underline-offset-2 hover:text-terra-600"
            >
              prenotabili
            </Link>{" "}
            li metti da parte in anticipo e li ritiri quando sono pronti.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {calendarioStagionale.map((mese) => (
              <li
                key={mese.mese}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <h3 className="font-serif text-base font-semibold text-verde-800">
                  {mese.mese}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {mese.prodotti.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------------
          I cinque comuni: rappresentazione spaziale costa → colline.
          ------------------------------------------------------------------ */}
      <section className="bg-surface py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
            I cinque comuni
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-verde-900 sm:text-4xl">
            Dalla costa alle colline, in pochi chilometri
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground-muted">
            Le sei aziende socie stanno in cinque comuni diversi, disposti
            lungo la stessa direttrice della cooperativa: dal mare verso
            l&apos;entroterra. La mappa qui sotto è schematica, non in scala.
          </p>

          <div className="mt-12 overflow-x-auto">
            <svg
              viewBox="0 0 900 200"
              role="img"
              aria-label="Mappa schematica dei cinque comuni delle aziende socie, disposti dalla costa verso l'entroterra"
              className="mx-auto w-full min-w-[640px] max-w-4xl"
            >
              <text
                x="30"
                y="30"
                className="fill-terra-600 text-xs font-semibold uppercase"
                style={{ letterSpacing: "0.1em" }}
              >
                Mare Adriatico
              </text>
              <text
                x="870"
                y="30"
                textAnchor="end"
                className="fill-verde-800 text-xs font-semibold uppercase"
                style={{ letterSpacing: "0.1em" }}
              >
                Verso il Gran Sasso
              </text>

              <line
                x1="110"
                y1="90"
                x2="790"
                y2="90"
                className="stroke-verde-200"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {comuniPosizione.map((comune) => {
                const x =
                  110 +
                  (comune.ordine - 1) *
                    ((790 - 110) / (comuniPosizione.length - 1));
                const righe = comune.comune.includes("Sant'Angelo")
                  ? ["Mosciano", "Sant'Angelo"]
                  : [comune.comune];

                return (
                  <g key={comune.comune}>
                    <circle
                      cx={x}
                      cy="90"
                      r="12"
                      className="fill-terra-500 stroke-crema"
                      strokeWidth="3"
                    />
                    <text
                      x={x}
                      y="94"
                      textAnchor="middle"
                      className="fill-white text-[11px] font-semibold"
                    >
                      {comune.ordine}
                    </text>
                    <text
                      x={x}
                      y="130"
                      textAnchor="middle"
                      className="fill-verde-900 font-serif text-sm font-semibold"
                    >
                      {righe.map((riga, i) => (
                        <tspan key={riga} x={x} dy={i === 0 ? 0 : 16}>
                          {riga}
                        </tspan>
                      ))}
                    </text>
                    <text
                      x={x}
                      y={righe.length > 1 ? 168 : 152}
                      textAnchor="middle"
                      className="fill-foreground-muted text-xs"
                    >
                      {comune.fascia}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {comuniPosizione
              .slice()
              .sort((a, b) => a.ordine - b.ordine)
              .map((comune) => (
                <li
                  key={comune.comune}
                  className="rounded-2xl border border-border p-5"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-terra-600">
                    {comune.fascia}
                  </span>
                  <h3 className="mt-2 font-serif text-base font-semibold text-verde-800">
                    {comune.comune}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {comune.attivita}
                    {comune.produzione ? ` · ${comune.produzione}` : ""}
                  </p>
                </li>
              ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
