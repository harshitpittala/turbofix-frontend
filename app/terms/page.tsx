import type { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "TurboFix warranty policy, terms and conditions for mobile device service.",
};

export default function TermsPage() {
  return <TermsPageClient />;
}
