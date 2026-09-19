"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useDictionary } from "@/i18n/provider";
import { useBookingModal } from "@/components/booking/BookingModalContext";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#tutors", key: "tutors" as const },
  { href: "/#subjects", key: "subjects" as const },
  { href: "/#how-it-works", key: "howItWorks" as const },
  { href: "/#testimonials", key: "testimonials" as const },
  { href: "/#faq", key: "faq" as const },
];

export function Header() {
  const dict = useDictionary();
  const { open } = useBookingModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 64);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto mt-0 flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8",
          scrolled
            ? "mt-3 rounded-full border border-espresso/10 bg-cream/85 py-2.5 shadow-[0_8px_30px_rgba(34,21,16,0.08)] backdrop-blur-md sm:mx-4 sm:px-6"
            : "py-5",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <LogoMark tone="burgundy" className="h-8" priority />
          <span className="hidden font-display text-sm text-espresso/80 sm:inline">
            Marianna Hayrapetyan
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-espresso/75 transition-colors hover:text-burgundy"
            >
              {dict.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton onClick={() => open()} variant="primary" className="px-6 py-2.5 text-xs">
            {dict.nav.cta}
          </MagneticButton>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-espresso lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? dict.common.closeMenu : dict.common.openMenu}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-2 flex flex-col gap-1 rounded-3xl border border-espresso/10 bg-cream p-4 shadow-xl lg:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-espresso/85 transition-colors hover:bg-espresso/5"
              >
                {dict.nav[item.key]}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
              className="mt-2 rounded-full bg-burgundy px-5 py-3 text-sm font-medium text-cream"
            >
              {dict.nav.cta}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
