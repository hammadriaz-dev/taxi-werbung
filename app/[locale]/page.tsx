import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n";
import { media } from "@/lib/media";
import ReferencesCarousel from "@/components/ReferencesCarousel";
import ReferenceClients from "@/components/ReferenceClients";
import LeadForm from "@/components/LeadForm";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.meta.home.title, description: dict.meta.home.description };
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const dict = getDictionary(locale);

  // Merge the translated case-study text with the actual image files —
  // text lives in the dictionary (bilingual), image paths live in media.ts.
  const referenceClients = dict.referenceClients.clients.map((client, i) => ({
    ...client,
    campaignImage: media.referenceClientImages[i],
  }));

  return (
    <>
      {/* Hero — moving taxi video, full-bleed and full-height like the client's reference */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-ink">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={media.heroVideo}
          poster={media.heroVideoPoster}
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(19,32,56,.9) 0%, rgba(19,32,56,.6) 43%, rgba(19,32,56,.15) 74%, rgba(19,32,56,.45) 100%), linear-gradient(0deg, rgba(19,32,56,.85) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 w-full px-6 sm:pl-[7vw] sm:pr-8 pt-24 pb-16 md:pb-10">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-amber">
            {dict.hero.eyebrow}
          </p>
          <h1
            className="mt-4 md:mt-5 whitespace-pre-line font-display font-extrabold leading-[0.98] text-cream max-w-[900px]"
            style={{ fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)" }}
          >
            {dict.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-cream/85">
            {dict.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contact-form"
              className="inline-flex items-center rounded-md sm:rounded-full bg-amber px-8 py-4 font-semibold text-ink hover:bg-amberDark transition-colors"
            >
              {dict.hero.ctaPrimary}
            </a>
          </div>

          <p className="mt-9 text-xs uppercase tracking-[0.15em] text-cream/50">
            {dict.hero.trustLine}
          </p>
        </div>
      </section>

      {/* "Making of" — real installation photo, directly below the hero video +
          overlay CTA. This is the proof-of-execution beat: right after the
          emotional video, show that real campaigns actually get built. */}
      <section className="bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amberDark">
            {dict.makingOf.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl md:text-4xl font-bold text-ink">
            {dict.makingOf.title}
          </h2>
          <p className="mt-5 max-w-2xl text-charcoal/75 leading-relaxed">{dict.makingOf.body}</p>

          <div className="relative mt-10 w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-3xl">
            <Image
              src={media.references.find((r) => r.name === "Kampagnen-Installation")?.src || media.references[10].src}
              alt={dict.makingOf.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 rounded-xl bg-ink/90 px-4 py-3 md:px-5 md:py-4">
              <p className="font-display text-sm md:text-base font-bold text-amber leading-snug">
                {dict.makingOf.imageBadge}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {dict.makingOf.points.map((point, i) => {
              const icons = [
                <svg key="pin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>,
                <svg key="wrench" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8Z" />
                </svg>,
                <svg key="chart" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V10M12 20V4M20 20v-7" />
                </svg>,
              ];
              return (
                <div key={point.title} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amberDark/40 text-amberDark">
                    {icons[i]}
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-ink">{point.title}</p>
                    <p className="mt-1 text-sm text-charcoal/70 leading-relaxed">{point.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 rounded-full border border-ink px-7 py-3.5 font-semibold text-ink hover:bg-ink hover:text-cream transition-colors"
            >
              {dict.makingOf.ctaLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Reference Clients — Procter & Gamble / Febreze and porta Möbel, the two
          strongest pieces of evidence, placed immediately after the making-of proof
          section. Combined single-email request box is the one true lead-capture
          CTA — no extra click, no intermediate page. */}
      <ReferenceClients dict={dict} clients={referenceClients} locale={locale} />

      {/* Urban visual banners with intro text placed between them, per client's request */}
      <section className="bg-ink pb-3 md:pb-4">
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="relative">
            <Image
              src={media.urbanVisual2}
              alt={dict.urbanVisuals.visual2Alt}
              width={1600}
              height={432}
              sizes="100vw"
              className="w-full h-auto block"
              priority
            />
            {/* Clickable hotspot over the banner's own "Jetzt Kostenloses Angebot
                anfordern" splash graphic — the PNG itself is untouched, this only
                adds a transparent mailto link positioned on top of the CTA area. */}
            <a
              href="mailto:info@taxi-werbung.org"
              aria-label="Jetzt kostenloses Angebot per E-Mail anfordern"
              className="absolute"
              style={{ left: "86%", top: "30.5%", width: "12.3%", height: "57.6%" }}
            />
          </div>

          <div className="px-5 md:px-8 py-10 md:py-14 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-cream leading-tight">
                {dict.urbanVisuals.title}
              </h2>
              <p className="mt-4 text-cream/70 leading-relaxed">{dict.urbanVisuals.body}</p>
              <p className="mt-4 font-display text-lg font-semibold text-amber">
                {dict.urbanVisuals.tagline}
              </p>
            </div>
          </div>

          <div className="relative">
            <Image
              src={media.urbanVisual1}
              alt={dict.urbanVisuals.visual1Alt}
              width={1648}
              height={568}
              sizes="100vw"
              className="w-full h-auto block"
            />
            {/* Two clickable hotspots over this banner's own baked-in buttons —
                the PNG itself is untouched. */}
            <a
              href="mailto:info@taxi-werbung.org"
              aria-label="Kostenloses Angebot anfordern per E-Mail"
              className="absolute"
              style={{ left: "5.3%", top: "81.5%", width: "23.2%", height: "12.7%" }}
            />
            <a
              href="#contact-form"
              aria-label="Get your free quote — zum Kontaktformular"
              className="absolute"
              style={{ left: "29.3%", top: "81.2%", width: "15.2%", height: "10.4%" }}
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amberDark">
          {dict.benefits.kicker}
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl md:text-4xl font-bold text-ink">
          {dict.benefits.title}
        </h2>
        <p className="mt-5 max-w-2xl text-charcoal/75 leading-relaxed">{dict.benefits.body}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.benefits.items.map((item, i) => {
            const icons = [
              // Mobil sichtbar — pin
              <svg key="pin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>,
              // Starker Erinnerungswert — eye
              <svg key="eye" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>,
              // Gezielt planbar — target
              <svg key="target" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </svg>,
              // Für lokale und globale Marken — globe
              <svg key="globe" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
              </svg>,
            ];
            return (
              <div key={item.title} className="relative overflow-hidden rounded-2xl border border-line bg-white/60 p-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-3 right-3 font-display text-6xl md:text-7xl font-extrabold text-amber/25 select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-amber">
                  {icons[i]}
                </div>
                <p className="relative mt-4 font-display text-lg font-bold text-ink">{item.title}</p>
                <p className="relative mt-2 text-sm text-charcoal/70 leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Showreel — "campaign video" bucket, kept together with Benefits/formats */}
      <section id="showreel" className="bg-white/60 border-y border-line">
        <div className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amberDark">
              {dict.showreel.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ink">
              {dict.showreel.title}
            </h2>
            <p className="mt-5 text-charcoal/75 leading-relaxed">{dict.showreel.body}</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-line bg-ink">
                <video
                  className="h-full w-full object-cover"
                  src={media.showreelVideoDe}
                  poster={media.showreelPoster}
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-ink">
                {dict.showreel.labelDe}
              </p>
            </div>
            <div>
              <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-line bg-ink">
                <video
                  className="h-full w-full object-cover"
                  src={media.showreelVideoEn}
                  poster={media.showreelPoster}
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-ink">
                {dict.showreel.labelEn}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Campaigns — Next Door featured as the newest campaign, real
          up-to-date photo, then further real campaign photos below in a grid. */}
      <section className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
        <span className="inline-flex items-center rounded-full bg-amberDark/10 border border-amberDark/30 px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-amberDark">
          {dict.references.featuredEyebrow}
        </span>
        <h2 className="mt-4 max-w-2xl font-display text-3xl md:text-4xl font-bold text-ink">
          {dict.references.featuredTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-charcoal/75 leading-relaxed">
          {dict.references.featuredBody}
        </p>

        <div className="relative mt-8 w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-3xl">
          <Image
            src={media.references[0].src}
            alt={media.references[0].name}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <span className="absolute right-4 top-4 rounded-full bg-amber px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-ink">
            {dict.references.featuredBadge}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {dict.references.featuredTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-ink/[0.04] border border-line px-3.5 py-1.5 text-xs font-semibold text-ink"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-16 font-display text-2xl md:text-3xl font-bold text-ink">
          {dict.references.title}
        </h3>
        <p className="mt-3 max-w-2xl text-charcoal/75 leading-relaxed">{dict.references.intro}</p>

        <div className="mt-8 max-w-3xl">
          <ReferencesCarousel
            items={media.references.slice(1)}
            captions={dict.references.captions.slice(1)}
            prevLabel={dict.references.prevLabel}
            nextLabel={dict.references.nextLabel}
          />
        </div>
      </section>

      {/* Process — "how to get a campaign of your own", right after the references,
          per client's explicit request: this is the practical follow-up once
          interest is established. */}
      <section className="bg-ink">
        <div className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
            {dict.process.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl md:text-4xl font-bold text-cream">
            {dict.process.title}
          </h2>
          <p className="mt-5 max-w-2xl text-cream/70 leading-relaxed">{dict.process.body}</p>

          <div className="mt-12 max-w-xl">
            {dict.process.steps.map((step, i) => {
              const icons = [
                <svg key="chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.2 0-2.3-.25-3.3-.7L3 21l1.7-4.2A8.4 8.4 0 0 1 3.5 12 8.5 8.5 0 0 1 12 3.5a8.5 8.5 0 0 1 9 8Z" />
                  <circle cx="9" cy="12" r="0.8" fill="currentColor" />
                  <circle cx="12" cy="12" r="0.8" fill="currentColor" />
                  <circle cx="15" cy="12" r="0.8" fill="currentColor" />
                </svg>,
                <svg key="doc" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
                  <path d="M14 3v5h5" />
                  <path d="M9.5 15.2h5" />
                </svg>,
                <svg key="design" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20l3.5-.9L18.4 8.2a1.7 1.7 0 0 0 0-2.4l-1.2-1.2a1.7 1.7 0 0 0-2.4 0L4 15.5 3 20Z" />
                </svg>,
                <svg key="taxi" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 16.5V13l1.6-4.5A2 2 0 0 1 8.5 7h7a2 2 0 0 1 1.9 1.5L19 13v3.5" />
                  <rect x="3" y="13" width="18" height="6" rx="1.5" />
                  <circle cx="7.5" cy="19" r="1.3" />
                  <circle cx="16.5" cy="19" r="1.3" />
                </svg>,
              ];
              const isLast = i === dict.process.steps.length - 1;
              return (
                <div key={step.title} className={`flex gap-5 ${isLast ? "" : "pb-8"}`}>
                  <div className="flex flex-col items-center">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber font-display text-lg font-extrabold text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {!isLast && <span className="mt-2 w-px grow bg-amber/30" />}
                  </div>
                  <div className="pt-1.5">
                    <div className="flex items-center gap-2.5 text-amber">{icons[i]}</div>
                    <p className="mt-2 font-display text-lg font-bold text-cream">{step.title}</p>
                    <p className="mt-1 text-sm text-cream/65 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 max-w-xl rounded-2xl bg-cream/95 p-6 md:p-8 text-center">
            <p className="font-display text-lg md:text-xl font-bold text-ink">
              {dict.process.motifBoxTitle}
            </p>
            <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">
              {dict.process.motifBoxBody}
            </p>
            <a
              href="mailto:info@taxi-werbung.org"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 text-sm font-bold text-ink hover:bg-amberDark transition-colors"
            >
              {dict.process.motifBoxCta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* "Our clients, our campaigns" intro — bridges the two named studies and the
          Hall of Fame testimonials below */}
      <section className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-ink">
            {dict.clientsIntro.title}
          </h2>
          <p className="mt-5 text-charcoal/75 leading-relaxed">{dict.clientsIntro.body}</p>
        </div>
      </section>

      {/* Hall of Fame — customer testimonials. Quote text for SAS Hotel Nürnberg, IBM,
          Salamander and Zentis, and the Mitsubishi Electronics success story, have not
          been supplied yet. Placeholder entries are filtered out here rather than
          shown to visitors — nothing renders until real content replaces them in the
          dictionary (search for "BENÖTIGT" / "NEEDED"). The whole section stays
          hidden until at least one real quote or the Mitsubishi story exists. */}
      {(() => {
        const isPlaceholder = (s: string) => s.includes("BENÖTIGT") || s.includes("NEEDED");
        const realQuotes = dict.hallOfFame.quotes.filter((q) => !isPlaceholder(q.quote));
        const hasMitsubishi = !isPlaceholder(dict.hallOfFame.mitsubishiBody);
        if (realQuotes.length === 0 && !hasMitsubishi) return null;

        return (
          <section className="bg-ink">
            <div className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
              <span className="inline-flex items-center rounded-full bg-amber/15 border border-amber/40 px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-amber">
                {dict.hallOfFame.eyebrow}
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-cream">
                {dict.hallOfFame.title}
              </h2>
              <p className="mt-5 max-w-2xl text-cream/70 leading-relaxed">{dict.hallOfFame.intro}</p>

              {realQuotes.length > 0 && (
                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  {realQuotes.map((q) => (
                    <div
                      key={q.company}
                      className="rounded-2xl border border-cream/15 bg-white/[0.04] p-6 md:p-8"
                    >
                      <p className="text-lg leading-relaxed text-cream italic">"{q.quote}"</p>
                      <p className="mt-4 font-display font-bold text-cream">{q.author}</p>
                      <p className="text-sm text-cream/50">{q.company}</p>
                    </div>
                  ))}
                </div>
              )}

              {hasMitsubishi && (
                <div className="mt-6 rounded-2xl border border-amber/25 bg-amber/[0.06] p-6 md:p-8">
                  <p className="font-display text-lg font-bold text-cream">
                    {dict.hallOfFame.mitsubishiHeading}
                  </p>
                  <p className="mt-3 text-sm text-cream/70 leading-relaxed">
                    {dict.hallOfFame.mitsubishiBody}
                  </p>
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* Contact form — the single conversion point of the page: no competing links,
          no extra fields, just the pitch and the form. */}
      <section id="contact-form" className="relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[140%] -translate-x-1/2 rounded-[50%] bg-amber/10 blur-3xl"
          aria-hidden
        />
        <div className="relative max-w-2xl mx-auto px-5 md:px-8 py-20 md:py-28 text-center">
          <span className="inline-flex items-center rounded-full bg-amber/15 border border-amber/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-amber">
            {dict.homeCta.badge}
          </span>
          <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold text-cream leading-tight">
            {dict.homeCta.title}
          </h2>
          <p className="mt-5 text-cream/70 leading-relaxed md:text-lg">{dict.homeCta.body}</p>

          <div className="mt-10 text-left">
            <LeadForm dict={dict} locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
