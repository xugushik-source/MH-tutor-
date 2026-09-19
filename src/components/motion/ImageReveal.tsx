"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRevealInView } from "@/lib/useRevealInView";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Generic reveal frame: a clip-path mask opens while the content
 * simultaneously settles from a slight scale — the same two-part image
 * reveal used across the animation brief. Wrap a next/image, or (as in
 * this build, which has no photo assets) a PlaceholderPortrait — the
 * reveal mechanics are identical either way, so swapping in real photos
 * later needs no changes here.
 */
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  const { ref, inView } = useRevealInView<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
        className="h-full w-full"
      >
        <motion.div
          initial={{ scale: 1.12 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
