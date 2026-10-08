/**
 * IphoneGuidePage — /iphone-<service> guide: advice that applies to every
 * iPhone, plus a comparison of all models and links to each model page.
 */
import DeviceServicePage from "@/components/seo/DeviceServicePage";
import { iphoneModels } from "@/data/iphoneModels";
import {
  buildIphoneGuide, iphoneGuideSlug, iphoneServices, IPHONE_PAGES_PUBLISHED, IPHONE_PAGES_UPDATED,
  type IphoneServiceDef,
} from "@/data/iphoneServicePages";

export default function IphoneGuidePage({ service }: { service: IphoneServiceDef }) {
  const g = buildIphoneGuide(service);
  const lower = g.label.toLowerCase();
  return (
    <DeviceServicePage
      page={{
        path: g.path,
        h1: `iPhone ${g.label} in Hyderabad`,
        subject: `iPhone ${lower}`,
        quickAnswer: g.quick,
        intro: [
          `This guide covers iPhone ${lower} for every model from the iPhone 11 to the iPhone 18 Pro Max: the signs to look for, what usually causes the problem, when ${lower} won't fix it, and what to check before booking.`,
          `The ${iphoneModels.length} models fall into ${g.distinct} different configurations for this job, compared in the table below. Pick your model for its own page with model-specific details and FAQs.`,
        ],
        facts: [
          { label: "Models covered", value: `${iphoneModels.length} iPhone models, iPhone 11 to iPhone 18 Pro Max` },
          { label: "Price", value: "Quoted for your model after inspection, before any work starts" },
          { label: "Warranty", value: "3, 6 or 12 months depending on the part grade — confirmed with your quote" },
          { label: "Where", value: "Doorstep visit, pickup and delivery, or walk-in at our Nampally studio" },
        ],
        sections: g.sections,
        comparison: {
          heading: `How do iPhone models compare for ${lower}?`,
          column: g.column,
          rows: g.rows.map((r) => ({ name: r.model.name, href: `/${r.model.slug}/${service.slug}`, detail: r.detail, current: false })),
          summary: `Models with the same entry still use their own parts in most cases, so every quote is for your exact model. Select a model for its dedicated page.`,
        },
        process: [
          { title: "Check and test", desc: "We inspect the phone and confirm the fault before quoting." },
          { title: "Quote and part grade", desc: "You get the price, part grade and warranty period before any work." },
          { title: "Service", desc: `The ${g.noun} work is carried out with the procedure for your model.` },
          { title: "Test with you", desc: "Everything affected by the job is tested before you pay." },
        ],
        faqs: [
          ...g.faqs,
          {
            q: "How do I find out which iPhone model I have?",
            a: "Open Settings > General > About. The Model Name line shows your exact model, for example iPhone 15 Pro. Use it to pick the right page from the table above, or tell us when you book.",
          },
          {
            q: `Which iPhone models do you cover for ${lower}?`,
            a: `Every iPhone from the iPhone 11 to the iPhone 18 Pro Max — ${iphoneModels.length} models in total, each with its own page. For the newest models, contact us first to confirm part availability.`,
          },
          {
            q: `How much does iPhone ${lower} cost?`,
            a: "It depends on the model and the part grade you choose. You get an exact quote after we inspect your phone and before any work starts, and you pay only after the service.",
          },
        ],
        relatedGroups: [
          {
            heading: "Other iPhone service guides",
            links: iphoneServices.filter((s) => s.slug !== service.slug)
              .map((s) => ({ href: `/${iphoneGuideSlug(s.slug)}`, label: `iPhone ${s.slug === "back-panel-replacement" ? "back glass replacement" : s.label(iphoneModels[0]).toLowerCase()}` })),
          },
        ],
        seeAlso: [
          { href: "/iphone-service-hyderabad", label: "iPhone service in Hyderabad" },
          service.generalPage,
          { href: "/no-fix-no-fee-policy", label: "No fix, no fee policy" },
          { href: "/terms", label: "Warranty terms" },
        ],
        sources: [
          { label: "Apple Support: iPhone Parts and Service History", href: "https://support.apple.com/en-us/102658" },
          { label: "Apple Support: iPhone battery and performance", href: "https://support.apple.com/en-us/101575" },
          { label: "Apple Support: About genuine iPhone displays", href: "https://support.apple.com/en-us/103256" },
        ],
        checked: "October 2026",
        breadcrumbs: [
          { name: "iPhone", href: "/iphone-service-hyderabad" },
          { name: g.label, href: g.path },
        ],
        bookLabel: `Book iPhone ${lower}`,
        disclaimer: "TurboFix is an independent service provider. We are not Apple, not an Apple Authorised Service Provider, and not affiliated with or endorsed by Apple Inc. iPhone is a trademark of Apple Inc.",
        serviceType: service.schemaType,
        device: { name: "iPhone", brand: "Apple" },
        datePublished: IPHONE_PAGES_PUBLISHED,
        dateModified: IPHONE_PAGES_UPDATED,
      }}
    />
  );
}
