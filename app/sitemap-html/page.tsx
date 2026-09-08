import type { Metadata } from "next";
import Link from "next/link";
import { locationData } from "@/data/locations";
import { blogSlugs, blogTitles } from "@/data/sitemapData";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Site Map — All Pages",
  description: "Complete list of all pages on TurboFix — mobile services, brand pages, Hyderabad area pages, blog posts, and more.",
  alternates: { canonical: "https://turbofix.in/sitemap-html" },
  robots: { index: true, follow: true },
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
    color: "#00AAFF",
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
    color: "#22C55E",
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
    color: "#EC4899",
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
    title: "Hyderabad Coverage",
    color: "#7C3AED",
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
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5"
              style={{ background: "rgba(0,170,255,0.1)", color: "#00AAFF", border: "1px solid rgba(0,170,255,0.2)" }}>
              Navigation
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Site <span className="gradient-text">Map</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Complete index of all pages on TurboFix — find any service, brand, area, or resource instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((sec) => (
              <div key={sec.title} className="p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full shrink-0" style={{ background: sec.color }} />
                  {sec.title}
                </h2>
                <ul className="space-y-1.5">
                  {sec.links.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                        <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-white/50 transition-colors shrink-0" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Blog section */}
            <div className="p-6 rounded-2xl md:col-span-2"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#F59E0B] shrink-0" />
                Blog Posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                {blogSlugs.map((slug, i) => (
                  <Link key={slug} href={`/blog/${slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group py-0.5">
                    <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#F59E0B] transition-colors shrink-0" />
                    {blogTitles[i] || slug}
                  </Link>
                ))}
              </div>
            </div>

            {/* All locations */}
            <div className="p-6 rounded-2xl md:col-span-2"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#06B6D4] shrink-0" />
                All Hyderabad Areas ({locationData.length} areas)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5">
                {locationData.map((loc) => (
                  <Link key={loc.slug} href={`/locations/${loc.slug}`}
                    className="text-sm text-gray-400 hover:text-[#06B6D4] transition-colors flex items-center gap-1.5 group py-0.5">
                    <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#06B6D4] transition-colors shrink-0" />
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 text-sm">
              Can't find what you're looking for?{" "}
              <Link href="/contact" className="text-[#00AAFF] hover:text-white transition-colors">Contact us</Link>
              {" "}or{" "}
              <Link href="/book-a-visit" className="text-[#00AAFF] hover:text-white transition-colors">book a visit</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
