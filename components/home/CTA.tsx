"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/utils";

export default function CTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden border-t border-slate-100">
      <div className="absolute inset-0 bg-white" />

      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 8px 30px rgba(15,23,42,0.08)",
          }}
        >
          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            {/* Icon */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-center mb-6"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #1D4ED8, #2563EB)",
                  boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
                }}
              >
                <Zap className="w-8 h-8 text-white" fill="white" />
              </div>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight text-slate-900"
            >
              Your Phone Deserves{" "}
              <br className="hidden md:block" />
              <span className="gradient-text">The Best Care</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Get transparent pricing and a clear service timeline before you commit.
              Book with TurboFix today for doorstep mobile service in Hyderabad.
              First-time customers get{" "}
              <span className="text-amber-600 font-semibold">10% off.</span>
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              <Link
                href="/book-a-visit"
                className="btn-neon px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2.5 group text-base"
              >
                <Zap className="w-5 h-5" fill="white" />
                Book Your Visit
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="tel:+918639605147"
                className="px-8 py-4 rounded-xl font-semibold flex items-center gap-2.5 text-base text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <Phone className="w-5 h-5 text-blue-600" />
                Call Now
              </a>

              <a
                href="https://wa.me/918639605147"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-emerald-700 text-base transition-all"
                style={{
                  background: "rgba(37,211,102,0.08)",
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
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
            >
              {[
                "✓ Free Diagnostics",
                "✓ Up to 1-Year Warranty",
                "✓ Same-Day Slots Available",
                "✓ No Fix, No Fee",
              ].map((badge) =>
                badge === "✓ Up to 1-Year Warranty" ? (
                  <Link key={badge} href="/terms" className="text-emerald-700 hover:text-emerald-800 underline underline-offset-2 transition-colors font-medium">
                    {badge}
                  </Link>
                ) : (
                  <span key={badge} className="text-emerald-700 font-medium">{badge}</span>
                )
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
