import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#EFE7D2",      // RAL 1015 Hellelfenbein — the legally mandated German taxi color
        ink: "#132038",         // deep navy — trust, headlines, footer
        inkSoft: "#1F3155",
        amber: "#F2A93C",       // warm amber — CTA / accent
        amberDark: "#D98F1F",
        taxiYellow: "#F8DF23",  // exact yellow of the logo icon — used to keep logo text on-brand
        charcoal: "#2A2A28",
        line: "#DCD2B4",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
export default config;
