/**
 * ServicePageServer — server-side wrapper for a service landing page.
 * Injects JSON-LD schemas and renders the client template.
 * Import this in each /[service-slug]/page.tsx.
 */
import { notFound } from "next/navigation";
import ServicePageTemplate from "./ServicePageTemplate";
import { getServicePageBySlug } from "@/data/servicePages";
import { JsonLd } from "@/components/seo/JsonLd";

interface Props { slug: string }

export default function ServicePageServer({ slug }: Props) {
  const svc = getServicePageBySlug(slug);
  if (!svc) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "RepairService",
    "@id": `https://turbofix.in/${svc.slug}#service`,
    name: svc.h1,
    description: svc.intro,
    serviceType: svc.repairType,
    provider: { "@id": "https://turbofix.in/#business" },
    areaServed: { "@type": "City", name: "Hyderabad" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "PriceSpecification",
        name: svc.name,
        description: svc.priceRange,
        priceCurrency: "INR",
      },
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",     item: "https://turbofix.in" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://turbofix.in/services" },
      { "@type": "ListItem", position: 3, name: svc.name,   item: `https://turbofix.in/${svc.slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={serviceSchema}   id={`schema-service-${svc.slug}`} />
      <JsonLd schema={faqSchema}       id={`schema-faq-${svc.slug}`} />
      <JsonLd schema={breadcrumbSchema} id={`schema-breadcrumb-${svc.slug}`} />
      <ServicePageTemplate svc={svc} />
    </>
  );
}
