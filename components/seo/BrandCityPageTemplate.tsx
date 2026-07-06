"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Clock, Shield, Star, CheckCircle,
  Zap, ChevronDown, ChevronRight, Phone, MapPin,
} from "lucide-react";
import CTA from "@/components/home/CTA";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import type { BrandCityPageData } from "@/data/brandCityPages";

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeInUp} transition={{ delay: i * 0.05 }}
      className="overflow-hidden rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-white/5 transition-colors">
        <span className="text-sm font-medium text-gray-200">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface Props { page: BrandCityPageData }

export default function BrandCityPageTemplate({ page }: Props) {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-8 text-sm text-gray-500">
              <Link href="/repairs" className="hover:text-[#00AAFF] flex items-center gap-1.5 transition-colors">
                <ArrowLeft className="w-4 h-4" /> All Brands
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-400">{page.brand} Repair</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl font-bold shrink-0"
                style={{ background: `${page.color}25`, border: `1px solid ${page.color}40` }}>
                {page.brand.charAt(0)}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(0,170,255,0.08)", color: "#00AAFF", border: "1px solid rgba(0,170,255,0.2)" }}>
                <MapPin className="w-3 h-3" /> Hyderabad · All Areas Covered
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">
              {page.h1}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg mb-6" style={{ color: page.color }}>{page.tagline}</motion.p>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-6">{page.intro}</motion.p>
            <motion.p variants={fadeInUp} className="text-gray-500 text-base leading-relaxed max-w-3xl mb-10">{page.whyHyderabad}</motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link href="/book-repair" className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white">
                <Zap className="w-4 h-4" fill="white" /> Book {page.brand} Repair
              </Link>
              <a href="tel:+918639605147" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-gray-300"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Phone className="w-4 h-4 text-[#00AAFF]" /> +91 86396 05147
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── INDEPENDENCE DISCLOSURE ── */}
      <section className="relative py-4 border-y border-white/5">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs text-gray-500 leading-relaxed">
            TurboFix is an independent repair service and is not affiliated with, authorized, sponsored, or endorsed by{" "}
            {page.brand}. {page.brand} and related trademarks are the property of their respective owners.
          </p>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="relative py-6 border-y border-white/5">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center md:justify-between gap-6 text-sm text-gray-400">
            {[
              { icon: <Clock className="w-4 h-4 text-[#00AAFF]" />, text: "Same-day repair in most slots" },
              { icon: <Shield className="w-4 h-4 text-[#22C55E]" />, text: "6-month repair warranty" },
              { icon: <Star className="w-4 h-4 text-[#F59E0B]" />, text: `4.9★ · ${page.brand} repair experts` },
              { icon: <CheckCircle className="w-4 h-4 text-[#7C3AED]" />, text: "OEM-grade parts, pay after repair" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">{icon}<span>{text}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP REPAIRS ── */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              {page.brand} Repairs in{" "}
              <span className="gradient-text">Hyderabad</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 text-sm mb-8">Most common {page.brand} repairs done at your doorstep</motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {page.topRepairs.map((r, i) => (
                <motion.div key={r.name} variants={fadeInUp} transition={{ delay: i * 0.07 }}
                  className="p-5 rounded-2xl flex flex-col gap-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <h3 className="text-white font-semibold text-sm">{r.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1">{r.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium" style={{ color: page.color }}>{r.price}</span>
                    <Link href="/book-repair" className="text-xs text-[#00AAFF] hover:text-white transition-colors">Book →</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MODELS ── */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-white mb-6">
              {page.brand} Models We Repair
            </motion.h2>
            <div className="flex flex-wrap gap-3">
              {page.popularModels.map((m, i) => (
                <motion.div key={m} variants={fadeInUp} transition={{ delay: i * 0.04 }}
                  className="px-4 py-2 rounded-xl text-sm text-gray-300"
                  style={{ background: `${page.color}10`, border: `1px solid ${page.color}25` }}>
                  {m}
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeInUp} className="text-gray-600 text-xs mt-4">
              Don't see your model? <a href="tel:+918639605147" className="text-[#00AAFF] hover:text-white transition-colors">Call us</a> — we repair most {page.brand} models.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST POINTS ── */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-white mb-6">
              Why Trust TurboFix for <span className="gradient-text">{page.brand}</span> Repair
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.trustPoints.map((p, i) => (
                <motion.div key={i} variants={fadeInUp} transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
                  <CheckCircle className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-300">{p}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
              FAQs — <span className="gradient-text">{page.brand}</span> Repair in Hyderabad
            </motion.h2>
            <div className="max-w-3xl space-y-3">
              {page.faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} i={i} />)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPLORE MORE ── */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h3 variants={fadeInUp} className="text-white font-semibold mb-5">Explore More</motion.h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "All Brand Repairs", href: "/repairs" },
                { label: "Screen Replacement", href: "/screen-replacement-hyderabad" },
                { label: "Battery Replacement", href: "/battery-replacement-hyderabad" },
                { label: "All Areas in Hyderabad", href: "/locations" },
              ].map((l) => (
                <motion.div key={l.href} variants={fadeInUp}>
                  <Link href={l.href} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-[#00AAFF] transition-all"
                    style={{ background: "rgba(0,170,255,0.04)", border: "1px solid rgba(0,170,255,0.12)" }}>
                    {l.label} <ChevronRight className="w-3 h-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  );
}
