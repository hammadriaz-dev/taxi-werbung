import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Big_Shoulders_Display, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import { locales, defaultLocale, getDictionary, site } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});
const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  const base = `https://${site.domain}`;
  return {
    metadataBase: new URL(base),
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: {
      canonical: `${base}/${params.locale}`,
      languages: {
        de: `${base}/de`,
        en: `${base}/en`,
      },
    },
    openGraph: {
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: `${base}/${params.locale}`,
      siteName: site.name,
      locale: params.locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = locales.includes(params.locale as any) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <Header locale={locale} dict={dict} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
