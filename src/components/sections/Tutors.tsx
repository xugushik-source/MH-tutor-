"use client";

import { localizeTutors } from "@/data/tutors";
import { localizeSubjects } from "@/data/subjects";
import { TutorCard } from "@/components/tutors/TutorCard";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { useDictionary, useLocale } from "@/i18n/provider";
import { useTutorFilter } from "@/components/sections/TutorFilterContext";
import { cn } from "@/lib/utils";

export function Tutors() {
  const dict = useDictionary();
  const { locale } = useLocale();
  const { filterSubject, setFilterSubject } = useTutorFilter();

  const tutors = localizeTutors(locale);
  const subjects = localizeSubjects(locale);
  const filtered = filterSubject ? tutors.filter((t) => t.subject === filterSubject) : tutors;
  const list = filtered.length > 0 ? filtered : tutors;
  const activeSubjectTitle = subjects.find((s) => s.slug === filterSubject)?.title;

  return (
    <section id="tutors" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-forest">
            <LineReveal>{dict.tutors.eyebrow}</LineReveal>
          </span>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">{dict.tutors.title}</h2>
        </SectionReveal>

        {filterSubject && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="rounded-full bg-forest/10 px-4 py-1.5 text-sm font-medium text-forest">
              {activeSubjectTitle}
            </span>
            <button
              onClick={() => setFilterSubject(null)}
              className={cn("text-sm font-medium text-ink/50 underline-offset-2 hover:text-ink hover:underline")}
            >
              {dict.tutors.viewAll}
            </button>
          </div>
        )}

        <StaggerReveal className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((tutor) => (
            <TutorCard key={tutor.slug} tutor={tutor} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
