"use client";

import { Star, Clock, Globe } from "lucide-react";
import type { Tutor } from "@/data/tutors";
import { TutorAvatar } from "@/components/tutors/TutorAvatar";
import { useBookingModal } from "@/components/booking/BookingModalContext";
import { useDictionary } from "@/i18n/provider";

export function TutorBookingCta({ tutor }: { tutor: Tutor }) {
  const { open } = useBookingModal();
  const dict = useDictionary();

  return (
    <div className="lg:sticky lg:top-28">
      <div className="rounded-[1.75rem] border border-espresso/10 bg-cream p-6 shadow-xl shadow-espresso/10">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-full">
            <TutorAvatar tutor={tutor} className="h-full w-full" sizes="56px" textClassName="text-lg" />
          </div>
          <div>
            <p className="font-display text-lg text-espresso">{tutor.name}</p>
            <p className="flex items-center gap-1 text-xs text-espresso/55">
              <Star className="h-3.5 w-3.5 fill-champagne text-champagne" />
              {tutor.rating.toFixed(1)} · {tutor.reviewsCount} {dict.tutors.reviewsLabel}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-baseline gap-1.5 border-t border-espresso/10 pt-5">
          <span className="font-display text-3xl text-espresso">${tutor.priceFrom}</span>
          <span className="text-sm text-espresso/50">/ {dict.tutorProfile.perLesson}</span>
        </div>

        <div className="mt-4 flex flex-col gap-2 text-sm text-espresso/60">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-burgundy" />
            {dict.tutorProfile.durationOnline}
          </span>
          <span className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-burgundy" />
            {tutor.languages.join(", ")}
          </span>
        </div>

        <button
          onClick={() => open({ subject: tutor.subject })}
          className="mt-6 w-full rounded-full bg-burgundy px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-burgundy-deep"
        >
          {dict.trial.cta}
        </button>
      </div>
    </div>
  );
}
