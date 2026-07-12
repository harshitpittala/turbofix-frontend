"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/utils";

export const testimonials = [
  {
    name: "Arjun Reddy",
    role: "Software Engineer",
    location: "Hitech City",
    rating: 5,
    text: "My iPhone 14 Pro's screen was completely shattered. TurboFix replaced it in 25 minutes with an original panel. The display is flawless — honestly better than I expected. Will never go anywhere else.",
    service: "Screen Replacement",
    avatar: "AR",
    color: "#0EA5E9",
  },
  {
    name: "Priya Sharma",
    role: "UX Designer",
    location: "Gachibowli",
    rating: 5,
    text: "Dropped my phone in water and panicked. The team at TurboFix ran diagnostics within 10 minutes, explained everything clearly, and had it fully restored by evening. Absolute lifesavers!",
    service: "Water Damage Service",
    avatar: "PS",
    color: "#A78BFA",
  },
  {
    name: "Karthik Naidu",
    role: "Startup Founder",
    location: "Banjara Hills",
    rating: 5,
    text: "Battery was draining within 2 hours on my Samsung Galaxy. TurboFix replaced it in 20 minutes. Now I get a full day's use. Professional, fast, and honest.",
    service: "Battery Replacement",
    avatar: "KN",
    color: "#22C55E",
  },
  {
    name: "Sneha Patel",
    role: "Marketing Manager",
    location: "Jubilee Hills",
    rating: 5,
    text: "My camera was broken and another store wanted way too much for a fix. TurboFix did it quickly and it works perfectly. The transparency and honesty here is unmatched. 10/10 recommend.",
    service: "Camera Service",
    avatar: "SP",
    color: "#F59E0B",
  },
  {
    name: "Rahul Verma",
    role: "Doctor",
    location: "Kondapur",
    rating: 5,
    text: "Needed my phone sorted urgently between hospital shifts. Booked online, walked in, and walked out in 30 minutes with a working charging port. The booking system is brilliant.",
    service: "Charging Port Service",
    avatar: "RV",
    color: "#EC4899",
  },
  {
    name: "Divya Krishnan",
    role: "Teacher",
    location: "Madhapur",
    rating: 5,
    text: "First time using TurboFix and I'm completely impressed. The staff explained what was wrong without any jargon, the price was fair, and they even cleaned my phone before returning it.",
    service: "Screen Replacement",
    avatar: "DK",
    color: "#38BDF8",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const prev = () => {
    setAutoplay(false);
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setAutoplay(false);
    setActive((a) => (a + 1) % testimonials.length);
  };

  const current = testimonials[active];

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 radial-glow opacity-40" />

      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-4">
            <span className="section-label">Testimonials</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-4">
            Real Words from{" "}
            <span className="gradient-text">Real Customers</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-xl mx-auto">
            Over 1,000 five-star reviews across Google, JustDial & WhatsApp.
            Here's what they're saying.
          </motion.p>
        </motion.div>

        {/* Main testimonial card */}
        <div className="max-w-3xl mx-auto mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative rounded-3xl p-8 md:p-10"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* Top glow accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                style={{ background: `linear-gradient(90deg, transparent, ${current.color}60, transparent)` }}
              />

              {/* Quote icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${current.color}15`, border: `1px solid ${current.color}25` }}
              >
                <Quote className="w-5 h-5" style={{ color: current.color }} />
              </div>

              {/* Text */}
              <p className="text-gray-200 text-lg leading-relaxed mb-8">
                "{current.text}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${current.color}30, ${current.color}10)`,
                      border: `2px solid ${current.color}30`,
                      color: current.color,
                    }}
                  >
                    {current.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{current.name}</p>
                    <p className="text-gray-500 text-sm">{current.role} · {current.location}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: `${current.color}15`,
                      color: current.color,
                      border: `1px solid ${current.color}25`,
                    }}
                  >
                    {current.service}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls + Dots */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setAutoplay(false); setActive(i); }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === active ? "24px" : "8px",
                  height: "8px",
                  background: i === active ? "#00AAFF" : "rgba(255,255,255,0.15)",
                  boxShadow: i === active ? "0 0 10px rgba(0,170,255,0.6)" : "none",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mini cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-12">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              onClick={() => { setAutoplay(false); setActive(i); }}
              className="rounded-xl p-3 text-left transition-all duration-300"
              animate={{
                background: i === active ? "rgba(0,170,255,0.08)" : "rgba(255,255,255,0.02)",
                borderColor: i === active ? "rgba(0,170,255,0.3)" : "rgba(255,255,255,0.05)",
              }}
              style={{ border: "1px solid" }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                  style={{ background: `${t.color}20`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <span className="text-[11px] text-gray-300 font-medium truncate">{t.name}</span>
              </div>
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(j => (
                  <Star key={j} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
