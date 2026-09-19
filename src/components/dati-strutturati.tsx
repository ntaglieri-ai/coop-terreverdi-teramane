import {
  cooperativa,
  indirizzoCompleto,
  orari,
  puntoVendita,
} from "@/lib/cooperativa";

/**
 * Schema.org per la cooperativa e il suo punto vendita.
 *
 * Serve soprattutto alle risposte generative su orari, indirizzo e cosa si
 * vende: sono le domande che un'attivita' locale riceve di piu', ed e' il
 * posto dove avere dati espliciti conta piu' della struttura degli URL.
 *
 * TODO — mettere il dominio reale in `SITO` e aggiungere `sameAs` con i
 * profili social appena il cliente li conferma.
 */
const SITO = "https://terreverditeramane.it";

export function DatiStrutturati() {
  const aperture = orari
    .filter((giorno) => giorno.fasce.length > 0)
    .flatMap((giorno) =>
      giorno.fasce.map((fascia) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${giorno.schema}`,
        opens: fascia.apre,
        closes: fascia.chiude,
      })),
    );

  const indirizzo = {
    "@type": "PostalAddress",
    streetAddress: puntoVendita.via,
    postalCode: puntoVendita.cap,
    addressLocality: puntoVendita.comune,
    addressRegion: puntoVendita.provincia,
    addressCountry: "IT",
  };

  const grafo = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITO}/#cooperativa`,
        name: cooperativa.nome,
        alternateName: cooperativa.nomeBreve,
        url: SITO,
        foundingDate: String(cooperativa.annoFondazione),
        description: `Cooperativa agricola che riunisce ${cooperativa.numeroAziende} aziende del teramano: ortaggi e legumi, formaggi, vino, olio extravergine, pane a lievito madre e salumi.`,
        address: indirizzo,
        telephone: puntoVendita.telefonoHref,
      },
      {
        "@type": "GroceryStore",
        "@id": `${SITO}/#mercato-contadino`,
        name: puntoVendita.nome,
        description: `Punto vendita della ${cooperativa.nome}: prodotti delle sei aziende socie, in ${indirizzoCompleto}.`,
        parentOrganization: { "@id": `${SITO}/#cooperativa` },
        url: `${SITO}/territorio`,
        address: indirizzo,
        telephone: puntoVendita.telefonoHref,
        currenciesAccepted: "EUR",
        openingHoursSpecification: aperture,
        areaServed: "Provincia di Teramo",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Il contenuto e' costruito qui dai nostri dati, non arriva da fuori.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo) }}
    />
  );
}
