"use client";

import { motion, type Variants } from "framer-motion";
import { Children, type ReactNode } from "react";
import { useRevealInView } from "@/lib/useRevealInView";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
}

/** Reveals each direct child in sequence as the group scrolls into view. */
export function StaggerReveal({ children, className, itemClassName }: StaggerRevealProps) {
  const { ref, inView } = useRevealInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={container}
      className={className}
    >
      {Children.map(children, (child, i) => (
        <motion.div variants={item} className={itemClassName} key={i}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
