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
        // Il punto vendita e' una sezione di La spesa.
        source: "/mercato-contadino",
        destination: "/la-spesa#mercato-contadino",
        permanent: true,
      },
      // Social e Gallery & Media sono diventate una pagina sola.
      { source: "/social", destination: "/social-media", permanent: true },
      { source: "/gallery", destination: "/social-media", permanent: true },
      {
        // TODO AUTH — finche' il login non e' attivo la radice dell'area
        // riservata porta direttamente al gestionale. Quando ci sara'
        // Supabase Auth, qui torna la pagina di accesso.
        source: "/area-riservata",
        destination: "/area-riservata/dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
