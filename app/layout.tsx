import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { Toaster } from "react-hot-toast";
import { JsonLd } from "@/components/seo/JsonLd";

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
    default: "TurboFix — Mobile Repair at Your Doorstep | Hyderabad",
    template: "%s | TurboFix",
  },
  description:
    "TurboFix — doorstep mobile repair service in Hyderabad. Screen replacement, battery replacement, charging port repair, water damage, iPhone & Samsung repair. Trained technicians, OEM parts, 6-month warranty. Book now!",
  keywords: [
    "mobile repair hyderabad", "doorstep mobile repair hyderabad",
    "iphone repair hyderabad", "samsung repair hyderabad",
    "oneplus repair hyderabad", "realme repair hyderabad",
    "phone screen replacement hyderabad", "battery replacement hyderabad",
    "charging port repair hyderabad", "water damage repair hyderabad",
    "mobile repair near me", "phone repair at home hyderabad",
    "same day mobile repair", "mobile technician at home",
    "smartphone repair hyderabad", "doorstep phone repair",
    "TurboFix", "mobile service hyderabad",
  ],
  authors: [{ name: "TurboFix", url: "https://turbofix.in" }],
  creator: "TurboFix",
  publisher: "TurboFix",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "https://turbofix.in" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://turbofix.in",
    title: "TurboFix — Mobile Repair at Your Doorstep | Hyderabad",
    description:
      "Professional doorstep mobile repair in Hyderabad. Screen, battery, charging port, water damage repair for iPhone, Samsung, OnePlus & more. OEM parts, 6-month warranty.",
    siteName: "TurboFix",
    images: [{
      url: "https://turbofix.in/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "TurboFix — Premium Doorstep Mobile Repair in Hyderabad",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TurboFix — Mobile Repair at Your Doorstep | Hyderabad",
    description: "Fast doorstep mobile repair in Hyderabad. Screen, battery, water damage & more. Book now!",
    images: ["https://turbofix.in/og-image.jpg"],
    site: "@turbofix",
    creator: "@turbofix",
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
// Using explicit classifications to sever any automotive context or AI confusion.

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["MobilePhoneStore", "HardwareStore"],
  "@id": "https://turbofix.in/#business",
  name: "TurboFix",
  alternateName: ["TurboFix Mobile Repair", "TurboFix Hyderabad"],
  description:
    "TurboFix is a specialized electronics and mobile phone repair shop in Hyderabad. We provide doorstep mobile screen replacement, cell phone battery repairs, charging port troubleshooting, and service for Apple iPhone, Samsung Galaxy, OnePlus, and Android devices.",
  url: "https://turbofix.in",
  logo: {
    "@type": "ImageObject",
    url: "https://turbofix.in/logo.png",
    width: 200,
    height: 200,
  },
  image: "https://turbofix.in/og-image.jpg",
  telephone: "+918639605147",
  email: "support@turbofix.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "11-1-441, Aghapura, Nampally",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.3850,
    longitude: 78.4867,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking",
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "City", name: "Secunderabad" },
  ],
  sameAs: [
    "https://www.instagram.com/turbofix",
    "https://www.facebook.com/turbofix",
    "https://twitter.com/turbofix",
    "https://www.youtube.com/@turbofix",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mobile Repair Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "RepairService", name: "Screen Replacement", serviceType: "Mobile Phone Screen Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "RepairService", name: "Battery Replacement", serviceType: "Mobile Phone Battery Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "RepairService", name: "Charging Port Repair", serviceType: "Mobile Phone Charging Port Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "RepairService", name: "Water Damage Recovery", serviceType: "Mobile Phone Water Damage Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "RepairService", name: "Camera Repair", serviceType: "Mobile Phone Camera Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "RepairService", name: "Speaker & Mic Repair", serviceType: "Mobile Phone Speaker Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "RepairService", name: "Back Glass Replacement", serviceType: "Mobile Phone Back Panel Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "RepairService", name: "Motherboard Repair", serviceType: "Mobile Phone Motherboard Repair" } },
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
      telephone: "+918639605147",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "te"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "21:00",
      },
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      email: "support@turbofix.in",
      areaServed: "IN",
    },
  ],
  sameAs: [
    "https://www.instagram.com/turbofix",
    "https://www.facebook.com/turbofix",
    "https://twitter.com/turbofix",
    "https://www.youtube.com/@turbofix",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://turbofix.in/#website",
  name: "TurboFix",
  url: "https://turbofix.in",
  description: "Doorstep mobile repair service in Hyderabad — trained technicians, OEM parts, 6-month warranty",
  publisher: { "@id": "https://turbofix.in/#organization" },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://turbofix.in/services?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="canonical" href="https://turbofix.in" />
      </head>
      <body className="bg-[#02040F] text-white overflow-x-hidden">
        {/* JSON-LD — plain <script> tags so Google Rich Results Test detects them */}
        <JsonLd schema={localBusinessSchema} id="schema-local-business" />
        <JsonLd schema={organizationSchema} id="schema-organization" />
        <JsonLd schema={websiteSchema} id="schema-website" />

        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(5,10,26,0.95)",
              color: "#fff",
              border: "1px solid rgba(0,170,255,0.2)",
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