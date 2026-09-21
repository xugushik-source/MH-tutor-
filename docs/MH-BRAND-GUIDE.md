# MH Brand Guide

**Marianna Hayrapetyan Tutoring Center**

This document is derived **entirely from the existing codebase** — every color, radius, shadow, font and motion rule below is copied from real files (`src/app/globals.css`, `src/components/**`, `src/app/layout.tsx`), not invented. Where the guide extends into physical/print territory the site's code has no opinion on (interior paint, merch, bleed), each recommendation says explicitly that it's a *derivation* from the digital palette, not a fact already implemented anywhere. Where something the brief assumes is true (e.g. "all tutor photos share one color grade") isn't actually true yet in the codebase, that's flagged rather than quietly assumed — see §11 and the final report.

No colors, fonts, or proportions in this guide are new. Nothing described here required changing how the live site renders, beyond one shadow-value de-duplication (see §14).

---

## 01. Brand concept

MH is a **quiet-premium, editorial tutoring brand** — closer to a well-typeset independent school than an ed-tech product. The visual language (from the site's actual construction) is built on three ideas that show up consistently in the code:

1. **Restraint over decoration.** Structure is drawn with 10–20%-opacity hairlines (`border-espresso/10`), not boxes or heavy dividers. Color is used sparingly — most surfaces are cream or near-white; burgundy and champagne appear only as accents (text, small UI, thin progress bars), never as large fields.
2. **One serif moment, one workhorse sans.** Playfair Display carries every headline and the brand's "voice"; Inter carries everything functional (nav, forms, body copy). The pairing is not decorative — it's a two-role system, and the guide below treats it that way everywhere, including physical materials.
3. **Calm motion.** One easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`) is reused across scroll reveals, the opening curtain, the accordion and hover states. Nothing bounces, elastics, or overshoots. Physical/print motion equivalents (video intros, kiosk screens) should keep this same curve.

Founder positioning: Marianna Hayrapetyan is the center's actual English tutor, not a separate decorative figurehead — her real photo is the site's primary photography reference point (see §11) and should remain so across all physical/print material (letterhead, office signage, welcome kits).

---

## 02. Logo

**Assets that exist today** (`public/brand/`, rendered via `src/components/brand/Logo.tsx`):

| File | Use |
|---|---|
| `mh-logo-full.png` | Full lockup (monogram + wordmark), flattened PNG |
| `mh-monogram-burgundy.png` | Transparent monogram, burgundy ink — for light/cream backgrounds |
| `mh-monogram-cream.png` | Transparent monogram, cream ink — for dark/espresso backgrounds |

The monogram is always rendered at a fixed aspect ratio of **840:605** (`aspect-[840/605]`, ≈ 1.39:1 landscape) — this ratio is load-bearing for the mark and must be preserved in every derivative (signage, merch, favicon).

**The header's "horizontal lockup" is composed live, not a flat asset**: the monogram image (`h-8`, ~32px tall) sits next to the plain-text wordmark "Marianna Hayrapetyan" set in Playfair Display, with an 0.625rem gap (`gap-2.5`). This is the canonical horizontal-lockup construction rule — reproduce it the same way (image + typeset text, not a flattened logo file) anywhere it needs to scale, so the wordmark stays crisp.

**Minimum required variants and their current status:**

| Variant | Status |
|---|---|
| 1. Primary (monogram + wordmark) | ✅ exists (composed, see above) |
| 2. Horizontal | ✅ exists (same composition, default orientation) |
| 3. Vertical (stacked) | ⚠️ not built as an asset — derive by stacking the monogram above centered wordmark text; same ratio and inks |
| 4. Monogram only | ✅ exists (`mh-monogram-*.png`) |
| 5. On dark background | ✅ exists (`mh-monogram-cream.png`) |
| 6. On light background | ✅ exists (`mh-monogram-burgundy.png`) |
| 7. Single-color / one-ink (for engraving, embroidery, one-color print) | ⚠️ not built — derive a pure-black and pure-white silhouette from the same monogram artwork before ordering engraving, stitching or single-color stamping |

**Do not** generate a new monogram shape. The two missing variants (vertical stack, one-ink silhouette) are the *same* mark re-composed/re-colored, produced with the identical masking technique already used to make the two existing tone variants — not a redraw.

## 03. Logo clear space

No clear-space rule exists in code today (the header simply gives the logo a fixed height and lets flex gaps do the spacing). Adopt, as a print/physical rule: minimum clear space on all sides equal to the height of the monogram itself (i.e. a 1:1 clear-space multiple of its own bounding box). Never let text, photography, or other logos enter that zone.

## 04. Logo misuse

- Do not recolor the monogram outside the two approved inks (burgundy `#5C1A2E`, cream `#F7F1E6`) plus the one-ink black/white variants above — never champagne, never a gradient.
- Do not stretch or crop the 840:605 ratio.
- Do not place the burgundy monogram on anything darker than mid-tone (contrast fails) — use the cream monogram on any espresso/dark or photographic background.
- Do not rebuild the wordmark in any font other than Playfair Display, or flatten it into the monogram artwork.
- Do not add drop shadows, outlines, or bevels — the site never applies effects to the logo itself (shadows in the UI sit on cards/panels, never on the mark).

---

## 05. Primary colors

Copied verbatim from `src/app/globals.css`:

| Token (code) | Hex | Role in the live site |
|---|---|---|
| `--color-cream` | `#F7F1E6` | Page background, primary surface, text-on-dark |
| `--color-burgundy` | `#5C1A2E` | Primary brand accent — CTAs, links, eyebrow labels, focus states |
| `--color-burgundy-deep` | `#3C1120` | Hover/active state for burgundy elements |
| `--color-espresso` | `#221510` | Primary text color, near-black neutral |

## 06. Secondary colors

| Token (code) | Hex | Role in the live site |
|---|---|---|
| `--color-cream-dim` | `#EFE6D3` | Secondary/alternate section background (zoning, not the base page) |
| `--color-cream-line` | `#E2D5B8` | Reserved hairline tone (declared, lightly used) |
| `--color-burgundy-soft` | `#7A2C42` | Lighter burgundy — gradient highlight on placeholder art, never flat UI |
| `--color-espresso-soft` | `#35241D` | Secondary dark — gradient/depth tone, secondary text emphasis |
| `--color-champagne` | `#C9A876` | Gold accent — ratings/stars, badges, "premium" micro-details |
| `--color-champagne-soft` | `#E2CDA3` | Lighter gold — gradient highlight |

**Suggested cross-media alias table** (for use outside the codebase — print vendors, interior designers, merch suppliers — who won't read Tailwind config). These are the *same* hex values above, just named for people who aren't reading CSS. They are documented here, not duplicated as a second set of CSS variables in `globals.css` — adding a parallel `--mh-*` token set in code that only re-points to `--color-*` would create two sources of truth for the same nine colors with no functional benefit to the app itself.

```
--mh-cream         #F7F1E6   (background / primary)
--mh-cream-dim      #EFE6D3   (surface / secondary background)
--mh-cream-line     #E2D5B8   (hairline)
--mh-primary        #5C1A2E   (burgundy — brand primary)
--mh-primary-dark    #3C1120   (burgundy deep — hover/active)
--mh-primary-light    #7A2C42   (burgundy soft — highlight only)
--mh-text          #221510   (espresso — primary text)
--mh-text-soft       #35241D   (espresso soft — secondary dark)
--mh-gold           #C9A876   (champagne — accent/gold)
--mh-gold-light       #E2CDA3   (champagne soft — highlight)
```

**Text-opacity as a "muted text" scale.** The site never defines separate muted-text colors — it applies opacity to `--color-espresso` instead (`text-espresso/40` through `/85` appear throughout). Treat this as the real, already-consistent token system for text hierarchy:

| Effective role | Implementation |
|---|---|
| Primary text | `espresso` @ 100% |
| Secondary text | `espresso` @ 65–75% |
| Muted / meta text | `espresso` @ 45–55% |
| Disabled / faintest | `espresso` @ 40% |

Reproduce this the same way in print (dark grey/brown ink tints of the same base ink) rather than introducing separate grey colors.

**No colors exist in the codebase outside this list.** There is no unexplained green, teal, or random gold anywhere in `src/` — the "no random green" instruction in the brief is already true of the current build; the earlier in-session idea of moving to a green/cream palette was **not applied** and should stay that way per this task's own instruction to work from real existing values only.

---

## 07. Typography

From `src/app/layout.tsx`:

| Role | Font | Loaded via | Subsets |
|---|---|---|---|
| Display / headings | **Playfair Display** (serif) | `next/font/google`, CSS var `--font-playfair`, class `.font-display` | latin, cyrillic |
| Body / UI | **Inter** (sans) | `next/font/google`, CSS var `--font-inter` | latin, cyrillic |

**Known real gap:** neither font covers Armenian glyphs. Armenian copy currently falls back to the browser's default serif/sans. Any physical material (signage, certificates) that includes Armenian text must either (a) accept the same fallback-safe pairing (a Unicode-complete serif/sans pair chosen to visually match Playfair/Inter) or (b) source an Armenian-covering companion typeface before ordering print — **do not** render Armenian text as a flattened image of AI-generated glyphs to dodge this; see §17.

**Type roles actually used in code:**

- **Eyebrow label** (`.eyebrow` utility, `globals.css`): 0.75rem, uppercase, `letter-spacing: 0.22em`, `font-weight: 600`, typically colored `burgundy`. This is the brand's signature "section intro" device — reuse it verbatim on print/signage section headers (e.g. above a classroom name plaque: "CLASSROOM · КАБИНЕТ").
- **Display headline**: Playfair Display, `text-4xl` to `text-5xl`+ on the web; scales up freely for large signage.
- **Body**: Inter, `text-sm`/`text-base`, `leading-relaxed` for paragraph copy.

## 08. Buttons

Two button types exist in the codebase; there is no third pattern to invent:

**Primary** — `bg-burgundy text-cream rounded-full`, hover → `bg-burgundy-deep`. Padding varies by context (`px-6 py-2.5` to `px-6 py-3`). Disabled state: `opacity-40 cursor-not-allowed` (no color change).

**Secondary / outline** — `border border-espresso/20 text-espresso rounded-full`, hover → `border-espresso/50` (border darkens; no fill, no color swap). This is the quiet secondary action — always a pill, never filled.

Both are always **fully rounded (pill)**, never square or soft-rounded — this is a hard rule across the entire site (every button, everywhere).

## 09. Cards

- Background: `cream`
- Border: `border-espresso/10` (hairline, not a heavy stroke)
- Radius: `rounded-2xl` (1rem) for standard tiles; `rounded-[1.75rem]` (28px) for feature cards like the tutor card
- Shadow: **flat by default**, gains `shadow-xl shadow-espresso/10` (or `/15`) only on hover — the site does not use resting drop shadows on ordinary cards, only hover-elevation
- Larger framed panels (hero image, the "class experience" mockup panel, the booking modal) use a bigger radius, `rounded-[2rem]` (32px), and a stronger resting shadow (`shadow-2xl shadow-espresso/10` up to `/25` for the hero)

So there are, precisely, **two card radii** in the live system — 28px for a "feature card" and 32px for a "framed panel" — plus 16px (`rounded-2xl`) for small in-panel tiles, and full-pill for anything interactive. That's a deliberate 3-step scale, not inconsistency; keep it as exactly these three steps everywhere new is built (print cards, badges, merch item corners) rather than inventing a fourth.

## 10. Icons

Icon set: **lucide-react** (confirmed via imports in `ClassExperience.tsx`, `Header.tsx`, `BookingModal.tsx` — `Mic`, `Video`, `FileText`, `NotebookPen`, `ListChecks`, `TrendingUp`, `Star`, `Menu`, `X`, `Check`). Icons are line-style (stroke, not filled), sized small (`h-4 w-4` typical, up to `h-5 w-5`), and colored either `espresso/60` (neutral/utility icons) or `burgundy` (accent icons next to a labeled block, e.g. the materials/notes/homework icons in the class-experience panel). Keep new icon usage inside the Lucide set and this same two-color rule (neutral utility vs. burgundy emphasis) — don't mix in a filled icon style.

## 11. Photography style

**What's actually true today, from `public/portraits/`:** six tutor photos plus one demo student photo, portrait-oriented (~4:5 ratio — this exact ratio was the fix for two real cropping bugs earlier in this project, so it is load-bearing, not incidental), processed individually via a resize-to-900px-wide / JPEG quality ~82–85 export pass, `object-cover` inside rounded frames with a soft espresso shadow. No color grade, filter, or background-treatment pass has been applied across them as a set — each photo was sourced and cropped on its own.

**Read this as a gap, not a spec.** The brief asks for "identical color temperature, identical background logic" — that is not true of the current photo set and shouldn't be presented to the user as if it already were. For any *new* photography (new tutors, interior/staff photography, welcome-kit shots), lock these rules before shooting, rather than fixing it after the fact in fifteen different files:

- Portrait orientation, ~4:5 crop ratio, subject centered with headroom matching the existing six (don't crop tight on the chin — that's the exact bug that had to be fixed twice already)
- Neutral or softly blurred background — never a busy backdrop, never a stock-photo studio gradient
- Warm, natural skin tones consistent with the cream/burgundy palette's warmth — no cool/blue color grade
- Export at the same pipeline used already (resize to 900px wide, JPEG q82–85) so file weight and sharpness stay consistent
- **No AI-generated faces, ever** — Marianna's photo in particular is the visual anchor for the whole brand; her face, hair and age must never be altered or regenerated in any derivative use (merch, print, signage)

## 12. Illustration style

There is no illustration system in the codebase — the site uses photography and the `PlaceholderPortrait` component (a brand-toned gradient field with an initial, used only when a real photo is absent) rather than any drawn/illustrated artwork. Do not introduce an illustration style (icon-people, line-art mascots, etc.) without treating it as a genuinely new brand decision — it has no precedent to extend here.

## 13. Backgrounds

- Base page background: flat `cream` (`#F7F1E6`) — confirmed in `body { background: var(--background) }`
- Section-alternation background: `cream-dim` (`#EFE6D3`) — used to visually separate stacked sections (e.g. `ClassExperience` sits on `bg-cream-dim`) without a hard border
- No photographic, textured, or patterned backgrounds anywhere in the code — backgrounds are always flat color
- The only "gradient" backgrounds in the whole codebase are the three placeholder-portrait tone fields (§15) — gradients are reserved exclusively for that one stand-in use case and never appear behind real content

## 14. Decorative elements

- **Hairline structure**: `border-espresso/10` through `/20` draws every visual boundary (cards, header pill, dividers) — this replaces "decoration" almost entirely; the brand doesn't use ornament, it uses restraint
- **Eyebrow labels** as the recurring section-intro device (see §07)
- **`--shadow-soft`** (`0 8px 30px rgba(34,21,16,0.08)`, newly named in `globals.css` — previously typed inline in `Header.tsx` as a raw value, now centralized as this one shared token so it isn't retyped by hand elsewhere) is the header's floating-pill shadow on scroll — the softest, most restrained shadow in the system; use it for any "just barely lifted" surface (a floating nav, a sticky footer bar) rather than inventing a new soft-shadow value
- **Radial sheen overlay**: a very faint (`opacity-[0.07]`, `mix-blend-overlay`) radial white gradient sits over every `PlaceholderPortrait` tone field — a small "premium" polish detail applied only to generated/stand-in art, never to real photography or flat UI chrome
- Star rating icon (Lucide `Star`, filled champagne) is the one deliberate use of a "gold" filled icon in the whole system — reserve champagne-filled icons for rating/achievement contexts specifically, not general decoration

## 15. Motion / animation principles

From `src/lib/useRevealInView.ts`, `IntroProvider.tsx`, and Framer Motion usage throughout:

- **One house easing curve**: `cubic-bezier(0.16, 1, 0.3, 1)` — used for scroll reveals, the accordion's CSS `grid-template-rows` transition, and most Framer Motion transitions. Never use a bounce/elastic/spring-overshoot curve anywhere in the brand.
- Scroll reveals use a custom hook rather than a raw viewport trigger, specifically to guarantee content that's already on-screen at load never gets stuck invisible — the practical rule for any future implementation (web or a physical kiosk/video wall) is: content must always resolve to visible, never depend on a one-shot trigger that can race the initial render.
- Opening curtain: holds 3s, lifts over ~1s; **`prefers-reduced-motion` shortens this to 200–250ms rather than skipping it outright** — the brand's accessibility stance is "shorter, not absent." Apply the same principle to any motion graphics used in social/video: always ship a reduced version, never a hard cut to nothing.
- Hover feedback is subtle and singular: image scale to 105% over 700ms, or a border/shadow appearing — never more than one property animating per interaction, never a bounce.

## 16. Social media style

No social templates exist in the repo today — this section is a direct extension of the rules above, not a description of existing assets. For Instagram/social tiles:

- Cream or cream-dim flat background (never a photo-fill background behind text)
- Playfair Display for the headline word/phrase, Inter for supporting text, eyebrow-style uppercase micro-label above the headline where a category is needed
- Burgundy for the one accent element (a CTA pill, an underline, the monogram); champagne reserved for a small "rating/achievement" badge only, not general accenting
- Photography, when used, follows §11 (portrait orientation, warm neutral, no filter overlays) — do not apply Instagram-style color filters, they will fight the brand's own warm palette
- Full lockup logo (not monogram alone) on the first slide of any carousel/story series for brand identification; monogram alone is fine on subsequent slides

## 17. Print materials

General rule for every printed item: **RGB hex values above are for screen only.** Before any offset or digital print run, convert through the print vendor's ICC profile and get a physical proof — do not trust an uncalibrated on-screen CMYK preview. As a starting point for proofing (not a substitute for a real profile conversion):

| Ink | Hex | Approx. coated-stock CMYK (proof starting point) |
|---|---|---|
| Cream | `#F7F1E6` | 2 / 5 / 10 / 0 |
| Burgundy | `#5C1A2E` | 40 / 90 / 65 / 45 |
| Espresso | `#221510` | 55 / 65 / 70 / 80 |
| Champagne | `#C9A876` | 20 / 30 / 55 / 5 |

**Hard rule, called out explicitly because it's an easy failure mode:** any Armenian text on printed material must be real Unicode text (selectable/editable in the source file), never a flattened image of AI-generated or garbled glyphs. Given the codebase's own Armenian translations are LLM-drafted and *not yet reviewed by a native speaker* (documented in `README.md`), get native proofreading on the specific Armenian copy before it goes to print — this is more urgent for permanent physical material (signage, certificates) than for a website string that can be corrected in a redeploy.

QR codes must always encode a real, working URL (the site, a specific booking link, a WhatsApp deep link once §25-style integration exists) — never a decorative/non-functional QR pattern.

Per-item specs to fill in against your actual print vendor before ordering (structure only — exact numbers depend on the vendor/stock chosen):

| Item | Typical size | Bleed | Safe area | Min. logo size | Min. QR size |
|---|---|---|---|---|---|
| Business card | 90×50mm | +3mm/side | 5mm inset | monogram ≥ 8mm tall | — |
| Folder (A4 cover) | 210×297mm | +3mm/side | 8mm inset | full lockup ≥ 25mm wide | 20mm |
| Certificate | A4 landscape | +3mm/side | 12mm inset | full lockup ≥ 30mm wide | — |
| Sticker (die-cut monogram) | 40–60mm | +2mm | n/a | n/a | — |
| Signage plaque (room door) | 200×80mm | n/a (rigid substrate) | 6mm inset | monogram ≥ 20mm tall | — |
| Tote bag print area | ~250×250mm | n/a (textile) | keep clear of seams | full lockup ≥ 60mm wide | — |

Minimum QR size in general: never smaller than 15×15mm in print, and always test-scan the proof before a full run.

## 18. Merchandise

Every item below uses **only** the palette in §05/§06 — cream as the base/garment color, burgundy as the one primary accent, espresso for grounding/typographic elements, champagne strictly as a "gold trim" detail (foil stamp, thread color, badge rim) rather than a fill color. No item introduces a color not already in the site.

Mark usage: **monogram-only** on small items where a full wordmark would be illegible (pens, pins, buttons, stickers, badge corners); **full horizontal lockup** on anything with a flat surface ≥ ~60mm wide (tote, folder cover, planner cover, laptop sleeve, packaging); **vertical lockup** (§02) where the item is taller than wide (thermos/bottle body, umbrella panel).

| Item | Mark | Notes |
|---|---|---|
| Tote bag | Full lockup, burgundy on cream canvas | |
| Planner / desk calendar | Full lockup on cover, Inter for date grids, burgundy for current-day accent | |
| Pen / pencil | Monogram only, engraved/printed in espresso or champagne foil | |
| Folder | Full lockup, cream stock, burgundy edge/spine accent | |
| Thermos / bottle | Vertical lockup, champagne-rimmed cap as the one metallic accent | |
| T-shirt | Monogram (chest, small) or full lockup (back, large) — cream or espresso garment only | |
| Hoodie | Same rule as T-shirt | |
| Teacher badge | Monogram + name in Inter, champagne trim ring | |
| Student badge | Monogram + first name in Inter, burgundy trim ring (visually distinct from staff) | |
| Achievement certificate | Full lockup header, Playfair Display for the student's name, champagne foil seal/stamp | |
| Stickers | Monogram die-cut, single ink (burgundy or espresso) | |
| Bookmark | Vertical strip, monogram + eyebrow-style tagline "TUTORING CENTER" | |
| Pin | Monogram only | |
| Student welcome kit | Folder + pen + bookmark + sticker sheet, boxed in cream packaging with burgundy belly-band | |
| Teacher welcome kit | Planner + pen + badge + tote, same packaging language | |
| Umbrella | Vertical lockup on one panel only, cream or espresso canopy | |
| Magnet | Monogram only, die-cut to the 840:605 ratio | |
| Laptop sleeve | Full lockup, cream or espresso body | |
| Branded packaging (boxes/bags) | Cream stock, burgundy belly-band or ribbon, monogram stamp — never full-bleed printed pattern | |

## 19. Staff uniform

No uniform exists today; deriving strictly from the site's restraint principle: solid-color garments in cream or espresso (never burgundy or champagne as a garment fill — those stay accents), small monogram embroidery at chest height, optional thin burgundy trim (collar piping, a single stitched line) as the only color accent. Avoid patterned or printed-photo garments — nothing in the brand's visual language supports an all-over pattern.

## 20. Interior

See §22 below for the full space plan. Headline material/color rule, derived directly from how the site itself uses color (large neutral fields, one saturated accent used sparingly, dark neutral for grounding, gold reserved for small trim details — never a wall of gold or a wall of burgundy):

- **Dominant**: cream (`#F7F1E6`) walls and large surfaces — this should cover the large majority of visible wall area, exactly as cream is the dominant background color on every page of the site
- **Secondary zoning**: cream-dim (`#EFE6D3`) for alcoves, one accent wall per room, or ceiling/soffit treatments — mirrors how the site uses cream-dim only to separate sections, never as the primary field
- **Accent, used sparingly**: burgundy (`#5C1A2E`) on doors, one reception feature wall, signage plates, upholstery piping — never a full burgundy room, exactly as the site never fills a large area with burgundy
- **Grounding neutral**: espresso (`#221510`) for flooring tone, furniture frames/legs, door hardware, signage typography — the "ink" of the space the way it's the ink of the page
- **Trim only**: champagne (`#C9A876`) as a metallic-adjacent accent — signage lettering, name plaques, thin inlay lines — never a fill color, exactly as it never fills a UI element on the site, only decorates one (a star, a border)

This is explicitly **not** a luxury-hotel brief: no marble, no gold leaf, no heavy drapery. Honest materials (painted MDF/plywood with a clean edge, matte-finish laminate, simple upholstery) carrying the same restrained color logic as the site is what "premium without showiness" means here.

Corner/edge language: the site's rounded-rectangle system (§09) should show up physically as soft-radius signage plaques, a rounded-edge reception desk, and rounded corners on printed wayfinding — never sharp 90° signage edges, to keep the same visual "hand" as the buttons and cards on-screen.

Lighting: warm-white throughout (not cool/blue-white) — matches the warmth of the cream base the way the site never uses a cold-toned neutral.

## 21. Reception

First branded surface a visitor sees after the entrance. One burgundy accent wall or panel directly behind the desk carrying the **full horizontal lockup** at a size clearly readable from the entrance (large — treat it like a hero headline, matching how prominently the logo sits in the site's own header). Desk front in cream/espresso with a thin champagne inlay line as the one metallic detail. Waiting seating in cream-dim upholstery. A small QR plaque (§17 rules — real link, minimum size, tested scan) near the desk linking to the booking flow.

## 22. Classroom design

3–4 classrooms in the 100–120m² plan: cream walls as the base in every room, with **one** accent wall per room in either cream-dim (quieter subjects) or a soft burgundy-tinted panel (kept to a single wall, never the whole room) for visual variety between rooms without breaking the palette. Door signage: rounded plaque, espresso frame, champagne-lettered room name/number, monogram in the corner. Furniture: light wood or cream/espresso laminate, no bright non-brand colors in furniture or storage bins — if storage needs color-coding for organization, use the palette's own tints rather than introducing primary colors.

## 23. Exterior signage

Storefront/entrance sign: full horizontal lockup or monogram-only (depending on available width), burgundy or espresso ink on a cream or lit-white panel — highest-contrast, most legible variant, since exterior signage has to work at a glance and in varied light. If back-lit, use the cream monogram variant reversed out of an espresso panel for night visibility rather than inventing a new color treatment.

## 24. Wayfinding

Directional signage (arrows, room numbers, floor plans): Inter only (never Playfair for small functional text — matches the site's own display/body split, where Playfair is reserved for headline moments, not UI labels), espresso ink on cream, champagne used only for room-number plates to keep a "premium detail" consistent with how the site uses champagne only for small emphasis elements (ratings), never for body text.

## 25. QR materials

Every QR code placed anywhere physical (reception plaque, welcome kit, certificate, packaging) must:

- Encode a real, live, tested URL (site homepage, a specific booking deep link, or once §25-of-the-original-punchlist WhatsApp/Telegram hand-off exists, that link) — never a placeholder or decorative pattern
- Sit on a cream or white field with sufficient contrast — never printed directly over a photograph or the burgundy field
- Respect the minimum print size from §17 (15×15mm minimum, larger wherever the piece allows)
- Carry a small monogram or the eyebrow-style label "SCAN TO BOOK" near it so it reads as branded, not generic

---

## Digital ↔ physical continuity (why this document exists)

The brief's real goal is that a family's path — **see it on Instagram → visit the site → walk into the center → get handed a folder → meet the tutor → get a progress report → receive a certificate** — never feels like three different companies made three different things. Concretely, that means:

1. Every touchpoint draws from the *same nine colors* in §05/§06 — no touchpoint gets a "special" additional color.
2. The logo is always one of the seven variants in §02, used per the light/dark and horizontal/vertical rules — never redrawn per medium.
3. Playfair Display is always the "voice" (headlines, the founder's name, a certificate recipient's name); Inter is always the "utility" (labels, dates, wayfinding, fine print) — on screen and on paper alike.
4. Rounded, soft-cornered geometry (§09) shows up everywhere physical touches the brand — signage, badges, packaging — the same way it shows up in every card and button on the site.
5. Photography stays documentary/warm/portrait-oriented (§11) everywhere a real person's photo appears — merch, certificates, the site itself — never stock-photo or AI-generated.

---

## Site consistency check (post-audit)

Re-reading the codebase after writing this guide, against the brief's checklist:

- **No stray/random colors** — confirmed; every color in `src/` traces to one of the ten tokens in `globals.css`.
- **No unexplained green or other off-palette hue** — confirmed; the earlier in-session exploration of a green/cream re-theme was never applied to any file.
- **Buttons consistent** — confirmed two-variant system (§08), applied identically in `Header.tsx`, `BookingModal.tsx`, `TutorCard.tsx`, `TutorWizard.tsx`, `Faq.tsx`, `TrialCta`/`FinalScreen`.
- **Cards consistent** — confirmed three-radius scale (§09), no ad-hoc fourth radius found anywhere in `src/components`.
- **Typography consistent** — confirmed two-font system applied via `.font-display` / default body everywhere; no third typeface imported anywhere in `layout.tsx` or elsewhere.
- **Spacing** — not touched or re-tokenized; Tailwind's default spacing scale is already the single source of truth (no raw pixel margins found in the audited files), so there was nothing to centralize here.
- **Shadows** — one duplicated raw value found (`Header.tsx`'s scroll-state pill shadow) and centralized into `--shadow-soft` in `globals.css`; every other shadow already composes from the `espresso`/`burgundy` tokens via Tailwind's opacity modifiers, so it was left as-is.
- **Photography consistency** — **not** actually consistent yet (see §11) — flagged as a gap for future shoots, not silently marked "done."
- **Logo usage** — correct today (burgundy on light, cream on dark, fixed ratio); two variants (vertical, one-ink) don't exist as files yet and are specified in §02 for whoever produces them next, not fabricated here.
- **Mobile responsiveness / animations** — untouched by this task; nothing in `docs/` or the one CSS edit affects layout or motion behavior.
