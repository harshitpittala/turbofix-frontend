import type { Metadata } from "next";
import Script from "next/script";
import HyderabadPageClient from "./HyderabadPageClient";

export const metadata: Metadata = {
  title: "Mobile Repair in Hyderabad — Doorstep Service All Areas",
  description:
    "TurboFix offers doorstep mobile repair across all areas of Hyderabad — Gachibowli, Madhapur, HITEC City, Kukatpally, Ameerpet, Kondapur, Dilsukhnagar, LB Nagar and more. Same-day service.",
  alternates: { canonical: "https://turbofix.in/hyderabad" },
  openGraph: {
    title: "Mobile Repair in Hyderabad — Doorstep Pickup & Delivery | TurboFix",
    description:
      "Expert mobile repair service covering all of Hyderabad. We come to you — screen replacement, battery, water damage and more. Same-day doorstep service.",
    url: "https://turbofix.in/hyderabad",
  },
};

const localSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Doorstep Mobile Repair in Hyderabad",
  description: "TurboFix provides doorstep mobile repair services across all areas of Hyderabad including Gachibowli, Madhapur, HITEC City, Kukatpally, Ameerpet, Kondapur, Dilsukhnagar and LB Nagar.",
  provider: {
    "@type": "LocalBusiness",
    name: "TurboFix",
    telephone: "+918639605147",
    address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
  },
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "Place", name: "Gachibowli" },
    { "@type": "Place", name: "Madhapur" },
    { "@type": "Place", name: "HITEC City" },
    { "@type": "Place", name: "Kukatpally" },
    { "@type": "Place", name: "Ameerpet" },
    { "@type": "Place", name: "Kondapur" },
    { "@type": "Place", name: "Dilsukhnagar" },
    { "@type": "Place", name: "LB Nagar" },
  ],
};

export default function HyderabadPage() {
  return (
    <>
      <Script id="schema-hyderabad" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <HyderabadPageClient />
    </>
  );
}
