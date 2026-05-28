import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AreaPageClient from "./AreaPageClient";
import { hyderabadAreas, getAreaBySlug } from "@/data/areas";
import { JsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: { area: string };
}

export async function generateStaticParams() {
  return hyderabadAreas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getAreaBySlug(params.area);
  if (!area) return { title: "Area Not Found" };

  return {
    title: `Mobile Repair in ${area.name}, Hyderabad — Doorstep Service`,
    description: `TurboFix offers same-day doorstep mobile repair in ${area.fullName}. Screen replacement, battery replacement, water damage, iPhone & Samsung repair. We come to you.`,
    alternates: { canonical: `https://turbofix.in/hyderabad/${area.slug}` },
    openGraph: {
      title: `Mobile Repair in ${area.name} Hyderabad | TurboFix`,
      description: `Same-day doorstep mobile repair in ${area.name}. Book online and our certified technician comes to your location.`,
      url: `https://turbofix.in/hyderabad/${area.slug}`,
    },
  };
}

export default function AreaPage({ params }: Props) {
  const area = getAreaBySlug(params.area);
  if (!area) notFound();

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "RepairService",
    "@id": `https://turbofix.in/hyderabad/${area.slug}#service`,
    name: `Mobile Repair in ${area.name}, Hyderabad`,
    description: area.description,
    provider: { "@id": "https://turbofix.in/#business" },
    areaServed: { "@type": "Place", name: area.fullName },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://turbofix.in" },
      { "@type": "ListItem", position: 2, name: "Hyderabad", item: "https://turbofix.in/hyderabad" },
      { "@type": "ListItem", position: 3, name: area.name, item: `https://turbofix.in/hyderabad/${area.slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={localSchema} id={`schema-area-${area.slug}`} />
      <JsonLd schema={breadcrumbSchema} id={`schema-breadcrumb-area-${area.slug}`} />
      <AreaPageClient area={area} />
    </>
  );
}
