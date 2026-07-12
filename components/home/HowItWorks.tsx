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
    color: "#00AAFF",
    highlight: "Takes 2 minutes",
  },
  {
    number: "02",
    icon: ScanLine,
    title: "Free Diagnostics",
    desc: "Drop off your device. Our technicians run a 15-point diagnostic check — completely free of charge, no commitment.",
    color: "#7C3AED",
    highlight: "Always free",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Expert Service",
    desc: "Once you approve the quote, our trained engineers get to work. Most visits are completed in under 30 minutes.",
    color: "#EC4899",
    highlight: "~30 min average",
  },
  {
    number: "04",
    icon: PackageCheck,
    title: "Pick Up & Protect",
    desc: "Your device is tested, cleaned, and returned with a 6-month warranty card. You leave happier than you arrived.",
    color: "#22C55E",
    highlight: "6-month warranty",
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 grid-bg opacity-40" />

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
            className="font-display text-4xl md:text-5xl font-bold mb-5"
          >
            Service in{" "}
            <span className="gradient-text">4 Simple Steps</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-xl mx-auto">
            We've streamlined the entire service experience so you can get back to what matters — fast.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-16 left-0 right-0 hidden lg:block">
            <div
              className="absolute left-[12.5%] right-[12.5%] top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,170,255,0.2) 15%, rgba(0,170,255,0.2) 85%, transparent)" }}
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
                      {/* Outer glow ring */}
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                        className="absolute inset-0 rounded-full blur-md"
                        style={{ background: step.color }}
                      />
                      {/* Icon circle */}
                      <div
                        className="relative w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${step.color}25, ${step.color}08)`,
                          border: `1px solid ${step.color}40`,
                          boxShadow: `0 0 20px ${step.color}20`,
                        }}
                      >
                        <Icon className="w-7 h-7" style={{ color: step.color }} />
                      </div>
                      {/* Step number badge */}
                      <div
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{ background: step.color, color: "#02040F" }}
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

                    <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Arrow connector (desktop) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-6 -right-4 z-10 items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-gray-700" />
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
          <p className="text-gray-600 text-sm mt-4">Free diagnostics · No commitment · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
}
