/**
 * MH's approved pricing system (from the business plan) — AMD, monthly
 * packages (~8 lessons/month for group/mini-group/individual, up to 12 for
 * Exam Intensive). Fixed numbers, not sourced from market research — do not
 * change these without the owner's explicit sign-off. A September 2026 web
 * search of Yerevan tutoring marketplaces (5legko.com, tutoronline.ru) found
 * individual per-lesson online rates around $8–15 (≈ 3,200–6,000 AMD); no
 * Vanadzor-specific listings turned up to compare against directly. That
 * makes MH's ~80,000 AMD/month individual package (≈ 10,000 AMD/lesson at 8
 * lessons) sit above the low end of that per-lesson marketplace range, which
 * is plausible for a *packaged, diagnostic + progress-tracked* offering
 * rather than a single freelance lesson — but it's a real gap worth the
 * owner's own comparison, not something to silently reconcile in code.
 */

export type FormatId = "group" | "miniGroup" | "individual" | "examIntensive";

export const CURRENCY = "AMD";

export interface SizeTier {
  size: number;
  pricePerStudent: number;
}

export const groupSizes: SizeTier[] = [
  { size: 4, pricePerStudent: 52000 },
  { size: 5, pricePerStudent: 50000 },
  { size: 6, pricePerStudent: 48000 },
];

export const miniGroupSizes: SizeTier[] = [
  { size: 2, pricePerStudent: 60000 },
  { size: 3, pricePerStudent: 56000 },
];

export const individualPrice = 80000;

export const examIntensive = {
  group: 60000,
  individual: 96000,
};

/** The lowest advertised "from" price for each top-level format card. */
export const formatFromPrice: Record<FormatId, number> = {
  group: Math.min(...groupSizes.map((g) => g.pricePerStudent)),
  miniGroup: Math.min(...miniGroupSizes.map((g) => g.pricePerStudent)),
  individual: individualPrice,
  examIntensive: examIntensive.group,
};

export const multiSubjectDiscount = {
  two: 0.1,
  threeOrMore: 0.15,
} as const;

/** Two lessons in the same subject never count as two subjects. */
export function getSubjectDiscountPercent(distinctSubjectCount: number): number {
  if (distinctSubjectCount >= 3) return multiSubjectDiscount.threeOrMore;
  if (distinctSubjectCount === 2) return multiSubjectDiscount.two;
  return 0;
}

export interface PriceBreakdown {
  unitPrice: number;
  subjectCount: number;
  subtotal: number;
  discountPercent: number;
  discount: number;
  total: number;
}

export function computePrice(unitPrice: number, subjectCount: number): PriceBreakdown {
  const count = Math.max(1, subjectCount);
  const subtotal = unitPrice * count;
  const discountPercent = getSubjectDiscountPercent(count);
  const discount = Math.round(subtotal * discountPercent);
  return { unitPrice, subjectCount: count, subtotal, discountPercent, discount, total: subtotal - discount };
}

export function formatAmd(amount: number): string {
  return `${amount.toLocaleString("ru-RU").replace(/,/g, " ")} ${CURRENCY}`;
}

/**
 * Resolves the per-student/month unit price for a format + its sub-choice:
 * group/miniGroup take a student-count string ("4", "5", "6" / "2", "3"),
 * examIntensive takes "group" or "individual", individual ignores it. Shared
 * by the pricing section, the booking modal's live estimate, and the
 * WhatsApp/Telegram message builder so the three never drift apart.
 */
export function resolveUnitPrice(format: string, subChoice: string): number | null {
  if (format === "group") {
    return groupSizes.find((g) => String(g.size) === subChoice)?.pricePerStudent ?? null;
  }
  if (format === "miniGroup") {
    return miniGroupSizes.find((g) => String(g.size) === subChoice)?.pricePerStudent ?? null;
  }
  if (format === "individual") return individualPrice;
  if (format === "examIntensive") {
    return subChoice === "individual" ? examIntensive.individual : examIntensive.group;
  }
  return null;
}
