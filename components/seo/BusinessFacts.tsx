/**
 * BusinessFacts — "TurboFix at a glance": the core business facts in plain,
 * crawlable HTML (server component, no client JS). Every line here must match
 * the footer, contact page and LocalBusiness schema; NAP comes from lib/config.
 */
import Link from "next/link";
import { servicePages } from "@/data/servicePages";
import { brandCityPages } from "@/data/brandCityPages";
import { getPublishedLocations, zoneLabels } from "@/data/locations";
import {
  BUSINESS_ADDRESS_LINE, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_E164, WHATSAPP_URL,
} from "@/lib/config";

const linkCls = "text-blue-700 hover:underline";

export default function BusinessFacts() {
  const areaCount = getPublishedLocations().length;
  const zones = Object.entries(zoneLabels) as [string, string][];

  const facts: { term: string; detail: React.ReactNode }[] = [
    {
      term: "What we do",
      detail: (
        <>
          Independent mobile phone repair and servicing in Hyderabad (not affiliated with any phone
          manufacturer):{" "}
          {servicePages.map((s, i) => (
            <span key={s.slug}>
              {i > 0 && ", "}
              <Link href={`/${s.slug}`} className={linkCls}>{s.name.toLowerCase()}</Link>
            </span>
          ))}
          .
        </>
      ),
    },
    {
      term: "Phones we service",
      detail: (
        <>
          {brandCityPages.map((b, i) => (
            <span key={b.slug}>
              {i > 0 && ", "}
              <Link href={`/${b.slug}`} className={linkCls}>{b.brand}</Link>
            </span>
          ))}
          {" "}and <Link href="/brands/nothing" className={linkCls}>Nothing</Link>.{" "}
          <Link href="/brands" className={linkCls}>All brands</Link>.
        </>
      ),
    },
    {
      term: "How service works",
      detail: (
        <>
          A technician services your phone at your home or office, usually at the time slot you choose;
          most visits are completed in under 30 minutes. We also offer pickup and delivery, and you can
          walk in to our studio in Nampally.
        </>
      ),
    },
    {
      term: "Areas served",
      detail: (
        <>
          All of Hyderabad, including Secunderabad, with{" "}
          <Link href="/locations" className={linkCls}>{areaCount} area pages</Link> grouped by zone:{" "}
          {zones.map(([slug, label], i) => (
            <span key={slug}>
              {i > 0 && ", "}
              <Link href={`/locations/zones/${slug}`} className={linkCls}>{label}</Link>
            </span>
          ))}
          .
        </>
      ),
    },
    {
      term: "Hours",
      detail: <>Doorstep visits and studio walk-ins: 9 AM – 9 PM, every day. Online and WhatsApp bookings: any time, 24/7.</>,
    },
    {
      term: "Studio address",
      detail: <address className="not-italic">{BUSINESS_ADDRESS_LINE}</address>,
    },
    {
      term: "Contact",
      detail: (
        <>
          Call <a href={`tel:${CONTACT_PHONE_E164}`} className={linkCls}>{CONTACT_PHONE}</a>,{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>WhatsApp</a> the same number,
          email <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>{CONTACT_EMAIL}</a>, or{" "}
          <Link href="/book-a-visit" className={linkCls}>book a visit online</Link>.
        </>
      ),
    },
    {
      term: "Prices and payment",
      detail: (
        <>
          Each service page lists a price range; you get a confirmed quote before any work starts and pay
          after the service. Cash, UPI, cards and net banking accepted.
        </>
      ),
    },
    {
      term: "Warranty and policies",
      detail: (
        <>
          Warranty of 3 months, 6 months or 1 year on every service, depending on the quality grade of
          the part used; the period is confirmed with your quote.{" "}
          <Link href="/no-fix-no-fee-policy" className={linkCls}>No fix, no fee policy</Link> ·{" "}
          <Link href="/terms" className={linkCls}>Terms &amp; warranty</Link> ·{" "}
          <Link href="/privacy" className={linkCls}>Privacy</Link>
        </>
      ),
    },
    { term: "Languages", detail: <>English, Telugu and Hindi.</> },
  ];

  return (
    <section aria-labelledby="facts-heading" className="relative py-16 overflow-hidden border-t border-slate-100 bg-white">
      <div className="container relative max-w-4xl mx-auto px-4 sm:px-6">
        <h2 id="facts-heading" className="font-display text-3xl font-bold text-slate-900 mb-2">
          TurboFix at a <span className="gradient-text">Glance</span>
        </h2>
        <p className="text-slate-500 text-sm mb-8">The key facts about our mobile phone service in Hyderabad.</p>
        <dl className="divide-y divide-slate-100 rounded-2xl" style={{ border: "1px solid #E2E8F0" }}>
          {facts.map((f) => (
            <div key={f.term} className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-5 py-4">
              <dt className="text-sm font-semibold text-slate-900">{f.term}</dt>
              <dd className="text-sm text-slate-600 leading-relaxed">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
