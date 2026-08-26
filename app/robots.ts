import type { MetadataRoute } from "next";
import { site } from "@/lib/i18n";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://${site.domain}/sitemap.xml`,
  };
}
