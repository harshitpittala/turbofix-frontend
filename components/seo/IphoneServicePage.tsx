/**
 * IphoneServicePage — adapts an iPhone /[model]/[service] page to the shared
 * DeviceServicePage layout.
 */
import DeviceServicePage, { type DeviceServicePageData } from "@/components/seo/DeviceServicePage";
import { relatedIphoneLinks, iphoneGuideSlug, iphoneGuideMeta, IPHONE_PAGES_PUBLISHED, IPHONE_PAGES_UPDATED, type IphoneServicePage as PageData } from "@/data/iphoneServicePages";
import { iphoneImage } from "@/lib/modelImages";

export function toDevicePage(p: PageData): DeviceServicePageData {
  const { otherServices, relatedModels } = relatedIphoneLinks(p.model, p.service);
  const label = p.service.label(p.model);
  return {
    path: p.path,
    h1: p.h1,
    subject: `${p.model.name} ${label.toLowerCase()}`,
    quickAnswer: p.quickAnswer,
    intro: p.intro,
    notice: p.notice,
    facts: p.facts,
    sections: p.sections,
    comparison: {
      heading: p.comparison.heading,
      column: p.comparison.column,
      summary: p.comparison.summary,
      rows: p.comparison.rows.map((r) => ({
        name: r.model.name, href: `/${r.model.slug}/${p.service.slug}`, detail: r.detail, current: r.current,
      })),
    },
    process: p.process,
    faqs: p.faqs,
    relatedGroups: [
      { heading: `More ${p.model.name} services`, links: [...otherServices, { href: `/${p.model.slug}`, label: `All ${p.model.name} services` }] },
      { heading: `${label} for related iPhone models`, links: relatedModels },
    ],
    seeAlso: [
      { href: `/${iphoneGuideSlug(p.service.slug)}`, label: `${iphoneGuideMeta(p.service).title.replace(" in Hyderabad", "")} guide (all models)` },
      p.service.generalPage,
      { href: "/iphone-service-hyderabad", label: "iPhone service in Hyderabad" },
      { href: "/no-fix-no-fee-policy", label: "No fix, no fee policy" },
      { href: "/terms", label: "Warranty terms" },
    ],
    sources: p.sources,
    checked: p.checked,
    breadcrumbs: [
      { name: "iPhone", href: "/iphone-service-hyderabad" },
      { name: iphoneGuideMeta(p.service).title.replace("iPhone ", "").replace(" in Hyderabad", ""), href: `/${iphoneGuideSlug(p.service.slug)}` },
      { name: p.model.name, href: p.path },
    ],
    bookLabel: `Book ${p.model.name} ${label.toLowerCase()}`,
    disclaimer: "TurboFix is an independent service provider. We are not Apple, not an Apple Authorised Service Provider, and not affiliated with or endorsed by Apple Inc. iPhone is a trademark of Apple Inc.",
    serviceType: p.service.schemaType,
    device: { name: p.model.name, brand: "Apple" },
    image: (() => { const src = iphoneImage(p.model.slug); return src ? { src, alt: `Apple ${p.model.name}` } : undefined; })(),
    datePublished: IPHONE_PAGES_PUBLISHED,
    dateModified: IPHONE_PAGES_UPDATED,
  };
}

export default function IphoneServicePage({ page }: { page: PageData }) {
  return <DeviceServicePage page={toDevicePage(page)} />;
}
