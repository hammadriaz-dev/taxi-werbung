"use client";

import { useEffect } from "react";
import { getDictionary } from "@/lib/i18n";

// Locale-scoped error boundary. Without this, an uncaught render error
// anywhere under app/[locale]/* (including a transient RSC navigation
// failure after a fresh deploy) can leave the page blank until the visitor
// does a hard reload — exactly the symptom reported on the Febreze page.
// This gives React something to catch that error with, and a working "try
// again" action, instead of a blank screen.

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Locale route error:", error);
  }, [error]);

  // We don't have the current locale here (that's exactly the kind of state
  // an error boundary can lose), so this reads the browser URL directly
  // rather than depending on the failed render tree.
  const locale =
    typeof window !== "undefined" && window.location.pathname.startsWith("/en") ? "en" : "de";
  const dict = getDictionary(locale);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5 py-24 text-center">
      <div className="max-w-md">
        <p className="font-display text-2xl font-bold text-ink">{dict.errorPage.title}</p>
        <p className="mt-3 text-charcoal/70 leading-relaxed">{dict.errorPage.body}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center rounded-full bg-amber px-6 py-3 text-sm font-bold text-ink hover:bg-amberDark transition-colors"
          >
            {dict.errorPage.retry}
          </button>
          <a
            href={`/${locale}`}
            className="inline-flex items-center rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink hover:bg-ink hover:text-cream transition-colors"
          >
            {dict.errorPage.home}
          </a>
        </div>
      </div>
    </div>
  );
}
