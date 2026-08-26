"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries/de";

type Status = "idle" | "sending" | "success" | "error";

export default function DualStudyRequestForm({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const g = dict.dualStudyGate;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");

    try {
      const res = await fetch("/api/dual-study-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
      // Immediate handoff — both studies open right away, no waiting on email.
      if (Array.isArray(result.downloadUrls)) {
        for (const url of result.downloadUrls) {
          window.open(url, "_blank", "noopener");
        }
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-3xl bg-amber p-6 md:p-10 text-center">
      {status === "success" ? (
        <div className="max-w-md mx-auto">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink/10 text-2xl">
            ✓
          </div>
          <p className="mt-4 font-display text-xl font-bold text-ink">{g.successTitle}</p>
          <p className="mt-2 text-sm text-ink/80">{g.successBody}</p>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <p className="font-display text-xl md:text-2xl font-bold text-ink">{g.boxTitle}</p>
          <p className="mt-2 text-sm text-ink/80 leading-relaxed">{g.boxBody}</p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={g.emailPlaceholder}
              className="rounded-full border-none bg-white px-5 py-3.5 text-ink placeholder:text-charcoal/40 outline-none ring-2 ring-transparent transition-all focus:ring-ink/20"
            />

            {status === "error" && (
              <p role="alert" className="text-sm text-red-900">
                {g.errorBody}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3.5 text-base font-bold text-cream transition-colors hover:bg-inkSoft disabled:opacity-60"
            >
              {status === "sending" ? g.sending : g.submit}
            </button>
          </form>

          <p className="mt-4 text-xs font-medium text-ink/60">{g.footnote}</p>
        </div>
      )}
    </div>
  );
}
