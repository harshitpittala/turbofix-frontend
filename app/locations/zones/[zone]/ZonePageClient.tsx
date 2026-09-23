"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Zap, ChevronRight, Phone } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import type { LocationData } from "@/data/locations";
import CTA from "@/components/home/CTA";

const typeEmoji: Record<string, string> = {
  tech: "💻",
  premium: "⭐",
  residential: "🏠",
  commercial: "🏢",
  heritage: "🕌",
  outskirts: "🌿",
  student: "🎓",
  mixed: "🌆",
};

interface Props {
  zone: LocationData["zone"];
  label: string;
  description: string;
  areas: LocationData[];
  /** Standalone area pages and the neighbourhoods folded into each. */
  covered?: { parent: LocationData; children: LocationData[] }[];
}

export default function ZonePageClient({ label, description, areas, covered = [] }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-white" />

        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-8 text-sm text-slate-500">
              <Link href="/locations" className="hover:text-blue-700 transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                All Hyderabad Areas
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-500">{label}</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl text-slate-900">
              Doorstep Mobile Service in{" "}
              <span className="gradient-text">{label}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mb-10">
              {description}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link
                href="/book-a-visit"
                className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white"
              >
                <Zap className="w-4 h-4" fill="white" />
                Book a Doorstep Visit
              </Link>
              <a
                href="tel:+918639605147"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-slate-700"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
              >
                <Phone className="w-4 h-4 text-blue-700" />
                +91 86396 05147
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Areas in this zone */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Areas We Service in {label}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-sm mb-8">
              {areas.length} localities covered — tap an area for local landmarks, FAQs and pricing
            </motion.p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {areas.map((area, i) => (
                <motion.div key={area.slug} variants={fadeInUp} transition={{ delay: i * 0.03 }}>
                  <Link
                    href={`/locations/${area.slug}`}
                    className="group flex items-start gap-2 p-3.5 rounded-xl transition-all duration-200 h-full hover:border-blue-600/30"
                    style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
                  >
                    <span className="text-base leading-none mt-0.5 shrink-0">{typeEmoji[area.type]}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors leading-snug truncate">
                        {area.name}
                      </div>
                      {area.pincode && <div className="text-xs text-slate-500 mt-0.5">{area.pincode}</div>}
                    </div>
                    <ChevronRight className="w-3 h-3 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 text-blue-700 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {covered.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
                  Neighbourhoods covered in {label}
                </h2>
                <p className="text-slate-500 text-sm mb-6">
                  Every neighbourhood below gets the same doorstep visit — open the area page for local details.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {covered.map(({ parent, children }) => (
                    <li key={parent.slug} className="p-4 rounded-xl" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                      <Link href={`/locations/${parent.slug}`} className="font-medium text-slate-900 hover:text-blue-700">
                        {parent.name}
                      </Link>
                      <p className="text-sm text-slate-600 mt-1">{children.map((c) => c.name).join(", ")}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <motion.div variants={fadeInUp} className="mt-8">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-700 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                View all Hyderabad zones
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  );
}
