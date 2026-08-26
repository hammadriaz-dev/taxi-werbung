export const media = {
  logo: "/images/logo-icon.png",
  // Icon-only badge (taxi silhouette in the yellow circle, no baked-in text) —
  // paired with real HTML text in the header so text color can be controlled precisely
  logoIcon: "/images/logo-icon-circle.png",
  // Client's original flattened logo lockup (kept for reference / other uses)
  logoStacked: "/images/logo-stacked.png",
  homeHero: "/images/hero-taxi.png",
  homeStory: "https://taxi-werbung.org/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-03-at-1.09.00-AM-1024x767.jpeg",
  homeFeature: "/images/feature-door-panel.png",
  gallery: [
    "https://taxi-werbung.org/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-03-at-1.06.26-AM.jpeg",
    "https://taxi-werbung.org/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-03-at-1.06.56-AM-722x1024.jpeg",
    "https://taxi-werbung.org/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-03-at-1.07.34-AM-778x1024.jpeg",
  ],
  aboutHero: "https://taxi-werbung.org/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-03-at-1.09.38-AM-768x576.jpeg",
  contactHero: "https://taxi-werbung.org/wp-content/uploads/2024/02/hot-line-contact-us-call-center-search-interface_53876-124009.jpg",

  // Hero video (kept exactly as supplied by the client, no processing)
  heroVideo: "/videos/berlin-taxi.mp4",
  heroVideoPoster: "/images/hero-video-poster.png",

  // "Taxi Advertising in Action" showreel, shown alongside the references —
  // two language versions, shown side by side so visitors can pick one
  showreelVideoDe: "/videos/taxi-showreel-de.mp4",
  showreelVideoEn: "/videos/taxi-showreel-en.mp4",
  showreelPoster: "/images/showreel-poster.png",

  // The two client-supplied urban-style marketing visuals, placed in
  // separate sections per the client's requested page structure
  urbanVisual1: "/images/urban/urban-visual-1.png",
  urbanVisual2: "/images/urban/urban-visual-2.png",

  // Campaign photos for the premium "Reference Clients" case-study section
  // (Procter & Gamble / Febreze, then porta Möbel) — order must match
  // dict.referenceClients.clients in lib/dictionaries/de.ts and en.ts.
  // NOTE: febreze-campaign.webp is a low-res temporary crop pulled from the
  // client's infographic screenshot — replace with a real high-res photo
  // when available. porta reuses the existing real porta-2.jpg reference photo.
  referenceClientImages: [
    "/images/references/reference-clients/febreze-campaign.webp",
    "/images/references/porta-2.jpg",
  ],

  // Real customer campaign photos for the references carousel.
  // Order follows the client's requested sequence; the two references not
  // mentioned in that list (Turkish Airlines, Authentic Cuba) are kept at
  // the end rather than dropped.
  references: [
    { src: "/images/references/next-door.png", name: "NEXT DOOR Fitness" },
    { src: "/images/references/rewe-to-go.jpg", name: "REWE To Go" },
    { src: "/images/references/ay-yildiz.jpg", name: "Ay Yildiz" },
    { src: "/images/references/sparkasse.jpg", name: "Sparkasse Nienburg" },
    { src: "/images/references/porta.jpg", name: "porta! Möbel" },
    { src: "/images/references/porta-2.jpg", name: "porta! Möbel" },
    { src: "/images/references/porta-3.jpg", name: "porta! Möbel" },
    { src: "/images/references/bundeswehr.jpg", name: "Bundeswehr" },
    { src: "/images/references/flic-flac.jpg", name: "Flic Flac" },
    { src: "/images/references/umwelt-taxi.jpg", name: "Umwelt-Taxi" },
    { src: "/images/references/installation-workshop.jpg", name: "Kampagnen-Installation" },
    { src: "/images/references/turkish-airlines.jpg", name: "Turkish Airlines" },
    { src: "/images/references/authentic-cuba.jpg", name: "Authentic Cuba" },
    { src: "/images/references/wilden-westen-taxi-wrap.png", name: "Travel Texas" },
  ],
};
