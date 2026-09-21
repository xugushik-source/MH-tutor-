"use client";

import { useRef } from "react";
import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { PlaceholderPortrait } from "@/components/ui/PlaceholderPortrait";
import { useDictionary } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const sizeClasses: Record<Testimonial["size"], string> = {
  lg: "w-[300px] sm:w-[380px]",
  md: "w-[260px] sm:w-[320px]",
};

export function Testimonials() {
  const dict = useDictionary();
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, startX: 0, startScroll: 0 });

  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !scrollRef.current) return;
    dragState.current = { dragging: true, startX: e.clientX, startScroll: scrollRef.current.scrollLeft };
    scrollRef.current.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragState.current.dragging || !scrollRef.current) return;
    const dx = e.clientX - dragState.current.startX;
    scrollRef.current.scrollLeft = dragState.current.startScroll - dx;
  }

  function onPointerUp() {
    dragState.current.dragging = false;
  }

  return (
    <section id="testimonials" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionReveal className="max-w-xl">
          <span className="eyebrow text-forest">
            <LineReveal>{dict.testimonials.eyebrow}</LineReveal>
          </span>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">{dict.testimonials.title}</h2>
        </SectionReveal>
      </div>

      <SectionReveal delay={0.15}>
        <div
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="no-scrollbar mt-14 flex cursor-grab gap-5 overflow-x-auto px-6 pb-4 active:cursor-grabbing sm:px-8"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className={cn(
                "flex shrink-0 flex-col justify-between gap-6 rounded-[1.75rem] border border-ink/10 bg-sage-soft/40 p-7 select-none",
                sizeClasses[t.size],
              )}
              style={{ scrollSnapAlign: "start" }}
            >
              <Quote className="h-6 w-6 text-gold" />
              <p className="text-base leading-relaxed text-ink/75">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 overflow-hidden rounded-full">
                  <PlaceholderPortrait initial={t.avatarInitial} tone="forest" textClassName="text-base" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-ink/50">
                    {t.subject} · {t.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
