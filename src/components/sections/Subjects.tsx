"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { localizeSubjects, type Subject } from "@/data/subjects";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { useDictionary, useLocale } from "@/i18n/provider";
import { useTutorFilter } from "@/components/sections/TutorFilterContext";
import { useRevealInView } from "@/lib/useRevealInView";
import { cn } from "@/lib/utils";

const spanClasses: Record<Subject["size"], string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  md: "sm:col-span-2 sm:row-span-1",
  sm: "sm:col-span-1 sm:row-span-1",
};

const toneClasses: Record<Subject["size"], string> = {
  lg: "bg-forest text-cream",
  md: "bg-ink text-cream",
  sm: "bg-cream text-ink border border-ink/12",
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Subjects() {
  const dict = useDictionary();
  const { locale } = useLocale();
  const subjects = localizeSubjects(locale);
  const { setFilterSubject } = useTutorFilter();
  const { ref: gridRef, inView } = useRevealInView<HTMLDivElement>();

  function handleSelect(slug: string) {
    setFilterSubject(slug);
    document.getElementById("tutors")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="subjects" className="bg-cream-dim py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionReveal className="max-w-xl">
          <span className="eyebrow text-forest">
            <LineReveal>{dict.subjects.eyebrow}</LineReveal>
          </span>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">{dict.subjects.title}</h2>
        </SectionReveal>

        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[160px] lg:auto-rows-[180px]"
          style={{ gridAutoFlow: "dense" }}
        >
          {subjects.map((subject) => (
            <motion.button
              key={subject.slug}
              variants={item}
              onClick={() => handleSelect(subject.slug)}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] p-6 text-left transition-transform duration-300 hover:-translate-y-1",
                spanClasses[subject.size],
                toneClasses[subject.size],
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -right-6 -top-6 select-none font-display text-8xl font-semibold leading-none opacity-[0.08]",
                  subject.size === "sm" ? "text-ink" : "text-cream",
                )}
              >
                {subject.title.slice(0, 2)}
              </span>

              <div className="relative flex items-start justify-between">
                <h3
                  className={cn(
                    "font-display leading-tight",
                    subject.size === "lg" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl",
                  )}
                >
                  {subject.title}
                </h3>
                <ArrowUpRight className="h-5 w-5 shrink-0 -translate-y-1 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>

              <div className="relative">
                {subject.size !== "sm" && (
                  <p
                    className={cn(
                      "mb-2 max-w-xs text-sm leading-relaxed opacity-80",
                      subject.size === "lg" ? "block" : "hidden sm:block",
                    )}
                  >
                    {subject.description}
                  </p>
                )}
                <span className="text-xs font-medium uppercase tracking-wide opacity-60">
                  {subject.tutorsCount} {dict.subjects.tutorsAvailable}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
