import type { Metadata } from "next";
import FAQPageClient from "./FAQPageClient";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions About Mobile Service",
  description:
    "Get answers to all your questions about TurboFix mobile service. How long does a visit take? Do you use genuine parts? What warranty do you offer? Is doorstep service safe?",
  alternates: { canonical: "https://turbofix.in/faq" },
  openGraph: {
    title: "FAQ — Frequently Asked Questions About Mobile Service | TurboFix",
    description:
      "Everything you need to know about TurboFix. Service time, parts quality, warranty, data safety, payment methods and doorstep service explained.",
    url: "https://turbofix.in/faq",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How long does a typical service visit take?", acceptedAnswer: { "@type": "Answer", text: "Most common services — screen replacements, battery swaps, charging port fixes — are done in 20–45 minutes at your doorstep. Complex jobs like water damage service or motherboard service may take 2–4 hours or up to a day." } },
    { "@type": "Question", name: "Do you offer home pickup and delivery in Hyderabad?", acceptedAnswer: { "@type": "Answer", text: "Yes, within Hyderabad. Book online, choose doorstep service, and we handle the rest — same-day in most cases." } },
    { "@type": "Question", name: "Do you use genuine OEM parts?", acceptedAnswer: { "@type": "Answer", text: "We use OEM (Original Equipment Manufacturer) quality parts as standard. Genuine Apple parts are available for an extra charge. We'll always tell you exactly which parts we're using before the work begins." } },
    { "@type": "Question", name: "What warranty do you offer on services?", acceptedAnswer: { "@type": "Answer", text: "All service work carries a 6-month warranty. If the same issue recurs within 6 months due to parts or workmanship, we resolve it free. Physical damage and new issues are not covered." } },
    { "@type": "Question", name: "Will my data be safe during service?", acceptedAnswer: { "@type": "Answer", text: "We only access components relevant to the service. Our technicians never access your files, photos, or apps. We recommend backing up before any service visit as a precaution." } },
    { "@type": "Question", name: "Do I pay before or after the service?", acceptedAnswer: { "@type": "Answer", text: "You receive a confirmed quote before any work begins. Payment is made after the service is complete and you're satisfied with the result. No payment before work." } },
    { "@type": "Question", name: "Is doorstep mobile service safe?", acceptedAnswer: { "@type": "Answer", text: "Yes — our technicians are trained, background-verified, and carry professional equipment. If we can't resolve the issue, you don't pay for it." } },
    { "@type": "Question", name: "What payment methods do you accept?", acceptedAnswer: { "@type": "Answer", text: "Cash, all UPI apps (GPay, PhonePe, Paytm), credit/debit cards, and net banking." } },
    { "@type": "Question", name: "Do you service all mobile phone brands?", acceptedAnswer: { "@type": "Answer", text: "Yes — we service all major brands including Apple iPhone, Samsung Galaxy, OnePlus, Xiaomi, Vivo, Oppo, Realme, Motorola, Google Pixel, and Nothing phones." } },
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
