import { NextResponse } from "next/server";
import { Resend } from "resend";


const LEAD_INBOX = "info@taxi-werbung.org";

type LeadPayload = {
  company: string;
  contactName: string;
  email: string;
  phone?: string;
  message?: string;
  locale?: string;
};

export async function POST(request: Request) {
  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { company, contactName, email, phone, message, locale } = data;

  // Only company, contact person, and email are required — phone and message are optional,
  // matching the shortened form (city removed) to keep the barrier to submitting as low as possible.
  if (!company || !contactName || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json({ ok: false, error: "server_not_configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const subject = `Neue Anfrage von ${company} — Taxi-Werbung.org`;
  const html = `
    <h2>Neue Kontaktanfrage</h2>
    <p><strong>Firma:</strong> ${escapeHtml(company)}</p>
    <p><strong>Ansprechpartner:</strong> ${escapeHtml(contactName)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone || "-")}</p>
    <p><strong>Nachricht:</strong><br/>${escapeHtml(message || "-").replace(/\n/g, "<br/>")}</p>
    <p><small>Sprache: ${escapeHtml(locale || "de")}</small></p>
  `;

  try {
    const result = await resend.emails.send({
      // taxi-werbung.org is verified in Resend, so sending from an address on
      // this domain removes the shared sandbox sender's "only send to your own
      // email" restriction and lets mail reach info@taxi-werbung.org directly.
      from: "Taxi-Werbung.org Website <noreply@taxi-werbung.org>",
      to: LEAD_INBOX,
      replyTo: email,
      subject,
      html,
    });

    if (result.error) {
      console.error("Resend send failed:", result.error);
      return NextResponse.json({ ok: false, error: "email_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json({ ok: false, error: "unexpected_error" }, { status: 500 });
  }
}