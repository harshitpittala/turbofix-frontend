"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ClipboardList, ScanLine, Wrench, PackageCheck, ArrowRight } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Book Online",
    desc: "Use our smart booking form to describe your issue, choose a time slot, and lock in your appointment in under 2 minutes.",
    color: "#2563EB",
    highlight: "Takes 2 minutes",
  },
  {
    number: "02",
    icon: ScanLine,
    title: "Free Diagnostics",
    desc: "A technician comes to your home or office (or you walk in to our Nampally studio) and runs a 15-point diagnostic check, free in most cases.",
    color: "#1D4ED8",
    highlight: "Free in most cases",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Expert Service",
    desc: "Once you approve the quote, our trained engineers get to work. Most visits are completed in under 30 minutes.",
    color: "#3B82F6",
    highlight: "~30 min average",
  },
  {
    number: "04",
    icon: PackageCheck,
    title: "Test & Protect",
    desc: "Your phone is tested and cleaned, then handed back with a warranty of up to 1 year. You pay only after the service is done.",
    color: "#0EA5E9",
    highlight: "Up to 1-year warranty",
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden border-t border-slate-100">
      <div className="absolute inset-0 bg-white" />

      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-4">
            <span className="section-label">How It Works</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl font-bold mb-5 text-slate-900"
          >
            Service in{" "}
            <span className="gradient-text">4 Simple Steps</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-600 text-lg max-w-xl mx-auto">
            We've streamlined the entire service experience so you can get back to what matters — fast.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-16 left-0 right-0 hidden lg:block">
            <div
              className="absolute left-[12.5%] right-[12.5%] top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(15,23,42,0.12) 15%, rgba(15,23,42,0.12) 85%, transparent)" }}
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className="relative group"
                >
                  {/* Step number + icon */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      {/* Icon circle */}
                      <div
                        className="relative w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          background: `${step.color}12`,
                          border: `1px solid ${step.color}30`,
                        }}
                      >
                        <Icon className="w-7 h-7" style={{ color: step.color }} />
                      </div>
                      {/* Step number badge */}
                      <div
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{ background: step.color, color: "#FFFFFF" }}
                      >
                        {i + 1}
                      </div>
                    </div>

                    {/* Highlight pill */}
                    <div
                      className="px-3 py-1 rounded-full text-[11px] font-semibold mb-3"
                      style={{
                        background: `${step.color}15`,
                        color: step.color,
                        border: `1px solid ${step.color}25`,
                      }}
                    >
                      {step.highlight}
                    </div>

                    <h3 className="text-slate-900 font-semibold text-lg mb-3">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Arrow connector (desktop) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-6 -right-4 z-10 items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-slate-300" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mt-16"
        >
          <Link
            href="/book-a-visit"
            className="btn-neon inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white"
          >
            Start Your Visit
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-slate-500 text-sm mt-4">Free diagnosis in most cases · Quote before work · Pay after service</p>
        </motion.div>
      </div>
    </section>
  );
}
