import { notFound } from "next/navigation";
import BrandCityPageTemplate from "./BrandCityPageTemplate";
import { getBrandCityPageBySlug } from "@/data/brandCityPages";
import { JsonLd } from "@/components/seo/JsonLd";
import { parsePriceRange } from "@/lib/utils";

interface Props { slug: string }

export default function BrandCityPageServer({ slug }: Props) {
  const page = getBrandCityPageBySlug(slug);
  if (!page) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "RepairService",
    "@id": `https://turbofix.in/${page.slug}#service`,
    name: page.h1,
    description: page.intro,
    serviceType: `${page.brand} Mobile Phone Repair`,
    provider: { "@id": "https://turbofix.in/#business" },
    areaServed: { "@type": "City", name: "Hyderabad" },
    offers: page.topRepairs.map((r) => {
      const priceBounds = parsePriceRange(r.price);
      return {
        "@type": "Offer",
        name: r.name,
        description: r.desc,
        priceCurrency: "INR",
        ...(priceBounds && {
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "INR",
            minPrice: priceBounds.minPrice,
            maxPrice: priceBounds.maxPrice,
          },
        }),
        availability: "https://schema.org/InStock",
      };
    }),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",          item: "https://turbofix.in" },
      { "@type": "ListItem", position: 2, name: "Repair by Brand", item: "https://turbofix.in/repairs" },
      { "@type": "ListItem", position: 3, name: `${page.brand} Repair Hyderabad`, item: `https://turbofix.in/${page.slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={serviceSchema}    id={`schema-brand-city-${page.slug}`} />
      <JsonLd schema={faqSchema}        id={`schema-faq-${page.slug}`} />
      <JsonLd schema={breadcrumbSchema} id={`schema-breadcrumb-${page.slug}`} />
      <BrandCityPageTemplate page={page} />
    </>
  );
}
