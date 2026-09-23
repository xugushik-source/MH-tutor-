"use client";

import { Target, Users, CalendarClock, LineChart, Globe2, ShieldCheck } from "lucide-react";
import { localizeBenefits } from "@/data/how-it-works";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { useDictionary, useLocale } from "@/i18n/provider";

const icons = [Target, Users, CalendarClock, LineChart, Globe2, ShieldCheck];

export function WhyMH() {
  const dict = useDictionary();
  const { locale } = useLocale();
  const benefits = localizeBenefits(locale);

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-forest">
            <LineReveal>{dict.why.eyebrow}</LineReveal>
          </span>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">{dict.why.title}</h2>
        </SectionReveal>

        <StaggerReveal className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={benefit.id}
                className="flex flex-col gap-4 rounded-[1.5rem] border border-ink/10 bg-sage-soft/40 p-7 transition-colors duration-300 hover:border-forest/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl text-ink">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{benefit.description}</p>
              </div>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
