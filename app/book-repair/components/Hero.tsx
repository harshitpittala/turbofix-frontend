"use client";

import { motion } from "framer-motion";
import { MapPin, Star, ShieldCheck, BadgeCheck, ArrowRight } from "lucide-react";

const trustBadges = [
  { icon: Star, label: "4.9 Google Rating" },
  { icon: ShieldCheck, label: "6-Month Warranty" },
  { icon: BadgeCheck, label: "Pay After Repair" },
];

export default function Hero() {
  const scrollToWizard = () => {
    document.getElementById("book-your-repair")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-14">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 mb-5"
        >
          <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
          Hyderabad · Doorstep Repair Service
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-4"
        >
          Screen cracked?
          <br />
          <span className="text-[#0066FF]">We fix it at your door.</span>{" "}
          Today.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto mb-6"
        >
          Free doorstep pickup across Hyderabad · Free diagnosis · No payment until you're happy
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-8"
        >
          {trustBadges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200"
            >
              <Icon className="w-3.5 h-3.5 text-[#0066FF]" />
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            type="button"
            onClick={scrollToWizard}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-[#0066FF] hover:bg-[#0052CC] shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            Book Doorstep Repair
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-4"
        >
          <MapPin className="w-3.5 h-3.5" />
          Available across Hyderabad · Book before 6 PM for same-day service
        </motion.p>
      </div>
    </section>
  );
}
