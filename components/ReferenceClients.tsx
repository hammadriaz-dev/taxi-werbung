import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries/de";
import DualStudyRequestForm from "@/components/DualStudyRequestForm";

type ReferenceClient = {
  logoText: string;
  campaignImage: string;
  campaignImageAlt: string;
  name: string;
  description: string;
  facts: string[];
  studyHref: string;
  study: "febreze" | "porta";
};

export default function ReferenceClients({
  dict,
  clients,
  locale,
}: {
  dict: Dictionary;
  clients: ReferenceClient[];
  locale: string;
}) {
  const g = dict.dualStudyGate;
  return (
    <section className="bg-white">
      <div className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
        <span className="inline-flex items-center rounded-full bg-amberDark/10 border border-amberDark/30 px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-amberDark">
          {g.sectionEyebrow}
        </span>
        <h2 className="mt-4 max-w-2xl font-display text-3xl md:text-4xl font-bold text-ink">
          {g.sectionTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-charcoal/75 leading-relaxed">{g.sectionBody}</p>

        <div className="mt-10 space-y-6">
          {clients.map((client) => (
            <article
              key={client.name}
              className="grid overflow-hidden rounded-3xl border border-line bg-cream/30 shadow-sm hover:shadow-lg transition-shadow md:grid-cols-2"
            >
              <div className="relative w-full aspect-[4/3] md:aspect-auto bg-ink/5">
                <Image
                  src={client.campaignImage}
                  alt={client.campaignImageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="inline-flex w-fit items-center rounded-lg bg-white border border-line px-3 py-1.5 font-display text-sm font-extrabold tracking-tight text-ink shadow-sm">
                  {client.logoText}
                </div>

                <h3 className="mt-4 font-display text-xl md:text-2xl font-bold text-ink">
                  {client.name}
                </h3>
                <p className="mt-3 text-sm md:text-base text-charcoal/75 leading-relaxed">
                  {client.description}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {client.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3 text-sm text-charcoal/85">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amberDark/15 text-amberDark text-xs font-bold">
                        ✓
                      </span>
                      {fact}
                    </li>
                  ))}
                </ul>

                {/* Secondary — background reading only. The real lead-capture CTA is
                    the single combined box below (both studies, one email field, no
                    intermediate page), per the client's requested funnel. */}
                <a
                  href={`/${locale}${client.studyHref}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.06em] text-amberDark hover:text-amber transition-colors w-fit"
                >
                  {g.resultsLabel}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* The one true lead-capture CTA for this section — both studies, one
            email field, opens immediately after submit. No extra click, no
            intermediate page, nothing competing with it. */}
        <div className="mt-6">
          <DualStudyRequestForm dict={dict} locale={locale} />
        </div>
      </div>
    </section>
  );
}
