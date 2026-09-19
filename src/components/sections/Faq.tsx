"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqItems } from "@/data/faq";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { useDictionary } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function Faq() {
  const dict = useDictionary();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream-dim py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <SectionReveal className="text-center">
          <span className="eyebrow text-burgundy">
            <LineReveal>{dict.faq.eyebrow}</LineReveal>
          </span>
          <h2 className="mt-4 font-display text-4xl text-espresso sm:text-5xl">{dict.faq.title}</h2>
        </SectionReveal>

        <SectionReveal delay={0.15} className="mt-14 flex flex-col divide-y divide-espresso/10 rounded-[1.75rem] border border-espresso/10 bg-cream px-6 sm:px-8">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} className="py-2">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-espresso sm:text-xl">{item.question}</span>
                  <Plus
                    className={cn(
                      "h-5 w-5 shrink-0 text-burgundy transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                  />
                </button>
                <div className="accordion-content" data-open={isOpen}>
                  <div>
                    <p className="pb-5 text-sm leading-relaxed text-espresso/65">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </SectionReveal>
      </div>
    </section>
  );
}
