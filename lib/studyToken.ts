import crypto from "crypto";

// Signs short-lived, single-purpose links to the private study PDFs.
// A visitor only ever gets one of these links back as the *response* to a
// successful /api/study-request submission — there is no public, permanent
// URL to a study anywhere on the site. Links expire after STUDY_LINK_TTL_MS.

const STUDY_LINK_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getSecret(): string {
  // Falls back to RESEND_API_KEY so this works without an extra env var,
  // but a dedicated STUDY_LINK_SECRET is recommended in production.
  const secret = process.env.STUDY_LINK_SECRET || process.env.RESEND_API_KEY;
  if (!secret) {
    throw new Error("Neither STUDY_LINK_SECRET nor RESEND_API_KEY is set.");
  }
  return secret;
}

export function createStudyToken(study: string): { token: string; exp: number } {
  const exp = Date.now() + STUDY_LINK_TTL_MS;
  const token = crypto
    .createHmac("sha256", getSecret())
    .update(`${study}.${exp}`)
    .digest("hex");
  return { token, exp };
}

export function verifyStudyToken(study: string, exp: number, token: string): boolean {
  if (!study || !exp || !token) return false;
  if (Date.now() > exp) return false;

  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(`${study}.${exp}`)
    .digest("hex");

  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(token, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
