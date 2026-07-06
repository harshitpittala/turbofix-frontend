"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck, Wallet, Clock3, ShieldQuestion } from "lucide-react";
import CTA from "@/components/home/CTA";
import { staggerContainer, fadeInUp } from "@/lib/utils";

const pillars = [
  {
    icon: Wallet,
    title: "Diagnostics are free",
    desc: "Every repair starts with a free diagnostic check. You'll get a fixed quote before we touch anything — no obligation to proceed.",
    color: "#00AAFF",
  },
  {
    icon: ShieldCheck,
    title: "No fix, no repair fee",
    desc: "If we diagnose your device and can't fix it, you don't pay for the repair. You only pay once the device is working again.",
    color: "#22C55E",
  },
  {
    icon: Clock3,
    title: "Clear repair timelines",
    desc: "Most common repairs — screens, batteries, charging ports — are done in 20–45 minutes. Complex jobs like water damage or motherboard repair can take 2–4 hours, occasionally up to a day.",
    color: "#F59E0B",
  },
  {
    icon: ShieldQuestion,
    title: "One visit charge exception",
    desc: "A ₹499 visit/service charge applies only if you decline a quoted repair, the device isn't repairable, or a job can't be completed for reasons on your side. It covers the technician's time and travel — not a repair fee.",
    color: "#EC4899",
  },
];

export default function NoFixNoFeePolicyClient() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

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
              <span className="section-label">No Fix, No Fee</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-5">
              <span className="gradient-text">No Fix, No Fee Policy</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
              What's actually free, when a visit charge applies, and how our 6-month warranty works —
              explained plainly, with no fine print hidden elsewhere.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl p-6"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${p.color}15`, border: `1px solid ${p.color}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none"
            style={{
              "--tw-prose-body": "rgb(209, 213, 219)",
              "--tw-prose-headings": "rgb(255, 255, 255)",
              "--tw-prose-links": "rgb(0, 170, 255)",
              "--tw-prose-strong": "rgb(255, 255, 255)",
            } as any}
          >
            <h2 className="text-3xl font-bold text-white mt-0 mb-4">What "No Fix, No Fee" Covers</h2>
            <p>
              Every TurboFix repair starts the same way: a technician runs a free diagnostic check on your
              device — no charge, no obligation. Once the issue is confirmed, you get a fixed quote before
              any repair work begins. If you approve it, we repair the device and you pay only after it's
              working again. If we diagnose the device and find we <strong>can't</strong> fix it, you owe
              nothing for the repair itself.
            </p>

            <h2 className="text-3xl font-bold text-white mt-8 mb-4">When a Visit Charge Applies</h2>
            <p>
              To keep this policy honest, there's one exception worth stating clearly: a minimum{" "}
              <strong>₹499 visit/service charge</strong> applies if any of the following happens after a
              technician has already come to you or you've visited our service point:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>You decide not to go ahead with a repair after receiving the quote.</li>
              <li>The device is inspected and found not to be repairable.</li>
              <li>The job can't be completed for reasons on the customer's side (e.g. missing device access, no availability at pickup).</li>
            </ul>
            <p>
              This charge covers the technician's time and travel for that visit — it is separate from, and
              should not be confused with, the free diagnostic itself. If your repair goes ahead as quoted,
              this charge never applies.
            </p>

            <h2 className="text-3xl font-bold text-white mt-8 mb-4">6-Month Warranty, In Brief</h2>
            <p>
              Eligible screen repairs carry a 6-month warranty; other replaced parts carry a 3-month
              warranty. If the same issue recurs within that period due to parts or workmanship, we fix it
              at no cost. Physical damage, water damage after repair, and issues unrelated to the original
              repair are not covered. See our{" "}
              <Link href="/terms">full Terms of Service</Link> for the complete warranty terms, exclusions,
              and claim process.
            </p>

            <h2 className="text-3xl font-bold text-white mt-8 mb-4">Typical Repair Timelines</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>Screen replacement, battery swap, charging port repair: 20–45 minutes</li>
              <li>Water damage recovery: 2–4 hours, occasionally up to a day depending on severity</li>
              <li>Motherboard-level repair: 1–3 days depending on component availability</li>
            </ul>
            <p>
              We'll always confirm an expected timeline for your specific device and issue before starting
              work.
            </p>

            <h2 className="text-3xl font-bold text-white mt-8 mb-4">Questions?</h2>
            <p>
              Contact us at{" "}
              <a href="mailto:support@turbofix.in">support@turbofix.in</a> or{" "}
              <a href="tel:+918639605147">+91 86396 05147</a> before booking if anything here is unclear —
              we'd rather explain it upfront than leave it as fine print.
            </p>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  );
}
