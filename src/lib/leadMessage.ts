import { siteConfig } from "@/config/site";
import type { BookingPayload } from "@/lib/booking";
import { computePrice, formatAmd, resolveUnitPrice, type FormatId } from "@/data/pricing";

export interface LeadMessageInput extends Partial<BookingPayload> {
  locale: string;
  sourcePath?: string;
}

/** Builds the plain-text message handed to WhatsApp/Telegram's prefill URL. */
export function buildLeadMessage(input: LeadMessageInput): string {
  const unitPrice =
    input.format && input.groupSize ? resolveUnitPrice(input.format, input.groupSize) : null;
  const subjectCount = Number(input.subjectCount) || 1;
  const priceLine =
    unitPrice != null
      ? (() => {
          const { total, discountPercent } = computePrice(unitPrice, subjectCount);
          return discountPercent > 0
            ? `Estimated price: ${formatAmd(total)}/month (${Math.round(discountPercent * 100)}% multi-subject discount applied)`
            : `Estimated price: ${formatAmd(total)}/month`;
        })()
      : null;

  const lines = [
    `${siteConfig.shortName} — new request`,
    `Language: ${input.locale}`,
    input.subject && `Subject: ${input.subject}`,
    input.format && `Format: ${input.format}${input.groupSize ? ` (${input.groupSize})` : ""}`,
    input.subjectCount && `Number of subjects: ${input.subjectCount}`,
    priceLine,
    input.wantsGuarantee && "Interested in the result-guarantee program",
    input.goal && `Goal: ${input.goal}`,
    input.level && `Level: ${input.level}`,
    input.time && `Preferred time: ${input.time}`,
    input.name && `Name: ${input.name}`,
    input.age && `Student age: ${input.age}`,
    input.phone && `Phone: ${input.phone}`,
    input.comment && `Comment: ${input.comment}`,
    input.sourcePath && `Page: ${siteConfig.url}${input.sourcePath}`,
  ].filter(Boolean);

  return lines.join("\n");
}

/** null when no WhatsApp number is configured yet — see site.ts leadCapture. */
export function getWhatsAppUrl(message: string): string | null {
  const digits = siteConfig.leadCapture.whatsappNumber.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** null when no Telegram username is configured yet — see site.ts leadCapture. */
export function getTelegramUrl(message: string): string | null {
  const username = siteConfig.leadCapture.telegramUsername.replace(/^@/, "").trim();
  if (!username) return null;
  return `https://t.me/${username}?text=${encodeURIComponent(message)}`;
}

export type { FormatId };
