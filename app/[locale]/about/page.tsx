import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n";
import { media } from "@/lib/media";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.meta.about.title, description: dict.meta.about.description };
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale);
  const a = dict.about;

  return (
    <section className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-amberDark">{a.kicker}</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold text-ink">{a.heading}</h1>
      <p className="mt-2 font-display text-xl md:text-2xl font-bold text-ink/70">{a.lead}</p>

      <div className="mt-10 relative w-full aspect-[16/9] max-w-3xl overflow-hidden rounded-3xl border border-line">
        <Image
          src={media.aboutHero}
          alt="Über Taxi-Werbung.org"
          fill
          sizes="(min-width: 1024px) 720px, 90vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-5 text-charcoal/80 leading-relaxed">
          <p>{a.body1}</p>
        </div>

        <div className="rounded-2xl bg-ink p-6 text-cream h-fit">
          <p className="font-display text-4xl font-extrabold text-amber">100%</p>
          <p className="mt-2 text-sm text-cream/70">{a.statLabel}</p>
        </div>
      </div>

      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {a.list.map((item, i) => (
          <li key={i} className="rounded-2xl border border-line bg-white/60 p-6 text-sm text-charcoal/75 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
