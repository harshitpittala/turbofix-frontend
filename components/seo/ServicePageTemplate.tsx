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
import type { ServicePageData } from "@/data/servicePages";

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeInUp} transition={{ delay: i * 0.05 }}
      className="overflow-hidden rounded-xl bg-white" style={{ border: "1px solid #E2E8F0" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors">
        <span className="text-sm font-medium text-slate-700">{q}</span>
        <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface Props { svc: ServicePageData }

export default function ServicePageTemplate({ svc }: Props) {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-8 text-sm text-slate-500">
              <Link href="/services" className="hover:text-blue-700 flex items-center gap-1.5 transition-colors">
                <ArrowLeft className="w-4 h-4" /> All Services
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-500">{svc.name}</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5"
              style={{ background: "rgba(37,99,235,0.08)", color: "#1D4ED8", border: "1px solid rgba(37,99,235,0.25)" }}>
              <MapPin className="w-3 h-3" /> Hyderabad · Doorstep Service
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl text-slate-900">
              {svc.h1}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-blue-700 font-medium text-lg mb-6">{svc.tagline}</motion.p>
            <motion.p variants={fadeInUp} className="text-slate-600 text-lg leading-relaxed max-w-3xl mb-10">{svc.intro}</motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link href="/book-a-visit" className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white">
                <Zap className="w-4 h-4" fill="white" /> Book {svc.name}
              </Link>
              <a href="tel:+918639605147" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-slate-700"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                <Phone className="w-4 h-4 text-blue-700" /> +91 86396 05147
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="relative py-6 border-y border-slate-200">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center md:justify-between gap-6 text-sm text-slate-500">
            {[
              { icon: <Clock className="w-4 h-4 text-blue-600" />, text: svc.repairTime },
              { icon: <Shield className="w-4 h-4 text-emerald-700" />, text: svc.warranty },
              { icon: <Star className="w-4 h-4 text-amber-500" />, text: "4.9★ · 1,000+ jobs done" },
              { icon: <CheckCircle className="w-4 h-4 text-blue-600" />, text: svc.priceRange },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">{icon}<span>{text}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY YOU NEED THIS ── */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Signs You Need <span className="gradient-text">{svc.name}</span>
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-slate-600 text-base leading-relaxed mb-6">{svc.whyNeeded}</motion.p>
                <motion.ul variants={staggerContainer} className="space-y-3">
                  {svc.symptoms.map((s, i) => (
                    <motion.li key={i} variants={fadeInUp} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      {s}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <div className="p-6 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                <h3 className="text-slate-900 font-semibold mb-4 text-lg">Quick Summary</h3>
                {[
                  { label: "Time Needed",  value: svc.repairTime },
                  { label: "Price Range",  value: svc.priceRange },
                  { label: "Warranty",     value: svc.warranty },
                  { label: "Service Type", value: "Doorstep (we come to you)" },
                  { label: "Payment",      value: "Pay after service · UPI / Card / Cash" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4 py-2.5 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-500">{label}</span>
                    <span className="text-sm text-slate-900 font-medium text-right">{value}</span>
                  </div>
                ))}
                <Link href="/book-a-visit" className="btn-neon w-full flex items-center justify-center gap-2 mt-5 py-3 rounded-xl font-semibold text-white text-sm">
                  <Zap className="w-4 h-4" fill="white" /> Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative py-14 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">
              How We Do <span className="gradient-text">{svc.name}</span>
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {svc.process.map((p, i) => (
                <motion.div key={p.step} variants={fadeInUp} transition={{ delay: i * 0.08 }}
                  className="relative p-6 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                  <div className="text-5xl font-display font-bold text-slate-100 absolute top-4 right-4 leading-none select-none">{p.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center mb-4 text-white font-bold text-sm">{p.step}</div>
                  <h3 className="text-slate-900 font-semibold mb-2">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BRANDS COVERED ── */}
      <section className="relative py-12 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-slate-900 mb-2">
              All Brands Covered for <span className="gradient-text">{svc.name}</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-sm mb-6">We carry parts for all major brands in Hyderabad</motion.p>
            <div className="flex flex-wrap gap-3">
              {svc.affectedBrands.map((b, i) => (
                <motion.div key={b} variants={fadeInUp} transition={{ delay: i * 0.04 }}
                  className="px-4 py-2 rounded-xl text-sm text-slate-700"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                  {b}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-14 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              FAQs — <span className="gradient-text">{svc.name}</span> in Hyderabad
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-sm mb-8">Common questions about {svc.name.toLowerCase()} service</motion.p>
            <div className="max-w-3xl space-y-3">
              {svc.faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} i={i} />)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="relative py-12 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h3 variants={fadeInUp} className="text-slate-900 font-semibold mb-5">Related Services</motion.h3>
            <div className="flex flex-wrap gap-3">
              {svc.relatedServiceSlugs.map((slug) => {
                const label = slug.replace(/-hyderabad$/, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                return (
                  <motion.div key={slug} variants={fadeInUp}>
                    <Link href={`/${slug}`} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:text-blue-700 transition-all"
                      style={{ background: "rgba(37,99,235,0.04)", border: "1px solid rgba(37,99,235,0.15)" }}>
                      {label} <ChevronRight className="w-3 h-3" />
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div variants={fadeInUp}>
                <Link href="/services" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-900 transition-all"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                  All Services →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  );
}
