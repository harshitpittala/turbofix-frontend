import type { Metadata } from "next";
import ServicePageServer from "@/components/seo/ServicePageServer";
import { getServicePageBySlug } from "@/data/servicePages";

const SLUG = "speaker-repair-hyderabad";

export function generateMetadata(): Metadata {
  const svc = getServicePageBySlug(SLUG);
  if (!svc) return { title: "Service Not Found" };
  return {
    title: `${svc.h1} — Doorstep Service | TurboFix`,
    description: `${svc.intro} ${svc.repairTime}. ${svc.priceRange}. OEM parts, 6-month warranty. Book now!`,
    keywords: svc.keywords,
    alternates: { canonical: `https://turbofix.in/${SLUG}` },
    openGraph: {
      title: `${svc.h1} | TurboFix`,
      description: `${svc.tagline} ${svc.priceRange}. Doorstep service across Hyderabad.`,
      url: `https://turbofix.in/${SLUG}`,
    },
  };
}

export default function Page() {
  return <ServicePageServer slug={SLUG} />;
}
