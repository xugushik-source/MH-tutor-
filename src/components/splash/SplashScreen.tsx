"use client";

import { motion } from "framer-motion";
import { LogoMark } from "@/components/brand/Logo";
import { useIntro, HOLD_MS, HOLD_MS_REDUCED, REVEAL_MS, REVEAL_MS_REDUCED } from "./IntroProvider";
import { useReducedMotion } from "framer-motion";

export function SplashScreen() {
  const { phase } = useIntro();
  const prefersReducedMotion = useReducedMotion();

  const holdMs = prefersReducedMotion ? HOLD_MS_REDUCED : HOLD_MS;
  const revealMs = prefersReducedMotion ? REVEAL_MS_REDUCED : REVEAL_MS;

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-burgundy"
        initial={false}
        animate={phase === "revealing" ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: revealMs / 1000, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          animate={
            phase === "revealing"
              ? { opacity: 0, y: -28, scale: 0.94 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: (revealMs / 1000) * 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-5 px-6"
        >
          <LogoMark tone="cream" className="text-6xl sm:text-7xl" />
          <div className="flex flex-col items-center gap-2">
            <span className="eyebrow text-cream/90 text-center">
              Marianna Hayrapetyan
            </span>
            <span className="eyebrow text-cream/55 text-center">
              Tutoring Center
            </span>
          </div>
        </motion.div>

        <div className="absolute bottom-14 left-1/2 h-px w-40 -translate-x-1/2 overflow-hidden bg-cream/15">
          <motion.div
            className="h-full bg-champagne"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: holdMs / 1000, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
