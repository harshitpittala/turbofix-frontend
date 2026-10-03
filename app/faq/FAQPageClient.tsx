"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";
import CTA from "@/components/home/CTA";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import { faqCategories } from "@/data/faqs";

// Content lives in data/faqs.ts so the FAQPage JSON-LD is built from the same list.
const allFaqs = faqCategories;

export default function FAQPageClient() {
  const [openKey, setOpenKey] = useState<string | null>("Booking & Visits-0");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">FAQ</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-5 text-slate-900">
              Everything You{" "}
              <span className="gradient-text">Want to Know</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-slate-600 text-xl">
              Comprehensive answers to every question you might have about TurboFix.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative py-16 pb-28 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-10">
            {allFaqs.map((category) => (
              <div key={category.category}>
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="w-1 h-5 rounded-full bg-blue-600" />
                  {category.category}
                </h2>
                <div className="space-y-2">
                  {category.items.map((faq, i) => {
                    const key = `${category.category}-${i}`;
                    const isOpen = openKey === key;
                    return (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden transition-all duration-300"
                        style={{
                          background: isOpen ? "rgba(37,99,235,0.05)" : "#FFFFFF",
                          border: isOpen ? "1px solid rgba(37,99,235,0.25)" : "1px solid #E2E8F0",
                        }}
                      >
                        <button
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-${i}-${category.category.replace(/\W+/g, "-")}`}
                          className="w-full flex items-center justify-between px-5 py-4 text-left"
                        >
                          <span className={`font-medium text-sm pr-4 transition-colors ${isOpen ? "text-slate-900" : "text-slate-700"}`}>
                            {faq.q}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              background: isOpen ? "rgba(37,99,235,0.15)" : "#F1F5F9",
                              border: isOpen ? "1px solid rgba(37,99,235,0.3)" : "1px solid #E2E8F0",
                            }}
                          >
                            <Plus className="w-3 h-3" style={{ color: isOpen ? "#2563EB" : "#94A3B8" }} />
                          </motion.div>
                        </button>
                        {/* Always rendered (collapsed when closed) so answers are in the server HTML and match the FAQPage schema. */}
                        <motion.div
                          id={`faq-${i}-${category.category.replace(/\W+/g, "-")}`}
                          initial={false}
                          aria-hidden={!isOpen}
                          style={{ overflow: "hidden" }}
                          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-slate-500 mb-4">Still have questions?</p>
            <a
              href="https://wa.me/918639605147"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white"
            >
              Ask on WhatsApp
            </a>
            <p className="text-slate-500 text-sm mt-5">
              Read our full{" "}
              <Link href="/no-fix-no-fee-policy" className="text-blue-700 hover:underline">
                No Fix, No Fee Policy
              </Link>{" "}
              for warranty scope and visit-charge details.
            </p>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
