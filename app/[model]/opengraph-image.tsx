import { renderOgCard, OG_SIZE } from "@/lib/ogImage";
import { getIphoneModel } from "@/data/iphoneModels";
import { getIphoneGuideService, iphoneGuideMeta } from "@/data/iphoneServicePages";

export const alt = "TurboFix iPhone model service page";
export const size = OG_SIZE;
export const contentType = "image/png";
// Edge runtime: next/og's Node renderer fails to load its font on Windows builds.
export const runtime = "edge";

export default function Image({ params }: { params: { model: string } }) {
  const guide = getIphoneGuideService(params.model);
  if (guide) {
    return renderOgCard({
      eyebrow: "iPhone 11 to iPhone 18 Pro Max · Hyderabad",
      title: iphoneGuideMeta(guide).title.replace(" in Hyderabad", ""),
      footer: "Independent service · Diagnosis and a quote before any work",
    });
  }
  const m = getIphoneModel(params.model);
  return renderOgCard({
    eyebrow: "iPhone service · Hyderabad",
    title: m?.name ?? "iPhone",
    footer: "Screen, battery, port, cameras, audio, back glass and board-level service",
  });
}
