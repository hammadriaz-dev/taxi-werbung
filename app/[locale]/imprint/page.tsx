import type { Metadata } from "next";
import { getImprint } from "@/lib/legal";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const page = getImprint(params.locale);
  return { title: page.metaTitle, description: page.metaDescription };
}

export default function ImprintPage({ params }: { params: { locale: string } }) {
  const page = getImprint(params.locale);

  return (
    <section className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-ink">{page.title}</h1>
        <p className="mt-2 text-sm text-charcoal/50">{page.updated}</p>
        {page.translationNote && (
          <p className="mt-4 rounded-lg bg-white/60 border border-line px-4 py-3 text-sm text-charcoal/70">
            {page.translationNote}
          </p>
        )}
      </div>

      <div className="mt-10 max-w-2xl space-y-8">
        {page.sections.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h2 className="font-display text-lg font-bold text-ink">{section.heading}</h2>
            )}
            {section.paragraphs?.map((p, j) => (
              <p key={j} className="mt-2 text-charcoal/80 leading-relaxed">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="mt-2 list-disc pl-5 space-y-1 text-charcoal/80">
                {section.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
