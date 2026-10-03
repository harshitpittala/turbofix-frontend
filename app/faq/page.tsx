import type { Metadata } from "next";
import FAQPageClient from "./FAQPageClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqCategories } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ — Mobile Service Questions Answered",
  description:
    "How to book TurboFix in Hyderabad, what to tell us, areas covered, visit hours, parts, warranty, data safety and payment, answered.",
  alternates: { canonical: "https://turbofix.in/faq" },
  openGraph: {
    title: "FAQ — Frequently Asked Questions About Mobile Service | TurboFix",
    description:
      "How to book TurboFix in Hyderabad, what to tell us, areas covered, visit hours, parts, warranty, data safety and payment, answered.",
    url: "https://turbofix.in/faq",
  },
};

// Built from the same data the page renders; unconfirmed answers are left out.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories
    .flatMap((c) => c.items)
    .filter((f) => !f.confirm)
    .map((f) => ({
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
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://turbofix.in/faq" },
  ],
};

export default function FAQPage() {
  return (
    <>
      <JsonLd schema={faqSchema} id="schema-faq-page" />
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-faq" />
      <FAQPageClient />
    </>
  );
}
