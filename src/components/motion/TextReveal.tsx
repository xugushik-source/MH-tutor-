"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRevealInView } from "@/lib/useRevealInView";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0 },
  },
};

const line: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

interface TextRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p";
}

/**
 * Splits headline copy into per-line reveal masks: each line sits inside an
 * `overflow-hidden` band and slides up into place, staggered — the same
 * "mask reveal" character called out in the animation brief, not a plain
 * fade-in.
 */
export function TextReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  as = "div",
}: TextRevealProps) {
  const Tag = motion[as];
  const { ref, inView } = useRevealInView<HTMLElement>();

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={container}
      transition={{ delayChildren: delay }}
      className={className}
    >
      {lines.map((text, i) => (
        <span className="reveal-mask" key={`${text}-${i}`}>
          <motion.span
            variants={line}
            className={cn("inline-block", lineClassName)}
          >
            {text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
