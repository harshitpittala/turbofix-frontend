"use client";

import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import CTA from "@/components/home/CTA";
import { testimonials } from "@/components/home/Testimonials";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import { GOOGLE_BUSINESS_PROFILE_URL } from "@/lib/config";

// Real customer testimonials (confirmed by the owner, 4 Oct 2026). Don't mark
// these up as Review schema: Google doesn't show self-published reviews of a
// business as review snippets.
// Extended testimonials for dedicated page
const extendedTestimonials = [
  ...testimonials,
  {
    name: "Nikhil Gupta", role: "Entrepreneur", location: "Secunderabad",
    rating: 5, text: "Had three phones serviced here over the past year. Consistent quality every single time. Their technicians really know what they're doing and the pricing is genuinely fair.",
    service: "Multiple Services", avatar: "NG", color: "#0284C7",
  },
  {
    name: "Ritu Agarwal", role: "CA", location: "Kukatpally",
    rating: 5, text: "My phone's back glass cracked after a fall. TurboFix replaced it in under an hour and it looks brand new. Couldn't believe how smooth the whole process was.",
    service: "Back Panel Replacement", avatar: "RA", color: "#2563EB",
  },
  {
    name: "Sai Teja", role: "Student", location: "Dilsukhnagar",
    rating: 5, text: "Student budget + broken phone = panic. TurboFix not only fixed my screen quickly but gave me a student discount without me even asking. Will tell all my friends!",
    service: "Screen Replacement", avatar: "ST", color: "#1D4ED8",
  },
  {
    name: "Meena Krishnamurthy", role: "Homemaker", location: "Uppal",
    rating: 5, text: "My husband got our son's phone serviced here. The staff patiently explained everything to us without any techno-jargon. Very polite and professional service.",
    service: "Battery Replacement", avatar: "MK", color: "#3B82F6",
  },
  {
    name: "Farhan Qureshi", role: "Photographer", location: "HITEC City",
    rating: 5, text: "My iPhone camera module died right before a client shoot. TurboFix did an emergency service visit in 90 minutes. The camera quality is better than before. Saved my project!",
    service: "Camera Service", avatar: "FQ", color: "#0EA5E9",
  },
  {
    name: "Lavanya Reddy", role: "IT Professional", location: "Manikonda",
    rating: 5, text: "Brought in a water-damaged Samsung Galaxy that everyone else said was dead. TurboFix revived it completely. My photos, contacts, everything was intact. Truly amazing!",
    service: "Water Damage Service", avatar: "LR", color: "#1E40AF",
  },
];

export default function TestimonialsPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">Customer Stories</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-5 text-slate-900">
              What Customers Say About{" "}
              <span className="gradient-text">TurboFix</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-slate-600 text-xl max-w-2xl mx-auto mb-8">
              Real customers, real service, real results. Here's what Hyderabad is saying.
            </motion.p>
            {/* Points to the live, independently hosted reviews instead of a hard-coded rating. */}
            {GOOGLE_BUSINESS_PROFILE_URL && (
              <motion.a
                variants={fadeInUp}
                href={GOOGLE_BUSINESS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass rounded-2xl px-6 py-3 text-slate-900 font-semibold hover:text-blue-700"
              >
                Read our reviews on Google <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="relative py-16 pb-28 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
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
                style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
                whileHover={{ y: -3, borderColor: `${t.color}40` }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${t.color}40, transparent)` }} />

                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: `${t.color}15`, border: `1px solid ${t.color}20` }}>
                  <Quote className="w-3.5 h-3.5" style={{ color: t.color }} />
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-5">"{t.text}"</p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `${t.color}20`, border: `2px solid ${t.color}30`, color: t.color }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-slate-900 font-medium text-sm">{t.name}</p>
                      <p className="text-slate-500 text-xs">{t.role} · {t.location}</p>
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
