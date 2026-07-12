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
  title: "TurboFix — Mobile Service at Your Doorstep | Hyderabad",
  description:
    "TurboFix provides fast, reliable, affordable mobile service at your doorstep in Hyderabad. Screen replacement, battery replacement, charging issues, water damage service, iPhone service, Samsung service and more. Book now!",
  alternates: { canonical: "https://turbofix.in" },
  openGraph: {
    title: "TurboFix — Mobile Service at Your Doorstep | Hyderabad",
    description:
      "Rated 4.9★ by 1,000+ customers. Doorstep pickup & delivery. Screen, battery, water damage, iPhone & Samsung service. Same-day slots available.",
    url: "https://turbofix.in",
    images: [{ url: "https://turbofix.in/og-image.jpg", width: 1200, height: 630 }],
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
