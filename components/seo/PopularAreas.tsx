import Link from "next/link";
import { MapPin } from "lucide-react";
import type { AreaLink } from "@/lib/priorityAreas";

interface Props {
  /** What the visitor needs, e.g. "Screen Replacement" or "Samsung Service". */
  label: string;
  areas: AreaLink[];
}

export default function PopularAreas({ label, areas }: Props) {
  if (areas.length === 0) return null;
  return (
    <section className="relative py-12 overflow-hidden border-t border-slate-100">
      <div className="absolute inset-0 bg-white" />
      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          {label} across Hyderabad
        </h2>
        <p className="text-slate-500 mb-6">
          Doorstep visits in every part of the city. Popular areas:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/locations/${a.slug}`}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 transition-colors py-1"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                {label} in {a.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/locations" className="inline-block mt-6 text-sm text-blue-700 hover:text-blue-800">
          See all Hyderabad areas we cover →
        </Link>
      </div>
    </section>
  );
}
