"use client";

import { Search, Target, ListChecks, TrendingUp, Trophy, ChevronRight } from "lucide-react";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { useDictionary } from "@/i18n/provider";
import { useBookingModal } from "@/components/booking/BookingModalContext";

const stepIcons = [Search, Target, ListChecks, TrendingUp, Trophy] as const;

export function Guarantee() {
  const dict = useDictionary();
  const { open } = useBookingModal();

  const steps = [
    dict.guarantee.step1,
    dict.guarantee.step2,
    dict.guarantee.step3,
    dict.guarantee.step4,
    dict.guarantee.step5,
  ];

  return (
    <section className="bg-forest py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">
        <SectionReveal className="mx-auto max-w-2xl">
          <span className="eyebrow text-gold">
            <LineReveal>{dict.guarantee.eyebrow}</LineReveal>
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">{dict.guarantee.title}</h2>
          <p className="mt-3 font-display text-2xl text-gold sm:text-3xl">{dict.guarantee.subtitle}</p>
        </SectionReveal>

        <StaggerReveal className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-2">
          {steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={step} className="flex items-center gap-2">
                <div className="flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/5 px-4 py-2.5">
                  <Icon className="h-4 w-4 text-gold" />
                  <span className="text-sm font-medium text-cream/90">{step}</span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden h-4 w-4 shrink-0 text-cream/30 sm:block" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </StaggerReveal>

        <SectionReveal delay={0.15} className="mx-auto mt-10 max-w-2xl">
          <p className="text-sm leading-relaxed text-cream/70">{dict.guarantee.explanation}</p>
        </SectionReveal>

        <SectionReveal delay={0.2} className="mt-9">
          <button
            onClick={() => open()}
            className="rounded-full bg-cream px-8 py-3.5 text-sm font-medium text-forest transition-colors hover:bg-cream-dim"
          >
            {dict.guarantee.cta}
          </button>
        </SectionReveal>
      </div>
    </section>
  );
}
