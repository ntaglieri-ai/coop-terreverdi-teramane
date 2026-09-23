import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // TODO: le foto di Unsplash sono segnaposto temporanei. Quando la
    // cooperativa fornisce le immagini reali del territorio e dei prodotti,
    // spostarle in /public (o su Supabase Storage) e rimuovere questo pattern.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // 45 e 60 in aggiunta al 75 di default: le hero a piena larghezza sono
    // le prime foto scaricate a ogni apertura di pagina (priority + preload),
    // quindi pesano sul primo caricamento. 45 serve alla foto di /territorio:
    // fogliame fitto, comprime peggio delle altre a parità di qualità
    // percepita, quindi ne beneficia di più. Nessuna perdita visibile su
    // nessuna delle tre confrontando gli screenshot.
    qualities: [45, 60, 75],
  },
  async redirects() {
    return [
      {
        // Il punto vendita e' una sezione di La spesa.
        source: "/mercato-contadino",
        destination: "/la-spesa#mercato-contadino",
        permanent: true,
      },
      // Social e Gallery & Media sono diventate una pagina sola.
      { source: "/social", destination: "/social-media", permanent: true },
      { source: "/gallery", destination: "/social-media", permanent: true },
    ];
  },
};

export default nextConfig;
