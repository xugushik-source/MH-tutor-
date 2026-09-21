import { buildLeadMessage, getWhatsAppUrl, getTelegramUrl } from "@/lib/leadMessage";

export interface BookingPayload {
  name: string;
  age: string;
  subject: string;
  format: string;
  groupSize: string;
  subjectCount: string;
  wantsGuarantee: boolean;
  goal: string;
  level: string;
  time: string;
  phone: string;
  comment: string;
}

export interface BookingPrefill {
  subject?: string;
  goal?: string;
}

export interface BookingContext {
  locale: string;
  sourcePath: string;
}

export interface BookingResult {
  ok: true;
  /** null when no WhatsApp/Telegram contact is configured yet (site.ts leadCapture). */
  whatsappUrl: string | null;
  telegramUrl: string | null;
}

/**
 * Submits a trial-lesson / diagnostic request.
 *
 * There's still no database behind this — the "backend" is the visitor's
 * own WhatsApp or Telegram app. This builds a prefilled deep link carrying
 * the full form context (subject, format, goal, contact details, page the
 * request came from) so the admin gets a ready-to-read message instead of
 * the visitor having to retype everything in the chat. If site.ts's
 * leadCapture contact isn't filled in yet, both URLs come back null and the
 * caller falls back to a plain "we'll be in touch" confirmation.
 */
export async function submitBookingRequest(
  payload: BookingPayload,
  context: BookingContext,
): Promise<BookingResult> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const message = buildLeadMessage({ ...payload, locale: context.locale, sourcePath: context.sourcePath });
  const whatsappUrl = getWhatsAppUrl(message);
  const telegramUrl = getTelegramUrl(message);

  if (process.env.NODE_ENV === "development") {
    console.info("[booking] lead message:", message, { whatsappUrl, telegramUrl });
  }

  return { ok: true, whatsappUrl, telegramUrl };
}
