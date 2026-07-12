import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog — Mobile Service Tips, Guides & Advice",
  description:
    "TurboFix blog — expert mobile service tips, battery guides, screen replacement advice, iPhone & Android troubleshooting, and insights from Hyderabad's top service technicians.",
  alternates: { canonical: "https://turbofix.in/blog" },
  openGraph: {
    title: "Mobile Service Blog — Tips, Guides & Expert Advice | TurboFix",
    description:
      "Expert mobile service guides, battery tips, water damage advice, screen replacement guides and more from TurboFix Hyderabad.",
    url: "https://turbofix.in/blog",
  },
};

export default function BlogPage() {
  return <BlogListClient />;
}
