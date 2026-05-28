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
  title: "TurboFix — Mobile Repair Services at Your Doorstep | Hyderabad",
  description:
    "TurboFix provides fast, reliable, affordable mobile repair services at your doorstep in Hyderabad. Screen replacement, battery replacement, charging issues, water damage repair, iPhone repair, Samsung repair and more. Book now!",
  alternates: { canonical: "https://turbofix.in" },
  openGraph: {
    title: "TurboFix — Mobile Repair Services at Your Doorstep | Hyderabad",
    description:
      "Hyderabad's most trusted mobile repair service. Doorstep pickup & delivery. Screen, battery, water damage, iPhone & Samsung repair. Same-day service.",
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
