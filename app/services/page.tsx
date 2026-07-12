import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Mobile Service — Screen, Battery, Water Damage & More",
  description:
    "TurboFix offers complete mobile service in Hyderabad — screen replacement, battery replacement, charging port service, water damage service, camera service, motherboard service, software issues and more.",
  alternates: { canonical: "https://turbofix.in/services" },
  openGraph: {
    title: "Mobile Service — Screen, Battery, Water Damage & More | TurboFix",
    description:
      "10 specialist services in Hyderabad. Screen replacement, battery replacement, water damage service, camera service, motherboard service and more. Same-day service with OEM-grade parts.",
    url: "https://turbofix.in/services",
  },
};

export default function Services() {
  return <ServicesPage />;
}
