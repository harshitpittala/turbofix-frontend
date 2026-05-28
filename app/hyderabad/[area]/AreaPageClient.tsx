"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, ArrowRight, Clock, Zap } from "lucide-react";
import CTA from "@/components/home/CTA";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import type { AreaData } from "@/data/areas";

const services = [
  { name: "Screen Replacement", time: "30–45 min" },
  { name: "Battery Replacement", time: "20 min" },
  { name: "Charging Port Repair", time: "30 min" },
  { name: "Water Damage Recovery", time: "2–4 hrs" },
  { name: "Camera Repair", time: "45 min" },
  { name: "Speaker & Mic Repair", time: "25 min" },
  { name: "Back Glass Replacement", time: "45 min" },
  { name: "Software & Data Recovery", time: "1–2 hrs" },
  { name: "Motherboard Repair", time: "1–3 days" },
];

const brands = [
  "Apple iPhone", "Samsung Galaxy", "OnePlus", "Xiaomi / Redmi",
  "Vivo", "Oppo", "Realme", "Motorola", "Google Pixel", "Nothing",
];

interface Props {
  area: AreaData;
}

export default function AreaPageClient({ area }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp}>
              <Link href="/hyderabad" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#00AAFF] transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                All Hyderabad Areas
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[#00AAFF]" />
              <span className="section-label">{area.fullName}</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-6">
              Mobile Repair in{" "}
              <span className="gradient-text">{area.name}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-gray-400 text-xl leading-relaxed max-w-3xl mb-10">
              {area.description}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link href="/book-repair" className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white">
                <Zap className="w-4 h-4" fill="white" />
                Book in {area.name}
              </Link>
              <a href="tel:+918639605147" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-gray-300"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                Call +91 86396 05147
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Landmarks */}
      <section className="relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-gray-500 text-sm mb-3">Major landmarks we cover:</p>
          <div className="flex flex-wrap gap-2">
            {area.landmarks.map((l) => (
              <span key={l} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl text-gray-300"
                style={{ background: "rgba(0,170,255,0.06)", border: "1px solid rgba(0,170,255,0.12)" }}>
                <MapPin className="w-3 h-3 text-[#00AAFF]" />
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold mb-8">
            Repair Services in <span className="gradient-text">{area.name}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc, i) => (
              <motion.div
                key={svc.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.06 }}
                className="flex items-center justify-between rounded-xl px-5 py-4"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-gray-300 text-sm font-medium">{svc.name}</span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {svc.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold mb-6 text-center">
            All Brands Repaired in {area.name}
          </h2>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {brands.map((brand) => (
              <span key={brand} className="text-sm px-3.5 py-1.5 rounded-xl text-gray-400"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {brand}
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <Link href="/repairs" className="flex items-center gap-2 text-sm text-[#00AAFF] hover:gap-3 transition-all">
              Browse by brand <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/services" className="flex items-center gap-2 text-sm text-[#00AAFF] hover:gap-3 transition-all">
              All services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
