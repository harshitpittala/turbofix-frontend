import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrandRepairClient from "../../repairs/[brand]/BrandRepairClient";
import { brandData, getBrandBySlug } from "@/data/brands";
import { JsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: { brand: string };
}

// Brands that have a dedicated /[brand]-service-hyderabad page are 301-redirected
// there (see next.config.mjs `redirects`) to avoid two pages competing for the
// same local-SEO keywords. Only build a static page for brands without one.
const BRANDS_WITH_CITY_PAGE = new Set([
  "apple", "samsung", "oneplus", "xiaomi", "vivo", "oppo", "realme", "motorola", "google-pixel",
]);

export async function generateStaticParams() {
  return brandData
    .filter((b) => !BRANDS_WITH_CITY_PAGE.has(b.slug))
    .map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getBrandBySlug(params.brand);
  if (!brand) return { title: "Brand Not Found" };

  return {
    title: `${brand.name} Service in Hyderabad — Screen, Battery & More`,
    description: `Expert ${brand.name} service in Hyderabad at TurboFix. Screen replacement, battery replacement, charging port service, water damage service and more. Doorstep service, OEM parts, 6-month warranty.`,
    keywords: brand.keywords,
    alternates: { canonical: `https://turbofix.in/brands/${brand.slug}` },
    openGraph: {
      title: `${brand.name} Service Hyderabad — TurboFix`,
      description: `Professional ${brand.name} service in Hyderabad. OEM-quality parts, 6-month warranty, doorstep service.`,
      url: `https://turbofix.in/brands/${brand.slug}`,
    },
  };
}

export default function BrandServicePage({ params }: Props) {
  const brand = getBrandBySlug(params.brand);
  if (!brand) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://turbofix.in/brands/${brand.slug}#service`,
    name: `${brand.name} Service in Hyderabad`,
    description: brand.description,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://turbofix.in/#business",
      name: "TurboFix",
      telephone: "+918639605147",
      url: "https://turbofix.in",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
      // aggregateRating intentionally omitted here — see app/layout.tsx note.
    },
    areaServed: { "@type": "City", name: "Hyderabad" },
    serviceType: `${brand.name} Mobile Phone Service`,
    offers: brand.commonIssues.map((issue) => ({
      "@type": "Offer",
      name: issue.title,
      description: issue.desc,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brand.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://turbofix.in" },
      { "@type": "ListItem", position: 2, name: "Service by Brand", item: "https://turbofix.in/brands" },
      { "@type": "ListItem", position: 3, name: `${brand.name} Service`, item: `https://turbofix.in/brands/${brand.slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={serviceSchema} id={`schema-service-${brand.slug}`} />
      <JsonLd schema={faqSchema} id={`schema-faq-${brand.slug}`} />
      <JsonLd schema={breadcrumbSchema} id={`schema-breadcrumb-${brand.slug}`} />
      <BrandRepairClient brand={brand} />
    </>
  );
}
