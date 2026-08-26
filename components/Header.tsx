"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries/de";
import LanguageSwitcher from "./LanguageSwitcher";
import { media } from "@/lib/media";

export default function Header({ locale, dict }: { locale: string; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-amber/20 bg-ink">
      <div className="max-w-content mx-auto flex items-center justify-between px-5 py-2.5 md:px-8">
        <Link href={`/${locale}`} className="flex flex-col items-center shrink-0 gap-0.5">
          <Image
            src={media.logoIcon}
            alt="Taxi-Werbung.org"
            width={591}
            height={480}
            className="h-8 md:h-9 w-auto"
            priority
          />
          <span className="leading-none text-center">
            <span className="block font-display text-[13px] md:text-sm font-extrabold tracking-tight text-cream">
              TAXI-WERBUNG<span className="text-amber">.ORG</span>
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-amber">
              Taxi advertising
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-sm font-medium text-cream/80">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-cream transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <Link
            href={`/${locale}/contact`}
            className="hidden sm:inline-flex items-center rounded-full bg-amber px-4 py-2 text-sm font-bold text-ink hover:bg-amberDark transition-colors"
          >
            {dict.nav.cta}
          </Link>
          <LanguageSwitcher locale={locale} dark />

          {/* Mobile menu toggle — only visible below md, since the nav above is hidden there */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-amber/40 text-amber"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav panel — same links as desktop, only rendered/shown below md */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="md:hidden border-t border-amber/20 bg-ink px-5 py-4"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-cream/85 hover:bg-cream/10 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/${locale}/contact`}
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center rounded-full bg-amber px-4 py-2.5 text-sm font-bold text-ink"
          >
            {dict.nav.cta}
          </Link>
        </nav>
      )}
    </header>
  );
}
