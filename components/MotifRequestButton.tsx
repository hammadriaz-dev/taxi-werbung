"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries/de";

type Status = "idle" | "sending" | "success" | "error";
const MAX_BYTES = 4 * 1024 * 1024;

export default function MotifRequestButton({
  dict,
  locale,
  label,
  className,
}: {
  dict: Dictionary;
  locale: string;
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [fileError, setFileError] = useState(false);
  const f = dict.motifForm;

  function close() {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setFileError(false);
    }, 200);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("file");
    if (file instanceof File && file.size > MAX_BYTES) {
      setFileError(true);
      return;
    }
    setFileError(false);
    setStatus("sending");
    data.set("locale", locale);
    try {
      const res = await fetch("/api/motif-request", { method: "POST", body: data });
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const input =
    "rounded-xl border border-line bg-cream/40 px-4 py-3 text-charcoal outline-none transition-colors focus:border-amber focus:ring-2 focus:ring-amber/20";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "mt-5 inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 text-sm font-bold text-ink hover:bg-amberDark transition-colors"
        }
      >
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/60 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={f.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 md:p-8 text-left shadow-2xl">
            <button
              type="button"
              onClick={close}
              aria-label={f.close}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-charcoal/50 hover:bg-line/40 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>

            {status === "success" ? (
              <div role="status" aria-live="polite" className="py-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber text-2xl text-ink">✓</div>
                <p className="mt-4 font-display text-xl font-bold text-ink">{f.successTitle}</p>
                <p className="mt-2 text-sm text-charcoal/70">{f.successBody}</p>
              </div>
            ) : (
              <>
                <p className="pr-8 font-display text-xl font-bold text-ink">{f.title}</p>
                <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{f.body}</p>

                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                  <label className="grid gap-1.5 text-sm font-medium text-ink">
                    {f.email}
                    <input name="email" type="email" required autoComplete="email" autoFocus className={input} />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-ink">
                    <span>
                      {f.message} <span className="font-normal text-charcoal/40">({f.optional})</span>
                    </span>
                    <textarea name="message" rows={3} className={input} />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium text-ink">
                    <span>
                      {f.file} <span className="font-normal text-charcoal/40">({f.optional})</span>
                    </span>
                    <input
                      name="file"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                      className="text-sm text-charcoal/70 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream"
                    />
                    <span className="text-xs font-normal text-charcoal/50">{f.fileHint}</span>
                  </label>

                  {(fileError || status === "error") && (
                    <p role="alert" className="text-sm text-red-600">
                      {fileError ? f.fileTooBig : f.errorBody}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center rounded-full bg-amber px-6 py-3.5 text-base font-bold text-ink transition-colors hover:bg-amberDark disabled:opacity-60"
                  >
                    {status === "sending" ? f.sending : f.submit}
                  </button>
                  <p className="text-center text-xs text-charcoal/55">
                    {f.privacyNote}{" "}
                    <Link href={`/${locale}/privacy`} target="_blank" className="font-semibold text-ink underline underline-offset-2 hover:text-amberDark">
                      {f.privacyLinkText}
                    </Link>
                    .
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
