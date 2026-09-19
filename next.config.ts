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
  },
  async redirects() {
    return [
      {
        // La pagina del punto vendita e' confluita in Chi siamo.
        source: "/mercato-contadino",
        destination: "/chi-siamo#mercato-contadino",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
