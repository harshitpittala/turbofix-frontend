"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Home, ArrowRight, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Broken phone icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div
              className="relative w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: "rgba(37,99,235,0.08)",
                border: "1px solid rgba(37,99,235,0.25)",
              }}
            >
              <Wrench className="w-10 h-10 text-blue-700" />
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
              background: "linear-gradient(135deg, rgba(15,23,42,0.1), rgba(15,23,42,0.03))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              WebkitTextStroke: "1px rgba(15,23,42,0.15)",
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
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-md mx-auto">
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
            href="/book-a-visit"
            className="btn-outline-neon flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold"
          >
            <Zap className="w-4 h-4 text-blue-700" />
            Book a Visit
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
        >
          {[
            { label: "Services", href: "/services" },

            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-blue-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
