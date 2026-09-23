"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, ShieldCheck, BadgeCheck, ArrowRight } from "lucide-react";

const trustBadges = [
  { icon: Star, label: "4.9 Google Rating", color: "text-amber-500" },
  { icon: ShieldCheck, label: "6-Month Warranty", color: "text-emerald-700" },
  { icon: BadgeCheck, label: "Pay After Service", color: "text-emerald-700" },
];

function DiscountTag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="heroTagGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>
      <g stroke="#FDBA74" strokeWidth="3" strokeLinecap="round">
        <line x1="8" y1="16" x2="17" y2="24" />
        <line x1="3" y1="36" x2="13" y2="35" />
        <line x1="91" y1="12" x2="82" y2="21" />
        <line x1="95" y1="32" x2="85" y2="33" />
      </g>
      <g transform="rotate(-10 50 50)">
        <rect x="16" y="24" width="66" height="50" rx="13" fill="url(#heroTagGradient)" stroke="#fff" strokeWidth="2.5" />
        <circle cx="29" cy="37" r="3.5" fill="#fff" />
        <text x="53" y="53" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20" fill="#fff">15%</text>
        <text x="53" y="67" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" letterSpacing="1" fill="#fff">OFF</text>
      </g>
    </svg>
  );
}

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
          <MapPin className="w-3.5 h-3.5 text-blue-700" />
          Hyderabad · Doorstep Device Service
        </motion.div>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-5 mb-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 180 }}
            className="relative shrink-0 order-first sm:self-end sm:-mb-2"
          >
            <div
              className="absolute inset-0 -z-10 scale-[1.6] rounded-full blur-2xl opacity-70"
              style={{ background: "radial-gradient(circle, #FDE68A 0%, rgba(253,230,138,0) 70%)" }}
              aria-hidden="true"
            />
            <Image
              src="/images/promo/ganesh-chaturthi.png"
              alt="Ganesh Chaturthi special offer"
              width={220}
              height={244}
              priority
              className="h-28 w-auto sm:h-36 md:h-44 object-contain drop-shadow-xl"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]"
          >
            Don&apos;t step out.{" "}
            <br />
            <span className="text-blue-700">We fix it at your door.</span>{" "}
            <br />
            In 30 Mins.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35, type: "spring", stiffness: 220 }}
            className="absolute -top-8 sm:-top-10 right-0 sm:right-0 md:right-2"
          >
            <DiscountTag className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white mb-5 shadow-md shadow-red-600/20"
          style={{ background: "linear-gradient(135deg,#F97316,#DC2626)" }}
        >
          🪔 Ganesh Chaturthi Special — Flat 15% Off This Week
        </motion.div>

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
          {trustBadges.map(({ icon: Icon, label, color }) =>
            label === "6-Month Warranty" ? (
              <Link
                key={label}
                href="/terms"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 hover:border-emerald-600/40 hover:text-emerald-700 transition-colors"
              >
                <Icon className={`w-3.5 h-3.5 ${color}`} />
                {label}
              </Link>
            ) : (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200"
              >
                <Icon className={`w-3.5 h-3.5 ${color}`} />
                {label}
              </span>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            type="button"
            onClick={scrollToWizard}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            Book Doorstep Visit
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
