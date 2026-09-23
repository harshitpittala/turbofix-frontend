import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact TurboFix — Hyderabad",
  description:
    "Contact TurboFix for mobile service in Hyderabad. Call +91 86396 05147, WhatsApp us, or visit our store at Aghapura, Nampally. Open 7 days a week.",
  alternates: { canonical: "https://turbofix.in/contact" },
  openGraph: {
    title: "Contact TurboFix — Mobile Service Hyderabad",
    description:
      "Get in touch with TurboFix. Call +91 86396 05147, WhatsApp, email support@turbofix.in, or visit our Hyderabad store. Open 7 days a week.",
    url: "https://turbofix.in/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
