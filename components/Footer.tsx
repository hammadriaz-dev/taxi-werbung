import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries/de";
import { site } from "@/lib/i18n";

export default function Footer({ locale, dict }: { locale: string; dict: Dictionary }) {
  return (
    <footer className="border-t border-ink/10 bg-ink text-cream/80">
      <div className="max-w-content mx-auto px-5 py-12 md:px-8 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-cream">
            Taxi<span className="text-amber">Werbung</span>
          </p>
          <p className="mt-2 text-sm text-cream/60">{dict.footer.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-cream mb-2">{dict.nav.contact}</p>
          <p>
            <a href={`mailto:${site.email}`} className="hover:text-amber transition-colors">
              {site.email}
            </a>
          </p>
          <p>
            <a href={`tel:${site.phoneHref}`} className="hover:text-amber transition-colors">
              {site.phone}
            </a>
          </p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-cream mb-2">{dict.nav.home}</p>
          <ul className="space-y-1">
            <li><Link href={`/${locale}`} className="hover:text-amber transition-colors">{dict.nav.home}</Link></li>
            <li><Link href={`/${locale}/about`} className="hover:text-amber transition-colors">{dict.nav.about}</Link></li>
            <li><Link href={`/${locale}/contact`} className="hover:text-amber transition-colors">{dict.nav.contact}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5">
        <div className="max-w-content mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} {site.name} — {dict.footer.rights}</p>
          <div className="flex items-center gap-4 font-semibold">
            <Link href={`/${locale}/imprint`} className="text-cream/80 underline underline-offset-4 decoration-cream/30 hover:text-amber hover:decoration-amber transition-colors">
              {dict.footer.imprint}
            </Link>
            <span className="text-cream/20">|</span>
            <Link href={`/${locale}/privacy`} className="text-cream/80 underline underline-offset-4 decoration-cream/30 hover:text-amber hover:decoration-amber transition-colors">
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
