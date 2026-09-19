"use client";

import { TextReveal } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { LogoMark } from "@/components/brand/Logo";
import { useDictionary } from "@/i18n/provider";

export function FinalScreen() {
  const dict = useDictionary();

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-burgundy py-28 text-center text-cream">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[52vw] font-semibold leading-none text-cream/[0.05] sm:text-[34vw]"
      >
        MH
      </span>

      <div className="relative z-10 flex flex-col items-center px-6">
        <LogoMark tone="cream" className="text-4xl opacity-80" />

        <TextReveal
          as="h2"
          lines={[dict.final.headlineLine1, dict.final.headlineLine2, dict.final.headlineLine3]}
          className="mt-6 font-display text-4xl leading-[1.15] sm:text-6xl"
        />

        <div className="mt-10">
          <MagneticButton href="/#wizard" variant="ghost" className="px-9 py-4">
            {dict.final.cta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
