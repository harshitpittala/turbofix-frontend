import type { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy — TurboFix",
  description:
    "TurboFix Privacy Policy. Learn how we collect, use, and protect your personal information when you use our mobile repair services.",
  alternates: { canonical: "https://turbofix.in/privacy" },
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
