"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, CheckCircle2, Plus } from "lucide-react";
import { useState } from "react";
import CTA from "@/components/home/CTA";
import ModelPhotoGallery from "@/components/seo/ModelPhotoGallery";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import type { BrandData } from "@/data/brands";
import { modelPhotoCatalog } from "@/data/modelPhotos.generated";

interface Props {
  brand: BrandData;
}

export default function BrandRepairClient({ brand }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const photoSeries = modelPhotoCatalog[brand.slug];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp}>
              <Link href="/brands" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-700 transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                All Brands
              </Link>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <motion.div variants={fadeInUp} className="flex-1">
                {/* Brand badge */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${brand.color}15`, border: `1px solid ${brand.color}30` }}
                  >
                    {brand.logo && (
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={32}
                        height={32}
                        className="object-contain"
                        unoptimized
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
                      />
                    )}
                  </div>
                  <span className="section-label">{brand.name}</span>
                </div>

                <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 text-slate-900">
                  {brand.tagline.split("—")[0]}{" "}
                  <span className="gradient-text">{brand.tagline.split("—")[1] || ""}</span>
                </h1>
                <p className="text-slate-600 text-xl leading-relaxed max-w-2xl">{brand.description}</p>

                <div className="flex flex-wrap gap-3 mt-8">
                  <Link href="/book-a-visit" className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white">
                    Book a Visit
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:+918639605147" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-slate-700 transition-colors"
                    style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                    Call +91 86396 05147
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Independence disclosure */}
      <section className="relative py-4 border-y border-slate-200">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs text-slate-500 leading-relaxed">
            TurboFix is an independent service provider and is not affiliated with, authorized, sponsored, or endorsed by{" "}
            {brand.name}. {brand.name} and related trademarks are the property of their respective owners.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-16 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label mb-4 inline-flex">What We Service</span>
            <h2 className="font-display text-4xl font-bold mt-4 text-slate-900">
              {brand.name} <span className="gradient-text">Services</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {brand.commonIssues.map((issue, i) => (
              <motion.div
                key={issue.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="rounded-2xl p-6"
                style={{ background: "#FFFFFF", border: `1px solid ${brand.color}25` }}
              >
                <h3 className="text-slate-900 font-semibold mb-2">{issue.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">{issue.desc}</p>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: brand.color }}>
                  <Clock className="w-3 h-3" />
                  {issue.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Supported */}
      <section className="relative py-16 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Supported <span className="gradient-text">Models</span>
            </h2>
          </div>
          {photoSeries ? (
            <ModelPhotoGallery series={photoSeries} />
          ) : (
            <div className="flex flex-wrap gap-2.5 justify-center max-w-4xl mx-auto">
              {brand.models.map((model) => (
                <span
                  key={model}
                  className="text-sm px-3.5 py-1.5 rounded-xl"
                  style={{ background: `${brand.color}08`, color: "#334155", border: `1px solid ${brand.color}20` }}
                >
                  {model}
                </span>
              ))}
            </div>
          )}
          <p className="text-center text-slate-500 text-sm mt-6">
            Don't see your model? Contact us — we service all {brand.name} models.
          </p>
        </div>
      </section>

      {/* Why TurboFix */}
      <section className="relative py-16 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { title: "OEM-Quality Parts", desc: "Grade-A parts that match or exceed original specifications." },
              { title: "6-Month Warranty", desc: "All service work covered for 6 months on parts and workmanship." },
              { title: "Doorstep Service", desc: "We come to your home or office anywhere in Hyderabad." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 text-center"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto mb-3" />
                <h3 className="text-slate-900 font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
                {item.title === "6-Month Warranty" && (
                  <Link href="/terms" className="inline-block text-xs text-blue-700 underline underline-offset-2 mt-2">
                    View full terms
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {brand.faqs.length > 0 && (
        <section className="relative py-16 overflow-hidden border-t border-slate-100">
          <div className="absolute inset-0 bg-white" />
          <div className="container relative max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold text-center mb-10 text-slate-900">
              {brand.name} Service <span className="gradient-text">FAQs</span>
            </h2>
            <div className="space-y-3">
              {brand.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: openFaq === i ? "rgba(37,99,235,0.05)" : "#FFFFFF",
                    border: openFaq === i ? "1px solid rgba(37,99,235,0.25)" : "1px solid #E2E8F0",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className={`font-medium text-sm pr-4 ${openFaq === i ? "text-slate-900" : "text-slate-700"}`}>
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: openFaq === i ? "rgba(37,99,235,0.15)" : "#F1F5F9",
                        border: openFaq === i ? "1px solid rgba(37,99,235,0.3)" : "1px solid #E2E8F0",
                      }}
                    >
                      <Plus className="w-3 h-3" style={{ color: openFaq === i ? "#2563EB" : "#94A3B8" }} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
