import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationPageClient from "./LocationPageClient";
import { locationData, getLocationBySlug, faqSets } from "@/data/locations";
import { JsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: { area: string };
}

export async function generateStaticParams() {
  return locationData.map((l) => ({ area: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getLocationBySlug(params.area);
  if (!area) return { title: "Area Not Found" };

  const titleServices = area.popularServices.slice(0, 2).join(" & ");

  return {
    title: `Mobile Service in ${area.name}, Hyderabad — ${titleServices} | TurboFix`,
    description: `TurboFix doorstep mobile service in ${area.name}, Hyderabad. ${area.intro} Book same-day service — trained technicians, OEM parts, 6-month warranty.`,
    alternates: { canonical: `https://turbofix.in/locations/${area.slug}` },
    openGraph: {
      title: `Mobile Service in ${area.name} Hyderabad | TurboFix`,
      description: `Doorstep mobile service in ${area.name}. ${area.context} Professional service with 6-month warranty.`,
      url: `https://turbofix.in/locations/${area.slug}`,
    },
  };
}

export default function LocationPage({ params }: Props) {
  const area = getLocationBySlug(params.area);
  if (!area) notFound();

  const faqs = faqSets[area.faqSet];

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://turbofix.in/locations/${area.slug}#service`,
    name: `Mobile Service in ${area.name}, Hyderabad`,
    description: `${area.intro} ${area.context}`,
    provider: {
      "@id": "https://turbofix.in/#business",
    },
    areaServed: {
      "@type": "Place",
      name: `${area.name}, Hyderabad, Telangana`,
      ...(area.pincode ? { postalCode: area.pincode } : {}),
    },
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
      { "@type": "ListItem", position: 3, name: `${area.name}`, item: `https://turbofix.in/locations/${area.slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={localSchema} id={`schema-location-${area.slug}`} />
      <JsonLd schema={faqSchema} id={`schema-faq-${area.slug}`} />
      <JsonLd schema={breadcrumbSchema} id={`schema-breadcrumb-${area.slug}`} />
      <LocationPageClient area={area} faqs={faqs} />
    </>
  );
}
