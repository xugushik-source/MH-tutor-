export interface BookingPayload {
  name: string;
  age: string;
  subject: string;
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

/**
 * Submits a trial-lesson request.
 *
 * No backend is wired up in this build. This is the single seam where a
 * real integration plugs in later:
 *  - Supabase: insert into a `bookings` table via the Supabase client.
 *  - Email: POST to an API route that sends via a transactional provider.
 *  - WhatsApp: build a `wa.me` deep link (or Business API call) from the
 *    payload and either open it client-side or send it server-side.
 * For now it only simulates network latency so the UI's loading/success
 * states are real and testable.
 */
export async function submitBookingRequest(payload: BookingPayload): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (process.env.NODE_ENV === "development") {
    console.info("[booking] demo submission (no backend wired up):", payload);
  }
  return { ok: true };
}
