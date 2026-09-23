"use client";

import { Toaster } from "react-hot-toast";
import Hero from "./components/Hero";
import ReviewBanner from "./components/ReviewBanner";
import BookingWizard from "./components/BookingWizard";
import TrustBadges from "./components/TrustBadges";
import TechnicianCard from "./components/TechnicianCard";
import Testimonials from "./components/Testimonials";
import HowItWorks from "./components/HowItWorks";
import PricingGrid from "./components/PricingGrid";
import FaqAccordion from "./components/FaqAccordion";
import Gallery from "./components/Gallery";
import FinalCta from "./components/FinalCta";

export default function BookRepairClient() {
  return (
    <div className="relative bg-white text-gray-900">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#fff", color: "#111827", border: "1px solid rgba(37,99,235,0.25)" },
        }}
      />

      <Hero />
      <ReviewBanner />

      <BookingWizard />

      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <TrustBadges />
        <TechnicianCard />
      </div>

      <div className="mt-14 sm:mt-16">
        <Testimonials />
        <HowItWorks />
        <PricingGrid />
        <FaqAccordion />
        <Gallery />
        <FinalCta />
      </div>
    </div>
  );
}
