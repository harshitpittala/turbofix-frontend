import type { Metadata } from "next";
import TestimonialsPageClient from "./TestimonialsPageClient";

export const metadata: Metadata = {
  alternates: { canonical: "https://turbofix.in/testimonials" },
  title: "Customer Testimonials",
  description: "What customers across Hyderabad say about TurboFix doorstep mobile service: screen, battery, water damage and camera jobs.",
  openGraph: {
    title: "Customer Testimonials | TurboFix",
    description: "What customers across Hyderabad say about TurboFix doorstep mobile service: screen, battery, water damage and camera jobs.",
    url: "https://turbofix.in/testimonials",
  },
};

export default function TestimonialsPage() {
  return <TestimonialsPageClient />;
}
