import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import StickyCallBar from "@/components/common/StickyCallBar";
import { Toaster } from "react-hot-toast";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  BUSINESS_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE_E164,
  GOOGLE_BUSINESS_PROFILE_URL, SOCIAL_PROFILES,
} from "@/lib/config";

// Verified profiles only (see lib/config.ts), plus the Google Business Profile once its link is added.
const sameAs = [
  ...SOCIAL_PROFILES.map((p) => p.href),
  ...(GOOGLE_BUSINESS_PROFILE_URL ? [GOOGLE_BUSINESS_PROFILE_URL] : []),
];

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://turbofix.in"),
  title: {
    default: "TurboFix — Mobile Service at Your Doorstep | Hyderabad",
    template: "%s | TurboFix",
  },
  description:
    "TurboFix — doorstep mobile service in Hyderabad. Screen, battery & charging port service for iPhone, Samsung & more. OEM parts, up to 1-year warranty.",
  keywords: [
    "mobile service hyderabad", "doorstep mobile service hyderabad",
    "mobile repair hyderabad", "mobile repair near me",
    "phone repair near me", "doorstep mobile repair hyderabad",
    "iphone service hyderabad", "iphone repair near me", "samsung service hyderabad",
    "oneplus service hyderabad", "realme service hyderabad",
    "phone screen replacement hyderabad", "mobile screen replacement near me", "battery replacement hyderabad",
    "phone battery replacement near me", "charging port service hyderabad", "water damage service hyderabad",
    "mobile service near me", "phone service at home hyderabad",
    "same day mobile service", "mobile technician at home",
    "smartphone service hyderabad", "doorstep phone service",
    "TurboFix", "mobile service hyderabad",
  ],
  authors: [{ name: "TurboFix", url: "https://turbofix.in" }],
  creator: "TurboFix",
  publisher: "TurboFix",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://turbofix.in",
    title: "TurboFix — Mobile Service at Your Doorstep | Hyderabad",
    description:
      "Doorstep mobile service in Hyderabad and a walk-in studio in Nampally. Screen, battery, charging port and water damage service for iPhone, Samsung, OnePlus & more. Up to 1-year warranty.",
    siteName: "TurboFix",
    images: [{
      url: "https://turbofix.in/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "TurboFix — Premium Doorstep Mobile Service in Hyderabad",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TurboFix — Mobile Service at Your Doorstep | Hyderabad",
    description: "Fast doorstep mobile service in Hyderabad. Screen, battery, water damage & more. Book now!",
    images: ["https://turbofix.in/og-image.jpg"],
    // No site/creator handle: @turbofix isn't a confirmed TurboFix account.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",

  // ── Favicon / App Icons ─────────────────────────────────────────────────────
  // Google Search requires a PNG/ICO/JPG — SVG is NOT supported for search icons.
  // Files must exist in /public before building.
  icons: {
    icon: [
      { url: "/favicon.svg",    type: "image/svg+xml"  },   // browser tab fallback
      { url: "/icon-192.png",   type: "image/png", sizes: "192x192"  },
      { url: "/icon-512.png",   type: "image/png", sizes: "512x512"  },
    ],
    apple:    [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon-192.png",
  },
};

// ── STRUCTURED DATA ──────────────────────────────────────────────────────────
// Every fact here must also be visible on the site (footer, contact page).
// Address / phone / email come from lib/config.ts so they can't drift.

const localBusinessSchema = {
  "@context": "https://schema.org",
  // Closest schema.org type for a phone service studio; HardwareStore (tools &
  // building supplies) was removed as inaccurate.
  "@type": "MobilePhoneStore",
  "@id": "https://turbofix.in/#business",
  name: "TurboFix",
  alternateName: ["TurboFix Mobile Service", "TurboFix Hyderabad"],
  description:
    "TurboFix is a specialized electronics and mobile phone service studio in Hyderabad. We provide doorstep mobile screen replacement, cell phone battery replacement, charging port troubleshooting, and service for Apple iPhone, Samsung Galaxy, OnePlus, and Android devices.",
  url: "https://turbofix.in",
  logo: {
    "@type": "ImageObject",
    url: "https://turbofix.in/logo.png",
    width: 200,
    height: 200,
  },
  image: "https://turbofix.in/og-image.jpg",
  telephone: CONTACT_PHONE_E164,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_ADDRESS.street,
    addressLocality: BUSINESS_ADDRESS.locality,
    addressRegion: BUSINESS_ADDRESS.region,
    postalCode: BUSINESS_ADDRESS.postalCode,
    addressCountry: BUSINESS_ADDRESS.country,
  },
  // Studio location from the owner's plus code 9FP7+FH Hyderabad (7J9W9FP7+FH).
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.386187,
    longitude: 78.463938,
  },
  parentOrganization: { "@id": "https://turbofix.in/#organization" },
  // Studio walk-ins and doorstep visits: 09:00–21:00 every day (confirmed by
  // the owner, 4 Oct 2026). Online/WhatsApp bookings are accepted 24/7, but
  // that's not opening hours, so it's stated in visible copy only.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking",
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "City", name: "Secunderabad" },
  ],
  knowsLanguage: ["en", "te", "hi"],
  sameAs,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mobile Service Offerings",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Screen Replacement", serviceType: "Mobile Phone Screen Replacement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Battery Replacement", serviceType: "Mobile Phone Battery Replacement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Charging Port Service", serviceType: "Mobile Phone Charging Port Service" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Water Damage Service", serviceType: "Mobile Phone Water Damage Service" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Camera Service", serviceType: "Mobile Phone Camera Service" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Speaker & Mic Service", serviceType: "Mobile Phone Speaker Service" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Back Glass Replacement", serviceType: "Mobile Phone Back Panel Replacement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Motherboard Service", serviceType: "Mobile Phone Motherboard Service" } },
    ],
  },
  // NOTE: aggregateRating / review markup intentionally omitted.
  // Google penalizes fabricated review schema; only add this back once wired
  // to a real, verifiable review source (e.g. Google Business Profile API).
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://turbofix.in/#organization",
  name: "TurboFix",
  url: "https://turbofix.in",
  logo: {
    "@type": "ImageObject",
    url: "https://turbofix.in/logo.png",
    width: 200,
    height: 200,
  },
  foundingDate: "2023",
  foundingLocation: {
    "@type": "Place",
    name: "Hyderabad, Telangana, India",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: CONTACT_PHONE_E164,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "te"],
      // Doorstep visit hours: 09:00–21:00, Monday to Sunday.
      hoursAvailable: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "21:00" },
      ],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      areaServed: "IN",
    },
  ],
  sameAs,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://turbofix.in/#website",
  name: "TurboFix",
  url: "https://turbofix.in",
  description: "Doorstep mobile service in Hyderabad — trained technicians, OEM parts, up to 1-year warranty",
  publisher: { "@id": "https://turbofix.in/#organization" },
  inLanguage: "en-IN",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-white text-slate-700 overflow-x-hidden pb-20 lg:pb-0">
        {/* JSON-LD — plain <script> tags so Google Rich Results Test detects them */}
        <JsonLd schema={localBusinessSchema} id="schema-local-business" />
        <JsonLd schema={organizationSchema} id="schema-organization" />
        <JsonLd schema={websiteSchema} id="schema-website" />

        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <StickyCallBar />
        <WhatsAppButton />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0F172A",
              color: "#fff",
              border: "1px solid rgba(37,99,235,0.25)",
              backdropFilter: "blur(20px)",
            },
          }}
        />

        {/* ── Google Ads tag (gtag.js) ── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18198192366"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18198192366');
          `}
        </Script>
      </body>
    </html>
  );
}