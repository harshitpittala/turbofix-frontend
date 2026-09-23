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

const ALL_SERVICES: { name: string; time: string; icon: string; href?: string }[] = [
  { name: "Screen Replacement",       time: "30–45 min", icon: "📱", href: "/screen-replacement-hyderabad" },
  { name: "Battery Replacement",      time: "20–30 min", icon: "🔋", href: "/battery-replacement-hyderabad" },
  { name: "Charging Port Service",    time: "25–35 min", icon: "🔌", href: "/charging-port-service-hyderabad" },
  { name: "Water Damage Service",     time: "2–4 hrs",   icon: "💧", href: "/water-damage-hyderabad" },
  { name: "Camera Service",           time: "40–60 min", icon: "📷", href: "/camera-service-hyderabad" },
  { name: "Speaker & Mic Service",    time: "25–35 min", icon: "🔊", href: "/speaker-service-hyderabad" },
  { name: "Back Glass Replacement",   time: "40–60 min", icon: "🪟", href: "/back-panel-replacement-hyderabad" },
  { name: "Startup & Performance Service", time: "1–2 hrs",   icon: "💾" },
  { name: "Motherboard Service",      time: "1–3 days",  icon: "🔧", href: "/motherboard-service-hyderabad" },
];

const BRANDS = [
  { name: "Apple iPhone", href: "/iphone-service-hyderabad" },
  { name: "Samsung Galaxy", href: "/samsung-service-hyderabad" },
  { name: "OnePlus", href: "/oneplus-service-hyderabad" },
  { name: "Xiaomi / Redmi", href: "/xiaomi-service-hyderabad" },
  { name: "Vivo", href: "/vivo-service-hyderabad" },
  { name: "Oppo", href: "/oppo-service-hyderabad" },
  { name: "Realme", href: "/realme-service-hyderabad" },
  { name: "Motorola", href: "/motorola-service-hyderabad" },
  { name: "Google Pixel", href: "/google-pixel-service-hyderabad" },
  { name: "Nothing", href: "/brands/nothing" },
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
  tech:        { label: "IT / Tech Hub",     color: "#2563EB" },
  premium:     { label: "Premium Area",      color: "#1D4ED8" },
  residential: { label: "Residential Area",  color: "#3B82F6" },
  commercial:  { label: "Commercial Hub",    color: "#1E40AF" },
  heritage:    { label: "Heritage Area",     color: "#0EA5E9" },
  outskirts:   { label: "Growth Zone",       color: "#0284C7" },
  student:     { label: "Education Hub",     color: "#60A5FA" },
  mixed:       { label: "Mixed Area",        color: "#0369A1" },
};

interface Props {
  area: LocationData;
  faqs: { q: string; a: string }[];
  /** Micro-localities folded into this page (their old URLs 301 here). */
  coveredAreas?: LocationData[];
  /** Nearby standalone area pages, already resolved past merged slugs. */
  nearbyAreas?: LocationData[];
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ delay: index * 0.05 }}
      className="overflow-hidden rounded-xl bg-white"
      style={{ border: "1px solid #E2E8F0" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-medium text-slate-700">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
            <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LocationPageClient({ area, faqs, coveredAreas = [], nearbyAreas = [] }: Props) {
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
        <div className="absolute inset-0 bg-white" />

        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            {/* Breadcrumb */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-8 text-sm text-slate-500">
              <Link href="/locations" className="hover:text-blue-700 transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                All Hyderabad Areas
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/locations/zones/${area.zone}`} className="hover:text-blue-700 transition-colors">
                {zoneLabel}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-500">{area.name}</span>
            </motion.div>

            {/* Badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-5">
              <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: `${typeTag.color}15`, color: typeTag.color, border: `1px solid ${typeTag.color}30` }}>
                <MapPin className="w-3 h-3" />
                {typeTag.label}
              </span>
              <Link href={`/locations/zones/${area.zone}`} className="text-xs text-slate-500 hover:text-blue-700 px-3 py-1.5 rounded-full"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                {zoneLabel}
              </Link>
              {area.pincode && (
                <span className="text-xs text-slate-500 px-3 py-1.5 rounded-full"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                  PIN {area.pincode}
                </span>
              )}
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl text-slate-900">
              Mobile Service in{" "}
              <span className="gradient-text">{area.name}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mb-4">
              {area.intro}
            </motion.p>
            <motion.p variants={fadeInUp} className="text-slate-500 text-base leading-relaxed max-w-3xl mb-10">
              {area.context}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link
                href="/book-a-visit"
                className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white"
              >
                <Zap className="w-4 h-4" fill="white" />
                Book in {area.name}
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

      {/* ── TRUST STRIP ───────────────────────────────────────────────── */}
      <section className="relative py-6 overflow-hidden border-y border-slate-200">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center md:justify-between gap-6 text-sm text-slate-500">
            {[
              { icon: <Clock className="w-4 h-4 text-blue-600" />, text: "Same-day service in most slots" },
              { icon: <Shield className="w-4 h-4 text-emerald-700" />, text: "6-month service warranty" },
              { icon: <Star className="w-4 h-4 text-amber-500" />, text: "4.9★ from 1,000+ customers" },
              { icon: <CheckCircle className="w-4 h-4 text-blue-600" />, text: "OEM-grade parts, trained technicians" },
              { icon: <Wrench className="w-4 h-4 text-blue-600" />, text: "Pay after service — zero upfront" },
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
      <section className="relative py-12 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeInUp} className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-mono">
              Major landmarks we cover in {area.name}
            </motion.p>
            <div className="flex flex-wrap gap-3">
              {area.landmarks.map((lm) => (
                <motion.div
                  key={lm}
                  variants={fadeInUp}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-700"
                  style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.15)" }}
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-700" />
                  {lm}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AREAS WE COVER (incl. merged micro-localities) ─────────────── */}
      {coveredAreas.length > 0 && (
        <section className="relative py-14 overflow-hidden border-t border-slate-100">
          <div className="absolute inset-0 bg-white" />
          <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Areas We Cover in and around {area.name}
            </h2>
            <p className="text-slate-500 mb-8 max-w-3xl">
              TurboFix technicians visit homes and offices across {area.name}
              {area.pincode ? ` (${area.pincode})` : ""} and these neighbourhoods served from the same route:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coveredAreas.map((c) => (
                <li
                  key={c.slug}
                  className="p-5 rounded-2xl"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
                >
                  <h3 className="text-slate-900 font-semibold flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-blue-700" />
                    {c.name}
                    {c.pincode && <span className="text-xs font-mono text-slate-500">PIN {c.pincode}</span>}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.intro}</p>
                  {c.landmarks.length > 0 && (
                    <p className="text-xs text-slate-500 mt-2">Near: {c.landmarks.slice(0, 3).join(" · ")}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── POPULAR SERVICES IN THIS AREA ─────────────────────────────── */}
      <section className="relative py-14 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                Most Requested Services in{" "}
                <span className="gradient-text">{area.name}</span>
              </h2>
              <p className="text-slate-500">Top services booked by customers in this area</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {popularServiceDetails.map((svc, i) => (
                <motion.div
                  key={svc.name}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 p-5 rounded-2xl"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
                >
                  <span className="text-3xl">{svc.icon}</span>
                  <div>
                    <div className="text-slate-900 font-medium mb-1">
                      {svc.href ? (
                        <Link href={svc.href} className="hover:text-blue-700 transition-colors">
                          {svc.name} in {area.name}
                        </Link>
                      ) : (
                        svc.name
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
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
                className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-700 transition-colors"
              >
                View all services
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ALL SERVICES TABLE ─────────────────────────────────────────── */}
      <section className="relative py-14 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              All Services Available in {area.name}
            </motion.h2>

            <div className="overflow-hidden rounded-2xl bg-white" style={{ border: "1px solid #E2E8F0" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#F8FAFC" }}>
                    <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                    <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Time Needed</th>
                    <th className="px-5 py-3.5"></th>
                  </tr>
                </thead>
                <tbody>
                  {ALL_SERVICES.map((svc, i) => (
                    <tr
                      key={svc.name}
                      className="transition-colors hover:bg-slate-50"
                      style={{ borderTop: i > 0 ? "1px solid #F1F5F9" : undefined }}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{svc.icon}</span>
                          <span className="text-sm text-slate-700 font-medium">{svc.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {svc.time}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href="/book-a-visit"
                          className="text-xs text-blue-700 hover:text-blue-700 transition-colors font-medium"
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
      <section className="relative py-14 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              All Brands Serviced in{" "}
              <span className="gradient-text">{area.name}</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-sm mb-8">
              We service every major smartphone brand at your doorstep
            </motion.p>

            <div className="flex flex-wrap gap-3">
              {BRANDS.map((brand, i) => (
                <motion.div key={brand.name} variants={fadeInUp} transition={{ delay: i * 0.04 }}>
                  <Link
                    href={brand.href}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-700 hover:text-slate-900 hover:border-blue-600/30 transition-all group"
                    style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
                  >
                    {brand.name}
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-blue-700 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="relative py-14 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">
              How Doorstep Service Works in{" "}
              <span className="gradient-text">{area.name}</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Book Online",       desc: `Select your service, choose a time slot, and enter your ${area.name} address.` },
                { step: "02", title: "Technician Arrives", desc: `A trained TurboFix technician arrives at your door in ${area.name} at the chosen time.` },
                { step: "03", title: "Service Done",       desc: "Most visits complete in 20–45 minutes at your home or office. No travel needed." },
                { step: "04", title: "Pay & Warranty",    desc: "Pay only after the service. Receive your 6-month warranty documentation." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.08 }}
                  className="relative p-6 rounded-2xl"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
                >
                  <div className="text-5xl font-display font-bold text-slate-100 absolute top-4 right-4 leading-none select-none">
                    {item.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#059669] flex items-center justify-center mb-4 text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="text-slate-900 font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="relative py-14 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              FAQs — Service in{" "}
              <span className="gradient-text">{area.name}</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-sm mb-8">
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
      {nearbyAreas.length > 0 && (
        <section className="relative py-12 overflow-hidden border-t border-slate-100">
          <div className="absolute inset-0 bg-white" />
          <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h3 variants={fadeInUp} className="text-slate-900 font-semibold mb-5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-700" />
                We also service areas near {area.name}
              </motion.h3>
              <div className="flex flex-wrap gap-3">
                {nearbyAreas.map((nb, i) => {
                  const label = nb.name;
                  return (
                    <motion.div key={nb.slug} variants={fadeInUp} transition={{ delay: i * 0.06 }}>
                      <Link
                        href={`/locations/${nb.slug}`}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:text-blue-700 hover:border-blue-600/30 transition-all"
                        style={{ background: "rgba(37,99,235,0.04)", border: "1px solid rgba(37,99,235,0.15)" }}
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
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-900 transition-all"
                    style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
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
