"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries/de";

type Status = "idle" | "sending" | "success" | "error";

export default function LeadForm({ dict, locale }: { dict: Dictionary; locale: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const f = dict.contact.form;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      company: String(formData.get("company") || ""),
      contactName: String(formData.get("contactName") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      locale,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-xl shadow-black/20">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber/15 text-2xl">
          ✓
        </div>
        <p className="mt-4 font-display text-2xl font-bold text-ink">{f.successTitle}</p>
        <p className="mt-2 text-charcoal/70">{f.successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-3xl bg-white p-6 md:p-8 shadow-xl shadow-black/20"
    >
      <Field label={f.company} name="company" required autoComplete="organization" />
      <Field label={f.contact} name="contactName" required autoComplete="name" />
      <Field label={f.email} name="email" type="email" required autoComplete="email" />
      <Field label={f.phone} name="phone" type="tel" optional autoComplete="tel" />

      <label className="grid gap-1.5 text-sm font-medium text-ink">
        {f.message}
        <textarea
          name="message"
          rows={3}
          className="rounded-xl border border-line bg-cream/40 px-4 py-3 text-charcoal outline-none transition-colors focus:border-amber focus:ring-2 focus:ring-amber/20"
        />
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {f.errorBody}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-amber px-6 py-4 text-base font-bold text-ink transition-colors hover:bg-amberDark disabled:opacity-60"
      >
        {status === "sending" ? f.sending : f.submit}
      </button>

      <p className="text-center text-xs text-charcoal/45">{f.required} — {f.privacyNote}</p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-ink">
      {label}
      {optional && <span className="font-normal text-charcoal/40"> (optional)</span>}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="rounded-xl border border-line bg-cream/40 px-4 py-3 text-charcoal outline-none transition-colors focus:border-amber focus:ring-2 focus:ring-amber/20"
      />
    </label>
  );
}
