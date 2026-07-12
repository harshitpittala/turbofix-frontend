"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import CTA from "@/components/home/CTA";
import { testimonials } from "@/components/home/Testimonials";
import { staggerContainer, fadeInUp } from "@/lib/utils";

// Extended testimonials for dedicated page
const extendedTestimonials = [
  ...testimonials,
  {
    name: "Nikhil Gupta", role: "Entrepreneur", location: "Secunderabad",
    rating: 5, text: "Had three phones serviced here over the past year. Consistent quality every single time. Their technicians really know what they're doing and the pricing is genuinely fair.",
    service: "Multiple Services", avatar: "NG", color: "#0EA5E9",
  },
  {
    name: "Ritu Agarwal", role: "CA", location: "Kukatpally",
    rating: 5, text: "My phone's back glass cracked after a fall. TurboFix replaced it in under an hour and it looks brand new. Couldn't believe how smooth the whole process was.",
    service: "Back Panel Replacement", avatar: "RA", color: "#22C55E",
  },
  {
    name: "Sai Teja", role: "Student", location: "Dilsukhnagar",
    rating: 5, text: "Student budget + broken phone = panic. TurboFix not only fixed my screen quickly but gave me a student discount without me even asking. Will tell all my friends!",
    service: "Screen Replacement", avatar: "ST", color: "#F59E0B",
  },
  {
    name: "Meena Krishnamurthy", role: "Homemaker", location: "Uppal",
    rating: 5, text: "My husband got our son's phone serviced here. The staff patiently explained everything to us without any techno-jargon. Very polite and professional service.",
    service: "Battery Replacement", avatar: "MK", color: "#A78BFA",
  },
  {
    name: "Farhan Qureshi", role: "Photographer", location: "HITEC City",
    rating: 5, text: "My iPhone camera module died right before a client shoot. TurboFix did an emergency service visit in 90 minutes. The camera quality is better than before. Saved my project!",
    service: "Camera Service", avatar: "FQ", color: "#EC4899",
  },
  {
    name: "Lavanya Reddy", role: "IT Professional", location: "Manikonda",
    rating: 5, text: "Brought in a water-damaged Samsung Galaxy that everyone else said was dead. TurboFix revived it completely. My photos, contacts, everything was intact. Truly amazing!",
    service: "Water Damage Service", avatar: "LR", color: "#38BDF8",
  },
];

export default function TestimonialsPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">Customer Stories</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-5">
              1,000+ Reasons to{" "}
              <span className="gradient-text">Trust TurboFix</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
              Real customers, real service, real results. Here's what Hyderabad is saying.
            </motion.p>
            {/* Rating summary */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-4 glass rounded-2xl px-6 py-3">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              </div>
              <div className="text-white font-bold text-xl">4.9</div>
              <div className="text-gray-400 text-sm">based on 1,000+ reviews</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="relative py-16 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {extendedTestimonials.map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="break-inside-avoid rounded-2xl p-6 relative"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                whileHover={{ y: -3, borderColor: `${t.color}30` }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${t.color}40, transparent)` }} />

                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: `${t.color}15`, border: `1px solid ${t.color}20` }}>
                  <Quote className="w-3.5 h-3.5" style={{ color: t.color }} />
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-5">"{t.text}"</p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `${t.color}20`, border: `2px solid ${t.color}30`, color: t.color }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.role} · {t.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(j => <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${t.color}15`, color: t.color }}>
                      {t.service}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
