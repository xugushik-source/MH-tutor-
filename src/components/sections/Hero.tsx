"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { useIntro } from "@/components/splash/IntroProvider";
import { useDictionary } from "@/i18n/provider";
import { useBookingModal } from "@/components/booking/BookingModalContext";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function Reveal({
  show,
  delay = 0,
  y = 22,
  className,
  children,
}: {
  show: boolean;
  delay?: number;
  y?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealLine({
  show,
  delay = 0,
  className,
  children,
}: {
  show: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className="reveal-mask">
      <motion.span
        initial={{ y: "110%" }}
        animate={show ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
        className={cn("inline-block", className)}
      >
        {children}
      </motion.span>
    </span>
  );
}

function HeroPortrait({
  show,
  delay,
  className,
  src,
  alt,
  sizes,
  priority,
}: {
  show: boolean;
  delay: number;
  className?: string;
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("absolute overflow-hidden rounded-[1.75rem] shadow-2xl shadow-espresso/25", className)}>
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={show ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(100% 0% 0% 0%)" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay }}
        className="h-full w-full"
      >
        <motion.div
          initial={{ scale: 1.16 }}
          animate={show ? { scale: 1 } : { scale: 1.16 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay }}
          className="relative h-full w-full"
        >
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
}

const watermarkVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const { introStarted } = useIntro();
  const dict = useDictionary();
  const { open } = useBookingModal();

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-cream pb-16 pt-32 sm:pt-36">
      <motion.span
        initial="hidden"
        animate={introStarted ? "visible" : "hidden"}
        variants={watermarkVariants}
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8vw] -top-[6vw] select-none font-display text-[42vw] font-semibold leading-none text-burgundy/[0.06] sm:text-[32vw] lg:-right-[4vw] lg:text-[26vw]"
      >
        MH
      </motion.span>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal show={introStarted} delay={0.05}>
            <span className="eyebrow text-burgundy">{dict.hero.eyebrow}</span>
          </Reveal>

          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.08] text-espresso sm:text-6xl lg:text-[4.2rem]">
            <RevealLine show={introStarted} delay={0.32}>
              {dict.hero.headlineLine1}
            </RevealLine>
            <br />
            <RevealLine show={introStarted} delay={0.48} className="text-burgundy">
              {dict.hero.headlineLine2}
            </RevealLine>
          </h1>

          <Reveal show={introStarted} delay={0.78} className="mt-7 max-w-lg">
            <p className="font-display text-xl text-espresso/80 sm:text-2xl">
              {dict.hero.subheadline}
            </p>
            <p className="mt-4 text-base leading-relaxed text-espresso/60">
              {dict.hero.description}
            </p>
          </Reveal>

          <Reveal show={introStarted} delay={1.0} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="/#wizard" variant="primary">
              {dict.hero.ctaPrimary}
            </MagneticButton>
            <MagneticButton onClick={() => open()} variant="secondary">
              {dict.hero.ctaSecondary}
            </MagneticButton>
          </Reveal>
        </div>

        <div className="relative h-[420px] sm:h-[480px] lg:col-span-5 lg:h-[560px]">
          <HeroPortrait
            show={introStarted}
            delay={0.5}
            src="/portraits/marianna.jpg"
            alt="Marianna Hayrapetyan"
            sizes="(max-width: 1024px) 60vw, 30vw"
            priority
            className="right-0 top-0 aspect-[3/4] w-[64%]"
          />
          <HeroPortrait
            show={introStarted}
            delay={0.7}
            src="/portraits/elena.jpg"
            alt=""
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="bottom-0 left-0 aspect-[4/5] w-[54%]"
          />

          <Reveal
            show={introStarted}
            delay={1.15}
            y={12}
            className="absolute bottom-8 right-2 z-20 flex items-center gap-3 rounded-2xl bg-cream/95 px-4 py-3.5 shadow-xl shadow-espresso/15 backdrop-blur sm:right-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne/25 text-champagne">
              <Star className="h-5 w-5 fill-current" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg text-espresso">{siteConfig.stats.rating}</p>
              <p className="text-xs text-espresso/55">{siteConfig.stats.students} учеников</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
