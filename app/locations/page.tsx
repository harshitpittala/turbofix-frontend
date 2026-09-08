import type { Metadata } from "next";
import LocationsPageClient from "./LocationsPageClient";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Doorstep Mobile Service in All Hyderabad Areas",
  description:
    "TurboFix's independent doorstep mobile-device servicing covers all Hyderabad areas — Gachibowli, Madhapur, Banjara Hills, Secunderabad, Dilsukhnagar, Kompally, and 90+ more. Same-day service slots available at your door.",
  alternates: { canonical: "https://turbofix.in/locations" },
  openGraph: {
    title: "Doorstep Mobile Service in All Hyderabad Areas | TurboFix",
    description: "Doorstep mobile servicing across 90+ Hyderabad localities. Book online — we come to you, same day in most areas.",
    url: "https://turbofix.in/locations",
  },
};

const locationsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://turbofix.in/locations#service",
  name: "Doorstep Mobile Service — All Hyderabad Areas",
  description:
    "TurboFix provides independent doorstep mobile-device servicing across all major Hyderabad areas including Gachibowli, Madhapur, Banjara Hills, Secunderabad, Ameerpet, Dilsukhnagar, Kompally, and 90+ more localities.",
  provider: { "@id": "https://turbofix.in/#business" },
  areaServed: { "@type": "City", name: "Hyderabad" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://turbofix.in" },
    { "@type": "ListItem", position: 2, name: "All Hyderabad Areas", item: "https://turbofix.in/locations" },
  ],
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd schema={locationsSchema} id="schema-locations-page" />
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-locations" />
      <LocationsPageClient />
    </>
  );
}
