"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Dictionary } from "./dictionaries/ru";
import type { Locale } from "./config";
import { getDictionary } from "./index";

const STORAGE_KEY = "mh-locale";

interface I18nContextValue {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Locale switching here is client-side only — there is no per-locale
 * routing (e.g. /en, /hy). The server always renders `initialLocale`; on
 * mount we check localStorage for a saved preference and swap to it if
 * different, which causes one visible re-render on repeat visits rather
 * than a clean SSR-matched locale. Building real locale-prefixed routing
 * would remove that flash but is a materially bigger change than a
 * client-side switcher.
 */
export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && saved !== locale) {
        // localStorage only exists client-side, so this one-time restore
        // from a genuinely external store can't be done during render (the
        // server has no window) — the effect is unavoidable here.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocaleState(saved);
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — stay on initialLocale.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  return (
    <I18nContext.Provider value={{ locale, dict: getDictionary(locale), setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useDictionary() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useDictionary must be used within I18nProvider");
  }
  return ctx.dict;
}

export function useLocale() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useLocale must be used within I18nProvider");
  }
  return { locale: ctx.locale, setLocale: ctx.setLocale };
}
