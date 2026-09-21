"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Tutor } from "@/data/tutors";
import { TutorPortraitReveal } from "@/components/tutors/TutorAvatar";
import { useBookingModal } from "@/components/booking/BookingModalContext";
import { useDictionary } from "@/i18n/provider";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  const dict = useDictionary();
  const { open } = useBookingModal();

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-cream transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10">
      <TutorPortraitReveal
        tutor={tutor}
        className="aspect-[4/5] [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl text-ink">{tutor.name}</h3>
            <p className="text-sm text-forest">{tutor.subjectLabel}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-gold/20 px-2.5 py-1 text-xs font-semibold text-ink">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {tutor.rating.toFixed(1)}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-ink/65">{tutor.shortBio}</p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {tutor.specializations.slice(0, 2).map((spec) => (
            <span
              key={spec}
              className="rounded-full border border-ink/10 px-2.5 py-1 text-xs text-ink/60"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-ink/50">
          <span>
            {tutor.experienceYears} {dict.tutors.experienceLabel}
          </span>
          <span>
            {tutor.reviewsCount} {dict.tutors.reviewsLabel}
          </span>
        </div>

        <div className="mt-auto flex items-center gap-3 pt-4">
          <Link
            href={`/tutors/${tutor.slug}`}
            className="flex-1 rounded-full border border-ink/20 px-4 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:border-ink/50"
          >
            {dict.tutors.detailsCta}
          </Link>
          <button
            onClick={() => open({ subject: tutor.subject })}
            className="flex-1 rounded-full bg-forest px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
          >
            {dict.tutors.trialCta}
          </button>
        </div>
      </div>
    </div>
  );
}
