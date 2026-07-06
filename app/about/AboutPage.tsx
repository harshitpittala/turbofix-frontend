"use client";

import { motion } from "framer-motion";
import { Target, Heart, Award, TrendingUp } from "lucide-react";
import CTA from "@/components/home/CTA";
import { staggerContainer, fadeInUp } from "@/lib/utils";

const values = [
  { icon: Target, title: "Precision First", desc: "Every repair is done right the first time. No shortcuts, no compromises.", color: "#00AAFF" },
  { icon: Heart, title: "Customer Obsessed", desc: "We exist to serve you. Your satisfaction defines our success.", color: "#EC4899" },
  { icon: Award, title: "Quality Always", desc: "OEM parts, trained repair techniques, and zero compromise on standards.", color: "#F59E0B" },
  { icon: TrendingUp, title: "Always Improving", desc: "We continuously train our team on the latest devices as new models launch.", color: "#22C55E" },
];

const stats = [
  { value: "1,000+", label: "Devices Repaired" },
  { value: "2023", label: "Founded" },
  { value: "4.9 ★", label: "Google Rating" },
  { value: "6-mo", label: "Repair Warranty" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />

        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">Our Story</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold mb-6">
              Built on{" "}
              <span className="gradient-text">Passion for Tech</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed mb-12">
              TurboFix was born from a simple frustration — mobile repair in Hyderabad was slow,
              overpriced, and unpredictable. We built the studio we wished existed.
            </motion.p>

            {/* Stats bar */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-5 text-center"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="font-display text-3xl font-bold gradient-text-blue mb-1">
                    {s.value}
                  </div>
                  <div className="text-gray-500 text-xs">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="section-label mb-4 inline-flex">Our Values</span>
            <h2 className="font-display text-4xl font-bold mt-4">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 group"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                  whileHover={{ y: -4, borderColor: `${v.color}30` }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${v.color}15`, border: `1px solid ${v.color}20` }}>
                    <Icon className="w-5.5 h-5.5" style={{ color: v.color }} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
