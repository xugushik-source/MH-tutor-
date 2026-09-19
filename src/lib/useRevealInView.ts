"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Framer Motion's `whileInView` occasionally never fires for an element
 * that is already on/near screen the instant its IntersectionObserver
 * attaches (observed in production here: the first card in a stagger grid
 * could stay permanently clipped at its `initial` state). This hook adds
 * an explicit synchronous fallback — if the element is already within
 * (or close to) the viewport at mount, it reveals immediately instead of
 * waiting on an observer callback that may not come.
 */
export function useRevealInView<T extends HTMLElement>(marginPx = 80) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh + marginPx && rect.bottom > -marginPx) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${marginPx}px` },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [marginPx]);

  return { ref, inView };
}
