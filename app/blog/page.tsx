import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog — Mobile Service Tips, Guides & Advice",
  description:
    "Phone care tips, battery guides and screen replacement advice from TurboFix's Hyderabad service technicians.",
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
