import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About TurboFix — Our Story, Mission & Values",
  description:
    "TurboFix's story, mission, and team of trained technicians behind Hyderabad's doorstep mobile repair service.",
  alternates: { canonical: "https://turbofix.in/about" },
  openGraph: {
    title: "About TurboFix — Our Story, Mission & Values",
    description:
      "Meet the team behind TurboFix's Hyderabad doorstep service studio. Trained technicians, OEM-grade parts, 6-month warranty on all service work.",
    url: "https://turbofix.in/about",
  },
};

export default function About() {
  return <AboutPage />;
}
