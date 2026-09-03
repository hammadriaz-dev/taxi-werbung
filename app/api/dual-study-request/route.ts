import { NextResponse } from "next/server";
import { Resend } from "resend";
import { readFile } from "fs/promises";
import path from "path";
import { createStudyToken } from "@/lib/studyToken";
import { emailShell, emailField, emailNotice } from "@/lib/emailTemplate";

// Powers the combined "Beide Studien kostenlos erhalten" box: a single email
// field that requests BOTH studies at once, with no extra click and no
// intermediate page — per the client's explicit funnel requirement.

const LEAD_INBOX = "info@taxi-werbung.org";

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

type DualRequestPayload = {
  email: string;
  locale?: string;
};

export async function POST(request: Request) {
  let data: DualRequestPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { email, locale } = data;
  if (!email || !email.includes("@")) {
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

  // Load both PDFs. Missing files don't block the request — the lead is
  // still captured and the team notified, they just can't attach that one.
  const attachments: { filename: string; content: Buffer }[] = [];
  const missing: string[] = [];
  for (const study of ["febreze", "porta"] as const) {
    try {
      const info = STUDY_FILES[study];
      const filePath = path.join(process.cwd(), "private-documents", info.filename);
      const buffer = await readFile(filePath);
      attachments.push({ filename: info.filename, content: buffer });
    } catch {
      missing.push(study);
      console.warn(`Study PDF not found on disk for "${study}". Sending without it.`);
    }
  }

  try {
    const isDe = (locale || "de") === "de";
    const visitorHtml = emailShell({
      preheader: isDe ? "Ihre angeforderten Studien" : "Your requested studies",
      title: isDe ? "Ihre angeforderten Studien" : "Your Requested Studies",
      bodyHtml: `
        <p style="margin:0 0 14px 0;font-size:14px;color:#3a3630;line-height:1.6;">
          ${isDe ? "Vielen Dank für Ihr Interesse." : "Thank you for your interest."}
        </p>
        <p style="margin:0 0 14px 0;font-size:14px;color:#3a3630;line-height:1.6;">
          ${
            isDe
              ? `Anbei finden Sie beide Studien: „${escapeHtml(STUDY_FILES.febreze.label)}" und „${escapeHtml(STUDY_FILES.porta.label)}".`
              : `Attached you'll find both studies: "${escapeHtml(STUDY_FILES.febreze.label)}" and "${escapeHtml(STUDY_FILES.porta.label)}".`
          }
        </p>
        ${
          missing.length
            ? emailNotice(
                isDe
                  ? "Unser Team stellt Ihnen die fehlenden Unterlagen in Kürze persönlich zu."
                  : "Our team will send you the remaining documents shortly."
              )
            : ""
        }
        <p style="margin:14px 0 0 0;font-size:14px;color:#3a3630;line-height:1.6;">
          ${isDe ? "Bei Fragen erreichen Sie uns jederzeit unter" : "If you have any questions, reach us anytime at"} info@taxi-werbung.org.
        </p>
      `,
      footerNote: "Taxi-Werbung.org &middot; info@taxi-werbung.org",
    });

    const visitorResult = await resend.emails.send({
      from: "Taxi-Werbung.org <noreply@taxi-werbung.org>",
      to: email,
      replyTo: LEAD_INBOX,
      subject: "Ihre angeforderten Studien: AC Nielsen & Hochschule Fresenius",
      html: visitorHtml,
      attachments: attachments.length ? attachments : undefined,
    });

    if (visitorResult.error) {
      console.error("Dual study confirmation email failed:", visitorResult.error);
    }

    const teamHtml = emailShell({
      preheader: "Neue Studienanfrage: beide Studien",
      title: "Neue Studienanfrage (beide Studien)",
      bodyHtml: `
        ${emailField("E-Mail", escapeHtml(email))}
        ${emailNotice(
          `Sprache: ${escapeHtml(locale || "de")}` +
            (missing.length
              ? ` — HINWEIS: PDF-Anhang fehlte für: ${missing.join(", ")}, bitte manuell nachsenden.`
              : "")
        )}
      `,
      footerNote: "Taxi-Werbung.org &middot; info@taxi-werbung.org &middot; Studienanfrage-Benachrichtigung",
    });

    const teamResult = await resend.emails.send({
      from: "Taxi-Werbung.org Website <noreply@taxi-werbung.org>",
      to: LEAD_INBOX,
      replyTo: email,
      subject: "Neue Studienanfrage: beide Studien (Febreze + porta)",
      html: teamHtml,
    });

    if (teamResult.error) {
      console.error("Lead notification email failed:", teamResult.error);
      return NextResponse.json({ ok: false, error: "email_error" }, { status: 502 });
    }

    // Signed, short-lived links for both studies — immediate access, no wait.
    const downloadUrls = (["febreze", "porta"] as const).map((study) => {
      const { token, exp } = createStudyToken(study);
      return `/api/study-file?study=${encodeURIComponent(study)}&exp=${exp}&token=${token}`;
    });

    return NextResponse.json({ ok: true, downloadUrls });
  } catch (err) {
    console.error("Dual study request error:", err);
    return NextResponse.json({ ok: false, error: "unexpected_error" }, { status: 500 });
  }
}
