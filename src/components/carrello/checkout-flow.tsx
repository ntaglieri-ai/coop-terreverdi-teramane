"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
import type { VoceCarrello } from "@/components/carrello/carrello-store";

type Passo =
  | "scelta"
  | "ospite"
  | "accesso"
  | "registrato"
  | "conferma"
  | "errore";

type DatiCliente = {
  nome: string;
  email: string;
  telefono: string;
};

const inputClassi =
  "h-12 rounded-xl border border-border bg-crema px-4 text-sm text-carbone outline-none focus:border-verde-500";
const labelClassi = "text-sm font-medium text-carbone";
const bottonePieno =
  "inline-flex h-13 w-full items-center justify-center rounded-full bg-verde-700 px-6 text-base font-semibold text-white transition-colors hover:bg-verde-800 disabled:opacity-60";
const bottoneOutline =
  "inline-flex h-13 w-full items-center justify-center rounded-full border border-verde-300 px-6 text-base font-semibold text-verde-700 transition-colors hover:border-terra-400 hover:text-terra-600 disabled:opacity-60";

async function inviaPrenotazione(dati: DatiCliente, note: string, voci: VoceCarrello[]) {
  const risposta = await fetch("/api/la-spesa/prenotazioni", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...dati, note, voci }),
  });
  if (!risposta.ok) {
    const corpo = await risposta.json().catch(() => null);
    throw new Error(corpo?.errore ?? "Invio non riuscito.");
  }
}

/**
 * Il layer che compare al checkout: ospite oppure Supabase Auth.
 *
 * Nessuna delle due strade è bloccante di suo — il carrello si riempie senza
 * account, è solo qui, a un passo dalla conferma, che si chiede come
 * ricontattare chi ordina.
 */
export function CheckoutFlow({
  voci,
  totale,
  onCompletato,
  onIndietro,
}: {
  voci: VoceCarrello[];
  totale: number;
  onCompletato: () => void;
  onIndietro: () => void;
}) {
  const [supabase] = useState(() => {
    try {
      return getSupabaseBrowser();
    } catch {
      return null;
    }
  });

  const [passo, setPasso] = useState<Passo>("scelta");
  const [inCorso, setInCorso] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);
  const [utente, setUtente] = useState<User | null>(null);
  const [verificaSessione, setVerificaSessione] = useState(supabase !== null);
  const [datiCliente, setDatiCliente] = useState<DatiCliente>({
    nome: "",
    email: "",
    telefono: "",
  });

  // Se chi ordina ha già una sessione aperta (è tornato sul sito da
  // registrato), il checkout salta la scelta e va dritto al form precompilato.
  useEffect(() => {
    if (!supabase) return;
    let attivo = true;
    supabase.auth.getUser().then(async ({ data }) => {
      if (!attivo) return;
      if (data.user) {
        setUtente(data.user);
        await caricaCliente(data.user);
        if (attivo) setPasso("registrato");
      }
      setVerificaSessione(false);
    });
    return () => {
      attivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function caricaCliente(user: User) {
    if (!supabase) return;
    const { data } = await supabase
      .from("clienti")
      .select("nome, email, telefono")
      .eq("id", user.id)
      .maybeSingle();

    setDatiCliente({
      nome: data?.nome ?? "",
      email: data?.email ?? user.email ?? "",
      telefono: data?.telefono ?? "",
    });

    if (!data) {
      // Prima volta di questo cliente: la riga nasce vuota, il form la completa.
      await supabase
        .from("clienti")
        .upsert({ id: user.id, email: user.email ?? null });
    }
  }

  async function accediORegistrati(
    evento: FormEvent<HTMLFormElement>,
    modalita: "accedi" | "registrati",
  ) {
    evento.preventDefault();
    if (!supabase) return;
    setErrore(null);
    setInCorso(true);

    const form = new FormData(evento.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    try {
      const { data, error } =
        modalita === "accedi"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });

      if (error) {
        setErrore(
          modalita === "accedi"
            ? "Email o password non corretti."
            : "Non è stato possibile creare l'account: riprova.",
        );
        return;
      }

      if (!data.session || !data.user) {
        // signUp con conferma email attiva: nessuna sessione finché non conferma.
        setErrore(
          "Controlla la tua email per confermare l'account, poi torna qui e accedi.",
        );
        return;
      }

      setUtente(data.user);
      await caricaCliente(data.user);
      setPasso("registrato");
    } catch {
      setErrore("Accesso non disponibile al momento.");
    } finally {
      setInCorso(false);
    }
  }

  async function confermaOspite(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrore(null);
    setInCorso(true);
    const form = new FormData(evento.currentTarget);
    const dati: DatiCliente = {
      nome: String(form.get("nome") ?? ""),
      email: String(form.get("email") ?? ""),
      telefono: String(form.get("telefono") ?? ""),
    };
    const note = String(form.get("note") ?? "");

    try {
      await inviaPrenotazione(dati, note, voci);
      setPasso("conferma");
    } catch (e) {
      setErrore(e instanceof Error ? e.message : "Invio non riuscito.");
    } finally {
      setInCorso(false);
    }
  }

  async function confermaRegistrato(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrore(null);
    setInCorso(true);
    const form = new FormData(evento.currentTarget);
    const dati: DatiCliente = {
      nome: String(form.get("nome") ?? ""),
      email: String(form.get("email") ?? ""),
      telefono: String(form.get("telefono") ?? ""),
    };
    const note = String(form.get("note") ?? "");

    try {
      if (supabase && utente) {
        await supabase.from("clienti").update(dati).eq("id", utente.id);
      }
      await inviaPrenotazione(dati, note, voci);
      setPasso("conferma");
    } catch (e) {
      setErrore(e instanceof Error ? e.message : "Invio non riuscito.");
    } finally {
      setInCorso(false);
    }
  }

  if (verificaSessione) {
    return (
      <p className="py-8 text-center text-sm text-foreground-muted">
        Verifica in corso…
      </p>
    );
  }

  if (passo === "conferma") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <h3 className="font-serif text-xl font-semibold text-verde-800">
          Prenotazione inviata
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-foreground-muted">
          Ti confermiamo noi appena è pronta, al recapito che ci hai lasciato.
          Il pagamento avviene in negozio al momento del ritiro.
        </p>
        <button
          type="button"
          onClick={onCompletato}
          className={`${bottonePieno} mt-3 max-w-xs`}
        >
          Fatto
        </button>
      </div>
    );
  }

  if (passo === "scelta") {
    return (
      <div className="flex flex-col gap-4 py-2">
        <p className="text-sm leading-relaxed text-foreground-muted">
          Totale {totale.toFixed(2)} € — come vuoi procedere?
        </p>
        <button
          type="button"
          onClick={() => setPasso("ospite")}
          className={bottonePieno}
        >
          Continua come ospite
        </button>
        {supabase ? (
          <button
            type="button"
            onClick={() => setPasso("accesso")}
            className={bottoneOutline}
          >
            Accedi o registrati
          </button>
        ) : null}
        <button
          type="button"
          onClick={onIndietro}
          className="text-sm font-semibold text-verde-700 hover:text-terra-600"
        >
          ← Torna al carrello
        </button>
      </div>
    );
  }

  if (passo === "accesso") {
    return (
      <div className="flex flex-col gap-5 py-2">
        <AccessoForm onSubmit={accediORegistrati} inCorso={inCorso} errore={errore} />
        <button
          type="button"
          onClick={() => {
            setErrore(null);
            setPasso("scelta");
          }}
          className="text-sm font-semibold text-verde-700 hover:text-terra-600"
        >
          ← Indietro
        </button>
      </div>
    );
  }

  const formAttivo = passo === "ospite" ? confermaOspite : confermaRegistrato;

  return (
    <form onSubmit={formAttivo} className="flex flex-col gap-4 py-2">
      <p className="text-sm leading-relaxed text-foreground-muted">
        Totale {totale.toFixed(2)} €. Lasciaci un recapito: ti confermiamo noi
        quando la spesa è pronta al ritiro.
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor="nome" className={labelClassi}>
          Nome e cognome
        </label>
        <input
          id="nome"
          name="nome"
          required
          defaultValue={passo === "registrato" ? datiCliente.nome : undefined}
          className={inputClassi}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClassi}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={passo === "registrato" ? datiCliente.email : undefined}
          className={inputClassi}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="telefono" className={labelClassi}>
          Telefono
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          required
          defaultValue={passo === "registrato" ? datiCliente.telefono : undefined}
          className={inputClassi}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="note" className={labelClassi}>
          Note (facoltative)
        </label>
        <textarea
          id="note"
          name="note"
          rows={2}
          className="rounded-xl border border-border bg-crema px-4 py-3 text-sm text-carbone outline-none focus:border-verde-500"
        />
      </div>

      {errore ? (
        <p role="alert" className="text-sm text-terra-600">
          {errore}
        </p>
      ) : null}

      <button type="submit" disabled={inCorso} className={bottonePieno}>
        {inCorso ? "Invio in corso…" : "Conferma prenotazione"}
      </button>
      <button
        type="button"
        onClick={() => setPasso("scelta")}
        className="text-sm font-semibold text-verde-700 hover:text-terra-600"
      >
        ← Indietro
      </button>
    </form>
  );
}

function AccessoForm({
  onSubmit,
  inCorso,
  errore,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>, modalita: "accedi" | "registrati") => void;
  inCorso: boolean;
  errore: string | null;
}) {
  const [modalita, setModalita] = useState<"accedi" | "registrati">("accedi");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 rounded-full border border-border p-1">
        {(["accedi", "registrati"] as const).map((voce) => (
          <button
            key={voce}
            type="button"
            onClick={() => setModalita(voce)}
            className={`h-9 flex-1 rounded-full text-sm font-semibold transition-colors ${
              modalita === voce
                ? "bg-verde-700 text-white"
                : "text-verde-700 hover:bg-verde-100"
            }`}
          >
            {voce === "accedi" ? "Accedi" : "Registrati"}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => onSubmit(e, modalita)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="auth-email" className={labelClassi}>
            Email
          </label>
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClassi}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="auth-password" className={labelClassi}>
            Password
          </label>
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete={
              modalita === "accedi" ? "current-password" : "new-password"
            }
            required
            minLength={6}
            className={inputClassi}
          />
        </div>

        {errore ? (
          <p role="alert" className="text-sm text-terra-600">
            {errore}
          </p>
        ) : null}

        <button type="submit" disabled={inCorso} className={bottonePieno}>
          {inCorso
            ? "Un attimo…"
            : modalita === "accedi"
              ? "Accedi"
              : "Crea account"}
        </button>
      </form>
    </div>
  );
}
