/**
 * IphoneModelHub — server-rendered /[model] page listing that model's
 * service pages with model-specific summaries and verified specs.
 */
import Link from "next/link";
import { ChevronRight, Phone, Zap } from "lucide-react";
import CTA from "@/components/home/CTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT_PHONE, CONTACT_PHONE_E164 } from "@/lib/config";
import { getAdjacentModels, getSiblingModels, IPHONE_FACTS_CHECKED, type IphoneModel } from "@/data/iphoneModels";
import { hubSummary, iphoneServices, hubIntro } from "@/data/iphoneServicePages";

const BASE = "https://turbofix.in";
const card = { background: "#FFFFFF", border: "1px solid #E2E8F0" } as const;

export default function IphoneModelHub({ model: m }: { model: IphoneModel }) {
  const related = [...getSiblingModels(m), ...getAdjacentModels(m)]
    .filter((o, i, arr) => arr.findIndex((x) => x.slug === o.slug) === i);

  const specs = [
    { label: "On sale", value: m.releasedLabel },
    { label: "Chip", value: m.chip + (m.modem ? ` · ${m.modem} modem` : "") },
    { label: "Display", value: `${m.display.size} ${m.display.brand} (${m.display.tech})` },
    { label: "Front glass", value: m.frontGlass ?? "Glass (pre-Ceramic Shield)" },
    { label: "Frame and back", value: `${m.frame} frame · ${m.backFinish}` },
    { label: "Rear cameras", value: m.rearCameras.join(" · ") },
    { label: "Front camera", value: m.frontCamera },
    { label: "Charging", value: `${m.connector}${m.usbSpeed ? ` (${m.usbSpeed})` : ""} · ${m.magsafe ? "MagSafe and Qi wireless" : "Qi wireless (no MagSafe)"}` },
    { label: "Water resistance (when new)", value: m.water },
    { label: "Parts and Service History", value: m.partsHistory.join(", ") },
  ];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "iPhone Service Hyderabad", item: `${BASE}/iphone-service-hyderabad` },
      { "@type": "ListItem", position: 3, name: m.name, item: `${BASE}/${m.slug}` },
    ],
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${m.name} services`,
    itemListElement: iphoneServices.map((s, i) => ({
      "@type": "ListItem", position: i + 1, name: `${m.name} ${s.label(m)}`, url: `${BASE}/${m.slug}/${s.slug}`,
    })),
  };

  return (
    <>
      <JsonLd schema={breadcrumb} id={`schema-breadcrumb-${m.slug}`} />
      <JsonLd schema={itemList} id={`schema-itemlist-${m.slug}`} />

      <section className="relative pt-32 pb-12 bg-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-blue-700">Home</Link></li>
              <li aria-hidden><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/iphone-service-hyderabad" className="hover:text-blue-700">iPhone</Link></li>
              <li aria-hidden><ChevronRight className="w-3 h-3" /></li>
              <li aria-current="page" className="text-slate-700">{m.name}</li>
            </ol>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-5 text-slate-900">{m.name} Service in Hyderabad</h1>
          {hubIntro(m).map((t, i) => <p key={i} className="text-slate-600 text-lg leading-relaxed mb-4">{t}</p>)}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/book-a-visit" className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white">
              <Zap className="w-4 h-4" fill="white" aria-hidden /> Book a visit
            </Link>
            <a href={`tel:${CONTACT_PHONE_E164}`} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-slate-700" style={card}>
              <Phone className="w-4 h-4 text-blue-700" aria-hidden /> {CONTACT_PHONE}
            </a>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            TurboFix is an independent service provider, not Apple or an Apple Authorised Service Provider, and not affiliated with or endorsed by Apple Inc.
          </p>
        </div>
      </section>

      <section aria-labelledby="services-h" className="relative py-10 border-t border-slate-100 bg-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <h2 id="services-h" className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-6">{m.name} services</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {iphoneServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/${m.slug}/${s.slug}`} className="block h-full p-5 rounded-2xl hover:border-blue-300 transition-colors" style={card}>
                  <h3 className="text-slate-900 font-semibold mb-1">{m.name} {s.label(m)}</h3>
                  <p className="text-sm text-slate-600">{hubSummary(m, s.slug)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="specs-h" className="relative py-10 border-t border-slate-100 bg-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <h2 id="specs-h" className="font-display text-2xl font-bold text-slate-900 mb-4">{m.name} hardware that matters for service</h2>
          <dl className="divide-y divide-slate-100 rounded-2xl" style={card}>
            {specs.map((f) => (
              <div key={f.label} className="grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 px-5 py-3">
                <dt className="text-sm font-semibold text-slate-900">{f.label}</dt>
                <dd className="text-sm text-slate-600">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-slate-500 mt-3">Checked against Apple's published specifications and support documents in {IPHONE_FACTS_CHECKED}. Prices are quoted after inspection.</p>
        </div>
      </section>

      <section aria-labelledby="other-h" className="relative py-10 border-t border-slate-100 bg-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <h2 id="other-h" className="font-display text-xl font-bold text-slate-900 mb-4">Related iPhone models</h2>
          <ul className="flex flex-wrap gap-3">
            {related.map((o) => (
              <li key={o.slug}><Link href={`/${o.slug}`} className="block px-4 py-2 rounded-xl text-sm text-slate-700 hover:text-blue-700" style={card}>{o.name}</Link></li>
            ))}
            <li><Link href="/iphone-service-hyderabad" className="block px-4 py-2 rounded-xl text-sm text-blue-700" style={card}>All iPhone models</Link></li>
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}
