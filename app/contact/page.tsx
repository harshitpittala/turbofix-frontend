import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact TurboFix: Phone, Address & Hours",
  description:
    "Call or WhatsApp TurboFix on +91 86396 05147, email us, or find our studio in Aghapura, Nampally, Hyderabad. Doorstep visits 9 AM–9 PM, every day.",
  alternates: { canonical: "https://turbofix.in/contact" },
  openGraph: {
    title: "Contact TurboFix — Mobile Service Hyderabad",
    description:
      "Call or WhatsApp TurboFix on +91 86396 05147, email support@turbofix.in, or find our studio in Aghapura, Nampally. Doorstep visits 9 AM–9 PM daily.",
    url: "https://turbofix.in/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
