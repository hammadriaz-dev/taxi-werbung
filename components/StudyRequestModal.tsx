"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries/de";

type Status = "idle" | "sending" | "success" | "error";

export default function StudyRequestModal({
  dict,
  study,
  studyLabel,
  buttonLabel,
  locale,
}: {
  dict: Dictionary;
  study: "febreze" | "porta";
  studyLabel: string;
  buttonLabel: string;
  locale: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const g = dict.studyGate;

  function close() {
    setOpen(false);
    // Reset after the close animation would run, so a reopened modal starts fresh
    setTimeout(() => setStatus("idle"), 200);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      company: String(formData.get("company") || ""),
      email: String(formData.get("email") || ""),
      study,
      locale,
    };

    try {
      const res = await fetch("/api/study-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
      // Immediate handoff — no waiting on the confirmation email.
      if (result.downloadUrl) {
        window.open(result.downloadUrl, "_blank", "noopener");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 text-sm font-bold text-ink hover:bg-amberDark transition-colors w-fit"
      >
        {buttonLabel}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={g.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 md:p-8 shadow-2xl">
            <button
              type="button"
              onClick={close}
              aria-label={g.close}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-charcoal/50 hover:bg-line/40 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="pt-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber/15 text-2xl">
                  ✓
                </div>
                <p className="mt-4 font-display text-xl font-bold text-ink">{g.successTitle}</p>
                <p className="mt-2 text-sm text-charcoal/70">{g.successBody}</p>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="text-sm text-charcoal/70">{g.nextStepIntro}</p>
                  <a
                    href={`mailto:info@taxi-werbung.org?subject=${encodeURIComponent(
                      `${g.nextStepSubjectPrefix} ${studyLabel}`
                    )}`}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-inkSoft"
                  >
                    {g.nextStepLabel}
                  </a>
                </div>
              </div>
            ) : (
              <>
                <p className="pr-8 font-display text-xl font-bold text-ink">{g.title}</p>
                <p className="mt-1.5 text-sm text-charcoal/60">{studyLabel}</p>
                <p className="mt-3 text-sm text-charcoal/70 leading-relaxed">{g.body}</p>

                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                  <label className="grid gap-1.5 text-sm font-medium text-ink">
                    {g.name}
                    <input
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="rounded-xl border border-line bg-cream/40 px-4 py-3 text-charcoal outline-none transition-colors focus:border-amber focus:ring-2 focus:ring-amber/20"
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-ink">
                    {g.company}
                    <input
                      name="company"
                      type="text"
                      required
                      autoComplete="organization"
                      className="rounded-xl border border-line bg-cream/40 px-4 py-3 text-charcoal outline-none transition-colors focus:border-amber focus:ring-2 focus:ring-amber/20"
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-ink">
                    {g.email}
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="rounded-xl border border-line bg-cream/40 px-4 py-3 text-charcoal outline-none transition-colors focus:border-amber focus:ring-2 focus:ring-amber/20"
                    />
                  </label>

                  {status === "error" && (
                    <p role="alert" className="text-sm text-red-600">
                      {g.errorBody}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-1 inline-flex items-center justify-center rounded-full bg-amber px-6 py-3.5 text-base font-bold text-ink transition-colors hover:bg-amberDark disabled:opacity-60"
                  >
                    {status === "sending" ? g.sending : g.submit}
                  </button>

                  <p className="text-center text-xs text-charcoal/45">
                    {g.required} — {g.privacyNote}
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
