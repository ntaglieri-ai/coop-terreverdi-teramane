import type { ReactNode } from "react";
import { Container } from "@/components/container";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-surface-muted">
      <Container className="py-16 sm:py-20">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra-600">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-verde-900 sm:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}

/** Segnaposto per le sezioni ancora da implementare. */
export function Placeholder({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-8">
      <h3 className="font-serif text-lg font-semibold text-verde-800">
        {title}
      </h3>
      <div className="mt-3 text-sm leading-relaxed text-foreground-muted">
        {children}
      </div>
    </div>
  );
}
