import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Mobile Repair Services — Screen, Battery, Water Damage & More",
  description:
    "TurboFix offers complete mobile repair services in Hyderabad — screen replacement, battery replacement, charging port repair, water damage recovery, camera repair, motherboard repair, software issues and more.",
  alternates: { canonical: "https://turbofix.in/services" },
  openGraph: {
    title: "Mobile Repair Services — Screen, Battery, Water Damage & More | TurboFix",
    description:
      "10 specialist repair services in Hyderabad. Screen replacement, battery replacement, water damage recovery, camera repair, motherboard repair and more. Same-day service with OEM-grade parts.",
    url: "https://turbofix.in/services",
  },
};

export default function Services() {
  return <ServicesPage />;
}
