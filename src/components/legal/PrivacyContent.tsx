"use client";

import { siteConfig } from "@/config/site";
import { useDictionary } from "@/i18n/provider";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function PrivacyContent() {
  const dict = useDictionary();

  return (
    <div className="mx-auto max-w-2xl px-6 py-28 sm:px-8">
      <Breadcrumbs items={[{ label: dict.footer.privacy }]} className="mb-6" />
      <h1 className="font-display text-3xl text-ink">{dict.footer.privacy}</h1>
      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-ink/70">
        <p>{dict.legal.privacyP1}</p>
        {siteConfig.contacts.email ? (
          <p>
            {dict.legal.privacyP2Before}{" "}
            <a href={`mailto:${siteConfig.contacts.email}`} className="text-forest underline underline-offset-2">
              {siteConfig.contacts.email}
            </a>
            .
          </p>
        ) : (
          <p>{dict.legal.privacyP2NoEmail}</p>
        )}
      </div>
    </div>
  );
}
