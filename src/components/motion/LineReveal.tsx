"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRevealInView } from "@/lib/useRevealInView";

interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Single-line variant of TextReveal for eyebrows, captions and standalone
 * short copy that doesn't need per-word splitting.
 */
export function LineReveal({ children, className, delay = 0, y = 16 }: LineRevealProps) {
  const { ref, inView } = useRevealInView<HTMLSpanElement>();

  return (
    <span className="reveal-mask">
      <motion.span
        ref={ref}
        initial={{ y: "100%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : undefined}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
        className={cn("inline-block max-w-full break-words", className)}
        style={{ "--y": `${y}px` } as React.CSSProperties}
      >
        {children}
      </motion.span>
    </span>
  );
}
