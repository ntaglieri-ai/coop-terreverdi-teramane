import { Hero } from "@/components/home/hero";
import { Statistiche } from "@/components/home/statistiche";
import { ChiSiamoHome } from "@/components/home/chi-siamo";
import { Territorio } from "@/components/home/territorio";
import { PuntoVenditaHome } from "@/components/home/punto-vendita";
import { Prodotti } from "@/components/home/prodotti";
import { Slideshow } from "@/components/home/slideshow";
import { EventiInEvidenza } from "@/components/home/eventi";
import { DoveSiamo } from "@/components/dove-siamo";

export default function Home() {
  return (
    <>
      <Hero />
      <Statistiche />
      <ChiSiamoHome />
      <Territorio />
      <PuntoVenditaHome />
      <Prodotti />
      <Slideshow />
      <EventiInEvidenza />
      <DoveSiamo />
    </>
  );
}
