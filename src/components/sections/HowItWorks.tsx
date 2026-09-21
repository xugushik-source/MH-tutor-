"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { processSteps } from "@/data/how-it-works";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { useDictionary } from "@/i18n/provider";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const dict = useDictionary();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const triggers = stepRefs.current.map((el, i) => {
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });

      return () => {
        triggers.forEach((t) => t?.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="how-it-works" className="bg-forest py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionReveal className="max-w-xl">
          <span className="eyebrow text-gold">
            <LineReveal>{dict.howItWorks.eyebrow}</LineReveal>
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">{dict.howItWorks.title}</h2>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32 flex h-[50vh] flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-display text-8xl text-gold/40">
                    {processSteps[active].index}
                  </span>
                  <h3 className="mt-4 max-w-sm font-display text-3xl text-cream">
                    {processSteps[active].title}
                  </h3>
                  <p className="mt-4 max-w-sm text-cream/60">{processSteps[active].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-7">
            {processSteps.map((step, i) => (
              <div
                key={step.index}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={cn(
                  "flex min-h-[45vh] flex-col justify-center gap-3 border-l-2 pl-8 transition-colors duration-500 lg:min-h-[55vh]",
                  active === i ? "border-gold" : "border-cream/10",
                )}
              >
                <span
                  className={cn(
                    "font-display text-3xl transition-colors duration-500 lg:hidden",
                    active === i ? "text-gold" : "text-cream/30",
                  )}
                >
                  {step.index}
                </span>
                <h3 className="font-display text-2xl text-cream sm:text-3xl">{step.title}</h3>
                <p className="max-w-md text-cream/55">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
