"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

type Stato = "verifica" | "pronto" | "link-non-valido" | "salvata";

/**
 * Landing del link di recupero password (vedi `resetPasswordForEmail` in
 * `form-accesso.tsx`). Supabase mette il token di recupero nell'URL e il
 * client lo consuma da solo aprendo una sessione temporanea, segnalata con
 * l'evento `PASSWORD_RECOVERY` — non arriva nulla da leggere prima di allora,
 * quindi si parte in stato "verifica" e si aspetta quell'evento (o una
 * sessione già pronta) prima di mostrare il form.
 */
export function NuovaPasswordForm() {
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

  const [stato, setStato] = useState<Stato>(
    config.supabase ? "verifica" : "link-non-valido",
  );
  const [inCorso, setInCorso] = useState(false);
  const [errore, setErrore] = useState<string | null>(config.erroreIniziale);

  useEffect(() => {
    const supabase = config.supabase;
    if (!supabase) return;

    let attivo = true;

    const { data: sub } = supabase.auth.onAuthStateChange((evento) => {
      if (!attivo) return;
      if (evento === "PASSWORD_RECOVERY") setStato("pronto");
    });

    // Copre il caso in cui l'evento sia già passato prima di questa
    // sottoscrizione (es. render lento): se una sessione risulta comunque
    // aperta, il link era valido.
    supabase.auth.getSession().then(({ data }) => {
      if (!attivo) return;
      if (data.session) setStato("pronto");
    });

    // Se dopo qualche secondo non è arrivato né l'evento né una sessione,
    // il link è scaduto, già usato, o non è un link di recupero valido.
    const timeout = setTimeout(() => {
      if (!attivo) return;
      setStato((stato) => (stato === "verifica" ? "link-non-valido" : stato));
    }, 4000);

    return () => {
      attivo = false;
      clearTimeout(timeout);
      sub.subscription.unsubscribe();
    };
  }, [config.supabase]);

  async function salvaPassword(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrore(null);

    const form = new FormData(evento.currentTarget);
    const password = String(form.get("password") ?? "");
    const conferma = String(form.get("conferma") ?? "");

    if (password.length < 6) {
      setErrore("La password deve avere almeno 6 caratteri.");
      return;
    }
    if (password !== conferma) {
      setErrore("Le due password non coincidono.");
      return;
    }

    if (!config.supabase) {
      setErrore("Salvataggio non disponibile: configurazione mancante.");
      return;
    }

    setInCorso(true);
    try {
      const { error } = await config.supabase.auth.updateUser({ password });
      if (error) {
        setErrore("Non è stato possibile salvare la nuova password.");
      } else {
        setStato("salvata");
      }
    } catch {
      setErrore("Non è stato possibile salvare la nuova password.");
    } finally {
      setInCorso(false);
    }
  }

  if (stato === "verifica") {
    return (
      <p className="mx-auto max-w-md text-sm text-foreground-muted">
        Verifica del link in corso…
      </p>
    );
  }

  if (stato === "link-non-valido") {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-serif text-xl font-semibold text-verde-800">
          Link non valido
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          {errore ??
            "Questo link di recupero non è più valido: potrebbe essere scaduto o già usato. Richiedine uno nuovo dalla pagina di accesso."}
        </p>
        <Link
          href="/area-riservata"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-verde-700 hover:text-terra-600"
        >
          <span aria-hidden="true">←</span> Torna all&apos;accesso
        </Link>
      </div>
    );
  }

  if (stato === "salvata") {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-serif text-xl font-semibold text-verde-800">
          Password aggiornata
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          La nuova password è attiva. Da qui puoi entrare nell&apos;area
          riservata.
        </p>
        <Link
          href="/area-riservata"
          className="mt-6 inline-flex h-13 items-center justify-center rounded-full bg-verde-700 px-6 text-base font-semibold text-white transition-colors hover:bg-verde-800"
        >
          Vai all&apos;area riservata
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={salvaPassword}
      className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-8"
    >
      <h2 className="font-serif text-xl font-semibold text-verde-800">
        Scegli una nuova password
      </h2>

      <div className="mt-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-carbone">
            Nuova password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            className="h-12 rounded-xl border border-border bg-crema px-4 text-sm text-carbone outline-none focus:border-verde-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="conferma" className="text-sm font-medium text-carbone">
            Conferma password
          </label>
          <input
            id="conferma"
            name="conferma"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            className="h-12 rounded-xl border border-border bg-crema px-4 text-sm text-carbone outline-none focus:border-verde-500"
          />
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
          {inCorso ? "Salvataggio…" : "Salva nuova password"}
        </button>
      </div>
    </form>
  );
}
