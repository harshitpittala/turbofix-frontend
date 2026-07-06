import type { Metadata } from "next";
import FAQPageClient from "./FAQPageClient";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions About Mobile Repair",
  description:
    "Get answers to all your questions about TurboFix mobile repair services. How long does repair take? Do you use genuine parts? What warranty do you offer? Is doorstep repair safe?",
  alternates: { canonical: "https://turbofix.in/faq" },
  openGraph: {
    title: "FAQ — Frequently Asked Questions About Mobile Repair | TurboFix",
    description:
      "Everything you need to know about TurboFix. Repair time, parts quality, warranty, data safety, payment methods and doorstep service explained.",
    url: "https://turbofix.in/faq",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How long does a typical mobile repair take?", acceptedAnswer: { "@type": "Answer", text: "Most common repairs — screen replacements, battery swaps, charging port fixes — are done in 20–45 minutes at your doorstep. Complex jobs like water damage recovery or motherboard repair may take 2–4 hours or up to a day." } },
    { "@type": "Question", name: "Do you offer home pickup and delivery in Hyderabad?", acceptedAnswer: { "@type": "Answer", text: "Yes, within Hyderabad. Book online, choose doorstep service, and we handle the rest — same-day in most cases." } },
    { "@type": "Question", name: "Do you use genuine OEM parts?", acceptedAnswer: { "@type": "Answer", text: "We use OEM (Original Equipment Manufacturer) quality parts as standard. Genuine Apple parts are available for an extra charge. We'll always tell you exactly which parts we're using before the repair begins." } },
    { "@type": "Question", name: "What warranty do you offer on repairs?", acceptedAnswer: { "@type": "Answer", text: "All repairs carry a 6-month warranty. If the same issue recurs within 6 months due to parts or workmanship, we fix it free. Physical damage and new issues are not covered." } },
    { "@type": "Question", name: "Will my data be safe during repair?", acceptedAnswer: { "@type": "Answer", text: "We only access components relevant to the repair. Our technicians never access your files, photos, or apps. We recommend backing up before any repair as a precaution." } },
    { "@type": "Question", name: "Do I pay before or after the repair?", acceptedAnswer: { "@type": "Answer", text: "You receive a confirmed quote before any work begins. Payment is made after the repair is complete and you're satisfied with the result. No payment before work." } },
    { "@type": "Question", name: "Is doorstep mobile repair safe?", acceptedAnswer: { "@type": "Answer", text: "Yes — our technicians are trained, background-verified, and carry professional equipment. If a repair doesn't fix the issue, you don't pay for it." } },
    { "@type": "Question", name: "What payment methods do you accept?", acceptedAnswer: { "@type": "Answer", text: "Cash, all UPI apps (GPay, PhonePe, Paytm), credit/debit cards, and net banking." } },
    { "@type": "Question", name: "Do you repair all mobile phone brands?", acceptedAnswer: { "@type": "Answer", text: "Yes — we repair all major brands including Apple iPhone, Samsung Galaxy, OnePlus, Xiaomi, Vivo, Oppo, Realme, Motorola, Google Pixel, and Nothing phones." } },
    { "@type": "Question", name: "Which Hyderabad areas do you cover?", acceptedAnswer: { "@type": "Answer", text: "We cover 80+ Hyderabad areas including Gachibowli, Madhapur, HITEC City, Banjara Hills, Ameerpet, Kukatpally, Secunderabad, Dilsukhnagar, LB Nagar, Kompally and all major localities." } },
  ],
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
