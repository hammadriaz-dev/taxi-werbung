import de from "./dictionaries/de";
import en from "./dictionaries/en";

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

const dictionaries = { de, en };

export function getDictionary(locale: string) {
  return dictionaries[(locale as Locale) in dictionaries ? (locale as Locale) : defaultLocale];
}

// Site-wide contact details (single source of truth)
export const site = {
  name: "Taxi-Werbung.org",
  domain: "taxi-werbung.org",
  email: "info@taxi-werbung.org",
  phone: "+49 152 58565656",
  phoneHref: "+4915258565656",
};