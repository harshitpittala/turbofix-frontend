import type { Metadata } from "next";
import NoFixNoFeePolicyClient from "./NoFixNoFeePolicyClient";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "No Fix, No Fee Policy",
  description:
    "TurboFix's No Fix, No Fee policy explained: what's free, what a visit charge covers, our 6-month warranty scope, and typical service timelines.",
  alternates: { canonical: "https://turbofix.in/no-fix-no-fee-policy" },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does 'No Fix, No Fee' actually mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If our technician diagnoses your device and it turns out we cannot resolve the issue, you do not pay for the work. The diagnostic assessment itself is free.",
      },
    },
    {
      "@type": "Question",
      name: "Is the diagnostic really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the diagnostic check is free of charge. You'll receive a fixed quote before any service work begins, and you're not obligated to proceed.",
      },
    },
    {
      "@type": "Question",
      name: "When does a visit or service charge apply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A minimum visit/service charge of ₹499 applies only if you decline a quoted service, the device turns out not serviceable after inspection, or a job is left incomplete for reasons on the customer's side. This charge covers the technician's time and travel for that visit — it is not a service fee.",
      },
    },
    {
      "@type": "Question",
      name: "What does the 6-month warranty cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Service work is covered for 6 months against parts or workmanship defects on eligible screen replacements, and 3 months on other replaced parts. Physical damage, water damage, and issues unrelated to the original service are not covered. Full terms are on our Terms of Service page.",
      },
    },
  ],
};

export default function NoFixNoFeePolicyPage() {
  return (
    <>
      <JsonLd schema={faqSchema} id="schema-no-fix-no-fee-faq" />
      <NoFixNoFeePolicyClient />
    </>
  );
}
