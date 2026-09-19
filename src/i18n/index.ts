import type { Locale } from "./config";
import { defaultLocale } from "./config";
import ru from "./dictionaries/ru";
import hy from "./dictionaries/hy";
import en from "./dictionaries/en";

export type { Dictionary } from "./dictionaries/ru";
export { locales, defaultLocale, implementedLocales, localeLabels } from "./config";
export type { Locale } from "./config";

const dictionaries = { ru, hy, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
