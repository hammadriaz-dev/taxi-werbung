export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalPage = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  updated: string;
  translationNote?: string;
  sections: LegalSection[];
};

const imprintDe: LegalPage = {
  metaTitle: "Impressum | Taxi-Werbung.org",
  metaDescription: "Impressum und Anbieterkennzeichnung von Taxi-Werbung.org gemäß § 5 DDG.",
  title: "Impressum",
  updated: "Stand: Juli 2026",
  sections: [
    {
      heading: "Angaben gemäß § 5 DDG",
      paragraphs: [
        "Euro Verkehrs-Werbung GmbH",
        "Bultmannsort 55",
        "49453 Wetschen",
        "Deutschland",
      ],
    },
    {
      heading: "Vertreten durch",
      paragraphs: ["Detlef Zeich (Geschäftsführer)"],
    },
    {
      heading: "Kontakt",
      paragraphs: [
        "Telefon: +49 152 58 565 656",
        "E-Mail: info@taxi-werbung.org",
        "Internet: https://taxi-werbung.org",
      ],
    },
    {
      heading: "Registereintrag",
      paragraphs: ["Registergericht: Amtsgericht Walsrode", "Registernummer: HRB 209818"],
    },
    {
      heading: "Umsatzsteuer-ID",
      paragraphs: [
        "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE348414485",
      ],
    },
    {
      heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
      paragraphs: ["Detlef Zeich", "Bultmannsort 55, 49453 Wetschen, Deutschland"],
    },
    {
      heading: "EU-Streitschlichtung",
      paragraphs: [
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.",
        "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      ],
    },
    {
      heading: "Haftung für Inhalte",
      paragraphs: [
        "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
        "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
      ],
    },
    {
      heading: "Haftung für Links",
      paragraphs: [
        "Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
      ],
    },
    {
      heading: "Urheberrecht",
      paragraphs: [
        "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
      ],
    },
  ],
};

const imprintEn: LegalPage = {
  metaTitle: "Imprint | Taxi-Werbung.org",
  metaDescription: "Legal notice (Impressum) for Taxi-Werbung.org, as required under German law (§ 5 DDG).",
  title: "Imprint",
  updated: "Last updated: July 2026",
  translationNote:
    "This is a courtesy English translation. The German version is the legally binding one.",
  sections: [
    {
      heading: "Information pursuant to § 5 DDG",
      paragraphs: [
        "Euro Verkehrs-Werbung GmbH",
        "Bultmannsort 55",
        "49453 Wetschen",
        "Germany",
      ],
    },
    {
      heading: "Represented by",
      paragraphs: ["Detlef Zeich (Managing Director)"],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Phone: +49 152 58 565 656",
        "Email: info@taxi-werbung.org",
        "Website: https://taxi-werbung.org",
      ],
    },
    {
      heading: "Commercial register entry",
      paragraphs: ["Register court: Amtsgericht Walsrode", "Register number: HRB 209818"],
    },
    {
      heading: "VAT ID",
      paragraphs: [
        "VAT identification number pursuant to § 27a of the German VAT Act: DE348414485",
      ],
    },
    {
      heading: "Responsible for content pursuant to § 18 (2) MStV",
      paragraphs: ["Detlef Zeich", "Bultmannsort 55, 49453 Wetschen, Germany"],
    },
  ],
};

const privacyDe: LegalPage = {
  metaTitle: "Datenschutzerklärung | Taxi-Werbung.org",
  metaDescription: "Datenschutzerklärung von Taxi-Werbung.org gemäß DSGVO.",
  title: "Datenschutzerklärung",
  updated: "Stand: Juli 2026",
  sections: [
    {
      heading: "Datenschutz auf einen Blick",
      paragraphs: [
        "Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.",
        "Die Nutzung dieser Website ist grundsätzlich ohne Angabe personenbezogener Daten möglich. Soweit personenbezogene Daten (z. B. Name, E-Mail-Adresse oder Telefonnummer) erhoben werden, erfolgt dies stets auf freiwilliger Basis.",
      ],
    },
    {
      heading: "Verantwortlicher",
      paragraphs: [
        "Euro Verkehrs-Werbung GmbH",
        "Bultmannsort 55",
        "49453 Wetschen",
        "Deutschland",
        "Vertreten durch den Geschäftsführer: Detlef Zeich",
        "Telefon: +49 152 58 565 656",
        "E-Mail: info@taxi-werbung.org",
        "Internet: https://taxi-werbung.org",
      ],
    },
    {
      heading: "Hosting",
      paragraphs: [
        "Beim Besuch dieser Website werden automatisch Informationen durch den Hosting-Anbieter in sogenannten Server-Logfiles gespeichert. Hierzu können insbesondere gehören:",
      ],
      list: [
        "IP-Adresse",
        "Datum und Uhrzeit des Zugriffs",
        "Browsertyp und Browserversion",
        "Betriebssystem",
        "Referrer-URL",
        "aufgerufene Seiten",
      ],
    },
    {
      heading: "",
      paragraphs: [
        "Diese Daten dienen ausschließlich dem sicheren und störungsfreien Betrieb der Website sowie der technischen Fehleranalyse.",
      ],
    },
    {
      heading: "Kontaktaufnahme",
      paragraphs: [
        "Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen übermittelten Daten ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.",
        "Eine Weitergabe an Dritte erfolgt nicht, sofern keine gesetzliche Verpflichtung besteht.",
      ],
    },
    {
      heading: "Kontaktformular",
      paragraphs: [
        "Sofern auf dieser Website ein Kontaktformular verwendet wird, werden die dort eingegebenen Daten ausschließlich zur Bearbeitung Ihrer Anfrage verarbeitet.",
        "Die Daten werden nicht ohne Ihre Einwilligung an Dritte weitergegeben.",
      ],
    },
    {
      heading: "Videos",
      paragraphs: [
        "Auf dieser Website können Videos eingebunden sein.",
        "Werden die Videos direkt von unserem Server bereitgestellt, erfolgt beim Abspielen keine Datenübertragung an externe Videoplattformen wie YouTube oder Vimeo.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "Diese Website verwendet ausschließlich technisch notwendige Cookies, sofern dies für den Betrieb der Website erforderlich ist.",
        "Sollten künftig Analyse- oder Marketing-Cookies eingesetzt werden, erfolgt dies nur nach vorheriger Einwilligung.",
      ],
    },
    {
      heading: "Rechtsgrundlagen der Verarbeitung",
      paragraphs: [
        "Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage der Datenschutz-Grundverordnung (DSGVO), insbesondere nach:",
      ],
      list: [
        "Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)",
        "Art. 6 Abs. 1 lit. b DSGVO (Vertrag bzw. Vertragsanbahnung)",
        "Art. 6 Abs. 1 lit. c DSGVO (gesetzliche Verpflichtung)",
        "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)",
      ],
    },
    {
      heading: "Speicherdauer",
      paragraphs: [
        "Personenbezogene Daten werden nur so lange gespeichert, wie dies zur Bearbeitung Ihrer Anfrage oder aufgrund gesetzlicher Aufbewahrungspflichten erforderlich ist.",
      ],
    },
    {
      heading: "Ihre Rechte",
      paragraphs: ["Sie haben jederzeit das Recht auf:"],
      list: [
        "Auskunft über Ihre gespeicherten Daten,",
        "Berichtigung unrichtiger Daten,",
        "Löschung Ihrer Daten,",
        "Einschränkung der Verarbeitung,",
        "Datenübertragbarkeit,",
        "Widerspruch gegen die Verarbeitung,",
        "Widerruf einer erteilten Einwilligung.",
      ],
    },
    {
      heading: "Beschwerderecht",
      paragraphs: [
        "Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.",
      ],
    },
    {
      heading: "Datensicherheit",
      paragraphs: [
        "Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten vor Verlust, Manipulation oder unbefugtem Zugriff zu schützen.",
      ],
    },
    {
      heading: "Änderungen dieser Datenschutzerklärung",
      paragraphs: [
        "Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie den jeweils aktuellen rechtlichen Anforderungen entspricht oder Änderungen unserer Leistungen berücksichtigt.",
      ],
    },
  ],
};

const privacyEn: LegalPage = {
  metaTitle: "Privacy Policy | Taxi-Werbung.org",
  metaDescription: "Privacy policy for Taxi-Werbung.org in accordance with the GDPR.",
  title: "Privacy Policy",
  updated: "Last updated: July 2026",
  translationNote:
    "This is a courtesy English translation. The German version is the legally binding one.",
  sections: [
    {
      heading: "1. Data protection at a glance",
      paragraphs: [
        "Protecting your personal data is important to us. We treat your personal data as confidential and in accordance with statutory data protection regulations and this privacy policy.",
        "This website can generally be used without providing personal data. Where personal data (e.g. name, email address, or phone number) is collected, this is always done on a voluntary basis.",
      ],
    },
    {
      heading: "2. Controller",
      paragraphs: [
        "Euro Verkehrs-Werbung GmbH",
        "Bultmannsort 55",
        "49453 Wetschen",
        "Germany",
        "Contact: Ralf Klimmeck",
        "Phone: +49 152 58 565 656",
        "Email: info@taxi-werbung.org",
        "Website: https://taxi-werbung.org",
      ],
    },
    {
      heading: "3. Hosting",
      paragraphs: [
        "When you visit this website, information is automatically stored by our hosting provider in what are known as server log files. This may include in particular:",
      ],
      list: [
        "IP address",
        "date and time of access",
        "browser type and version",
        "operating system",
        "referrer URL",
        "pages accessed",
      ],
    },
    {
      heading: "",
      paragraphs: [
        "This data is used exclusively to ensure the secure, uninterrupted operation of the website and for technical error analysis.",
      ],
    },
    {
      heading: "4. Contacting us",
      paragraphs: [
        "If you contact us by email, the data you provide will be used exclusively to process your enquiry.",
        "This data will not be shared with third parties unless we are legally obliged to do so.",
      ],
    },
    {
      heading: "5. Contact form",
      paragraphs: [
        "Where a contact form is used on this website, the data entered there is processed exclusively to handle your enquiry.",
        "This data will not be shared with third parties without your consent.",
      ],
    },
    {
      heading: "6. Videos",
      paragraphs: [
        "This website may include embedded videos.",
        "Where videos are served directly from our own server, no data is transmitted to external video platforms such as YouTube or Vimeo during playback.",
      ],
    },
    {
      heading: "7. Cookies",
      paragraphs: [
        "This website uses only technically necessary cookies, where required for the website to function.",
        "Should analytics or marketing cookies be used in future, this will only take place with your prior consent.",
      ],
    },
    {
      heading: "8. Legal basis for processing",
      paragraphs: [
        "Personal data is processed on the basis of the General Data Protection Regulation (GDPR), in particular pursuant to:",
      ],
      list: [
        "Art. 6 (1)(a) GDPR (consent)",
        "Art. 6 (1)(b) GDPR (contract or pre-contractual measures)",
        "Art. 6 (1)(c) GDPR (legal obligation)",
        "Art. 6 (1)(f) GDPR (legitimate interest)",
      ],
    },
    {
      heading: "9. Storage period",
      paragraphs: [
        "Personal data is only stored for as long as is necessary to process your enquiry or as required by statutory retention obligations.",
      ],
    },
    {
      heading: "10. Your rights",
      paragraphs: ["You have the right, at any time, to:"],
      list: [
        "obtain information about your stored data,",
        "have inaccurate data corrected,",
        "have your data deleted,",
        "restrict processing,",
        "data portability,",
        "object to processing,",
        "withdraw any consent given.",
      ],
    },
    {
      heading: "11. Right to lodge a complaint",
      paragraphs: [
        "You have the right to lodge a complaint with a data protection supervisory authority regarding the processing of your personal data.",
      ],
    },
    {
      heading: "12. Data security",
      paragraphs: [
        "We use technical and organizational security measures to protect your data against loss, manipulation, or unauthorized access.",
      ],
    },
    {
      heading: "13. Changes to this privacy policy",
      paragraphs: [
        "We reserve the right to update this privacy policy so that it always complies with current legal requirements or to reflect changes to our services.",
      ],
    },
  ],
};

export function getImprint(locale: string): LegalPage {
  return locale === "en" ? imprintEn : imprintDe;
}

export function getPrivacy(locale: string): LegalPage {
  return locale === "en" ? privacyEn : privacyDe;
}