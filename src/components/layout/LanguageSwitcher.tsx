"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * Flag + code, always shown together (a flag alone doesn't identify a
 * language — HY isn't "Armenia the country", it's "Armenian the language").
 * Emoji flags don't render as pictures on some older Windows builds (they
 * fall back to the two-letter region code) — the paired code keeps the
 * control legible either way.
 */
const flags: Record<Locale, string> = {
  en: "🇬🇧",
  hy: "🇦🇲",
  ru: "🇷🇺",
};

const shortCodes: Record<Locale, string> = {
  en: "EN",
  hy: "HY",
  ru: "RU",
};

/**
 * Switching locale never navigates — the site has one URL per page and
 * renders the active language from client state (see I18nProvider), so
 * whatever page the visitor is on is exactly the page they stay on after
 * picking a language. No locale-prefixed routes exist to redirect between.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const otherLocales = locales.filter((code) => code !== locale);

  useEffect(() => {
    if (!open) return;
    // Move focus into the list as soon as it opens — otherwise a keyboard
    // user who opened it with Enter/Space has no indication the list is
    // focusable at all, and Arrow keys silently do nothing.
    optionRefs.current[0]?.focus();

    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function selectLocale(code: Locale) {
    setLocale(code);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onListKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      optionRefs.current[(index + 1) % otherLocales.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      optionRefs.current[(index - 1 + otherLocales.length) % otherLocales.length]?.focus();
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${localeLabels[locale]}. Change language`}
        className={cn(
          "flex h-9 min-w-[4.25rem] items-center gap-1.5 rounded-full border border-ink/15 bg-cream px-3 text-xs font-semibold tracking-wide text-ink transition-colors",
          "hover:border-forest/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
          open && "border-forest/50",
        )}
      >
        <span aria-hidden="true" className="text-base leading-none">
          {flags[locale]}
        </span>
        <span>{shortCodes[locale]}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-ink/50 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Available languages"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[9.5rem] overflow-hidden rounded-2xl border border-ink/10 bg-cream py-1.5 shadow-xl shadow-ink/10"
        >
          {otherLocales.map((code, i) => (
            <button
              key={code}
              ref={(el) => {
                optionRefs.current[i] = el;
              }}
              type="button"
              role="option"
              aria-selected={false}
              onClick={() => selectLocale(code)}
              onKeyDown={(e) => onListKeyDown(e, i)}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-ink transition-colors hover:bg-sage-soft/70 focus-visible:bg-sage-soft/70 focus-visible:outline-none"
            >
              <span aria-hidden="true" className="text-base leading-none">
                {flags[code]}
              </span>
              <span className="font-semibold tracking-wide">{shortCodes[code]}</span>
              <span className="text-ink/50">{localeLabels[code]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
