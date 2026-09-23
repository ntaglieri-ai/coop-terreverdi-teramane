import Image from "next/image";
import { Container } from "@/components/container";
import { heroImage, rassegnaInEvidenza } from "@/lib/home-content";
import { Contattaci } from "@/components/home/contattaci";
import { TickerRassegna } from "@/components/home/ticker-rassegna";
import heroFoto from "../../../public/hero-mercato-contadino.webp";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* unoptimized: il file è già pre-compresso in WebP (import statico,
          quindi resta il blur-up automatico). Senza, ogni prima richiesta di
          una combinazione larghezza/qualità mai vista da un deploy passa
          dall'ottimizzatore on-demand di Vercel, che sulla prima visita reale
          dopo un deploy introduce un ritardo percepibile: qui l'hero diventa
          un asset statico puro, servito dalla CDN fin dal deploy. */}
      <Image
        src={heroFoto}
        alt={heroImage.alt}
        fill
        priority
        placeholder="blur"
        unoptimized
        className="object-cover"
      />

      {/* La foto del banco è chiara e molto carica di dettaglio: serve un
          overlay più deciso di quello che bastava sulla collina. Due strati —
          gradiente verticale per il testo in basso, velo verde per legare la
          foto alla palette. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-verde-900 via-verde-900/80 via-45% to-verde-900/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-verde-900/15 mix-blend-multiply"
      />

      <div className="relative z-10 flex min-h-[78vh] items-end">
        <Container className="pb-14 pt-32 sm:pb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-terra-300/60 bg-verde-900/50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-terra-200 backdrop-blur-sm">
            Giulianova · Prodotti a km 0
          </span>

          <h1 className="mt-5 max-w-3xl text-[2rem] font-semibold leading-[1.1] text-white drop-shadow-md sm:text-5xl lg:text-6xl">
            La spesa contadina, semplice e genuina
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-verde-100 drop-shadow sm:text-lg">
            Al Mercato Contadino di Giulianova il banco cambia ogni giorno:
            frutta e verdura di stagione, raccolte a pochi chilometri da qui e
            portate da chi le coltiva.
          </p>

          <div className="mt-9">
            <Contattaci />
          </div>
        </Container>
      </div>

      <TickerRassegna voci={rassegnaInEvidenza} />
    </section>
  );
}
