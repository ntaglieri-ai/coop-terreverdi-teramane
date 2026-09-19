"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";
import { slideshow } from "@/lib/home-content";

const DURATA_MS = 5000;

export function Slideshow() {
  const [indice, setIndice] = useState(0);
  const [inPausa, setInPausa] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const vaiA = useCallback((i: number) => setIndice(i), []);

  // Autoplay a rotazione. Si ferma su hover e con prefers-reduced-motion:
  // un caroscello che scorre da solo è un problema di accessibilità se non
  // si può fermare.
  useEffect(() => {
    if (inPausa || shouldReduceMotion) return;
    const timer = window.setInterval(
      () => setIndice((i) => (i + 1) % slideshow.length),
      DURATA_MS,
    );
    return () => window.clearInterval(timer);
  }, [inPausa, shouldReduceMotion]);

  const slide = slideshow[indice];

  return (
    <section className="bg-verde-900 py-20">
      <Container>
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[16/7]"
          onMouseEnter={() => setInPausa(true)}
          onMouseLeave={() => setInPausa(false)}
          onFocusCapture={() => setInPausa(true)}
          onBlurCapture={() => setInPausa(false)}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={indice}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 1152px) 1088px, 100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-verde-900/80 to-transparent"
          />
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {slideshow.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => vaiA(i)}
              aria-label={`Vai alla foto ${i + 1} di ${slideshow.length}`}
              aria-current={i === indice}
              className={`h-2.5 rounded-full transition-all ${
                i === indice
                  ? "w-8 bg-terra-400"
                  : "w-2.5 bg-verde-300/50 hover:bg-verde-300"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
