import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us — Call, WhatsApp or Visit Our Store in Hyderabad",
  description:
    "Contact TurboFix for mobile repair in Hyderabad. Call +91 86396 05147, WhatsApp us, or visit our store at Aghapura, Nampally. Open 7 days a week.",
  alternates: { canonical: "https://turbofix.in/contact" },
  openGraph: {
    title: "Contact TurboFix — Mobile Repair Hyderabad",
    description:
      "Get in touch with TurboFix. Call +91 86396 05147, WhatsApp, email support@turbofix.in, or visit our Hyderabad store. Open Mon–Sat 9AM–9PM.",
    url: "https://turbofix.in/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
