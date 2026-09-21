"use client";

import Link from "next/link";
import { useDictionary } from "@/i18n/provider";

/** Mobile-only sticky bottom CTA — desktop already surfaces this in the header. */
export function MobileStickyCta() {
  const dict = useDictionary();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 p-3 backdrop-blur-md lg:hidden">
      <Link
        href="/#wizard"
        className="flex w-full items-center justify-center rounded-full bg-forest px-6 py-3.5 text-sm font-medium text-cream"
      >
        {dict.hero.ctaPrimary}
      </Link>
    </div>
  );
}
