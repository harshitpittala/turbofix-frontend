import type { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = {
  alternates: { canonical: "https://turbofix.in/terms" },
  title: "Terms of Service",
  description: "TurboFix warranty policy, terms and conditions for mobile device service.",
  openGraph: {
    title: "Terms of Service | TurboFix",
    description: "TurboFix warranty policy, terms and conditions for mobile device service.",
    url: "https://turbofix.in/terms",
  },
};

export default function TermsPage() {
  return <TermsPageClient />;
}
