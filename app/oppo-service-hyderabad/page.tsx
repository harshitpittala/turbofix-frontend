import type { Metadata } from "next";
import { buildMetaDescription } from "@/lib/utils";
import BrandCityPageServer from "@/components/seo/BrandCityPageServer";
import { getBrandCityPageBySlug } from "@/data/brandCityPages";

const SLUG = "oppo-service-hyderabad";

export function generateMetadata(): Metadata {
  const page = getBrandCityPageBySlug(SLUG);
  if (!page) return { title: "Not Found" };
  return {
    title: page.h1.split(" — ")[0],
    description: buildMetaDescription(page.intro, "Same-day doorstep service across Hyderabad. Book now!"),
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
