"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MapPin, Zap, Clock, Shield, Star, ChevronRight,
  ChevronDown, Phone, Wrench, CheckCircle,
} from "lucide-react";
import CTA from "@/components/home/CTA";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import type { LocationData } from "@/data/locations";

const ALL_SERVICES = [
  { name: "Screen Replacement",       time: "30–45 min", icon: "📱" },
  { name: "Battery Replacement",      time: "20–30 min", icon: "🔋" },
  { name: "Charging Port Repair",     time: "25–35 min", icon: "🔌" },
  { name: "Water Damage Recovery",    time: "2–4 hrs",   icon: "💧" },
  { name: "Camera Repair",            time: "40–60 min", icon: "📷" },
  { name: "Speaker & Mic Repair",     time: "25–35 min", icon: "🔊" },
  { name: "Back Glass Replacement",   time: "40–60 min", icon: "🪟" },
  { name: "Software & Data Recovery", time: "1–2 hrs",   icon: "💾" },
  { name: "Motherboard Repair",       time: "1–3 days",  icon: "🔧" },
];

const BRANDS = [
  { name: "Apple iPhone", href: "/repairs/apple" },
  { name: "Samsung Galaxy", href: "/repairs/samsung" },
  { name: "OnePlus", href: "/repairs/oneplus" },
  { name: "Xiaomi / Redmi", href: "/repairs/xiaomi" },
  { name: "Vivo", href: "/repairs/vivo" },
  { name: "Oppo", href: "/repairs/oppo" },
  { name: "Realme", href: "/repairs/realme" },
  { name: "Motorola", href: "/repairs/motorola" },
  { name: "Google Pixel", href: "/repairs/google-pixel" },
  { name: "Nothing", href: "/repairs/nothing" },
];

const zoneLabelMap: Record<string, string> = {
  central:   "Central Hyderabad",
  west:      "West / HITEC Corridor",
  north:     "North Hyderabad",
  south:     "South / Old City",
  east:      "East Hyderabad",
  outskirts: "Outskirts & Growth Areas",
};

const typeTagMap: Record<string, { label: string; color: string }> = {
  tech:        { label: "IT / Tech Hub",     color: "#7C3AED" },
  premium:     { label: "Premium Area",      color: "#F59E0B" },
  residential: { label: "Residential Area",  color: "#22C55E" },
  commercial:  { label: "Commercial Hub",    color: "#00AAFF" },
  heritage:    { label: "Heritage Area",     color: "#EC4899" },
  outskirts:   { label: "Growth Zone",       color: "#06B6D4" },
  student:     { label: "Education Hub",     color: "#8B5CF6" },
  mixed:       { label: "Mixed Area",        color: "#10B981" },
};

interface Props {
  area: LocationData;
  faqs: { q: string; a: string }[];
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ delay: index * 0.05 }}
      className="overflow-hidden rounded-xl"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-medium text-gray-200">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LocationPageClient({ area, faqs }: Props) {
  const typeTag = typeTagMap[area.type];
  const zoneLabel = zoneLabelMap[area.zone];

  // Only show popular services with times from ALL_SERVICES
  const popularServiceDetails = area.popularServices
    .map((name) => ALL_SERVICES.find((s) => s.name === name))
    .filter(Boolean) as typeof ALL_SERVICES;

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />

        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            {/* Breadcrumb */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-8 text-sm text-gray-500">
              <Link href="/locations" className="hover:text-[#00AAFF] transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                All Hyderabad Areas
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-400">{area.name}</span>
            </motion.div>

            {/* Badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-5">
              <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: `${typeTag.color}15`, color: typeTag.color, border: `1px solid ${typeTag.color}30` }}>
                <MapPin className="w-3 h-3" />
                {typeTag.label}
              </span>
              <span className="text-xs text-gray-600 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {zoneLabel}
              </span>
              {area.pincode && (
                <span className="text-xs text-gray-600 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  PIN {area.pincode}
                </span>
              )}
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
              Mobile Repair in{" "}
              <span className="gradient-text">{area.name}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-4">
              {area.intro}
            </motion.p>
            <motion.p variants={fadeInUp} className="text-gray-500 text-base leading-relaxed max-w-3xl mb-10">
              {area.context}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link
                href="/book-repair"
                className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white"
              >
                <Zap className="w-4 h-4" fill="white" />
                Book in {area.name}
              </Link>
              <a
                href="tel:+918639605147"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-gray-300"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Phone className="w-4 h-4 text-[#00AAFF]" />
                +91 86396 05147
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST STRIP ───────────────────────────────────────────────── */}
      <section className="relative py-6 overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center md:justify-between gap-6 text-sm text-gray-400">
            {[
              { icon: <Clock className="w-4 h-4 text-[#00AAFF]" />, text: "Same-day repair in most slots" },
              { icon: <Shield className="w-4 h-4 text-[#22C55E]" />, text: "6-month repair warranty" },
              { icon: <Star className="w-4 h-4 text-[#F59E0B]" />, text: "4.9★ from 2,400+ customers" },
              { icon: <CheckCircle className="w-4 h-4 text-[#7C3AED]" />, text: "OEM-grade parts, certified tech" },
              { icon: <Wrench className="w-4 h-4 text-[#EC4899]" />, text: "Pay after repair — zero upfront" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                {icon}
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANDMARKS ─────────────────────────────────────────────────── */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeInUp} className="text-xs text-gray-600 uppercase tracking-widest mb-4 font-mono">
              Major landmarks we cover in {area.name}
            </motion.p>
            <div className="flex flex-wrap gap-3">
              {area.landmarks.map((lm) => (
                <motion.div
                  key={lm}
                  variants={fadeInUp}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-300"
                  style={{ background: "rgba(0,170,255,0.06)", border: "1px solid rgba(0,170,255,0.15)" }}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#00AAFF]" />
                  {lm}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── POPULAR SERVICES IN THIS AREA ─────────────────────────────── */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                Most Requested Repairs in{" "}
                <span className="gradient-text">{area.name}</span>
              </h2>
              <p className="text-gray-500">Top repair services booked by customers in this area</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {popularServiceDetails.map((svc, i) => (
                <motion.div
                  key={svc.name}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 p-5 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span className="text-3xl">{svc.icon}</span>
                  <div>
                    <div className="text-white font-medium mb-1">{svc.name}</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {svc.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* All services link */}
            <motion.div variants={fadeInUp}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm text-[#00AAFF] hover:text-white transition-colors"
              >
                View all repair services
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ALL SERVICES TABLE ─────────────────────────────────────────── */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
              All Repairs Available in {area.name}
            </motion.h2>

            <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                    <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Repair Time</th>
                    <th className="px-5 py-3.5"></th>
                  </tr>
                </thead>
                <tbody>
                  {ALL_SERVICES.map((svc, i) => (
                    <tr
                      key={svc.name}
                      className="transition-colors hover:bg-white/5"
                      style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : undefined }}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{svc.icon}</span>
                          <span className="text-sm text-gray-200 font-medium">{svc.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {svc.time}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href="/book-repair"
                          className="text-xs text-[#00AAFF] hover:text-white transition-colors font-medium"
                        >
                          Book →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BRANDS ────────────────────────────────────────────────────── */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              All Brands Repaired in{" "}
              <span className="gradient-text">{area.name}</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 text-sm mb-8">
              We repair every major smartphone brand at your doorstep
            </motion.p>

            <div className="flex flex-wrap gap-3">
              {BRANDS.map((brand, i) => (
                <motion.div key={brand.name} variants={fadeInUp} transition={{ delay: i * 0.04 }}>
                  <Link
                    href={brand.href}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:border-[#00AAFF]/30 transition-all group"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {brand.name}
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#00AAFF] transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-white mb-10 text-center">
              How Doorstep Repair Works in{" "}
              <span className="gradient-text">{area.name}</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Book Online",       desc: `Select your repair, choose a time slot, and enter your ${area.name} address.` },
                { step: "02", title: "Technician Arrives", desc: `A certified TurboFix technician arrives at your door in ${area.name} at the chosen time.` },
                { step: "03", title: "Repair Done",       desc: "Most repairs complete in 20–45 minutes at your home or office. No travel needed." },
                { step: "04", title: "Pay & Warranty",    desc: "Pay only after the repair. Receive your 6-month warranty documentation." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.08 }}
                  className="relative p-6 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-5xl font-display font-bold text-white/5 absolute top-4 right-4 leading-none select-none">
                    {item.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00AAFF] flex items-center justify-center mb-4 text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              FAQs — Repair in{" "}
              <span className="gradient-text">{area.name}</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 text-sm mb-8">
              Common questions from customers in {area.name} and nearby areas
            </motion.p>

            <div className="max-w-3xl space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NEARBY AREAS ──────────────────────────────────────────────── */}
      {area.nearbyAreas.length > 0 && (
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-[#02040F]" />
          <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h3 variants={fadeInUp} className="text-white font-semibold mb-5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00AAFF]" />
                We also repair in areas near {area.name}
              </motion.h3>
              <div className="flex flex-wrap gap-3">
                {area.nearbyAreas.map((slug, i) => {
                  const label = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                  return (
                    <motion.div key={slug} variants={fadeInUp} transition={{ delay: i * 0.06 }}>
                      <Link
                        href={`/locations/${slug}`}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-[#00AAFF] hover:border-[#00AAFF]/30 transition-all"
                        style={{ background: "rgba(0,170,255,0.04)", border: "1px solid rgba(0,170,255,0.12)" }}
                      >
                        <MapPin className="w-3 h-3" />
                        {label}
                        <ChevronRight className="w-3 h-3 opacity-50" />
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div variants={fadeInUp}>
                  <Link
                    href="/locations"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white transition-all"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    View all areas →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
