import { renderOgCard, OG_SIZE } from "@/lib/ogImage";
import { buildIphoneServicePage } from "@/data/iphoneServicePages";
import { getSamsungModel } from "@/data/samsungModels";

export const alt = "TurboFix model service page";
export const size = OG_SIZE;
export const contentType = "image/png";
// Edge runtime: next/og's Node renderer fails to load its font on Windows builds.
export const runtime = "edge";

export default function Image({ params }: { params: { model: string; service: string } }) {
  if (params.service === "motherboard-service") {
    const m = getSamsungModel(params.model);
    return renderOgCard({
      eyebrow: "Samsung motherboard service · Hyderabad",
      title: m ? `Samsung ${m.name}` : "Samsung Galaxy",
      footer: m?.chipset ? `${m.chipset} · board diagnosis · quote before work` : "Board diagnosis · quote before work",
    });
  }
  const p = buildIphoneServicePage(params.model, params.service);
  return renderOgCard({
    eyebrow: `${p ? p.service.label(p.model) : "iPhone service"} · Hyderabad`,
    title: p ? p.model.name : "iPhone",
    footer: "Independent service · Diagnosis and a quote before any work",
  });
}
