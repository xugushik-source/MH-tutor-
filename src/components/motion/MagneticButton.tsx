"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-forest text-cream hover:bg-forest-deep",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
  ghost: "text-cream border border-cream/40 hover:bg-cream/10",
};

/** CTA button that gently follows the cursor within its own bounds. */
export function MagneticButton({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.3 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 whitespace-nowrap",
    variantClasses[variant],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {href ? (
        <Link href={href} className={classes}>
          {children}
        </Link>
      ) : (
        <button type={type} onClick={onClick} className={classes} disabled={disabled}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
