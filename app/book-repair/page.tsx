import type { Metadata } from "next";
import BookRepairClient from "./BookRepairClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { bookRepairFaqs } from "@/data/bookRepairFaqs";

export const metadata: Metadata = {
  title: "Book a Doorstep Visit — Screen & Battery Replacement in Hyderabad",
  description:
    "Book a TurboFix doorstep visit in minutes. Pickup and delivery across Hyderabad. Same-day appointments, OEM-grade parts, 6-month warranty. All brands supported. Independent, walk-in studio at Aghapura, Nampally — not affiliated with any manufacturer.",
  alternates: { canonical: "https://turbofix.in/book-repair" },
  openGraph: {
    title: "Book a Doorstep Visit | TurboFix Hyderabad",
    description:
      "Book now — our technician visits you, replaces the part on the spot, and confirms before you pay. Screen, battery, charging port, water damage and more.",
    url: "https://turbofix.in/book-repair",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: bookRepairFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://turbofix.in" },
    { "@type": "ListItem", position: 2, name: "Book a Repair", item: "https://turbofix.in/book-repair" },
  ],
};

export default function BookRepairPage() {
  return (
    <>
      <JsonLd schema={faqSchema} id="schema-faq-book-repair" />
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-book-repair" />
      <BookRepairClient />
    </>
  );
}
