import { NextResponse } from "next/server";
import { Resend } from "resend";
import { readFile } from "fs/promises";
import path from "path";
import { createStudyToken } from "@/lib/studyToken";

// Environment variable (same one used by /api/lead — set in Vercel/hosting panel):
// RESEND_API_KEY -> from https://resend.com

const LEAD_INBOX = "info@taxi-werbung.org";

// Study PDFs live OUTSIDE the public/ folder (in /private-documents) so there is
// no public URL that could ever serve them directly — the only way a study
// leaves the server is as an email attachment after a visitor submits this form.
// If a file is missing, the request still succeeds (the lead is still captured
// and the team is notified), it just can't attach that specific PDF yet.
const STUDY_FILES: Record<string, { filename: string; label: string }> = {
  febreze: {
    filename: "ac-nielsen-studie-febreze.pdf",
    label: "AC-Nielsen-Studie – Febreze-Taxiwerbung",
  },
  porta: {
    filename: "hochschule-fresenius-studie-porta.pdf",
    label: "Hochschule-Fresenius-Studie – porta-Taxiwerbung",
  },
};

type StudyRequestPayload = {
  name: string;
  company: string;
  email: string;
  study: "febreze" | "porta";
  locale?: string;
};

export async function POST(request: Request) {
  let data: StudyRequestPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { name, company, email, study, locale } = data;

  if (!name || !company || !email || !study || !STUDY_FILES[study]) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json({ ok: false, error: "server_not_configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const studyInfo = STUDY_FILES[study];

  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Try to load the actual PDF from disk. If it's not there yet (e.g. the
  // AC Nielsen study hasn't been supplied), we don't fail the whole request —
  // the lead is still valuable and the team can follow up manually.
  let attachment: { filename: string; content: Buffer } | null = null;
  try {
    const filePath = path.join(process.cwd(), "private-documents", studyInfo.filename);
    const buffer = await readFile(filePath);
    attachment = { filename: studyInfo.filename, content: buffer };
  } catch {
    console.warn(`Study PDF not found on disk for "${study}" (${studyInfo.filename}). Sending without attachment.`);
  }

  try {
    // 1. Email the visitor — a backup copy / paper trail, not the primary delivery.
    const visitorResult = await resend.emails.send({
      from: "Taxi-Werbung.org <noreply@taxi-werbung.org>",
      to: email,
      replyTo: LEAD_INBOX,
      subject: `Ihre angeforderte Studie: ${studyInfo.label}`,
      html: `
        <p>Hallo ${escapeHtml(name)},</p>
        <p>vielen Dank für Ihr Interesse. Anbei finden Sie die vollständige Studie „${escapeHtml(studyInfo.label)}".</p>
        ${attachment ? "" : "<p>Unser Team stellt Ihnen die Studie in Kürze persönlich zu.</p>"}
        <p>Bei Fragen erreichen Sie uns jederzeit unter info@taxi-werbung.org.</p>
        <p>Beste Grüße<br/>Ihr Taxi-Werbung.org Team</p>
      `,
      attachments: attachment ? [attachment] : undefined,
    });

    if (visitorResult.error) {
      // Don't block the study handoff on the confirmation email — the
      // visitor still gets immediate access via the signed link below.
      console.error("Study confirmation email failed:", visitorResult.error);
    }

    // 2. Notify the team — this is the actual lead-generation step, and the
    //    lead is considered "saved" once this succeeds (it lands in a real,
    //    retrievable inbox: info@taxi-werbung.org).
    const teamResult = await resend.emails.send({
      from: "Taxi-Werbung.org Website <noreply@taxi-werbung.org>",
      to: LEAD_INBOX,
      replyTo: email,
      subject: `Neue Studienanfrage: ${studyInfo.label}`,
      html: `
        <h2>Neue Studienanfrage</h2>
        <p><strong>Studie:</strong> ${escapeHtml(studyInfo.label)}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Unternehmen:</strong> ${escapeHtml(company)}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
        <p><small>Sprache: ${escapeHtml(locale || "de")} ${attachment ? "" : "— HINWEIS: PDF-Anhang fehlte auf dem Server, bitte manuell nachsenden."}</small></p>
      `,
    });

    if (teamResult.error) {
      console.error("Lead notification email failed:", teamResult.error);
      return NextResponse.json({ ok: false, error: "email_error" }, { status: 502 });
    }

    // 3. Issue a signed, single-study, 15-minute link so the visitor can be
    //    redirected straight to the complete study — no waiting on email.
    const { token, exp } = createStudyToken(study);
    const downloadUrl = `/api/study-file?study=${encodeURIComponent(study)}&exp=${exp}&token=${token}`;

    return NextResponse.json({ ok: true, downloadUrl });
  } catch (err) {
    console.error("Study request error:", err);
    return NextResponse.json({ ok: false, error: "unexpected_error" }, { status: 500 });
  }
}
