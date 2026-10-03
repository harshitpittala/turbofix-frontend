import type { Metadata } from "next";
import AboutPage from "./AboutPage";
import BusinessFacts from "@/components/seo/BusinessFacts";

export const metadata: Metadata = {
  title: "About TurboFix: Mobile Service in Hyderabad",
  description:
    "Who TurboFix is, how our doorstep, pickup and walk-in studio service works, the Hyderabad areas we cover, our hours, warranty and policies.",
  alternates: { canonical: "https://turbofix.in/about" },
  openGraph: {
    title: "About TurboFix: Mobile Service in Hyderabad",
    description:
      "Meet the team behind TurboFix's Hyderabad doorstep service studio. Trained technicians, OEM-grade parts, up to 1-year warranty on all service work.",
    url: "https://turbofix.in/about",
  },
};

export default function About() {
  return <AboutPage facts={<BusinessFacts />} />;
}
