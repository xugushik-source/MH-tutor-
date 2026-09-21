# Marianna Hayrapetyan Tutoring Center

Premium online tutoring center landing page and tutor-profile pages, built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion and GSAP/ScrollTrigger.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build      # production build
npm run start       # serve the production build
npm run lint
```

## Project structure

- `src/app` — routes: homepage, `/tutors/[slug]`, `/privacy`, `/terms`, plus `sitemap.ts`/`robots.ts` and the `icon.png`/`apple-icon.png`/`opengraph-image.png` metadata files.
- `src/components/sections` — homepage sections (Hero, TutorWizard, Tutors, Subjects, HowItWorks, WhyMH, ClassExperience, Results, Testimonials, TrialCta, Faq, FinalScreen).
- `src/components/motion` — reusable scroll/intro animation primitives (`TextReveal`, `LineReveal`, `ImageReveal`, `StaggerReveal`, `SectionReveal`, `ParallaxImage`, `MagneticButton`, `PageTransition`).
- `src/components/splash` — the opening curtain (`SplashScreen`) and `IntroProvider`, which the Hero's above-the-fold reveal is synced to (see below).
- `src/components/booking` — the trial-lesson booking modal and its context (`useBookingModal().open()` from anywhere).
- `src/components/tutors` — tutor card, avatar/portrait, and sticky booking CTA.
- `src/data` — demo content: `tutors.ts`, `subjects.ts`, `testimonials.ts`, `faq.ts`, `how-it-works.ts`, `wizard.ts`.
- `src/config/site.ts` — site-wide config and the placeholder stats (see "Known gaps" below).
- `src/i18n` — dictionary-based translation architecture (see below).
- `public/brand`, `public/portraits` — the real logo crop and tutor/founder photos supplied for this build.
- `docs/MH-BRAND-GUIDE.md` — the brand system (colors, type, logo variants, motion, print/merch/interior rules) derived from this codebase's real design tokens, for use beyond the site (signage, merch, print, the physical center).

## i18n architecture

The site is trilingual: **English (default), Armenian, Russian** — in that order in the language switcher (`src/components/layout/LanguageSwitcher.tsx`, in the header and mobile menu). `src/i18n/config.ts` declares the three locales; `src/i18n/dictionaries/{en,hy,ru}.ts` each hold a full, independently-written translation of every UI-chrome string (nav, hero, wizard, booking, FAQ headings, legal-page copy, etc.), typed via the `Dictionary` type (English is the base; `Dictionary = typeof en`'s shape, values are `string` so locales can diverge freely).

**Switching is client-side only, with no per-locale routing** (there is no `/en`, `/hy`, `/ru` in the URL). `I18nProvider` (`src/i18n/provider.tsx`) renders the server-sent `defaultLocale` (English) on first paint, then on mount checks `localStorage` for a saved preference and swaps to it — so repeat visitors see one brief re-render into their saved language rather than a clean SSR match. Building real locale-prefixed routing would remove that flash but is a materially bigger change than this client-side switcher; the trade-off is intentional given the scope of this build. SEO metadata (`<html lang>`, OpenGraph, JSON-LD) reflects the English default only, for the same reason — crawlers won't see the Armenian or Russian text.

**Content localization** (`src/data/{tutors,subjects,wizard,faq}.ts`) follows an overlay pattern: the base arrays are the English/Russian source data (mixed — see each file), and a `translations` map keyed by locale + a stable id (tutor `slug`, subject `slug`, wizard option `id`) supplies the other locales. Each file exports a `localize*()` function (`localizeTutor`, `localizeTutors`, `localizeSubjects`, `localizeWizardOptions`, `localizeFaq`) that consuming components call with the active locale from `useLocale()`. **Testimonials and tutor reviews are deliberately left untranslated** in every locale — they're written as quotes from real people in whatever language they actually used, the same way a review platform doesn't auto-translate reviews by default; only the section chrome around them (headings, labels) is localized.

Known limitation: Playfair Display/Inter (the two loaded fonts) don't cover the Armenian script, so Armenian copy renders in the browser's fallback serif/sans rather than the brand typeface. The Armenian translations themselves are LLM-drafted, not reviewed by a native speaker — treat them as a solid first draft, not final copy, especially the question-particle (՞) placement and any idiom-heavy sentences.

## Booking / matching architecture

- The 4-step trial-lesson form (`src/components/booking/BookingModal.tsx`) posts through `submitBookingRequest()` in `src/lib/booking.ts`, which currently only simulates latency — there is no backend wired up. That function is the single integration seam for Supabase / email / WhatsApp, documented inline.
- The homepage's subject-matching wizard and the "Subjects" grid both write into `TutorFilterContext` and scroll to the Tutors section, filtering the (local, demo) tutor list by subject — this is the shape a real search/matching query would replace.

## Known gaps — read before treating this as launch-ready

- **Stats are placeholders.** `siteConfig.stats` (students/tutors/subjects/rating) are intentionally `"XX+"`/`"X.X"` placeholders, not real numbers — replace them with verified figures before launch.
- **Tutors, reviews and testimonials are demo data**, per the brief. All six tutor profiles use real supplied photos, including the founder (Marianna Hayrapetyan), who is herself the English tutor rather than a separate decorative face; homepage-testimonial authors remain initials placeholders since no photos exist for those personas.
- **No backend.** Booking submissions, the tutor-matching wizard, and tutor data are all local/in-memory. Nothing is persisted or sent anywhere.
- **Armenian translations are LLM-drafted, not native-reviewed** (see i18n section above) — get a native speaker to review before launch.
- **No per-locale routing/SEO.** Language switching is client-side only; search engines and social previews only ever see the English version. See i18n section above.
- **Legal pages are placeholders.** `/privacy` and `/terms` say so explicitly in their own copy (translated into all three locales, but still placeholder legal text).
- **Lighthouse was not run in this environment**; no performance/accessibility scores are claimed. Validate with `npm run build && npm run start` plus your own Lighthouse pass before relying on any number.

## Animation notes

- The opening curtain holds for 3s, then lifts over ~1s (`src/components/splash/IntroProvider.tsx`). Hero content is synced to the same `IntroProvider` phase (not `whileInView`) so its reveal plays in step with the curtain lifting rather than firing while still hidden underneath it.
- `prefers-reduced-motion` shortens the curtain hold/reveal substantially (200ms/250ms) instead of skipping it outright, and the rest of the site's animations respect the OS setting via the global CSS reduced-motion override in `globals.css`.
- All scroll-triggered reveals use a custom `useRevealInView` hook (`src/lib/useRevealInView.ts`) instead of Framer Motion's `whileInView` directly — during QA, `whileInView` occasionally left the first element of a stagger group permanently stuck at its hidden state when it was already on-screen the instant its observer attached. The hook adds an explicit "already visible at mount" fallback check to close that gap.
