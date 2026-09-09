"use client";

import { useEffect } from "react";

// Root-level fallback, in case an error happens outside app/[locale]/*
// (e.g. in the root layout itself). Kept deliberately simple and
// dependency-free, since this is the last line of defense.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global app error:", error);
  }, [error]);

  return (
    <html lang="de">
      <body style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
          <div style={{ maxWidth: 420 }}>
            <p style={{ fontSize: 22, fontWeight: 800, color: "#0b1d3a" }}>
              Etwas ist schiefgelaufen. / Something went wrong.
            </p>
            <p style={{ marginTop: 12, color: "#3a3630" }}>
              Bitte laden Sie die Seite neu. / Please reload the page.
            </p>
            <button
              onClick={() => reset()}
              style={{
                marginTop: 20,
                borderRadius: 999,
                background: "#f5a623",
                color: "#0b1d3a",
                fontWeight: 700,
                border: "none",
                padding: "12px 24px",
                cursor: "pointer",
              }}
            >
              Erneut versuchen / Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
