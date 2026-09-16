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
};

export default nextConfig;
