import type { Locale } from "./config";
import ru from "./dictionaries/ru";
import hy from "./dictionaries/hy";
import ka from "./dictionaries/ka";
import en from "./dictionaries/en";

export type { Dictionary } from "./dictionaries/ru";
export { locales, defaultLocale, implementedLocales, localeLabels } from "./config";
export type { Locale } from "./config";

const dictionaries = { ru, hy, ka, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocaleFallback];
}

const defaultLocaleFallback: Locale = "ru";
