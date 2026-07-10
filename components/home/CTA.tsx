"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/utils";

export default function CTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Card background */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(0,102,255,0.15) 0%, rgba(124,58,237,0.1) 50%, rgba(236,72,153,0.08) 100%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ border: "1px solid rgba(0,170,255,0.15)", borderRadius: "1.5rem" }}
          />

          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Orbs */}
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl"
            style={{ background: "rgba(0,170,255,0.2)" }}
          />
          <motion.div
            animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl"
            style={{ background: "rgba(124,58,237,0.15)" }}
          />

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            {/* Icon */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-center mb-6"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #0066FF, #00AAFF)",
                  boxShadow: "0 0 40px rgba(0,170,255,0.4)",
                }}
              >
                <Zap className="w-8 h-8 text-white" fill="white" />
              </div>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight"
            >
              Your Phone Deserves{" "}
              <br className="hidden md:block" />
              <span className="gradient-text">The Best Care</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Get transparent pricing and a clear repair timeline before you commit.
              Book with TurboFix today for doorstep mobile repair in Hyderabad.
              First-time customers get{" "}
              <span className="text-[#00AAFF] font-semibold">10% off.</span>
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              <Link
                href="/book-repair"
                className="btn-neon px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2.5 group text-base"
              >
                <Zap className="w-5 h-5" fill="white" />
                Book Your Repair
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="tel:+918639605147"
                className="btn-outline-neon px-8 py-4 rounded-xl font-semibold flex items-center gap-2.5 text-base"
              >
                <Phone className="w-5 h-5 text-[#00AAFF]" />
                Call Now
              </a>

              <a
                href="https://wa.me/918639605147"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all"
                style={{
                  background: "rgba(37,211,102,0.15)",
                  border: "1px solid rgba(37,211,102,0.3)",
                }}
              >
                <MessageCircle className="w-5 h-5" style={{ color: "#25D366" }} />
                WhatsApp Us
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
            >
              {[
                "✓ Free Diagnostics",
                "✓ 6-Month Warranty",
                "✓ Same-Day Slots Available",
                "✓ No Fix, No Fee",
              ].map((badge) =>
                badge === "✓ 6-Month Warranty" ? (
                  <Link key={badge} href="/terms" className="text-gray-400 hover:text-[#00AAFF] underline underline-offset-2 transition-colors">
                    {badge}
                  </Link>
                ) : (
                  <span key={badge} className="text-gray-400">{badge}</span>
                )
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
