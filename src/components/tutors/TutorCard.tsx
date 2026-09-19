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
    <div className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-espresso/10 bg-cream transition-shadow duration-300 hover:shadow-xl hover:shadow-espresso/10">
      <TutorPortraitReveal
        tutor={tutor}
        className="aspect-[4/5] [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl text-espresso">{tutor.name}</h3>
            <p className="text-sm text-burgundy">{tutor.subjectLabel}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-champagne/20 px-2.5 py-1 text-xs font-semibold text-espresso">
            <Star className="h-3.5 w-3.5 fill-champagne text-champagne" />
            {tutor.rating.toFixed(1)}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-espresso/65">{tutor.shortBio}</p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {tutor.specializations.slice(0, 2).map((spec) => (
            <span
              key={spec}
              className="rounded-full border border-espresso/10 px-2.5 py-1 text-xs text-espresso/60"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-espresso/50">
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
            className="flex-1 rounded-full border border-espresso/20 px-4 py-2.5 text-center text-sm font-medium text-espresso transition-colors hover:border-espresso/50"
          >
            {dict.tutors.detailsCta}
          </Link>
          <button
            onClick={() => open({ subject: tutor.subject })}
            className="flex-1 rounded-full bg-burgundy px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-burgundy-deep"
          >
            {dict.tutors.trialCta}
          </button>
        </div>
      </div>
    </div>
  );
}
