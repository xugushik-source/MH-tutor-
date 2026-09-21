"use client";

import { locales } from "@/i18n/config";
import { useLocale } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const shortCodes: Record<(typeof locales)[number], string> = {
  en: "EN",
  hy: "HY",
  ru: "RU",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div className={cn("flex items-center gap-1.5 text-xs font-semibold tracking-wide", className)}>
      {locales.map((code, i) => (
        <span key={code} className="flex items-center gap-1.5">
          <button
            onClick={() => setLocale(code)}
            aria-pressed={locale === code}
            className={cn(
              "transition-colors",
              locale === code ? "text-forest" : "text-ink/40 hover:text-ink/70",
            )}
          >
            {shortCodes[code]}
          </button>
          {i < locales.length - 1 && <span className="text-ink/20">/</span>}
        </span>
      ))}
    </div>
  );
}
