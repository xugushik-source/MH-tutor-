"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

export type IntroPhase = "hold" | "revealing" | "done";

interface IntroContextValue {
  phase: IntroPhase;
  /** True once the curtain has started lifting — hero content should begin its reveal in sync with it. */
  introStarted: boolean;
}

const IntroContext = createContext<IntroContextValue>({ phase: "done", introStarted: true });

export const HOLD_MS = 3000;
export const REVEAL_MS = 1000;
// See SplashScreen for why reduced-motion gets a shortened, de-theatricalized intro.
export const HOLD_MS_REDUCED = 200;
export const REVEAL_MS_REDUCED = 250;

export function IntroProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<IntroPhase>("hold");

  useEffect(() => {
    const holdMs = prefersReducedMotion ? HOLD_MS_REDUCED : HOLD_MS;
    const timer = setTimeout(() => setPhase("revealing"), holdMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "revealing") return;
    const revealMs = prefersReducedMotion ? REVEAL_MS_REDUCED : REVEAL_MS;
    const timer = setTimeout(() => setPhase("done"), revealMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = phase === "done" ? previousOverflow || "" : "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  return (
    <IntroContext.Provider value={{ phase, introStarted: phase !== "hold" }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
