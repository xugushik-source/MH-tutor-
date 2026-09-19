"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRevealInView } from "@/lib/useRevealInView";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function SectionReveal({ children, className, delay = 0, y = 32 }: SectionRevealProps) {
  const { ref, inView } = useRevealInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
