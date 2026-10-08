import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Brands from "@/components/home/Brands";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: { absolute: "Doorstep Mobile Service in Hyderabad | TurboFix" },
  description:
    "A TurboFix technician services your phone at home or office across Hyderabad: screen, battery, charging port & more. Up to 1-year warranty.",
  alternates: { canonical: "https://turbofix.in" },
  openGraph: {
    title: "TurboFix — Mobile Service at Your Doorstep | Hyderabad",
    description:
      "A technician services your phone at home or office across Hyderabad, or walk in to our Nampally studio. Screen, battery, water damage, iPhone & Samsung. Up to 1-year warranty.",
    url: "https://turbofix.in",
    images: [{ url: "https://turbofix.in/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <Brands />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
