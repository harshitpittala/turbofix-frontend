/**
 * SamsungMotherboardLinks — crawlable links to every Samsung
 * /[model]/motherboard-service page, grouped by series.
 */
import Link from "next/link";
import { samsungModels, type SamsungSeries } from "@/data/samsungModels";
import { SAMSUNG_MB_SERVICE } from "@/data/samsungMotherboardPages";

const ORDER: { label: string; series: SamsungSeries[] }[] = [
  { label: "Galaxy S and Note", series: ["S", "Note"] },
  { label: "Galaxy Z Fold and Z Flip", series: ["Z Fold", "Z Flip"] },
  { label: "Galaxy A", series: ["A"] },
  { label: "Galaxy M", series: ["M"] },
  { label: "Galaxy F", series: ["F"] },
];

export default function SamsungMotherboardLinks() {
  return (
    <section aria-labelledby="samsung-mb-h" className="relative py-12 border-t border-slate-100 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <h2 id="samsung-mb-h" className="font-display text-2xl font-bold text-slate-900 mb-2">Samsung motherboard service by model</h2>
        <p className="text-slate-500 text-sm mb-6">
          Board-level diagnosis and motherboard service for Samsung Galaxy phones sold in India since 2020.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {ORDER.map((g) => (
            <div key={g.label}>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">{g.label}</h3>
              <ul className="space-y-1.5">
                {samsungModels.filter((m) => g.series.includes(m.series)).sort((a, b) => b.year - a.year).map((m) => (
                  <li key={m.slug}>
                    <Link href={`/${m.slug}/${SAMSUNG_MB_SERVICE}`} className="text-sm text-blue-700 hover:underline">{m.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
