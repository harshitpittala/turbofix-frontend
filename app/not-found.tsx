"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Home, ArrowRight, Wrench } from "lucide-react";
import ParticleBackground from "@/components/common/ParticleBackground";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02040F]">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 radial-glow" />
      <ParticleBackground count={30} />

      {/* Glowing orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(0,102,255,0.12)" }}
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(124,58,237,0.12)" }}
      />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Broken phone icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            {/* Glow */}
            <div
              className="absolute inset-0 blur-2xl rounded-3xl scale-150"
              style={{ background: "rgba(0,170,255,0.25)" }}
            />
            <div
              className="relative w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(0,102,255,0.3), rgba(0,170,255,0.15))",
                border: "1px solid rgba(0,170,255,0.3)",
              }}
            >
              <Wrench className="w-10 h-10 text-[#00AAFF]" />
            </div>
          </div>
        </motion.div>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4"
        >
          <span
            className="font-display text-[120px] sm:text-[160px] font-bold leading-none"
            style={{
              background: "linear-gradient(135deg, rgba(0,170,255,0.15), rgba(0,170,255,0.05))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              WebkitTextStroke: "1px rgba(0,170,255,0.3)",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-md mx-auto">
            Looks like this page took a tumble. Don't worry — we're better at fixing
            phones than broken URLs.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="btn-neon flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white group"
          >
            <Home className="w-4 h-4" />
            Back to Home
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/book-repair"
            className="btn-outline-neon flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold"
          >
            <Zap className="w-4 h-4 text-[#00AAFF]" />
            Book a Repair
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
        >
          {[
            { label: "Services", href: "/services" },

            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#00AAFF] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
