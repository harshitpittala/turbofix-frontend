"use client";

import Link from "next/link";
import Image from "next/image";
import { useId, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, Shield, Star, CheckCircle,
  Zap, ChevronDown, ChevronRight, Phone, MapPin,
} from "lucide-react";
import CTA from "@/components/home/CTA";
import PopularAreas from "@/components/seo/PopularAreas";
import type { AreaLink } from "@/lib/priorityAreas";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import type { BrandCityPageData } from "@/data/brandCityPages";
import { servicePageForJob } from "@/lib/serviceLinks";

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <motion.div variants={fadeInUp} transition={{ delay: i * 0.05 }}
      className="overflow-hidden rounded-xl bg-white" style={{ border: "1px solid #E2E8F0" }}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors">
        <span className="text-sm font-medium text-slate-700">{q}</span>
        <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Always rendered (collapsed when closed) so answers are in the server HTML and match the FAQPage schema. */}
      <motion.div id={panelId} initial={false} aria-hidden={!open} style={{ overflow: "hidden" }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
        <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}

interface Props { page: BrandCityPageData; popularAreas?: AreaLink[] }

export default function BrandCityPageTemplate({ page, popularAreas = [] }: Props) {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-8 text-sm text-slate-500">
              <Link href="/brands" className="hover:text-blue-700 flex items-center gap-1.5 transition-colors">
                <ArrowLeft className="w-4 h-4" /> All Brands
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-500">{page.brand} Service</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                style={{ background: "#FFFFFF", border: `1px solid ${page.color}30` }}>
                <Image
                  src={`/images/brands/${page.brandSlug}.webp`}
                  alt={`${page.brand} logo`}
                  fill
                  className="object-contain p-1.5"
                  unoptimized
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(37,99,235,0.08)", color: "#1D4ED8", border: "1px solid rgba(37,99,235,0.25)" }}>
                <MapPin className="w-3 h-3" /> Hyderabad · All Areas Covered
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl text-slate-900">
              {page.h1}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg mb-6 font-medium" style={{ color: page.color }}>{page.tagline}</motion.p>
            <motion.p variants={fadeInUp} className="text-slate-600 text-lg leading-relaxed max-w-3xl mb-6">{page.intro}</motion.p>
            <motion.p variants={fadeInUp} className="text-slate-500 text-base leading-relaxed max-w-3xl mb-10">{page.whyHyderabad}</motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link href="/book-a-visit" className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white">
                <Zap className="w-4 h-4" fill="white" /> Book {page.brand} Service
              </Link>
              <a href="tel:+918639605147" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-slate-700"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                <Phone className="w-4 h-4 text-blue-700" /> +91 86396 05147
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── INDEPENDENCE DISCLOSURE ── */}
      <section className="relative py-4 border-y border-slate-200">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs text-slate-500 leading-relaxed">
            TurboFix is an independent service provider and is not affiliated with, authorized, sponsored, or endorsed by{" "}
            {page.brand}. {page.brand} and related trademarks are the property of their respective owners. TurboFix does
            not provide remote technical support or software helpdesk services — all work is performed in person via
            doorstep visit or at our Hyderabad studio.
          </p>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="relative py-6 border-y border-slate-200">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center md:justify-between gap-6 text-sm text-slate-500">
            {[
              { icon: <Clock className="w-4 h-4 text-blue-600" />, text: "Same-day service in most slots" },
              { icon: <Shield className="w-4 h-4 text-emerald-700" />, text: "Up to 1-year service warranty" },
              { icon: <Star className="w-4 h-4 text-amber-500" />, text: "No fix, no fee" },
              { icon: <CheckCircle className="w-4 h-4 text-blue-600" />, text: "OEM-grade parts, pay after service" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">{icon}<span>{text}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP REPAIRS ── */}
      <section className="relative py-14 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {page.brand} Services in{" "}
              <span className="gradient-text">Hyderabad</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-sm mb-8">Most common {page.brand} services done at your doorstep</motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {page.topRepairs.map((r, i) => {
                const svcLink = servicePageForJob(r.name);
                return (
                <motion.div key={r.name} variants={fadeInUp} transition={{ delay: i * 0.07 }}
                  className="p-5 rounded-2xl flex flex-col gap-3"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                  <h3 className="text-slate-900 font-semibold text-sm">{r.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed flex-1">{r.desc}</p>
                  {svcLink && (
                    <Link href={svcLink.href} className="text-xs text-blue-700 hover:underline">
                      {svcLink.label} in Hyderabad: how it works
                    </Link>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium" style={{ color: page.color }}>{r.price}</span>
                    <Link href="/book-a-visit" aria-label={`Book ${r.name}`} className="text-xs text-blue-700 hover:text-blue-800 transition-colors">Book →</Link>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MODELS ── */}
      <section className="relative py-12 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-slate-900 mb-6">
              {page.brand} Models We Service
            </motion.h2>
            <div className="flex flex-wrap gap-3">
              {page.popularModels.map((m, i) => (
                <motion.div key={m} variants={fadeInUp} transition={{ delay: i * 0.04 }}
                  className="px-4 py-2 rounded-xl text-sm text-slate-700"
                  style={{ background: `${page.color}10`, border: `1px solid ${page.color}25` }}>
                  {m}
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeInUp} className="text-slate-500 text-xs mt-4">
              Don't see your model? <a href="tel:+918639605147" className="text-blue-700 hover:text-blue-800 transition-colors">Call us</a> — we service most {page.brand} models.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST POINTS ── */}
      <section className="relative py-12 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl font-bold text-slate-900 mb-6">
              Why Trust TurboFix for <span className="gradient-text">{page.brand}</span> Service
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.trustPoints.map((p, i) => (
                <motion.div key={i} variants={fadeInUp} transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: "rgba(5,150,105,0.05)", border: "1px solid rgba(5,150,105,0.15)" }}>
                  <CheckCircle className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-700">{p}</span>
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
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              FAQs — <span className="gradient-text">{page.brand}</span> Service in Hyderabad
            </motion.h2>
            <div className="max-w-3xl space-y-3">
              {page.faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} i={i} />)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPLORE MORE ── */}
      <section className="relative py-12 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h3 variants={fadeInUp} className="text-slate-900 font-semibold mb-5">Explore More</motion.h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "All Brand Services", href: "/brands" },
                { label: "Screen Replacement", href: "/screen-replacement-hyderabad" },
                { label: "Battery Replacement", href: "/battery-replacement-hyderabad" },
                { label: "All Areas in Hyderabad", href: "/locations" },
              ].map((l) => (
                <motion.div key={l.href} variants={fadeInUp}>
                  <Link href={l.href} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:text-blue-700 transition-all"
                    style={{ background: "rgba(37,99,235,0.04)", border: "1px solid rgba(37,99,235,0.15)" }}>
                    {l.label} <ChevronRight className="w-3 h-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <PopularAreas label={`${page.brand} Service`} areas={popularAreas} />

      <CTA />
    </>
  );
}
