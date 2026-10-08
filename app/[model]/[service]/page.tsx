import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IphoneServicePage from "@/components/seo/IphoneServicePage";
import DeviceServicePage from "@/components/seo/DeviceServicePage";
import { allIphoneServicePaths, buildIphoneServicePage } from "@/data/iphoneServicePages";
import {
  allSamsungMotherboardPaths, buildSamsungMotherboardPage, samsungMotherboardMeta, SAMSUNG_MB_SERVICE,
} from "@/data/samsungMotherboardPages";
import { getSamsungModel } from "@/data/samsungModels";

// Only the generated model × service combinations exist; everything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...allIphoneServicePaths(), ...allSamsungMotherboardPaths()];
}

type Params = { params: { model: string; service: string } };

function meta(title: string, description: string, path: string, keywords: string[]): Metadata {
  const url = `https://turbofix.in${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { title: `${title} | TurboFix`, description, url, type: "article" },
    twitter: { card: "summary_large_image", title: `${title} | TurboFix`, description },
  };
}

export function generateMetadata({ params }: Params): Metadata {
  const samsung = params.service === SAMSUNG_MB_SERVICE ? getSamsungModel(params.model) : undefined;
  if (samsung) {
    const m = samsungMotherboardMeta(samsung);
    return meta(m.title, m.description, `/${samsung.slug}/${SAMSUNG_MB_SERVICE}`, m.keywords);
  }
  const p = buildIphoneServicePage(params.model, params.service);
  if (!p) return { title: "Not Found" };
  return meta(p.seoTitle, p.metaDescription, p.path, p.keywords);
}

export default function Page({ params }: Params) {
  if (params.service === SAMSUNG_MB_SERVICE) {
    const page = buildSamsungMotherboardPage(params.model);
    if (!page) notFound();
    return <DeviceServicePage page={page} />;
  }
  const p = buildIphoneServicePage(params.model, params.service);
  if (!p) notFound();
  return <IphoneServicePage page={p} />;
}
