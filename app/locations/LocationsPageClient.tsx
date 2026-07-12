"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Zap, ChevronRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import { locationData } from "@/data/locations";
import CTA from "@/components/home/CTA";

const zones = [
  { key: "central",   label: "Central Hyderabad",    color: "#00AAFF", desc: "Banjara Hills, Jubilee Hills, Ameerpet, Abids & more" },
  { key: "west",      label: "West / HITEC Corridor", color: "#7C3AED", desc: "HITEC City, Madhapur, Gachibowli, Kukatpally & more" },
  { key: "north",     label: "North Hyderabad",       color: "#22C55E", desc: "Secunderabad, Kompally, ECIL, Alwal & more" },
  { key: "south",     label: "South / Old City",      color: "#F59E0B", desc: "Charminar, Mehdipatnam, Falaknuma, Malakpet & more" },
  { key: "east",      label: "East Hyderabad",        color: "#EC4899", desc: "Dilsukhnagar, LB Nagar, Uppal, Nagole & more" },
  { key: "outskirts", label: "Outskirts & Growth",    color: "#06B6D4", desc: "Shamshabad, Medchal, Ghatkesar, Adibatla & more" },
] as const;

const typeEmoji: Record<string, string> = {
  tech:        "💻",
  premium:     "⭐",
  residential: "🏠",
  commercial:  "🏢",
  heritage:    "🕌",
  outskirts:   "🌿",
  student:     "🎓",
  mixed:       "🌆",
};

export default function LocationsPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />

        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="w-4 h-4 text-[#00AAFF]" />
              <span className="section-label">All Hyderabad Areas</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-6">
              Mobile Service{" "}
              <span className="gradient-text">Everywhere</span>
              <br />in Hyderabad
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-gray-400 text-xl leading-relaxed mb-10">
              TurboFix doorstep service now covers{" "}
              <span className="text-white font-semibold">80+ Hyderabad localities</span> — from HITEC
              City to Charminar, from Kompally to Shamshabad. Book online and a trained
              technician arrives at your door.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/book-a-visit"
                className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white"
              >
                <Zap className="w-4 h-4" fill="white" />
                Book a Doorstep Visit
              </Link>
              <a
                href="tel:+918639605147"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-gray-300"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                Call +91 86396 05147
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative py-8 overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { label: "Areas Covered",       value: "80+" },
              { label: "Same-Day Service",     value: "Most Areas" },
              { label: "Service Warranty",     value: "6 Months" },
              { label: "Zero Travel Charge",   value: "All Zones" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-white font-display mb-1">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone sections */}
      {zones.map((zone) => {
        const areas = locationData.filter((a) => a.zone === zone.key);
        return (
          <section key={zone.key} className="relative py-14 overflow-hidden">
            <div className="absolute inset-0 bg-[#02040F]" />
            <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {/* Zone header */}
                <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
                  <span
                    className="w-1.5 h-10 rounded-full shrink-0"
                    style={{ background: zone.color }}
                  />
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                      {zone.label}
                    </h2>
                    <p className="text-gray-500 text-sm mt-0.5">{zone.desc}</p>
                  </div>
                  <span
                    className="ml-auto text-xs font-medium px-3 py-1 rounded-full shrink-0"
                    style={{
                      background: `${zone.color}15`,
                      color: zone.color,
                      border: `1px solid ${zone.color}30`,
                    }}
                  >
                    {areas.length} areas
                  </span>
                </motion.div>

                {/* Area cards grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {areas.map((area, i) => (
                    <motion.div
                      key={area.slug}
                      variants={fadeInUp}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link
                        href={`/locations/${area.slug}`}
                        className="group flex items-start gap-2 p-3.5 rounded-xl transition-all duration-200 h-full"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${zone.color}0d`;
                          (e.currentTarget as HTMLElement).style.borderColor = `${zone.color}30`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                        }}
                      >
                        <span className="text-base leading-none mt-0.5 shrink-0">
                          {typeEmoji[area.type]}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors leading-snug truncate">
                            {area.name}
                          </div>
                          {area.pincode && (
                            <div className="text-xs text-gray-600 mt-0.5">{area.pincode}</div>
                          )}
                        </div>
                        <ChevronRight
                          className="w-3 h-3 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: zone.color }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* Why TurboFix everywhere */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
              Same Quality,{" "}
              <span className="gradient-text">Every Corner</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
              Whether you're in a HITEC City apartment, an old-city lane near Charminar, or a
              villa on the ORR — TurboFix brings the same service quality to your door.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🔧",
                title: "Trained Technicians",
                desc: "Background-verified, brand-trained technicians for all Android and iOS devices.",
              },
              {
                icon: "✅",
                title: "OEM-Grade Parts",
                desc: "Original quality components used on every job — regardless of your area.",
              },
              {
                icon: "🛡️",
                title: "6-Month Warranty",
                desc: "Every service visit comes with a 6-month warranty on parts and workmanship.",
              },
              {
                icon: "💳",
                title: "Pay After Service",
                desc: "No upfront payment. Confirmed quote before work begins. Pay only when you're satisfied.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="p-6 rounded-2xl text-center"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                {item.title === "6-Month Warranty" && (
                  <Link href="/terms" className="inline-block text-xs text-[#00AAFF] underline underline-offset-2 mt-2">
                    View full terms
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
