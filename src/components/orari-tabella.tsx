import { orari } from "@/lib/cooperativa";

export function OrariTabella({ className = "" }: { className?: string }) {
  return (
    <dl className={`flex flex-col ${className}`}>
      {orari.map((riga) => {
        const chiuso = riga.fasce.length === 0;
        return (
          <div
            key={riga.giorno}
            className="flex items-baseline justify-between gap-6 border-b border-border py-3 last:border-b-0"
          >
            <dt className="text-sm font-medium text-carbone">{riga.giorno}</dt>
            <dd
              className={`text-right text-sm ${
                chiuso ? "text-pietra-400" : "text-foreground-muted"
              }`}
            >
              {chiuso ? (
                "Chiuso"
              ) : (
                <span className="flex flex-col sm:flex-row sm:gap-3">
                  {riga.fasce.map((fascia) => (
                    <span key={fascia}>{fascia}</span>
                  ))}
                </span>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
