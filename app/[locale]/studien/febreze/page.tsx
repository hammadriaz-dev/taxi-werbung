import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n";
import { media } from "@/lib/media";
import StudyRequestModal from "@/components/StudyRequestModal";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.studyReports.febreze.metaTitle };
}

export default function FebrezeStudyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const s = dict.studyReports.febreze;


  return (
    <section className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
      <Link
        href={`/${locale}#reference-clients`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal/60 hover:text-ink transition-colors"
      >
        ← {dict.studyReports.backLabel}
      </Link>

      <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-amberDark">
        {s.kicker}
      </p>
      <h1 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-ink">
        {s.title}
      </h1>
      <p className="mt-3 text-lg text-charcoal/70">{s.subtitle}</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-ink">
            {s.clientHeading}
          </h2>
          <p className="mt-1 text-sm text-charcoal/60">{s.clientSubheading}</p>

          <div className="mt-6 relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-line">
            <Image
              src={media.referenceClientImages[0]}
              alt={s.imageCaption}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-2 text-xs text-charcoal/50">{s.imageCaption}</p>

          <div className="mt-8 space-y-4 text-charcoal/80 leading-relaxed">
            {s.bodyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-ink/[0.03] border border-line p-6 md:p-8">
            <p className="text-lg leading-relaxed text-ink italic">"{s.quote}"</p>
            <p className="mt-4 font-display font-bold text-ink">{s.quoteAuthor}</p>
            <p className="text-sm text-charcoal/60">{s.quoteRole}</p>
          </div>

          {/* Gated study request — this is the only way the actual PDF ever leaves
              the server. No direct download link exists anywhere on the site. */}
          <StudyRequestModal
            dict={dict}
            study="febreze"
            studyLabel={s.clientHeading}
            buttonLabel={s.requestButtonLabel}
            locale={locale}
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-ink/[0.03] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-charcoal/60">
              {s.basicsHeading}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
              {s.basicsItems
                .filter((item) => !item.value.includes("BITTE ERGÄNZEN") && !item.value.includes("PLEASE PROVIDE"))
                .map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] uppercase tracking-[0.06em] text-charcoal/50">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 text-sm text-charcoal/80 leading-snug">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-line bg-white/60 p-6 md:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/[0.06] text-ink">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            </div>
            <h2 className="mt-4 font-display text-lg md:text-xl font-bold text-ink">
              {dict.studyLocked.heading}
            </h2>
            <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{dict.studyLocked.body}</p>
            <p className="mt-3 text-sm text-charcoal/60">{s.sourceLine}</p>

            <ul className="mt-6 space-y-2.5">
              {s.lockedBullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-charcoal/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amberDark/15 text-amberDark text-[11px] font-bold">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-24 rounded-2xl bg-ink p-8 md:p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-cream/50">
          {dict.studyReports.secondaryCtaLabel}
        </p>
        <p className="mt-2 font-display text-xl md:text-2xl font-bold text-cream">{s.ctaText}</p>
        <a
          href="mailto:info@taxi-werbung.org"
          className="mt-6 inline-flex items-center rounded-full border border-cream/30 px-7 py-3 text-sm font-semibold text-cream hover:bg-cream/10 transition-colors"
        >
          {dict.hero.ctaPrimary}
        </a>
      </div>
    </section>
  );
}
