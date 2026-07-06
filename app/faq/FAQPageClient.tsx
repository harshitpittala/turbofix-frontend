"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";
import CTA from "@/components/home/CTA";
import { staggerContainer, fadeInUp } from "@/lib/utils";

const allFaqs = [
  {
    category: "Repair Process",
    items: [
      { q: "How long does a typical repair take?", a: "Most common repairs — screen replacements, battery swaps, charging port fixes — are done in 20–45 minutes. Complex jobs like water damage recovery or motherboard repair may take 2–4 hours or up to a day." },
      { q: "Do I need to book an appointment?", a: "Walk-ins are welcome, but we strongly recommend booking online to reserve your slot. This ensures a technician is ready for you and minimizes wait time." },
      { q: "Can I wait in-store while my phone is being repaired?", a: "Absolutely! Our waiting area has complimentary coffee, fast Wi-Fi, and a loaner device if needed. We'll text you when your repair is complete." },
      { q: "Do you offer home pickup and delivery?", a: "Yes, within 10 km of our Hitech City store. Book online, choose doorstep service, and we handle the rest — same-day in most cases." },
    ],
  },
  {
    category: "Parts & Quality",
    items: [
      { q: "Do you use genuine OEM parts?", a: "We use OEM (Original Equipment Manufacturer) quality parts as standard. Genuine Apple parts are available for an extra charge. We'll always tell you exactly which parts we're using before the repair begins." },
      { q: "Will my phone look and feel the same after repair?", a: "For screen and battery repairs, yes — absolutely. We strive for factory-quality results. Parts are color-matched and all repairs are tested through a 10-point quality checklist before handoff." },
      { q: "Do you sell spare parts separately?", a: "Yes, we stock common batteries, screens, and accessories for self-repair enthusiasts. Visit our store or contact us for availability." },
    ],
  },
  {
    category: "Warranty & Policies",
    items: [
      { q: "What warranty do you offer?", a: "All repairs carry a 6-month warranty. If the same issue recurs within 6 months due to parts or workmanship, we fix it free. Physical damage and new issues are not covered." },
      { q: "What if my phone develops a new problem after repair?", a: "If the new issue is related to our repair, it's covered under warranty. If it's an unrelated problem, we'll diagnose it for free and give you a fair quote." },
      { q: "What if you can't fix my device?", a: "We don't charge for unsuccessful repairs. You only pay when your device is fully functional. If we're unable to fix it, the diagnostic assessment is still free." },
    ],
  },
  {
    category: "Data & Security",
    items: [
      { q: "Will my data be safe?", a: "We only access components relevant to the repair. Our technicians never access your files, photos, or apps. We recommend backing up before any repair as a precaution — though your data will be safe with us." },
      { q: "Do you require my passcode?", a: "Only if the repair requires software testing (e.g., screen touch verification). Even then, you can change your passcode before and after. We never retain access credentials." },
      { q: "Is my device insured while in your care?", a: "Yes. All devices are covered under our in-store insurance. In the extremely unlikely event of accidental damage in our care, we will repair or replace the device at no cost to you." },
    ],
  },
  {
    category: "Payment Methods",
    items: [
      { q: "How do you charge — upfront or after?", a: "You receive a confirmed quote before any work begins. Payment is made after the repair is complete and you're satisfied with the result. No payment before work." },
      { q: "What payment methods do you accept?", a: "Cash, all UPI apps (GPay, PhonePe, Paytm), credit/debit cards, and net banking." },
      { q: "Do you offer student or senior discounts?", a: "Yes! Show a valid student ID for 5% off. Senior citizens (60+) receive 10% off all repairs. Cannot be combined with other offers." },
    ],
  },
];

export default function FAQPageClient() {
  const [openKey, setOpenKey] = useState<string | null>("Repair Process-0");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">FAQ</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-5">
              Everything You{" "}
              <span className="gradient-text">Want to Know</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-xl">
              Comprehensive answers to every question you might have about TurboFix.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative py-16 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-10">
            {allFaqs.map((category) => (
              <div key={category.category}>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-5 rounded-full bg-[#00AAFF]" />
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
                          background: isOpen ? "rgba(0,170,255,0.04)" : "rgba(255,255,255,0.02)",
                          border: isOpen ? "1px solid rgba(0,170,255,0.2)" : "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <button
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left"
                        >
                          <span className={`font-medium text-sm pr-4 transition-colors ${isOpen ? "text-white" : "text-gray-300"}`}>
                            {faq.q}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              background: isOpen ? "rgba(0,170,255,0.15)" : "rgba(255,255,255,0.05)",
                              border: isOpen ? "1px solid rgba(0,170,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            <Plus className="w-3 h-3" style={{ color: isOpen ? "#00AAFF" : "#6B7280" }} />
                          </motion.div>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <a
              href="https://wa.me/918639605147"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white"
            >
              Ask on WhatsApp
            </a>
            <p className="text-gray-500 text-sm mt-5">
              Read our full{" "}
              <Link href="/no-fix-no-fee-policy" className="text-[#00AAFF] hover:underline">
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
