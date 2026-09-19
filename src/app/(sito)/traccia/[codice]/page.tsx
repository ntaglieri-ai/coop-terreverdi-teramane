import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { codiceLottoValido, lottiDemo, trovaLotto } from "@/lib/lotti";
import { cooperativa } from "@/lib/cooperativa";

type Props = { params: Promise<{ codice: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { codice } = await params;
  const lotto = trovaLotto(decodeURIComponent(codice));
  return {
    title: lotto ? `Lotto ${lotto.codice}` : "Lotto non trovato",
    description: lotto
      ? `${lotto.prodotto} della ${cooperativa.nome}: raccolto a ${lotto.comune}, campo ${lotto.campo}.`
      : "Il codice di lotto cercato non risulta fra quelli della cooperativa.",
    robots: { index: false, follow: false },
  };
}

/** TODO DATI — finché non c'è Supabase, i lotti noti sono quelli di esempio. */
export function generateStaticParams() {
  return lottiDemo.map((lotto) => ({ codice: lotto.codice }));
}

function Riga({ etichetta, valore }: { etichetta: string; valore: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border py-4 last:border-b-0">
      <dt className="text-sm text-pietra-600">{etichetta}</dt>
      <dd className="text-right font-medium text-carbone">{valore}</dd>
    </div>
  );
}

export default async function TracciaPage({ params }: Props) {
  const { codice } = await params;
  const cercato = decodeURIComponent(codice).trim().toUpperCase();
  const lotto = trovaLotto(cercato);

  if (!lotto) {
    return (
      <>
        <PageHero
          eyebrow="Tracciabilità"
          title="Lotto non trovato"
          lead={
            codiceLottoValido(cercato)
              ? `Il codice ${cercato} ha il formato giusto ma non risulta fra i nostri lotti.`
              : `"${cercato}" non è un codice di lotto valido.`
          }
        />
        <Container className="py-16">
          <Link
            href="/la-spesa"
            className="inline-flex h-13 items-center justify-center rounded-full bg-verde-700 px-7 text-base font-semibold text-white transition-colors hover:bg-verde-800"
          >
            Vai al catalogo
          </Link>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Tracciabilità"
        title={lotto.prodotto}
        lead={`Lotto ${lotto.codice} — da dove viene e quando è stato raccolto.`}
      />

      <Container className="py-16">
        <div className="mx-auto max-w-xl">
          <p className="mb-6 rounded-xl bg-grano px-4 py-3 text-xs text-terra-700">
            Dati di esempio: la tracciabilità non è ancora collegata al
            database.
          </p>

          <dl className="rounded-2xl border border-border bg-surface px-7 py-2">
            <Riga etichetta="Codice lotto" valore={lotto.codice} />
            <Riga etichetta="Prodotto" valore={lotto.prodotto} />
            <Riga etichetta="Filiera" valore={lotto.filiera} />
            <Riga etichetta="Azienda socia" valore={lotto.azienda} />
            <Riga etichetta="Campo" valore={lotto.campo} />
            <Riga etichetta="Comune" valore={lotto.comune} />
            <Riga
              etichetta="Data di raccolta"
              valore={new Date(lotto.dataRaccolta).toLocaleDateString("it-IT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            />
          </dl>

          <p className="mt-6 text-sm leading-relaxed text-foreground-muted">
            Ogni partita che passa dal {cooperativa.nomeBreve} ha un codice come
            questo: serve a risalire all&apos;azienda socia, al campo e al
            giorno in cui il prodotto è stato raccolto o lavorato.
          </p>
        </div>
      </Container>
    </>
  );
}
