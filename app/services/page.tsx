import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Mobile Repair Services in Hyderabad",
  description:
    "8 specialist mobile repair services at your doorstep in Hyderabad — screen, battery, charging port, water damage, camera & more. Book now!",
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
