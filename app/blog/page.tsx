import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog — Mobile Repair Tips, Guides & Advice",
  description:
    "TurboFix blog — expert mobile repair tips, battery guides, screen replacement advice, iPhone & Android troubleshooting, and insights from Hyderabad's top repair technicians.",
  alternates: { canonical: "https://turbofix.in/blog" },
  openGraph: {
    title: "Mobile Repair Blog — Tips, Guides & Expert Advice | TurboFix",
    description:
      "Expert mobile repair guides, battery tips, water damage advice, screen replacement guides and more from TurboFix Hyderabad.",
    url: "https://turbofix.in/blog",
  },
};

export default function BlogPage() {
  return <BlogListClient />;
}
