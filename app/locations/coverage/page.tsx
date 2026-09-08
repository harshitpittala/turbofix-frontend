import type { Metadata } from "next";
import CoverageReportClient from "./CoverageReportClient";
import { locationInventory } from "@/data/locationInventory";

// Internal review tool — not a public SEO page. Kept out of the index and
// off the sitemap on purpose (see app/sitemap.ts).
export const metadata: Metadata = {
  title: "Location Coverage Report — Internal",
  robots: { index: false, follow: false },
};

export default function LocationCoveragePage() {
  return <CoverageReportClient inventory={locationInventory} />;
}
