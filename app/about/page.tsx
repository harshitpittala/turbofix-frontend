import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About TurboFix — Our Story, Mission & Values",
  description:
    "Learn about TurboFix — Hyderabad's most trusted mobile repair service. Our story, mission, team of expert technicians, and commitment to quality repairs with genuine parts.",
  alternates: { canonical: "https://turbofix.in/about" },
  openGraph: {
    title: "About TurboFix — Our Story, Mission & Values",
    description:
      "Meet the team behind Hyderabad's fastest mobile repair studio. Certified technicians, genuine parts, 6-month warranty on all repairs.",
    url: "https://turbofix.in/about",
  },
};

export default function About() {
  return <AboutPage />;
}
