import { NextResponse } from "next/server";
import { Resend } from "resend";

const INBOX = "info@taxi-werbung.org";
const MAX_FILE_BYTES = 4 * 1024 * 1024; // stays under the serverless request-body limit
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const email = String(form.get("email") || "").trim();
  const message = String(form.get("message") || "").trim();
  const locale = String(form.get("locale") || "de");
  const file = form.get("file");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  let attachments: { filename: string; content: Buffer }[] | undefined;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES || !ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ ok: false, error: "invalid_file" }, { status: 400 });
    }
    attachments = [
      { filename: file.name.replace(/[^\w.\- ]/g, "_"), content: Buffer.from(await file.arrayBuffer()) },
    ];
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json({ ok: false, error: "server_not_configured" }, { status: 500 });
  }

  try {
    const result = await new Resend(apiKey).emails.send({
      from: "Taxi-Werbung.org Website <noreply@taxi-werbung.org>",
      to: INBOX,
      replyTo: email,
      subject: "Motiv prüfen lassen — Anfrage über taxi-werbung.org",
      html: `
        <h2>Anfrage: Motiv prüfen lassen</h2>
        <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Nachricht:</strong><br/>${escapeHtml(message || "-").replace(/\n/g, "<br/>")}</p>
        <p><strong>Anhang:</strong> ${attachments ? "ja" : "nein"}</p>
        <p><small>Sprache: ${escapeHtml(locale)}</small></p>`,
      attachments,
    });
    if (result.error) {
      console.error("Resend send failed:", result.error);
      return NextResponse.json({ ok: false, error: "email_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Motif request error:", err);
    return NextResponse.json({ ok: false, error: "unexpected_error" }, { status: 500 });
  }
}
