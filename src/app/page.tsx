import { Hero } from "@/components/home/hero";
import { Territorio } from "@/components/home/territorio";
import { Motivi } from "@/components/home/motivi";
import { Prodotti } from "@/components/home/prodotti";
import { EventiInEvidenza } from "@/components/home/eventi";
import { Rassegna } from "@/components/home/rassegna";
import { CtaFinale } from "@/components/home/cta-finale";

export default function Home() {
  return (
    <>
      <Hero />
      <Territorio />
      <Motivi />
      <Prodotti />
      <EventiInEvidenza />
      <Rassegna />
      <CtaFinale />
    </>
  );
}
