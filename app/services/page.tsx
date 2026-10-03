import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Mobile Services in Hyderabad at Your Doorstep",
  description:
    "8 doorstep phone services across Hyderabad: screen, battery, charging port, water damage, camera & more. OEM-grade parts, up to 1-year warranty.",
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
