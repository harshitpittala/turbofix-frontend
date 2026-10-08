import { renderOgCard, OG_SIZE } from "@/lib/ogImage";

// Site-wide default social card, served at /opengraph-image (replaces a missing /og-image.jpg).
export const alt = "TurboFix — doorstep mobile phone service in Hyderabad";
export const size = OG_SIZE;
export const contentType = "image/png";
// Edge runtime: next/og's Node renderer fails to load its font on Windows builds.
export const runtime = "edge";

export default function Image() {
  return renderOgCard({
    eyebrow: "Doorstep mobile phone service",
    title: "Hyderabad & Secunderabad",
    footer: "Independent service · Doorstep, pickup or walk-in studio in Nampally",
  });
}
