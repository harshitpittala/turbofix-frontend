import type { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy — TurboFix",
  description:
    "TurboFix Privacy Policy. Learn how we collect, use, store, process and protect your personal information when you use our mobile service in Hyderabad.",
  alternates: { canonical: "https://turbofix.in/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
