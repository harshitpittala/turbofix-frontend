import type { Metadata } from "next";
import TestimonialsPageClient from "./TestimonialsPageClient";

export const metadata: Metadata = {
  alternates: { canonical: "https://turbofix.in/testimonials" },
  title: "Testimonials",
  description: "Over 1,000 five-star reviews from happy TurboFix customers across Hyderabad.",
};

export default function TestimonialsPage() {
  return <TestimonialsPageClient />;
}
