import Link from "next/link";
import { Send, MessageCircle } from "lucide-react";
import { InstagramGlyph } from "@/components/icons/InstagramGlyph";
import { LogoMark } from "@/components/brand/Logo";
import { siteConfig } from "@/config/site";
import ruDict from "@/i18n/dictionaries/ru";

const navItems = [
  { href: "/#tutors", label: ruDict.nav.tutors },
  { href: "/#subjects", label: ruDict.nav.subjects },
  { href: "/#how-it-works", label: ruDict.nav.howItWorks },
  { href: "/#testimonials", label: ruDict.nav.testimonials },
  { href: "/#faq", label: ruDict.nav.faq },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-espresso pb-20 text-cream lg:pb-0">
      <div className="pointer-events-none absolute -bottom-24 right-0 select-none font-display text-[16rem] font-semibold leading-none text-cream/5">
        MH
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-3">
            <LogoMark tone="cream" className="h-11" />
            <span className="eyebrow text-cream/70">Marianna Hayrapetyan</span>
            <span className="eyebrow text-cream/40">Tutoring Center</span>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-cream/40">
                {ruDict.footer.navTitle}
              </span>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-cream/75 transition-colors hover:text-champagne"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-cream/40">
                {ruDict.footer.contactsTitle}
              </span>
              <a
                href={`mailto:${siteConfig.contacts.email}`}
                className="text-sm text-cream/75 transition-colors hover:text-champagne"
              >
                {siteConfig.contacts.email}
              </a>
              <a
                href={siteConfig.contacts.whatsappLink}
                className="text-sm text-cream/75 transition-colors hover:text-champagne"
              >
                WhatsApp
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-cream/40">
                {ruDict.footer.followTitle}
              </span>
              <div className="flex items-center gap-3">
                <SocialIcon href={siteConfig.contacts.instagram} label="Instagram">
                  <InstagramGlyph className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href={siteConfig.contacts.telegram} label="Telegram">
                  <Send className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href={siteConfig.contacts.whatsappLink} label="WhatsApp">
                  <MessageCircle className="h-4 w-4" />
                </SocialIcon>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center">
          <span>
            © {year} {siteConfig.name}. {ruDict.footer.rights}
          </span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-champagne">
              {ruDict.footer.privacy}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-champagne">
              {ruDict.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/75 transition-colors hover:border-champagne hover:text-champagne"
    >
      {children}
    </a>
  );
}
