"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import {
  groupSizes,
  miniGroupSizes,
  individualPrice,
  examIntensive,
  formatFromPrice,
  formatAmd,
  type FormatId,
} from "@/data/pricing";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { useDictionary } from "@/i18n/provider";
import { useBookingModal } from "@/components/booking/BookingModalContext";
import { cn } from "@/lib/utils";

export function Pricing() {
  const dict = useDictionary();
  const { open } = useBookingModal();
  const [openCard, setOpenCard] = useState<FormatId | null>(null);

  const cards: { id: FormatId; title: string; desc: string }[] = [
    { id: "group", title: dict.pricing.formatGroup, desc: dict.pricing.formatGroupDesc },
    { id: "miniGroup", title: dict.pricing.formatMiniGroup, desc: dict.pricing.formatMiniGroupDesc },
    { id: "individual", title: dict.pricing.formatIndividual, desc: dict.pricing.formatIndividualDesc },
    { id: "examIntensive", title: dict.pricing.formatExamIntensive, desc: dict.pricing.formatExamIntensiveDesc },
  ];

  return (
    <section id="pricing" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-forest">
            <LineReveal>{dict.pricing.eyebrow}</LineReveal>
          </span>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">{dict.pricing.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">{dict.pricing.description}</p>
        </SectionReveal>

        <StaggerReveal className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const isOpen = openCard === card.id;
            return (
              <div
                key={card.id}
                className="flex flex-col rounded-2xl border border-ink/10 bg-cream p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10"
              >
                <h3 className="font-display text-lg text-ink">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{card.desc}</p>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-xs text-ink/50">{dict.pricing.fromLabel}</span>
                  <span className="font-display text-2xl text-ink">{formatAmd(formatFromPrice[card.id])}</span>
                  <span className="text-xs text-ink/50">/ {dict.pricing.perMonth}</span>
                </p>

                <button
                  onClick={() => setOpenCard(isOpen ? null : card.id)}
                  className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest"
                  aria-expanded={isOpen}
                >
                  <Plus className={cn("h-3.5 w-3.5 transition-transform duration-300", isOpen && "rotate-45")} />
                  {isOpen ? dict.pricing.hideDetails : dict.pricing.details}
                </button>

                <div className="accordion-content" data-open={isOpen}>
                  <div>
                    <ul className="mt-3 flex flex-col gap-1.5 border-t border-ink/10 pt-3 text-sm text-ink/70">
                      {card.id === "group" &&
                        groupSizes.map((g) => (
                          <li key={g.size} className="flex items-center justify-between gap-2">
                            <span>
                              {g.size} {dict.pricing.students}
                            </span>
                            <span className="font-medium text-ink">{formatAmd(g.pricePerStudent)}</span>
                          </li>
                        ))}
                      {card.id === "miniGroup" &&
                        miniGroupSizes.map((g) => (
                          <li key={g.size} className="flex items-center justify-between gap-2">
                            <span>
                              {g.size} {dict.pricing.students}
                            </span>
                            <span className="font-medium text-ink">{formatAmd(g.pricePerStudent)}</span>
                          </li>
                        ))}
                      {card.id === "individual" && (
                        <li className="flex items-center justify-between gap-2">
                          <span>{dict.pricing.perStudent}</span>
                          <span className="font-medium text-ink">{formatAmd(individualPrice)}</span>
                        </li>
                      )}
                      {card.id === "examIntensive" && (
                        <>
                          <li className="flex items-center justify-between gap-2">
                            <span>{dict.pricing.examIntensiveGroupLabel}</span>
                            <span className="font-medium text-ink">{formatAmd(examIntensive.group)}</span>
                          </li>
                          <li className="flex items-center justify-between gap-2">
                            <span>{dict.pricing.examIntensiveIndividualLabel}</span>
                            <span className="font-medium text-ink">{formatAmd(examIntensive.individual)}</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerReveal>

        <SectionReveal delay={0.1} className="mt-6 rounded-2xl border border-ink/10 bg-sage-soft/40 p-6 sm:p-8">
          <h3 className="font-display text-lg text-ink">{dict.pricing.packageTitle}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/65">{dict.pricing.packageDescription}</p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: dict.pricing.package1, note: dict.pricing.package1Note },
              { label: dict.pricing.package2, note: dict.pricing.package2Note },
              { label: dict.pricing.package3, note: dict.pricing.package3Note },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-2.5 rounded-xl bg-cream px-4 py-3">
                <Check className="h-4 w-4 shrink-0 text-forest" />
                <span className="text-sm text-ink/80">{row.label}</span>
                <span className="ml-auto text-sm font-semibold text-forest">{row.note}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-ink/50">{dict.pricing.packageExample}</p>
        </SectionReveal>

        <SectionReveal delay={0.15} className="mt-6 rounded-2xl border border-forest/20 bg-cream p-6 text-center sm:p-8">
          <h3 className="font-display text-lg text-ink">{dict.pricing.guaranteeProgramTitle}</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ink/60">{dict.pricing.guaranteeProgramNote}</p>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-ink/45">
            {dict.pricing.guaranteeProgramExplain}
          </p>
          <button
            onClick={() => open()}
            className="mt-6 rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
          >
            {dict.pricing.cta}
          </button>
        </SectionReveal>
      </div>
    </section>
  );
}
