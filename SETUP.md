# TurboFix — Premium Mobile Repair Website

A full Next.js 14 website for **TurboFix**, a Hyderabad-based mobile repair startup.  
Dark premium theme · Electric-blue neon · Glassmorphism · Framer Motion animations.

---

## Quick Start

```bash
# 1 — Install dependencies
npm install

# 2 — Start the dev server
npm run dev

# 3 — Open in browser
# http://localhost:3000
```

---

## Production Build

```bash
npm run build
npm start
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Utility styling |
| Framer Motion | Page/scroll animations |
| GSAP-ready | Advanced animations (import from `gsap`) |
| Lucide React | Icon system |
| React Hook Form | Booking form state |
| React Hot Toast | Notifications |
| react-intersection-observer | Scroll reveal triggers |
| react-type-animation | Hero typewriter effect |

---

## Project Structure

```
turbofix/
├── app/
│   ├── layout.tsx            ← Root layout (Navbar, Footer, Cursor, Loading)
│   ├── globals.css           ← Design tokens, glass utilities, animations
│   ├── page.tsx              ← Home (all 8 sections)
│   ├── about/                ← About page
│   ├── services/             ← Services detail page
│   ├── book-repair/          ← 4-step booking wizard ⭐
│   ├── pricing/              ← Tabbed pricing table
│   ├── testimonials/         ← Masonry testimonials grid
│   ├── faq/                  ← Full FAQ with categories
│   ├── contact/              ← Contact form + map
│   └── not-found.tsx         ← Custom 404
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        ← Animated navbar with hide-on-scroll
│   │   └── Footer.tsx        ← Multi-column footer with newsletter
│   ├── home/
│   │   ├── Hero.tsx          ← Animated phone mockup + typewriter
│   │   ├── Services.tsx      ← 8-card services grid
│   │   ├── WhyChooseUs.tsx   ← Animated counters + feature cards
│   │   ├── HowItWorks.tsx    ← 4-step timeline
│   │   ├── Brands.tsx        ← Dual-direction marquee
│   │   ├── Testimonials.tsx  ← Auto-playing carousel
│   │   ├── FAQ.tsx           ← Split accordion
│   │   └── CTA.tsx           ← Final call-to-action banner
│   ├── booking/
│   │   └── (inside app/book-repair/BookRepairClient.tsx)
│   └── common/
│       ├── LoadingScreen.tsx ← Animated progress loader
│       ├── CustomCursor.tsx  ← Glow cursor (desktop only)
│       ├── WhatsAppButton.tsx← Floating WhatsApp FAB + chat popup
│       ├── ParticleBackground.tsx ← Canvas particle system
│       └── AnimatedCounter.tsx    ← Scroll-triggered number counter
│
├── lib/
│   └── utils.ts              ← cn(), animation variants, formatPrice
│
└── SETUP.md                  ← This file
```

---

## Customisation Guide

### Brand Colors
Edit `app/globals.css` — all neon colors are CSS variables:
```css
--neon-blue: #00AAFF;
--neon-cyan: #00FFFF;
--neon-purple: #7C3AED;
--bg-primary: #02040F;
```

### Phone Number / Contact
Search and replace `+91 98765 43210` and `919876543210` across all files.

### Business Address
Update the address string in `components/layout/Footer.tsx` and `app/contact/ContactPageClient.tsx`.

### Google Maps
Replace the `src` in the `<iframe>` inside `ContactPageClient.tsx` with your real Maps embed URL.

### Pricing
Edit the `priceData` object in `app/pricing/PricingPage.tsx`.

### Services
Edit the `services` arrays in `components/home/Services.tsx` and `app/services/ServicesPage.tsx`.

---

## Deployment (Vercel — Recommended)

```bash
npm install -g vercel
vercel
```

Or push to GitHub and import directly at vercel.com — zero config required.

---

## Adding GSAP (Optional)

GSAP is in package.json. To use it in any component:

```tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

---

Built with ❤️ for TurboFix, Hyderabad.
