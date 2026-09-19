import { Hero } from "@/components/home/hero";
import { Statistiche } from "@/components/home/statistiche";
import { Territorio } from "@/components/home/territorio";
import { Motivi } from "@/components/home/motivi";
import { Prodotti } from "@/components/home/prodotti";
import { Slideshow } from "@/components/home/slideshow";
import { EventiInEvidenza } from "@/components/home/eventi";
import { Rassegna } from "@/components/home/rassegna";
import { CtaFinale } from "@/components/home/cta-finale";

export default function Home() {
  return (
    <>
      <Hero />
      <Statistiche />
      <Territorio />
      <Motivi />
      <Prodotti />
      <Slideshow />
      <EventiInEvidenza />
      <Rassegna />
      <CtaFinale />
    </>
  );
}
