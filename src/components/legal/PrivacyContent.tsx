"use client";

import { siteConfig } from "@/config/site";
import { useDictionary } from "@/i18n/provider";

export function PrivacyContent() {
  const dict = useDictionary();

  return (
    <div className="mx-auto max-w-2xl px-6 py-28 sm:px-8">
      <h1 className="font-display text-3xl text-espresso">{dict.footer.privacy}</h1>
      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-espresso/70">
        <p>{dict.legal.privacyP1}</p>
        <p>
          {dict.legal.privacyP2Before}{" "}
          <a href={`mailto:${siteConfig.contacts.email}`} className="text-burgundy underline underline-offset-2">
            {siteConfig.contacts.email}
          </a>
          .
        </p>
        <p>{dict.legal.privacyP3}</p>
      </div>
    </div>
  );
}
