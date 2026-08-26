import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { verifyStudyToken } from "@/lib/studyToken";

// There is NO public link to this route anywhere on the site. The only way
// to get a valid URL here is to submit the lead form at /api/study-request,
// which returns a signed, single-study, 15-minute link. This route re-checks
// that signature before ever touching the file on disk.

const STUDY_FILES: Record<string, string> = {
  febreze: "ac-nielsen-studie-febreze.pdf",
  porta: "hochschule-fresenius-studie-porta.pdf",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const study = searchParams.get("study") || "";
  const exp = Number(searchParams.get("exp") || 0);
  const token = searchParams.get("token") || "";

  const filename = STUDY_FILES[study];
  if (!filename) {
    return NextResponse.json({ ok: false, error: "unknown_study" }, { status: 404 });
  }

  if (!verifyStudyToken(study, exp, token)) {
    return NextResponse.json(
      { ok: false, error: "link_expired_or_invalid" },
      { status: 403 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), "private-documents", filename);
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // inline = opens in the browser tab, doesn't force a "Save As" dialog
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "file_not_found" }, { status: 404 });
  }
}
