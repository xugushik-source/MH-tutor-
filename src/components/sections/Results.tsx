"use client";

import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { useDictionary } from "@/i18n/provider";
import { siteConfig } from "@/config/site";

export function Results() {
  const dict = useDictionary();

  const stats = [
    { value: siteConfig.stats.students, label: dict.results.students },
    { value: siteConfig.stats.tutors, label: dict.results.tutorsStat },
    { value: siteConfig.stats.subjects, label: dict.results.subjectsStat },
    { value: siteConfig.stats.rating, label: dict.results.rating },
  ];

  return (
    <section className="bg-espresso py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-champagne">
            <LineReveal>{dict.results.eyebrow}</LineReveal>
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">{dict.results.title}</h2>
        </SectionReveal>

        <StaggerReveal className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <span className="font-display text-5xl text-champagne sm:text-6xl">{stat.value}</span>
              <span className="text-sm text-cream/55">{stat.label}</span>
            </div>
          ))}
        </StaggerReveal>

        <p className="mt-10 text-center text-xs text-cream/30">
          Показатели — плейсхолдеры и будут заменены на реальные данные перед запуском.
        </p>
      </div>
    </section>
  );
}
