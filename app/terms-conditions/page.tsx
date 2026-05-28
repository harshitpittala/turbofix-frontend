import type { Metadata } from "next";
import TermsConditionsPageClient from "./TermsConditionsPageClient";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "TurboFix warranty policy, terms and conditions for mobile device repairs.",
};

export default function TermsConditionsPage() {
  return <TermsConditionsPageClient />;
}
