"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

/**
 * Login operatori su Supabase Auth.
 *
 * I permessi non si controllano qui: stanno nelle policy RLS su Postgres
 * (vedi supabase/schema.sql). Questo form apre solo la sessione; sarà il
 * pannello a leggere e scrivere, e il database a decidere cosa può vedere chi.
 *
 * `onAccesso` scatta appena c'è una sessione valida — sia da un login appena
 * fatto sia da una sessione già aperta trovata al caricamento — e serve a chi
 * usa il form per decidere dove mandare l'operatore dopo (vedi
 * `scelta-gestione.tsx`). Nessun utente Supabase è stato creato: si fa quando
 * il pannello è pronto da testare.
 */
export function FormAccesso({
  onAccesso,
}: {
  onAccesso?: (utente: User) => void;
}) {
  // Il client si costruisce una volta sola, in inizializzazione pigra: se la
  // configurazione manca vogliamo saperlo subito, senza effetti che
  // impostano stato in modo sincrono.
  const [config] = useState(() => {
    try {
      return { supabase: getSupabaseBrowser(), erroreIniziale: null as string | null };
    } catch (e) {
      return {
        supabase: null,
        erroreIniziale:
          e instanceof Error ? e.message : "Configurazione non valida.",
      };
    }
  });

  const [utente, setUtente] = useState<User | null>(null);
  const [caricamento, setCaricamento] = useState(config.supabase !== null);
  const [inCorso, setInCorso] = useState(false);
  const [errore, setErrore] = useState<string | null>(config.erroreIniziale);

  const [recuperoAttivo, setRecuperoAttivo] = useState(false);
  const [recuperoInCorso, setRecuperoInCorso] = useState(false);
  const [recuperoErrore, setRecuperoErrore] = useState<string | null>(null);
  const [recuperoInviato, setRecuperoInviato] = useState(false);

  useEffect(() => {
    const supabase = config.supabase;
    if (!supabase) return;

    let attivo = true;

    // setState arriva dalla promise e dalla callback: mai sincrono nel corpo
    // dell'effetto.
    supabase.auth.getUser().then(({ data }) => {
      if (!attivo) return;
      setUtente(data.user ?? null);
      setCaricamento(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evento, sessione) => {
      setUtente(sessione?.user ?? null);
    });

    return () => {
      attivo = false;
      sub.subscription.unsubscribe();
    };
  }, [config.supabase]);

  useEffect(() => {
    if (utente) onAccesso?.(utente);
    // onAccesso volutamente fuori dalle dipendenze: è una callback che il
    // chiamante può ridefinire a ogni render, qui deve scattare solo quando
    // cambia lo stato di autenticazione, non quando cambia la funzione.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utente]);

  async function accedi(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrore(null);
    setInCorso(true);

    const form = new FormData(evento.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    if (!config.supabase) {
      setErrore("Accesso non disponibile: configurazione mancante.");
      setInCorso(false);
      return;
    }

    try {
      const { error } = await config.supabase.auth.signInWithPassword({
        email,
        password,
      });
      // Messaggio volutamente generico: non diciamo se è l'email o la
      // password a non tornare.
      if (error) setErrore("Email o password non corretti.");
    } catch {
      setErrore("Accesso non disponibile: configurazione mancante.");
    } finally {
      setInCorso(false);
    }
  }

  async function recuperaPassword(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setRecuperoErrore(null);
    setRecuperoInCorso(true);

    const form = new FormData(evento.currentTarget);
    const email = String(form.get("email") ?? "");

    if (!config.supabase) {
      setRecuperoErrore("Recupero non disponibile: configurazione mancante.");
      setRecuperoInCorso(false);
      return;
    }

    try {
      // Supabase risponde comunque con successo se l'email non è registrata
      // (non vuole confermare o smentire quali indirizzi esistono): l'errore
      // qui segnala solo un problema tecnico reale (rete, configurazione),
      // non l'assenza dell'account.
      const { error } = await config.supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/area-riservata/nuova-password`,
        },
      );
      if (error) {
        setRecuperoErrore("Non è stato possibile inviare l'email di recupero.");
      } else {
        setRecuperoInviato(true);
      }
    } catch {
      setRecuperoErrore("Non è stato possibile inviare l'email di recupero.");
    } finally {
      setRecuperoInCorso(false);
    }
  }

  async function esci() {
    try {
      await config.supabase?.auth.signOut();
    } catch {
      setErrore("Non è stato possibile chiudere la sessione.");
    }
  }

  if (caricamento) {
    return (
      <p className="mx-auto max-w-md text-sm text-foreground-muted">
        Verifica della sessione…
      </p>
    );
  }

  if (recuperoAttivo) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-serif text-xl font-semibold text-verde-800">
          Rinnova password
        </h2>

        {recuperoInviato ? (
          <>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Se l&apos;indirizzo è registrato, arriverà a breve un&apos;email
              con il link per scegliere una nuova password.
            </p>
            <button
              type="button"
              onClick={() => {
                setRecuperoAttivo(false);
                setRecuperoInviato(false);
              }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-verde-700 hover:text-terra-600"
            >
              <span aria-hidden="true">←</span> Torna al login
            </button>
          </>
        ) : (
          <form onSubmit={recuperaPassword} className="mt-3">
            <p className="text-sm leading-relaxed text-foreground-muted">
              Inserisci l&apos;email con cui accedi: ti mandiamo un link per
              impostare una nuova password.
            </p>

            <div className="mt-5 flex flex-col gap-2">
              <label
                htmlFor="email-recupero"
                className="text-sm font-medium text-carbone"
              >
                Email
              </label>
              <input
                id="email-recupero"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="h-12 rounded-xl border border-border bg-crema px-4 text-sm text-carbone outline-none focus:border-verde-500"
              />
            </div>

            {recuperoErrore ? (
              <p role="alert" className="mt-4 text-sm text-terra-600">
                {recuperoErrore}
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
              <button
                type="submit"
                disabled={recuperoInCorso}
                className="inline-flex h-13 items-center justify-center rounded-full bg-verde-700 px-6 text-base font-semibold text-white transition-colors hover:bg-verde-800 disabled:opacity-60"
              >
                {recuperoInCorso ? "Invio in corso…" : "Invia link di recupero"}
              </button>
              <button
                type="button"
                onClick={() => setRecuperoAttivo(false)}
                className="inline-flex h-13 items-center justify-center rounded-full border border-verde-300 px-6 text-sm font-semibold text-verde-700 transition-colors hover:border-terra-400 hover:text-terra-600"
              >
                Torna al login
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  if (utente) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-serif text-xl font-semibold text-verde-800">
          Sei dentro
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          Accesso effettuato come{" "}
          <span className="font-medium text-carbone">{utente.email}</span>. Il
          pannello di gestione è in costruzione: catalogo, prenotazioni ed
          eventi arriveranno qui.
        </p>
        <button
          type="button"
          onClick={esci}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full border border-verde-300 px-6 text-sm font-semibold text-verde-700 transition-colors hover:border-terra-400 hover:text-terra-600"
        >
          Esci
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={accedi}
      className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-8"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-carbone"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="h-12 rounded-xl border border-border bg-crema px-4 text-sm text-carbone outline-none focus:border-verde-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-carbone"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="h-12 rounded-xl border border-border bg-crema px-4 text-sm text-carbone outline-none focus:border-verde-500"
          />
          <button
            type="button"
            onClick={() => setRecuperoAttivo(true)}
            className="self-end text-xs font-semibold text-verde-700 hover:text-terra-600"
          >
            Password dimenticata?
          </button>
        </div>

        {errore ? (
          <p role="alert" className="text-sm text-terra-600">
            {errore}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={inCorso}
          className="inline-flex h-13 items-center justify-center rounded-full bg-verde-700 px-6 text-base font-semibold text-white transition-colors hover:bg-verde-800 disabled:opacity-60"
        >
          {inCorso ? "Accesso in corso…" : "Accedi"}
        </button>

        <p className="text-xs leading-relaxed text-pietra-400">
          Gli accessi vengono creati dalla cooperativa. Se non riesci a entrare,
          scrivi a chi gestisce il sito.
        </p>
      </div>
    </form>
  );
}
