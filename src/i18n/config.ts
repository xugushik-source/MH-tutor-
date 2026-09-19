export const locales = ["ru", "hy", "ka", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

// Only "ru" is fully translated today. The other locales are wired into the
// architecture (routing-ready dictionary shape, language switcher data) but
// currently fall back to the Russian strings — see src/i18n/dictionaries.
export const implementedLocales: Locale[] = ["ru"];

export const localeLabels: Record<Locale, string> = {
  ru: "Русский",
  hy: "Հայերեն",
  ka: "ქართული",
  en: "English",
};
