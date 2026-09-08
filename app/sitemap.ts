import { MetadataRoute } from "next";
import { getPublishedLocations, zoneLabels } from "@/data/locations";
import { blogSlugs } from "@/data/sitemapData";

const BASE = "https://turbofix.in";

// Only brands without a dedicated /[brand]-service-hyderabad page still live
// at /brands/[brand] — the rest 301-redirect there (see next.config.mjs).
const brands = ["nothing"];

// High-intent service keyword pages
const servicePages = [
  "screen-replacement-hyderabad",
  "battery-replacement-hyderabad",
  "charging-port-service-hyderabad",
  "water-damage-hyderabad",
  "speaker-service-hyderabad",
  "camera-service-hyderabad",
  "back-panel-replacement-hyderabad",
  "motherboard-service-hyderabad",
];

// High-intent brand+city keyword pages
const brandCityPages = [
  "iphone-service-hyderabad",
  "samsung-service-hyderabad",
  "oneplus-service-hyderabad",
  "realme-service-hyderabad",
  "oppo-service-hyderabad",
  "vivo-service-hyderabad",
  "xiaomi-service-hyderabad",
  "google-pixel-service-hyderabad",
  "motorola-service-hyderabad",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/services`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/faq`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/book-a-visit`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/testimonials`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`,               lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/brands`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/locations`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/sitemap-html`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy`,            lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/no-fix-no-fee-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  // /brands/[brand] — brand detail pages
  const brandDetailPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${BASE}/brands/${brand}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // /[brand]-service-hyderabad — high-intent brand city pages
  const brandCityPagesMap: MetadataRoute.Sitemap = brandCityPages.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,  // high priority — these target exact search queries
  }));

  // /[service]-hyderabad — high-intent service pages
  const servicePagesMap: MetadataRoute.Sitemap = servicePages.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,  // high priority — these target exact search queries
  }));

  // /locations/[area] — comprehensive location pages (90+), published only.
  // Draft locations (status: "draft" in data/locations.ts) are intentionally
  // excluded until reviewed — see getPublishedLocations().
  const publishedLocations = getPublishedLocations();
  const locationPages: MetadataRoute.Sitemap = publishedLocations.map((loc) => ({
    url: `${BASE}/locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // /locations/zones/[zone] — six zone hub pages
  const zonePages: MetadataRoute.Sitemap = (Object.keys(zoneLabels) as (keyof typeof zoneLabels)[]).map((zone) => ({
    url: `${BASE}/locations/zones/${zone}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // /blog/[slug] — blog posts
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...brandCityPagesMap,   // brand+city pages get high priority
    ...servicePagesMap,     // service pages get high priority
    ...brandDetailPages,
    ...zonePages,
    ...locationPages,
    ...blogPages,
  ];
}
