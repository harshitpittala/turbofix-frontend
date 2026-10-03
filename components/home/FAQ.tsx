"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, Minus } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/utils";

export const faqs = [
  {
    q: "How long does a typical visit take?",
    a: "Most visits — screen replacements, battery swaps, and charging port work — are completed in 20–45 minutes. Complex jobs like water damage service or motherboard work may take 2–4 hours. We'll always give you an accurate time estimate upfront.",
  },
  {
    q: "Do you use original parts?",
    a: "Yes. We use OEM (Original Equipment Manufacturer) quality parts and Grade-A aftermarket components that meet or exceed original specifications. For Apple devices, we offer genuine Apple parts for an additional charge if preferred.",
  },
  {
    q: "What warranty do you offer?",
    a: "Every visit comes with a warranty of 3 months, 6 months or 1 year, depending on the quality grade of the part used; we confirm the period with your quote. If the same issue reoccurs within that period due to a parts or workmanship failure, we resolve it free. The warranty doesn't cover physical damage or water damage after the visit.",
  },
  {
    q: "Will my data be safe during the visit?",
    a: "Your data is completely safe. We only access the parts being serviced — your files, photos, and apps remain untouched. We recommend a backup before any visit as a precaution, and our staff will never ask for your passcode unless software troubleshooting is explicitly needed.",
  },
  {
    q: "Can I get a cost estimate before the visit?",
    a: "Absolutely. In most cases our diagnostic check is free. We'll assess your device and give you a fixed, transparent quote before any work begins, and you decide whether to go ahead. Our Terms explain the few cases where a charge applies.",
  },
  {
    q: "Do you come to my home or office?",
    a: "Yes. A technician services your phone at your home or office in Hyderabad, 9 AM – 9 PM every day. We also offer pickup and delivery anywhere in Hyderabad, and you can walk in to our studio in Aghapura, Nampally (9 AM – 9 PM, every day).",
  },
  {
    q: "Which phone brands do you service?",
    a: "Apple iPhone, Samsung, OnePlus, Xiaomi, Oppo, Vivo, Realme, Google Pixel, Motorola and Nothing. For other brands, contact us with the model and we'll check.",
  },
  // TODO(owner): confirm the insurance cover below exists; edit or remove it if not.
  {
    q: "Is my device insured while at your shop?",
    a: "Yes. All devices in our custody are covered under our in-shop insurance. In the extremely unlikely event of accidental damage while in our care, we will service or replace the device at no cost to you.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const panelId = useId();
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: isOpen ? "rgba(37,99,235,0.05)" : "#FFFFFF",
        border: isOpen ? "1px solid rgba(37,99,235,0.25)" : "1px solid #E2E8F0",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className={`font-medium text-[15px] pr-4 transition-colors duration-200 ${isOpen ? "text-slate-900" : "text-slate-700"}`}>
          {q}
        </span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? "rgba(37,99,235,0.15)" : "#F1F5F9",
            border: isOpen ? "1px solid rgba(37,99,235,0.3)" : "1px solid #E2E8F0",
          }}
        >
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <Plus className="w-3.5 h-3.5" style={{ color: isOpen ? "#2563EB" : "#94A3B8" }} />
          </motion.div>
        </div>
      </button>

      {/* Always rendered (collapsed when closed) so answers are in the server HTML and match the FAQPage schema. */}
      <motion.div
        id={panelId}
        initial={false}
        aria-hidden={!isOpen}
        style={{ overflow: "hidden" }}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100">
          <div className="pt-4">{a}</div>
        </div>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden border-t border-slate-100">
      <div className="absolute inset-0 bg-white" />

      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="lg:sticky lg:top-28"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="section-label">FAQ</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-5 text-slate-900">
              Questions?
              <br />
              <span className="gradient-text">We've Got Answers.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-600 text-lg mb-8 leading-relaxed">
              Everything you need to know before booking a visit.
              Can't find your answer? Just WhatsApp us.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a
                href="https://wa.me/918639605147"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white"
              >
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp} className="mt-12 grid grid-cols-2 gap-4">
              {[
                { label: "Doorstep visits, every day", value: "9 AM – 9 PM" },
                { label: "Online & WhatsApp bookings", value: "24/7" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-4"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
                >
                  <div className="text-2xl font-bold gradient-text-blue mb-1">{s.value}</div>
                  <div className="text-slate-500 text-xs">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - FAQs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <FAQItem
                  q={faq.q}
                  a={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
