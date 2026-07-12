import type { Metadata } from "next";
import BrandCityPageServer from "@/components/seo/BrandCityPageServer";
import { getBrandCityPageBySlug } from "@/data/brandCityPages";

const SLUG = "xiaomi-service-hyderabad";

export function generateMetadata(): Metadata {
  const page = getBrandCityPageBySlug(SLUG);
  if (!page) return { title: "Not Found" };
  return {
    title: `${page.h1} — Doorstep Service | TurboFix`,
    description: `${page.intro.slice(0, 160)}...`,
    keywords: page.keywords,
    alternates: { canonical: `https://turbofix.in/${SLUG}` },
    openGraph: {
      title: `${page.h1} | TurboFix`,
      description: `${page.tagline} Same-day doorstep service across Hyderabad.`,
      url: `https://turbofix.in/${SLUG}`,
    },
  };
}

export default function Page() {
  return <BrandCityPageServer slug={SLUG} />;
}
