"use client";

import { SectionReveal } from "@/components/motion/SectionReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useDictionary } from "@/i18n/provider";
import { useBookingModal } from "@/components/booking/BookingModalContext";

export function TrialCta() {
  const dict = useDictionary();
  const { open } = useBookingModal();

  return (
    <section className="relative overflow-hidden bg-burgundy py-24 text-cream sm:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] top-1/2 -translate-y-1/2 select-none font-display text-[38vw] font-semibold leading-none text-cream/[0.06] sm:text-[24vw]"
      >
        MH
      </span>

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
        <SectionReveal>
          <h2 className="font-display text-4xl sm:text-5xl">{dict.trial.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/70">{dict.trial.description}</p>
          <div className="mt-9 flex justify-center">
            <MagneticButton onClick={() => open()} variant="ghost" className="px-9 py-4">
              {dict.trial.cta}
            </MagneticButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
