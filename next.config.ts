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
    // 60 in aggiunta al 75 di default: le hero a piena larghezza sono le
    // prime foto scaricate a ogni apertura di pagina (priority + preload),
    // quindi pesano sul primo caricamento. A 60 il peso scende parecchio
    // senza perdita visibile su una foto vista di sfuggita in un banner.
    qualities: [60, 75],
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
