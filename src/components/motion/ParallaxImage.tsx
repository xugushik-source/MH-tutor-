"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Subtle scroll-linked parallax drift for imagery inside a fixed frame. */
export function ParallaxImage({ children, className, strength = 18 }: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !innerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.fromTo(
        innerRef.current,
        { yPercent: -strength / 2 },
        {
          yPercent: strength / 2,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [strength]);

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden", className)}>
      <div ref={innerRef} className="absolute inset-x-0 -top-[12%] h-[124%] w-full">
        {children}
      </div>
    </div>
  );
}
