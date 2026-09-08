import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ZonePageClient from "./ZonePageClient";
import { getLocationsByZone, zoneLabels, zoneDescriptions, type LocationData } from "@/data/locations";
import { JsonLd } from "@/components/seo/JsonLd";

type Zone = LocationData["zone"];
const ZONES: Zone[] = ["central", "west", "north", "south", "east", "outskirts"];

interface Props {
  params: { zone: string };
}

function isZone(value: string): value is Zone {
  return (ZONES as string[]).includes(value);
}

export async function generateStaticParams() {
  return ZONES.map((zone) => ({ zone }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isZone(params.zone)) return { title: "Area Not Found" };
  const label = zoneLabels[params.zone];
  const areas = getLocationsByZone(params.zone);

  return {
    title: `Doorstep Mobile Service in ${label}, Hyderabad`,
    description: `TurboFix's independent doorstep mobile-device servicing across ${label}: ${areas.slice(0, 6).map((a) => a.name).join(", ")} and more. Same-day service, trained technicians, 6-month warranty.`,
    alternates: { canonical: `https://turbofix.in/locations/zones/${params.zone}` },
    openGraph: {
      title: `Doorstep Mobile Service in ${label} | TurboFix`,
      description: zoneDescriptions[params.zone],
      url: `https://turbofix.in/locations/zones/${params.zone}`,
    },
  };
}

export default function ZonePage({ params }: Props) {
  if (!isZone(params.zone)) notFound();
  const zone = params.zone;
  const label = zoneLabels[zone];
  const areas = getLocationsByZone(zone);
  if (areas.length === 0) notFound();

  const zoneSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://turbofix.in/locations/zones/${zone}#service`,
    name: `Doorstep Mobile Service in ${label}, Hyderabad`,
    description: zoneDescriptions[zone],
    provider: { "@id": "https://turbofix.in/#business" },
    areaServed: areas.map((a) => ({
      "@type": "Place",
      name: `${a.name}, Hyderabad, Telangana`,
      ...(a.pincode ? { postalCode: a.pincode } : {}),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://turbofix.in" },
      { "@type": "ListItem", position: 2, name: "All Areas", item: "https://turbofix.in/locations" },
      { "@type": "ListItem", position: 3, name: label, item: `https://turbofix.in/locations/zones/${zone}` },
    ],
  };

  return (
    <>
      <JsonLd schema={zoneSchema} id={`schema-zone-${zone}`} />
      <JsonLd schema={breadcrumbSchema} id={`schema-breadcrumb-zone-${zone}`} />
      <ZonePageClient zone={zone} label={label} description={zoneDescriptions[zone]} areas={areas} />
    </>
  );
}
