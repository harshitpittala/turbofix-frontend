import { MetadataRoute } from "next";
import { getPublishedLocations, zoneLabels } from "@/data/locations";
import { blogSlugs } from "@/data/sitemapData";
import lastmodData from "@/data/lastmod.json";
import { iphoneModels } from "@/data/iphoneModels";
import { allIphoneServicePaths, iphoneServices, iphoneGuideSlug } from "@/data/iphoneServicePages";
import { allSamsungMotherboardPaths } from "@/data/samsungMotherboardPages";

const BASE = "https://turbofix.in";

// Real last-change dates per URL, generated from git history by
// scripts/build-lastmod.mjs. Unknown URLs get the newest known date.
const LASTMOD = lastmodData as Record<string, string>;
const FALLBACK_LASTMOD = Object.values(LASTMOD).sort().at(-1) ?? "2026-09-23";
function lastModFor(url: string): string {
  const path = url.replace(BASE, "") || "/";
  return LASTMOD[path] ?? FALLBACK_LASTMOD;
}

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
  "samsung-motherboard-service",
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
    { url: BASE,                         changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/services`,           changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`,              changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`,            changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/faq`,                changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/book-a-visit`,       changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/testimonials`,       changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`,               changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/brands`,             changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/locations`,          changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/sitemap-html`,       changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy`,            changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,              changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/no-fix-no-fee-policy`, changeFrequency: "yearly", priority: 0.5 },
  ];

  // /brands/[brand] — brand detail pages
  const brandDetailPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${BASE}/brands/${brand}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // /[brand]-service-hyderabad — high-intent brand city pages
  const brandCityPagesMap: MetadataRoute.Sitemap = brandCityPages.map((slug) => ({
    url: `${BASE}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,  // high priority — these target exact search queries
  }));

  // /[service]-hyderabad — high-intent service pages
  const servicePagesMap: MetadataRoute.Sitemap = servicePages.map((slug) => ({
    url: `${BASE}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,  // high priority — these target exact search queries
  }));

  // /locations/[area] — comprehensive location pages (90+), published only.
  // Draft locations (status: "draft" in data/locations.ts) are intentionally
  // excluded until reviewed — see getPublishedLocations().
  const publishedLocations = getPublishedLocations();
  const locationPages: MetadataRoute.Sitemap = publishedLocations.map((loc) => ({
    url: `${BASE}/locations/${loc.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // /locations/zones/[zone] — six zone hub pages
  const zonePages: MetadataRoute.Sitemap = (Object.keys(zoneLabels) as (keyof typeof zoneLabels)[]).map((zone) => ({
    url: `${BASE}/locations/zones/${zone}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // /blog/[slug] — blog posts
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // /[model] and /[model]/[service] — iPhone model hubs and model × service pages
  const iphoneModelPages: MetadataRoute.Sitemap = [
    ...iphoneServices.map((s) => iphoneGuideSlug(s.slug)),
    ...iphoneModels.map((m) => m.slug),
  ].map((slug) => ({
    url: `${BASE}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const iphoneServicePages: MetadataRoute.Sitemap = [...allIphoneServicePaths(), ...allSamsungMotherboardPaths()].map(({ model, service }) => ({
    url: `${BASE}/${model}/${service}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const all: MetadataRoute.Sitemap = [
    ...staticPages,
    ...brandCityPagesMap,   // brand+city pages get high priority
    ...servicePagesMap,     // service pages get high priority
    ...iphoneModelPages,
    ...iphoneServicePages,
    ...brandDetailPages,
    ...zonePages,
    ...locationPages,
    ...blogPages,
  ];

  return all.map((entry) => ({ ...entry, lastModified: lastModFor(entry.url) }));
}
