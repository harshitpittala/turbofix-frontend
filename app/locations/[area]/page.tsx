import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationPageClient from "./LocationPageClient";
import { getLocationBySlug, getPublishedLocations, getCoveredAreas, getNearbyAreaPages, isMergedLocality, resolveLocalitySlug, faqSets, zoneLabels } from "@/data/locations";
import { permanentRedirect } from "next/navigation";
import { getLocalityGuide } from "@/data/localityGuides";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetaDescription } from "@/lib/utils";

interface Props {
  params: { area: string };
}

export async function generateStaticParams() {
  // Merged micro-localities are not built: next.config.mjs 301-redirects them.
  return getPublishedLocations().map((l) => ({ area: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getLocationBySlug(params.area);
  if (!area) return { title: "Area Not Found" };

  const title = area.name.length <= 16
    ? `Mobile Service in ${area.name} – At Your Door`
    : `Mobile Service in ${area.name}, Hyderabad`;
  const pin = area.pincode ? ` (${area.pincode})` : "";
  let description = `Doorstep phone service in ${area.name}${pin}, Hyderabad: screen, battery, charging port & more at home or office. 6-month warranty, pay after service.`;
  if (description.length > 155) description = `Doorstep phone service in ${area.name}${pin}: screen, battery & charging port at home or office. 6-month warranty.`;

  return {
    title,
    description,
    alternates: { canonical: `https://turbofix.in/locations/${area.slug}` },
    // Draft locations still build (so they're reviewable at their URL) but
    // stay out of the index and off the sitemap until marked published —
    // see getPublishedLocations() in data/locations.ts.
    ...(area.status === "draft" && { robots: { index: false, follow: false } }),
    openGraph: {
      title: `Mobile Service in ${area.name} Hyderabad | TurboFix`,
      description: `Doorstep mobile service in ${area.name}. ${area.context} Professional service with 6-month warranty.`,
      url: `https://turbofix.in/locations/${area.slug}`,
    },
  };
}

export default function LocationPage({ params }: Props) {
  // Safety net — next.config.mjs already 301s merged slugs before this runs.
  if (isMergedLocality(params.area)) permanentRedirect(`/locations/${resolveLocalitySlug(params.area)}`);
  const area = getLocationBySlug(params.area);
  if (!area) notFound();

  const coveredAreas = getCoveredAreas(area.slug);
  const nearbyAreas = getNearbyAreaPages(area);
  const guide = getLocalityGuide(area.slug);
  // Area-specific FAQs first (priority pages), then the shared FAQ set.
  const faqs = [...(guide?.faqs ?? []), ...faqSets[area.faqSet]];

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://turbofix.in/locations/${area.slug}#service`,
    name: `Mobile Service in ${area.name}, Hyderabad`,
    description: `${area.intro} ${area.context}`,
    provider: {
      "@id": "https://turbofix.in/#business",
    },
    areaServed: [
      {
        "@type": "Place",
        name: `${area.name}, Hyderabad, Telangana`,
        ...(area.pincode ? { postalCode: area.pincode } : {}),
      },
      ...coveredAreas.map((c) => ({
        "@type": "Place",
        name: `${c.name}, Hyderabad, Telangana`,
        ...(c.pincode ? { postalCode: c.pincode } : {}),
      })),
    ],
    offers: area.popularServices.map((svc) => ({
      "@type": "Offer",
      name: svc,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "All Areas", item: "https://turbofix.in/locations" },
      { "@type": "ListItem", position: 3, name: zoneLabels[area.zone], item: `https://turbofix.in/locations/zones/${area.zone}` },
      { "@type": "ListItem", position: 4, name: `${area.name}`, item: `https://turbofix.in/locations/${area.slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={localSchema} id={`schema-location-${area.slug}`} />
      <JsonLd schema={faqSchema} id={`schema-faq-${area.slug}`} />
      <JsonLd schema={breadcrumbSchema} id={`schema-breadcrumb-${area.slug}`} />
      <LocationPageClient area={area} faqs={faqs} coveredAreas={coveredAreas} nearbyAreas={nearbyAreas} guide={guide} />
    </>
  );
}
