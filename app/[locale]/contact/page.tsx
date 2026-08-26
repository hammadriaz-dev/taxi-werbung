import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary, site } from "@/lib/i18n";
import { media } from "@/lib/media";
import LeadForm from "@/components/LeadForm";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.meta.contact.title, description: dict.meta.contact.description };
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const c = dict.contact;

  return (
    <section className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl border border-line mb-8">
            <Image
              src={media.contactHero}
              alt="Kontaktieren Sie Taxi-Werbung.org"
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
              priority
            />
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amberDark">{c.kicker}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold text-ink">{c.heading}</h1>
          <p className="mt-4 max-w-md text-charcoal/75 leading-relaxed">{c.intro}</p>

          <div className="mt-8 text-sm">
            <p className="font-semibold text-ink">{c.directLabel}</p>
            <p className="mt-2">
              <a href={`mailto:${site.email}`} className="text-ink underline decoration-amber underline-offset-4 hover:text-amberDark">
                {site.email}
              </a>
            </p>
            <p className="mt-1">
              <a href={`tel:${site.phoneHref}`} className="text-ink underline decoration-amber underline-offset-4 hover:text-amberDark">
                {site.phone}
              </a>
            </p>
          </div>
        </div>

        <LeadForm dict={dict} locale={locale} />
      </div>
    </section>
  );
}