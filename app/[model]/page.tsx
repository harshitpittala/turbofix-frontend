import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IphoneModelHub from "@/components/seo/IphoneModelHub";
import IphoneGuidePage from "@/components/seo/IphoneGuidePage";
import { getIphoneModel, iphoneModels } from "@/data/iphoneModels";
import { getIphoneGuideService, hubMeta, iphoneGuideMeta, iphoneGuideSlug, iphoneServices } from "@/data/iphoneServicePages";

// Root-level dynamic segment: only iPhone model hubs (/iphone-15-pro) and
// iPhone service guides (/iphone-battery-replacement) exist here; any other
// single-segment path keeps returning the site's 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...iphoneModels.map((m) => ({ model: m.slug })),
    ...iphoneServices.map((s) => ({ model: iphoneGuideSlug(s.slug) })),
  ];
}

function meta(title: string, description: string, path: string): Metadata {
  const url = `https://turbofix.in${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | TurboFix`, description, url, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | TurboFix`, description },
  };
}

export function generateMetadata({ params }: { params: { model: string } }): Metadata {
  const guide = getIphoneGuideService(params.model);
  if (guide) {
    const { title, description } = iphoneGuideMeta(guide);
    return meta(title, description, `/${params.model}`);
  }
  const m = getIphoneModel(params.model);
  if (!m) return { title: "Not Found" };
  const { title, description } = hubMeta(m);
  return meta(title, description, `/${m.slug}`);
}

export default function Page({ params }: { params: { model: string } }) {
  const guide = getIphoneGuideService(params.model);
  if (guide) return <IphoneGuidePage service={guide} />;
  const m = getIphoneModel(params.model);
  if (!m) notFound();
  return <IphoneModelHub model={m} />;
}
