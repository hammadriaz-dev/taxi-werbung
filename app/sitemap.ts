import type { MetadataRoute } from "next";
import { locales, site } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const paths = ["", "/about", "/contact"];

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }
  return entries;
}
