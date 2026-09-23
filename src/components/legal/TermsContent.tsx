"use client";

import { useDictionary } from "@/i18n/provider";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function TermsContent() {
  const dict = useDictionary();

  return (
    <div className="mx-auto max-w-2xl px-6 py-28 sm:px-8">
      <Breadcrumbs items={[{ label: dict.footer.terms }]} className="mb-6" />
      <h1 className="font-display text-3xl text-ink">{dict.footer.terms}</h1>
      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-ink/70">
        <p>{dict.legal.termsP1}</p>
        <p>{dict.legal.termsP2}</p>
      </div>
    </div>
  );
}
