"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, Minus } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/utils";

export const faqs = [
  {
    q: "How long does a typical repair take?",
    a: "Most repairs — screen replacements, battery swaps, and charging port fixes — are completed in 20–45 minutes. Complex repairs like water damage recovery or motherboard work may take 2–4 hours. We'll always give you an accurate time estimate upfront.",
  },
  {
    q: "Do you use original parts?",
    a: "Yes. We use OEM (Original Equipment Manufacturer) quality parts and Grade-A aftermarket components that meet or exceed original specifications. For Apple devices, we offer genuine Apple parts for an additional charge if preferred.",
  },
  {
    q: "What warranty do you offer?",
    a: "Every repair comes with a 6-month warranty. If the same issue reoccurs within that period due to a parts or workmanship failure, we fix it absolutely free. The warranty doesn't cover physical damage or water damage after the repair.",
  },
  {
    q: "Will my data be safe during the repair?",
    a: "Your data is completely safe. We only access the parts being repaired — your files, photos, and apps remain untouched. We recommend a backup before any repair as a precaution, and our staff will never ask for your passcode unless software troubleshooting is explicitly needed.",
  },
  {
    q: "Can I get a cost estimate before the repair?",
    a: "Absolutely. Our diagnostic check is completely free. We'll assess your device and provide a fixed, transparent quote before any work begins. You're under no obligation to proceed if you don't like the price.",
  },
  {
    q: "Do you offer home pickup and delivery?",
    a: "Yes! We offer doorstep pickup and delivery within a 10 km radius of Hitech City. Book the service online, and our technician will collect your device, repair it in our lab, and deliver it back — typically same day.",
  },
  {
    q: "Which phone brands do you repair?",
    a: "We repair all major brands including Apple iPhone, Samsung, OnePlus, Xiaomi, Oppo, Vivo, Realme, Google Pixel, Motorola, Nokia, Sony, and Nothing. If you have a less common brand, contact us — we likely handle it.",
  },
  {
    q: "Is my device insured while at your shop?",
    a: "Yes. All devices in our custody are covered under our in-shop insurance. In the extremely unlikely event of accidental damage while in our care, we will repair or replace the device at no cost to you.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: isOpen ? "rgba(0,170,255,0.04)" : "rgba(255,255,255,0.02)",
        border: isOpen ? "1px solid rgba(0,170,255,0.2)" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className={`font-medium text-[15px] pr-4 transition-colors duration-200 ${isOpen ? "text-white" : "text-gray-300"}`}>
          {q}
        </span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: isOpen ? "rgba(0,170,255,0.15)" : "rgba(255,255,255,0.05)",
            border: isOpen ? "1px solid rgba(0,170,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <Plus className="w-3.5 h-3.5" style={{ color: isOpen ? "#00AAFF" : "#6B7280" }} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5">
              <div className="pt-4">{a}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#02040F]" />
      <div className="absolute inset-0 grid-bg opacity-30" />

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
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-5">
              Questions?
              <br />
              <span className="gradient-text">We've Got Answers.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-8 leading-relaxed">
              Everything you need to know before booking a repair.
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
                { label: "Answered questions", value: "500+" },
                { label: "Average response time", value: "< 2 min" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-2xl font-bold gradient-text-blue mb-1">{s.value}</div>
                  <div className="text-gray-500 text-xs">{s.label}</div>
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
