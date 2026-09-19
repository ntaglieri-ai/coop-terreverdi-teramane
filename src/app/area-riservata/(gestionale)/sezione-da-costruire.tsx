import type { ReactNode } from "react";

/** Blocco segnaposto delle sezioni del gestionale ancora da implementare. */
export function DaCostruire({
  titolo,
  children,
}: {
  titolo: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-7">
      <h2 className="font-serif text-lg font-semibold text-verde-800">
        {titolo}
      </h2>
      <div className="mt-3 text-sm leading-relaxed text-foreground-muted">
        {children}
      </div>
    </div>
  );
}

export function TitoloSezione({
  titolo,
  sottotitolo,
}: {
  titolo: string;
  sottotitolo: string;
}) {
  return (
    <header className="mb-8">
      <h1 className="font-serif text-3xl font-semibold text-verde-900">
        {titolo}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
        {sottotitolo}
      </p>
    </header>
  );
}
