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

## i18n architecture

`src/i18n/config.ts` declares four locales (`ru`, `hy`, `ka`, `en`); `src/i18n/dictionaries/ru.ts` is the single source of truth for all UI chrome strings (nav, hero, wizard, booking, etc.), typed via the `Dictionary` type. `hy.ts`, `ka.ts` and `en.ts` currently re-export the Russian dictionary — they are wired into the architecture (same shape, same `getDictionary(locale)` lookup, a `useDictionary()`/`useLocale()` context) but **not yet translated**, per the brief ("реализовать полностью RU" first). Adding real translations is then just filling in those three files; no component changes are needed. Locale-prefixed routing (`/en/...`) was intentionally not built yet, since only one locale renders today — that's the next step when translations exist.

Tutor bios, testimonials and FAQ content live in `src/data/*.ts` as structured records rather than the dictionary, since they're content, not UI chrome.

Known limitation: Playfair Display/Inter (the two loaded fonts) don't cover Armenian or Georgian scripts, so `hy`/`ka` copy will fall back to the browser's default serif/sans until a script-appropriate font is added for those locales.

## Booking / matching architecture

- The 4-step trial-lesson form (`src/components/booking/BookingModal.tsx`) posts through `submitBookingRequest()` in `src/lib/booking.ts`, which currently only simulates latency — there is no backend wired up. That function is the single integration seam for Supabase / email / WhatsApp, documented inline.
- The homepage's subject-matching wizard and the "Subjects" grid both write into `TutorFilterContext` and scroll to the Tutors section, filtering the (local, demo) tutor list by subject — this is the shape a real search/matching query would replace.

## Known gaps — read before treating this as launch-ready

- **Stats are placeholders.** `siteConfig.stats` (students/tutors/subjects/rating) are intentionally `"XX+"`/`"X.X"` placeholders, not real numbers — replace them with verified figures before launch.
- **Tutors, reviews and testimonials are demo data**, per the brief. Six tutor profiles use real supplied photos (five tutors + the founder in the Hero); the two testimonial-author avatars remain initials placeholders since no photos exist for those personas.
- **No backend.** Booking submissions, the tutor-matching wizard, and tutor data are all local/in-memory. Nothing is persisted or sent anywhere.
- **hy/en/ka copy is not translated** (see i18n section above).
- **Legal pages are placeholders.** `/privacy` and `/terms` say so explicitly in their own copy.
- **Lighthouse was not run in this environment**; no performance/accessibility scores are claimed. Validate with `npm run build && npm run start` plus your own Lighthouse pass before relying on any number.

## Animation notes

- The opening curtain holds for 3s, then lifts over ~1s (`src/components/splash/IntroProvider.tsx`). Hero content is synced to the same `IntroProvider` phase (not `whileInView`) so its reveal plays in step with the curtain lifting rather than firing while still hidden underneath it.
- `prefers-reduced-motion` shortens the curtain hold/reveal substantially (200ms/250ms) instead of skipping it outright, and the rest of the site's animations respect the OS setting via the global CSS reduced-motion override in `globals.css`.
- All scroll-triggered reveals use a custom `useRevealInView` hook (`src/lib/useRevealInView.ts`) instead of Framer Motion's `whileInView` directly — during QA, `whileInView` occasionally left the first element of a stagger group permanently stuck at its hidden state when it was already on-screen the instant its observer attached. The hook adds an explicit "already visible at mount" fallback check to close that gap.
