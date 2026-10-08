/**
 * DeviceServicePage — shared server-rendered layout for per-model service
 * pages (iPhone /[model]/[service], Samsung /[model]/motherboard-service).
 * Plain server markup (no client JS) so every heading, table and FAQ answer
 * is in the initial HTML and matches the JSON-LD exactly.
 */
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Zap, Info, CheckCircle, MapPin } from "lucide-react";
import CTA from "@/components/home/CTA";
import PopularAreas from "@/components/seo/PopularAreas";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPriorityAreas } from "@/lib/priorityAreas";
import { CONTACT_PHONE, CONTACT_PHONE_E164, BUSINESS_ADDRESS_LINE } from "@/lib/config";

const BASE = "https://turbofix.in";
const card = { background: "#FFFFFF", border: "1px solid #E2E8F0" } as const;

export interface DeviceServicePageData {
  path: string;
  h1: string;
  /** e.g. "iPhone 11 battery replacement" — used in section headings. */
  subject: string;
  quickAnswer: string;
  intro: string[];
  notice?: string;
  facts: { label: string; value: string }[];
  sections: { id: string; heading: string; paragraphs?: string[]; bullets?: string[] }[];
  comparison: { heading: string; column: string; rows: { name: string; href?: string; detail: string; current: boolean }[]; summary: string };
  process: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  relatedGroups: { heading: string; links: { href: string; label: string }[] }[];
  seeAlso: { href: string; label: string }[];
  sources: { label: string; href: string }[];
  checked: string;
  /** Breadcrumb trail after Home; the last item is the current page. */
  breadcrumbs: { name: string; href: string }[];
  bookLabel: string;
  disclaimer: string;
  serviceType: string;
  /** Existing product photo for the model, if one is in /public. */
  image?: { src: string; alt: string };
  /** The phone this page is about — for WebPage.about (visible in the H1). */
  device?: { name: string; brand: string };
  /** ISO dates shown on the page and in WebPage schema. */
  datePublished: string;
  dateModified: string;
}

/** "2026-10-08" → "8 October 2026" */
function longDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function deviceServiceSchemas(p: DeviceServicePageData) {
  const url = `${BASE}${p.path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: p.h1,
      description: p.quickAnswer,
      inLanguage: "en-IN",
      datePublished: p.datePublished,
      dateModified: p.dateModified,
      isPartOf: { "@id": `${BASE}/#website` },
      publisher: { "@id": `${BASE}/#organization` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: { "@id": `${url}#service` },
      ...(p.device && {
        about: { "@type": "Product", name: p.device.name, brand: { "@type": "Brand", name: p.device.brand } },
      }),
      ...(p.image && { primaryImageOfPage: { "@type": "ImageObject", url: `${BASE}${p.image.src}`, caption: p.image.alt } }),
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["#page-h1", "#quick-answer"] },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [{ name: "Home", href: "" }, ...p.breadcrumbs].map((b, i) => ({
        "@type": "ListItem", position: i + 1, name: b.name, item: `${BASE}${b.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: p.h1,
      description: p.quickAnswer,
      serviceType: p.serviceType,
      url,
      provider: { "@id": `${BASE}/#business` },
      areaServed: { "@type": "City", name: "Hyderabad" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

export default function DeviceServicePage({ page: p, extra }: { page: DeviceServicePageData; extra?: React.ReactNode }) {
  const schemas = deviceServiceSchemas(p);
  const slugId = p.path.replace(/\//g, "-").replace(/^-/, "");

  return (
    <>
      {schemas.map((s, i) => <JsonLd key={i} schema={s} id={`schema-${slugId}-${i}`} />)}

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-12 bg-white">
        <div className="container relative max-w-5xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-blue-700">Home</Link></li>
              {p.breadcrumbs.map((b, i) => (
                <li key={b.href} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3" aria-hidden />
                  {i === p.breadcrumbs.length - 1
                    ? <span aria-current="page" className="text-slate-700">{b.name}</span>
                    : <Link href={b.href} className="hover:text-blue-700">{b.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5"
            style={{ background: "rgba(37,99,235,0.08)", color: "#1D4ED8", border: "1px solid rgba(37,99,235,0.25)" }}>
            <MapPin className="w-3 h-3" aria-hidden /> Hyderabad · Doorstep, pickup or walk-in
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-start gap-6 mb-5">
            <div className="flex-1">
              <h1 id="page-h1" className="font-display text-3xl md:text-5xl font-bold mb-3 text-slate-900">{p.h1}</h1>
              <p className="text-sm text-slate-500">
                Published by TurboFix, Hyderabad · Last updated <time dateTime={p.dateModified}>{longDate(p.dateModified)}</time>
                {p.sources.length > 0 && <> · <a href="#sources-h" className="underline hover:text-blue-700">{p.sources.length} sources</a></>}
              </p>
            </div>
            {p.image && (
              <Image src={p.image.src} alt={p.image.alt} width={160} height={160} priority
                className="w-28 h-28 sm:w-40 sm:h-40 object-contain shrink-0" />
            )}
          </div>

          <div className="p-5 rounded-2xl mb-6" style={{ background: "rgba(37,99,235,0.04)", border: "1px solid rgba(37,99,235,0.18)" }}>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-1">Quick answer</h2>
            <p id="quick-answer" className="text-slate-700 leading-relaxed">{p.quickAnswer}</p>
          </div>

          {p.intro.map((t, i) => <p key={i} className="text-slate-600 text-lg leading-relaxed mb-4">{t}</p>)}

          {p.notice && (
            <div role="note" className="flex gap-3 p-4 rounded-xl my-6 text-sm text-amber-900"
              style={{ background: "#FFFBEB", border: "1px solid #FCD34D" }}>
              <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden />
              <p>{p.notice}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/book-a-visit" className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white">
              <Zap className="w-4 h-4" fill="white" aria-hidden /> {p.bookLabel}
            </Link>
            <a href={`tel:${CONTACT_PHONE_E164}`} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-slate-700" style={card}>
              <Phone className="w-4 h-4 text-blue-700" aria-hidden /> {CONTACT_PHONE}
            </a>
          </div>
          <p className="text-sm text-slate-600 mt-5">
            Serving all of Hyderabad and Secunderabad at your doorstep, with pickup and delivery, or at our walk-in studio: {BUSINESS_ADDRESS_LINE}.
          </p>
          <p className="text-xs text-slate-500 mt-3">{p.disclaimer}</p>
        </div>
      </section>

      {/* ── AT A GLANCE ── */}
      <section className="relative py-10 border-t border-slate-100 bg-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">{p.subject.replace(/^./, (c) => c.toUpperCase())} at a glance</h2>
          <dl className="divide-y divide-slate-100 rounded-2xl" style={card}>
            {p.facts.map((f) => (
              <div key={f.label} className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 px-5 py-3">
                <dt className="text-sm font-semibold text-slate-900">{f.label}</dt>
                <dd className="text-sm text-slate-600">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── CONTENT SECTIONS ── */}
      {p.sections.map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="relative py-10 border-t border-slate-100 bg-white">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <h2 id={`${s.id}-h`} className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4">{s.heading}</h2>
            {s.paragraphs?.map((t, i) => <p key={i} className="text-slate-600 leading-relaxed mb-4">{t}</p>)}
            {s.bullets && s.bullets.length > 0 && (
              <ul className="space-y-3">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 shrink-0" aria-hidden />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      {/* ── COMPARISON ── */}
      {p.comparison.rows.length > 1 && (
        <section aria-labelledby="compare-h" className="relative py-10 border-t border-slate-100 bg-white">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <h2 id="compare-h" className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4">{p.comparison.heading}</h2>
            <div className="overflow-x-auto rounded-2xl" style={card}>
              <table className="w-full text-sm text-left">
                <caption className="sr-only">{p.comparison.heading}</caption>
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Model</th>
                    <th scope="col" className="px-4 py-3 font-semibold">{p.comparison.column}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {p.comparison.rows.map((r) => (
                    <tr key={r.name} className={r.current ? "bg-blue-50/50" : undefined}>
                      <th scope="row" className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                        {r.current || !r.href ? r.name : <Link href={r.href} className="text-blue-700 hover:underline">{r.name}</Link>}
                      </th>
                      <td className="px-4 py-3 text-slate-600">{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-600 text-sm mt-4">{p.comparison.summary}</p>
          </div>
        </section>
      )}

      {/* ── PROCESS ── */}
      <section aria-labelledby="process-h" className="relative py-10 border-t border-slate-100 bg-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <h2 id="process-h" className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            How does {p.subject} work at TurboFix?
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {p.process.map((s, i) => (
              <li key={s.title} className="p-5 rounded-2xl" style={card}>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center mb-3 text-white font-bold text-sm">{i + 1}</div>
                <h3 className="text-slate-900 font-semibold mb-1">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section aria-labelledby="faq-h" className="relative py-10 border-t border-slate-100 bg-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <h2 id="faq-h" className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            {p.subject.replace(/^./, (c) => c.toUpperCase())}: frequently asked questions
          </h2>
          <div className="space-y-3">
            {p.faqs.map((f) => (
              <details key={f.q} className="group rounded-xl bg-white" style={{ border: "1px solid #E2E8F0" }}>
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 font-medium text-slate-800">
                  <h3 className="text-sm md:text-base">{f.q}</h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 transition-transform group-open:rotate-90" aria-hidden />
                </summary>
                <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section aria-labelledby="related-h" className="relative py-10 border-t border-slate-100 bg-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <h2 id="related-h" className="sr-only">Related pages</h2>
          {p.relatedGroups.filter((g) => g.links.length).map((g) => (
            <div key={g.heading} className="mb-8">
              <h3 className="font-display text-xl font-bold text-slate-900 mb-4">{g.heading}</h3>
              <ul className="flex flex-wrap gap-3">
                {g.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="block px-4 py-2 rounded-xl text-sm text-slate-700 hover:text-blue-700" style={card}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-sm text-slate-600">
            See also:{" "}
            {p.seeAlso.map((l, i) => (
              <span key={l.href}>{i > 0 && " · "}<Link href={l.href} className="text-blue-700 hover:underline">{l.label}</Link></span>
            ))}
          </p>
        </div>
      </section>

      {/* ── SOURCES ── */}
      {p.sources.length > 0 && (
        <section aria-labelledby="sources-h" className="relative py-8 border-t border-slate-100 bg-white">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <h2 id="sources-h" className="text-base font-semibold text-slate-900 mb-2">Sources</h2>
            <p className="text-xs text-slate-500 mb-2">Model facts on this page were checked against these sources in {p.checked}. Prices are not listed because they depend on the part and are quoted after inspection.</p>
            <ul className="text-xs text-slate-500 space-y-1 list-disc pl-5">
              {p.sources.map((s) => (
                <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 underline">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {extra}
      <PopularAreas label={p.subject.replace(/^./, (c) => c.toUpperCase())} areas={getPriorityAreas()} />
      <CTA />
    </>
  );
}
