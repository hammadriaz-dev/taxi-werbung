# Taxi-Werbung.org — Website (Next.js)

Rebuilt, modernized, bilingual (DE/EN) version of taxi-werbung.org, with a lead form that
emails every inquiry straight to info@taxi-werbung.org. This document is the step-by-step
guide the client asked for: hosting, GitHub, deployment, CMS/content, email setup, and
credentials.

## 1. What's in this project

- **Framework:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Pages:** Home, About Us (Über Uns), Contact (Kontakt) — each in `/de` and `/en`
- **Language switcher:** small "DE | EN" control, top right, on every page
- **Lead form:** Company name, Contact person, Email, Phone (optional), Message — kept
  deliberately short (no City field) so there's as little friction as possible between a
  visitor deciding to reach out and actually submitting the form
- **Email delivery:** `/app/api/lead/route.ts` sends every submission straight to
  info@taxi-werbung.org via Resend, with "reply-to" set to the visitor's own address so a
  reply goes straight back to them
- **SEO:** per-page titles/descriptions, hreflang alternates for DE/EN, `sitemap.xml`,
  `robots.txt`, semantic HTML, optimized fonts, no unnecessary client-side JS

Content and copy were restored from the original site (Home, Über Uns, Kontakt) and rewritten
for the modern layout — nothing was invented; the German copy is the original wording, lightly
adapted, plus an English translation.

## 2. Ownership — everything stays under your accounts

Nothing here needs to be created under the developer's account. You will create:

1. A **Hostinger** hosting plan (Node.js hosting, or a VPS) — domain `taxi-werbung.org` stays
   in your existing Hostinger account.
2. A **GitHub** repository under your own GitHub account — the developer pushes code there,
   you own it from commit #1.
3. A **Resend** account (yours, free) — the lead form sends email through it using an API key
   that only you generate and control.

## 3. GitHub setup

1. Create a GitHub account if you don't have one: https://github.com/signup
2. Create a new repository (e.g. `taxi-werbung-website`), public or private — your choice.
3. Send the repo URL to your developer. They will run:
   ```bash
   git init
   git remote add origin https://github.com/YOUR-USERNAME/taxi-werbung-website.git
   git add .
   git commit -m "Initial commit: restored + modernized taxi-werbung.org"
   git branch -M main
   git push -u origin main
   ```
4. You now have full history and ownership of the code.

## 4. Hosting on Hostinger

Next.js needs a Node.js runtime (this is not a plain static HTML site), so use one of:

- **Hostinger's Node.js hosting / VPS plan** — deploy by pulling the GitHub repo and running:
  ```bash
  npm install
  npm run build
  npm run start
  ```
  (Hostinger's control panel lets you set the start command and Node version — use Node 18+.)

- **Alternative (simplest for most agencies):** connect the GitHub repo to **Vercel** (made by
  the creators of Next.js, free tier available) for hosting/deployment, and just point your
  Hostinger-managed domain's DNS (A/CNAME records) at Vercel. The domain still lives entirely
  in your Hostinger account — only the DNS record changes. Recommended if Hostinger's Node
  support gives you trouble.

Either way, the domain, DNS, and hosting account stay yours.

## 5. Environment variables (credentials)

Copy `.env.example` to `.env.local` for local testing, and enter the same value in your
hosting provider's "Environment Variables" panel for production:

| Variable | Where to get it |
|---|---|
| `RESEND_API_KEY` | Sign up free at https://resend.com → **Dashboard** → **API Keys** → **Create API Key** |

Never commit this value to GitHub — `.env.local` is already excluded via `.gitignore`.

## 6. Setting up email delivery (Resend)

The form now emails every inquiry directly to **info@taxi-werbung.org** — no CRM step required.

1. **Create a free Resend account**: https://resend.com/signup
2. **Get an API key**: Dashboard → API Keys → Create API Key → paste it into `RESEND_API_KEY`
   (both in `.env.local` for testing and in your hosting provider's env variables for production)
3. **(Recommended) Verify your domain**: Dashboard → Domains → Add Domain → `taxi-werbung.org`,
   then add the DNS records Resend gives you at your DNS provider (Hostinger). This lets you
   send *from* an address on your own domain (e.g. `noreply@taxi-werbung.org`) instead of
   Resend's shared test address, and improves inbox deliverability. Until you do this, the
   form still works — it just sends from Resend's test sender (`onboarding@resend.dev`), which
   some spam filters treat slightly less favorably. To switch the "from" address once your
   domain is verified, edit the `from:` line in `app/api/lead/route.ts`.
4. Every form submission now:
   - Sends an email straight to `info@taxi-werbung.org` with the visitor's company, contact
     name, email, phone (if given), and message
   - Sets `replyTo` to the visitor's own email, so hitting "Reply" in your inbox goes straight
     back to them
   - Shows the visitor an inline "Thank you" confirmation on the page

This is intentionally simpler than a full CRM integration: fewer moving parts, fewer things
that can silently break, and the client's actual ask was "make the form work and land in my
inbox" — not marketing automation. If a CRM/automation step is wanted later (e.g. Systeme.io,
Mailchimp, HubSpot), that's a separate follow-up and doesn't require touching the form itself.

## 7. Language switcher

"DE | EN" appears top-right in the header on every page, including the contact/funnel page.
It preserves the current page when switching (e.g. `/de/contact` → `/en/contact`).

## 8. Local development

```bash
npm install
cp .env.example .env.local   # then fill in your Resend API key
npm run dev
```

Visit `http://localhost:3000` (redirects to `/de`).

## 9. Before going live — checklist

- [ ] Confirm phone number and email in `lib/i18n.ts` (`site.email`, `site.phone`) are correct
- [ ] Fill in `RESEND_API_KEY` in production environment variables
- [ ] (Recommended) Verify `taxi-werbung.org` in Resend so emails send from your own domain,
      not the shared test address — see Section 6
- [ ] Test a real form submission end-to-end and confirm the email lands in
      info@taxi-werbung.org's inbox
- [ ] Point Hostinger DNS at your chosen hosting target and confirm `https://taxi-werbung.org`
      loads for both `/de` and `/en`
