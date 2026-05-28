"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, fadeInUp } from "@/lib/utils";

const sections = [
  {
    title: "Information We Collect",
    content: `When you book a repair or contact us, we collect: your name, phone number, email address, device details, and pickup address. We collect only the information necessary to provide our repair services. We do not access your device's files, photos, messages, or personal data during repairs — we work only on the hardware or software component being fixed.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use your information to: process and manage your repair booking, send booking confirmations and repair status updates via email or WhatsApp, contact you regarding your device, and improve our service quality. We do not sell, rent, or share your personal information with third parties for marketing purposes.`,
  },
  {
    title: "Data Security",
    content: `Your data is stored securely on encrypted servers. We use industry-standard security measures to protect your information from unauthorized access. Our technicians are trained in data privacy and sign confidentiality agreements. All repair records are stored for 12 months and then securely deleted.`,
  },
  {
    title: "Device Data Safety",
    content: `We strongly recommend backing up your device before any repair. While our technicians are trained to preserve your data, TurboFix is not responsible for data loss resulting from hardware failures, system resets required during repairs, or unforeseen technical issues. If a factory reset becomes necessary, we will always notify you first.`,
  },
  {
    title: "Cookies & Analytics",
    content: `Our website uses cookies to improve your browsing experience and analyze site traffic. We use Google Analytics to understand how visitors use our site. You can disable cookies in your browser settings at any time. We do not use cookies to track you across other websites.`,
  },
  {
    title: "Third-Party Services",
    content: `We use trusted third-party services including: payment processors (UPI/card gateways), email service providers (for booking confirmations), and SMS gateways (for repair status updates). These providers process your data only as necessary to provide their services and are bound by strict data protection agreements.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your data (subject to legal obligations), opt out of marketing communications at any time. To exercise any of these rights, contact us at support@turbofix.in.`,
  },
  {
    title: "Contact Us",
    content: `If you have questions about this Privacy Policy or how we handle your data, contact us at support@turbofix.in or call +91 86396 05147. We will respond within 48 hours.`,
  },
];

export default function PrivacyPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">Legal</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-5">
              Privacy <span className="gradient-text">Policy</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
              Last updated: January 2025 · Effective immediately
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-8 mb-8"
            style={{ background: "rgba(0,170,255,0.05)", border: "1px solid rgba(0,170,255,0.15)" }}
          >
            <p className="text-gray-300 leading-relaxed">
              At TurboFix, we are committed to protecting your privacy and ensuring the security of your personal data.
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile repair services.
              By using our services, you agree to the terms described below.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-7"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h2 className="text-white font-semibold text-xl mb-3 flex items-center gap-3">
                  <span className="w-1.5 h-5 rounded-full bg-[#00AAFF] shrink-0" />
                  {section.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 text-sm mb-4">Questions about our privacy practices?</p>
            <Link
              href="/contact"
              className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
