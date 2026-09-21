"use client";

import { PlayCircle, GraduationCap, BadgeCheck, Quote, Star } from "lucide-react";
import type { Tutor } from "@/data/tutors";
import { localizeTutor } from "@/data/tutors";
import { TutorPortraitReveal } from "@/components/tutors/TutorAvatar";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { TutorBookingCta } from "@/components/tutors/TutorBookingCta";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useDictionary, useLocale } from "@/i18n/provider";

/**
 * The page component (server) fetches the base tutor record and passes it
 * here unchanged; this client component resolves it to the active locale so
 * switching language updates the profile without a page reload.
 */
export function TutorProfileContent({ tutor: baseTutor }: { tutor: Tutor }) {
  const dict = useDictionary();
  const { locale } = useLocale();
  const tutor = localizeTutor(baseTutor, locale);

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 pt-32 sm:px-8 sm:pt-36">
        <Breadcrumbs items={[{ label: dict.nav.tutors, href: "/#tutors" }, { label: tutor.name }]} />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-28 pt-8 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <SectionReveal className="flex flex-col gap-6 sm:flex-row sm:items-end">
            <TutorPortraitReveal
              tutor={tutor}
              className="aspect-[4/5] w-full max-w-[220px] rounded-[1.75rem] shadow-xl shadow-ink/15"
              sizes="220px"
              priority
            />
            <div>
              <p className="eyebrow text-forest">{tutor.subjectLabel}</p>
              <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">{tutor.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink/60">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  {tutor.rating.toFixed(1)} · {tutor.reviewsCount} {dict.tutors.reviewsLabel}
                </span>
                <span>
                  {tutor.experienceYears} {dict.tutors.experienceLabel}
                </span>
                <span>{tutor.languages.join(", ")}</span>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} className="mt-14">
            <h2 className="font-display text-2xl text-ink">{dict.tutorProfile.aboutTitle}</h2>
            <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-ink/70">
              {tutor.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15} className="mt-12">
            <h2 className="font-display text-2xl text-ink">{dict.tutorProfile.methodologyTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">{tutor.methodology}</p>
          </SectionReveal>

          <SectionReveal delay={0.2} className="mt-12">
            <h2 className="font-display text-2xl text-ink">{dict.tutorProfile.suitableForTitle}</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {tutor.suitableFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink/70">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  {item}
                </li>
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal delay={0.25} className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 font-display text-xl text-ink">
                <GraduationCap className="h-5 w-5 text-forest" />
                {dict.tutorProfile.educationTitle}
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-ink/65">
                {tutor.education.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="flex items-center gap-2 font-display text-xl text-ink">
                <BadgeCheck className="h-5 w-5 text-forest" />
                {dict.tutorProfile.certificatesTitle}
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-ink/65">
                {tutor.certificates.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.3} className="mt-12">
            <h2 className="font-display text-2xl text-ink">{dict.tutorProfile.videoTitle}</h2>
            <div className="mt-4 flex aspect-video w-full items-center justify-center rounded-[1.5rem] border border-dashed border-ink/20 bg-ink/[0.03] text-ink/40">
              <div className="flex flex-col items-center gap-2">
                <PlayCircle className="h-10 w-10" />
                <span className="text-xs">{dict.tutorProfile.videoComingSoon}</span>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.35} className="mt-12">
            <h2 className="font-display text-2xl text-ink">{dict.tutorProfile.reviewsTitle}</h2>
            <div className="mt-4 flex flex-col gap-4">
              {tutor.reviews.map((r, i) => (
                <div key={i} className="rounded-2xl border border-ink/10 bg-sage-soft/40 p-5">
                  <Quote className="h-5 w-5 text-gold" />
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">{r.text}</p>
                  <p className="mt-3 text-xs font-medium text-ink/50">
                    {r.author}, {r.country}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.4} className="mt-12">
            <h2 className="font-display text-2xl text-ink">{dict.tutorProfile.scheduleTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">{dict.tutorProfile.scheduleText}</p>
          </SectionReveal>
        </div>

        <div className="lg:col-span-4">
          <TutorBookingCta tutor={tutor} />
        </div>
      </div>
    </div>
  );
}
