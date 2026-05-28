"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Clock, Shield, Zap } from "lucide-react";
import CTA from "@/components/home/CTA";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import { hyderabadAreas } from "@/data/areas";

const services = [
  "Screen Replacement", "Battery Replacement", "Charging Port Repair",
  "Water Damage Recovery", "Camera Repair", "Speaker & Mic Repair",
  "Back Glass Replacement", "Software & Data Recovery", "Motherboard Repair",
];

export default function HyderabadPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">Hyderabad Coverage</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold mb-6">
              Mobile Repair in{" "}
              <span className="gradient-text">Hyderabad</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              TurboFix covers all of Hyderabad with same-day doorstep mobile repair.
              We come to your home, office, or anywhere else — you don't need to go anywhere.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
              <Link href="/book-repair" className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white">
                <Zap className="w-4 h-4" fill="white" />
                Book Doorstep Repair
              </Link>
              <a href="tel:+918639605147" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-gray-300 transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                Call +91 86396 05147
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Doorstep */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Clock, color: "#00AAFF", title: "Same-Day Service", desc: "Book before 2 PM for same-day pickup, repair, and delivery anywhere in Hyderabad." },
              { icon: MapPin, color: "#22C55E", title: "We Cover All of Hyderabad", desc: "From HITEC City to LB Nagar, Gachibowli to Dilsukhnagar — we cover the entire city." },
              { icon: Shield, color: "#A78BFA", title: "6-Month Warranty", desc: "Every repair is backed by our 6-month warranty on parts and workmanship." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-6 text-center"
                style={{ background: `${color}06`, border: `1px solid ${color}15` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${color}15` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label mb-4 inline-flex">Service Coverage</span>
            <h2 className="font-display text-4xl font-bold mt-4">
              Areas We <span className="gradient-text">Serve</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hyderabadAreas.map((area, i) => (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.07 }}
              >
                <Link
                  href={`/hyderabad/${area.slug}`}
                  className="group block rounded-2xl p-6 transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#00AAFF] mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-[#00AAFF] transition-colors mb-1">{area.name}</h3>
                      <p className="text-gray-600 text-xs">{area.pincode}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {area.landmarks.slice(0, 2).map((l) => (
                      <span key={l} className="text-xs text-gray-600">{l}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#00AAFF] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    View {area.name} repairs
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            Not in this list? We likely cover your area — call +91 86396 05147 to confirm.
          </p>
        </div>
      </section>

      {/* Services Available */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-center mb-10">
            All Services Available <span className="gradient-text">Across Hyderabad</span>
          </h2>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {services.map((s) => (
              <Link
                key={s}
                href="/services"
                className="text-sm px-4 py-2 rounded-xl text-gray-300 transition-colors hover:text-white"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
