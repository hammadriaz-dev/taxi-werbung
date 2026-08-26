"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n";

export default function LanguageSwitcher({ locale, dark }: { locale: string; dark?: boolean }) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);
  // segments[0] is the current locale; swap it, keep the rest of the path
  const rest = segments.slice(1).join("/");

  return (
    <nav aria-label="Language" className="flex items-center gap-1 text-xs font-mono tracking-wide">
      {locales.map((l, i) => {
        const href = `/${l}${rest ? `/${rest}` : ""}`;
        const active = l === locale;
        return (
          <span key={l} className="flex items-center gap-1">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={
                dark
                  ? active
                    ? "text-amber font-semibold"
                    : "text-cream/50 hover:text-cream transition-colors"
                  : active
                  ? "text-ink font-semibold"
                  : "text-ink/50 hover:text-ink transition-colors"
              }
            >
              {l.toUpperCase()}
            </Link>
            {i < locales.length - 1 && (
              <span className={dark ? "text-cream/30" : "text-ink/30"}>|</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
