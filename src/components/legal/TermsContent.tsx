"use client";

import { useDictionary } from "@/i18n/provider";

export function TermsContent() {
  const dict = useDictionary();

  return (
    <div className="mx-auto max-w-2xl px-6 py-28 sm:px-8">
      <h1 className="font-display text-3xl text-espresso">{dict.footer.terms}</h1>
      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-espresso/70">
        <p>{dict.legal.termsP1}</p>
        <p>{dict.legal.termsP2}</p>
        <p>{dict.legal.termsP3}</p>
      </div>
    </div>
  );
}
