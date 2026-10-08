import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedLocations, getCoveredAreas } from "@/data/locations";

// Standalone area pages only — merged micro-localities 301 to these and are
// listed by name beside their parent below.
const locationData = getPublishedLocations();
import { blogSlugs, blogTitles } from "@/data/sitemapData";
import { JsonLd } from "@/components/seo/JsonLd";
import { iphoneModels } from "@/data/iphoneModels";
import { iphoneServices, iphoneGuideSlug, iphoneGuideMeta } from "@/data/iphoneServicePages";
import { samsungModels } from "@/data/samsungModels";

export const metadata: Metadata = {
  title: "Site Map — All Pages",
  description: "Complete list of all pages on TurboFix — mobile services, brand pages, Hyderabad area pages, blog posts, and more.",
  alternates: { canonical: "https://turbofix.in/sitemap-html" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Site Map | TurboFix",
    description: "Complete list of all pages on TurboFix — mobile services, brand pages, Hyderabad area pages, blog posts, and more.",
    url: "https://turbofix.in/sitemap-html",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",    item: "https://turbofix.in" },
    { "@type": "ListItem", position: 2, name: "Site Map", item: "https://turbofix.in/sitemap-html" },
  ],
};

const sections = [
  {
    title: "Main Pages",
    color: "#2563EB",
    links: [
      { label: "Home",              href: "/" },
      { label: "About TurboFix",   href: "/about" },
      { label: "Our Services",     href: "/services" },
      { label: "Book a Visit",     href: "/book-a-visit" },
      { label: "Testimonials",     href: "/testimonials" },
      { label: "FAQ",              href: "/faq" },
      { label: "Blog",             href: "/blog" },
      { label: "Contact",          href: "/contact" },
      { label: "Privacy Policy",   href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Service by Type",
    color: "#1D4ED8",
    links: [
      { label: "Screen Replacement Hyderabad",       href: "/screen-replacement-hyderabad" },
      { label: "Battery Replacement Hyderabad",      href: "/battery-replacement-hyderabad" },
      { label: "Charging Port Service Hyderabad",    href: "/charging-port-service-hyderabad" },
      { label: "Water Damage Service Hyderabad",     href: "/water-damage-hyderabad" },
      { label: "Speaker & Mic Service Hyderabad",    href: "/speaker-service-hyderabad" },
      { label: "Camera Service Hyderabad",           href: "/camera-service-hyderabad" },
      { label: "Back Panel Replacement Hyderabad",   href: "/back-panel-replacement-hyderabad" },
      { label: "Motherboard Service Hyderabad",      href: "/motherboard-service-hyderabad" },
    ],
  },
  {
    title: "Service by Brand",
    color: "#3B82F6",
    links: [
      { label: "All Brands",                      href: "/brands" },
      { label: "iPhone Service Hyderabad",        href: "/iphone-service-hyderabad" },
      { label: "Samsung Service Hyderabad",       href: "/samsung-service-hyderabad" },
      { label: "OnePlus Service Hyderabad",       href: "/oneplus-service-hyderabad" },
      { label: "Realme Service Hyderabad",        href: "/realme-service-hyderabad" },
      { label: "Oppo Service Hyderabad",          href: "/oppo-service-hyderabad" },
      { label: "Vivo Service Hyderabad",          href: "/vivo-service-hyderabad" },
      { label: "Xiaomi Service Hyderabad",        href: "/xiaomi-service-hyderabad" },
      { label: "Google Pixel Service Hyderabad",  href: "/google-pixel-service-hyderabad" },
      { label: "Motorola Service Hyderabad",      href: "/motorola-service-hyderabad" },
    ],
  },
  {
    title: "iPhone Models",
    color: "#6366F1",
    links: [
      ...iphoneServices.map((s) => ({ label: iphoneGuideMeta(s).title, href: `/${iphoneGuideSlug(s.slug)}` })),
      ...iphoneModels.map((m) => ({ label: `${m.name} Service`, href: `/${m.slug}` })),
    ],
  },
  {
    title: "Samsung Motherboard Service",
    color: "#1428A0",
    links: [{ label: "Samsung Motherboard Service Guide", href: "/samsung-motherboard-service" }, ...samsungModels.map((m) => ({ label: `${m.name} Motherboard Service`, href: `/${m.slug}/motherboard-service` }))],
  },
  {
    title: "Hyderabad Coverage",
    color: "#0EA5E9",
    links: [
      { label: "All Hyderabad Areas",        href: "/locations" },
      ...locationData.slice(0, 20).map((l) => ({
        label: `Mobile Service ${l.name}`,
        href: `/locations/${l.slug}`,
      })),
    ],
  },
];

export default function SitemapHtmlPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-sitemap" />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-white" />

        <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5"
              style={{ background: "rgba(37,99,235,0.08)", color: "#1D4ED8", border: "1px solid rgba(37,99,235,0.25)" }}>
              Navigation
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Site <span className="gradient-text">Map</span>
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl">
              Complete index of all pages on TurboFix — find any service, brand, area, or resource instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((sec) => (
              <div key={sec.title} className="p-6 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full shrink-0" style={{ background: sec.color }} />
                  {sec.title}
                </h2>
                <ul className="space-y-1.5">
                  {sec.links.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 group">
                        <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors shrink-0" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Blog section */}
            <div className="p-6 rounded-2xl md:col-span-2"
              style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
              <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-blue-700 shrink-0" />
                Blog Posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                {blogSlugs.map((slug, i) => (
                  <Link key={slug} href={`/blog/${slug}`}
                    className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 group py-0.5">
                    <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-700 transition-colors shrink-0" />
                    {blogTitles[i] || slug}
                  </Link>
                ))}
              </div>
            </div>

            {/* All locations */}
            <div className="p-6 rounded-2xl md:col-span-2"
              style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
              <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-sky-600 shrink-0" />
                All Hyderabad Areas ({locationData.length} areas)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5">
                {locationData.map((loc) => (
                  <Link key={loc.slug} href={`/locations/${loc.slug}`}
                    className="text-sm text-slate-500 hover:text-sky-700 transition-colors flex items-center gap-1.5 group py-0.5">
                    <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-sky-600 transition-colors shrink-0" />
                    {loc.name}
                  </Link>
                ))}
              </div>
              <h3 className="font-semibold text-slate-900 mt-8 mb-3 text-sm">Neighbourhoods covered within these areas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-slate-500">
                {locationData
                  .map((loc) => ({ loc, kids: getCoveredAreas(loc.slug) }))
                  .filter((g) => g.kids.length > 0)
                  .map(({ loc, kids }) => (
                    <p key={loc.slug}>
                      <Link href={`/locations/${loc.slug}`} className="text-slate-700 hover:text-sky-700">{loc.name}</Link>
                      {": "}
                      {kids.map((k) => k.name).join(", ")}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm">
              Can't find what you're looking for?{" "}
              <Link href="/contact" className="text-blue-700 hover:text-blue-800 transition-colors">Contact us</Link>
              {" "}or{" "}
              <Link href="/book-a-visit" className="text-blue-700 hover:text-blue-800 transition-colors">book a visit</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
