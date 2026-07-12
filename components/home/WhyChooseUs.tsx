"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Zap, Award, Clock, Cpu, HeartHandshake } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight, scaleIn } from "@/lib/utils";

const stats = [
  { value: 1000, suffix: "+", label: "Devices Serviced" },
  { value: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
  { value: 30, suffix: " min", label: "Avg. Turnaround" },
  { value: 98, suffix: "%", label: "First-Visit Success Rate" },
];

const features = [
  {
    icon: Shield,
    title: "6-Month Warranty",
    desc: "Every visit comes backed by our 180-day warranty. If it breaks again within warranty — we resolve it free.",
    color: "#00AAFF",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Most visits completed in under 30 minutes. Book online, walk in, walk out — serviced and ready.",
    color: "#F59E0B",
  },
  {
    icon: Award,
    title: "Trained Technicians",
    desc: "Our technicians average 5+ years of hands-on service experience and are trained in-house on every device we handle.",
    color: "#A78BFA",
  },
  {
    icon: Clock,
    title: "Same-Day Service",
    desc: "Drop off in the morning, pick up by afternoon. We respect your time as much as your device.",
    color: "#22C55E",
  },
  {
    icon: Cpu,
    title: "Genuine OEM Parts",
    desc: "We source only OEM and Grade-A quality parts. No shortcuts. Your device deserves the best.",
    color: "#EC4899",
  },
  {
    icon: HeartHandshake,
    title: "Free Expert Diagnosis",
    desc: "Comprehensive device assessment at no cost. Our technicians identify issues accurately.",
    color: "#38BDF8",
  },
];

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#02040F]" />
      <div className="absolute inset-0 radial-glow opacity-50" />

      {/* Decorative lines */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-[#00AAFF]/20 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-[#7C3AED]/20 to-transparent" />

      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-4">
            <span className="section-label">Why TurboFix</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl font-bold mb-5"
          >
            Built on{" "}
            <span className="gradient-text">Transparency and Accountability</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            We don't just service phones — we explain what's wrong, what it costs,
            and back every visit with a clear warranty.
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="glass rounded-2xl p-6 text-center relative overflow-hidden group"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,170,255,0.05), transparent)" }}
              />
              <div className="font-display text-4xl lg:text-5xl font-bold gradient-text-blue mb-2">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={fadeInUp}
                className="group relative rounded-2xl p-6 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.4s ease",
                }}
                whileHover={{
                  borderColor: `${feat.color}30`,
                  background: `rgba(255,255,255,0.03)`,
                  y: -4,
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${feat.color}05, transparent 60%)` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${feat.color}15`,
                    border: `1px solid ${feat.color}25`,
                    boxShadow: `0 0 20px ${feat.color}10`,
                  }}
                >
                  <Icon className="w-5.5 h-5.5" style={{ color: feat.color }} />
                </div>

                <h3 className="text-white font-semibold text-[15px] mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                {feat.title === "6-Month Warranty" && (
                  <Link href="/terms" className="inline-block text-xs text-[#00AAFF] underline underline-offset-2 mt-2">
                    View full warranty terms
                  </Link>
                )}

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${feat.color}40, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

