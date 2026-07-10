"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube,
  ArrowUpRight, Heart,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const services = [
  { label: "Screen Replacement",         href: "/screen-replacement-hyderabad" },
  { label: "Battery Replacement",        href: "/battery-replacement-hyderabad" },
  { label: "Charging Port Repair",       href: "/charging-port-repair-hyderabad" },
  { label: "Water Damage Repair",        href: "/water-damage-repair-hyderabad" },
  { label: "Camera Repair",              href: "/camera-repair-hyderabad" },
  { label: "Speaker & Mic Repair",       href: "/speaker-repair-hyderabad" },
  { label: "Back Panel Replacement",     href: "/back-panel-replacement-hyderabad" },
  { label: "Motherboard Repair",         href: "/motherboard-repair-hyderabad" },
];

const brands = [
  { label: "iPhone Repair Hyderabad",       href: "/iphone-repair-hyderabad" },
  { label: "Samsung Repair Hyderabad",      href: "/samsung-repair-hyderabad" },
  { label: "OnePlus Repair Hyderabad",      href: "/oneplus-repair-hyderabad" },
  { label: "Xiaomi Repair Hyderabad",       href: "/xiaomi-repair-hyderabad" },
  { label: "Realme Repair Hyderabad",       href: "/realme-repair-hyderabad" },
  { label: "Oppo Repair Hyderabad",         href: "/oppo-repair-hyderabad" },
  { label: "Google Pixel Repair Hyderabad", href: "/google-pixel-repair-hyderabad" },
  { label: "Vivo Repair Hyderabad",         href: "/vivo-repair-hyderabad" },
];

const locations = [
  { label: "All Hyderabad Areas",       href: "/locations" },
  { label: "Repair in Gachibowli",      href: "/locations/gachibowli" },
  { label: "Repair in Madhapur",        href: "/locations/madhapur" },
  { label: "Repair in HITEC City",      href: "/locations/hitech-city" },
  { label: "Repair in Banjara Hills",   href: "/locations/banjara-hills" },
  { label: "Repair in Ameerpet",        href: "/locations/ameerpet" },
  { label: "Repair in Kondapur",        href: "/locations/kondapur" },
  { label: "Repair in Dilsukhnagar",    href: "/locations/dilsukhnagar" },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/turbofix", label: "Instagram" },
  { icon: Facebook,  href: "https://www.facebook.com/turbofix",  label: "Facebook" },
  { icon: Twitter,   href: "https://twitter.com/turbofix",       label: "Twitter" },
  { icon: Youtube,   href: "https://www.youtube.com/@turbofix",  label: "YouTube" },
];

const quickLinks = [
  { label: "About TurboFix",  href: "/about" },
  { label: "Our Services",    href: "/services" },
  { label: "All Brands",      href: "/repairs" },
  { label: "Book a Repair",   href: "/book-repair" },
  { label: "Blog",            href: "/blog" },
  { label: "Testimonials",    href: "/testimonials" },
  { label: "FAQs",            href: "/faq" },
  { label: "Contact Us",      href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#00AAFF]/30 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00AAFF]/30 to-transparent" />

      <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00AAFF]" />
                <div className="absolute inset-0 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" fill="white" />
                </div>
              </div>
              <span className="font-display font-bold text-xl text-white">
                Turbo<span className="gradient-text-blue">Fix</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Doorstep mobile repair in Hyderabad. Pickup &amp; delivery,
              OEM-grade parts, and trained technicians.
            </p>
            <div className="flex items-center gap-3 mb-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-[#00AAFF] hover:border-[#00AAFF]/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-500 mb-3">
              <MapPin className="w-4 h-4 text-[#00AAFF] mt-0.5 shrink-0" />
              <span>11-1-441, Aghapura, Nampally,<br />Hyderabad, Telangana</span>
            </div>
            <a href="tel:+918639605147" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-1">
              <Phone className="w-3.5 h-3.5 text-[#00AAFF]" />
              +91 86396 05147
            </a>
            <a href="mailto:support@turbofix.in" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#7C3AED]" />
              support@turbofix.in
            </a>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#00AAFF]" />
              Repair Services
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-sm text-gray-400 hover:text-[#00AAFF] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#00AAFF] transition-colors" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Brands */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#EC4899]" />
              Repair by Brand
            </h4>
            <ul className="space-y-2">
              {brands.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-[#EC4899] transition-colors flex items-center gap-2 group">
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#EC4899] transition-all -translate-x-1 group-hover:translate-x-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Locations + Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#22C55E]" />
              Hyderabad Areas
            </h4>
            <ul className="space-y-2 mb-7">
              {locations.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-[#22C55E] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#22C55E] transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#7C3AED]" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#7C3AED] transition-all -translate-x-1 group-hover:translate-x-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Independence disclosure */}
        <p className="text-center text-xs text-gray-600 leading-relaxed mb-3 max-w-3xl mx-auto">
          TurboFix is an independent mobile repair provider and is not affiliated with, authorized, sponsored, or
          endorsed by Apple, Samsung, Xiaomi, OnePlus, Vivo, Oppo, Realme, Google, or Motorola. All brand names, logos,
          and trademarks referenced on this site are the property of their respective owners and are used solely to
          identify the devices we service.
        </p>
        <p className="text-center text-xs text-gray-600 leading-relaxed mb-6 max-w-3xl mx-auto">
          TurboFix provides physical smartphone repair services through in-person technician visits and our Hyderabad
          repair studio. We do not provide remote technical support, remote access services, software helpdesk
          services, IT support services, or third-party customer support.
        </p>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            © {new Date().getFullYear()} TurboFix. Made with
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            in Hyderabad.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <Link href="/privacy"                className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms"                  className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/no-fix-no-fee-policy"   className="hover:text-gray-300 transition-colors">No Fix, No Fee Policy</Link>
            <Link href="/locations"              className="hover:text-gray-300 transition-colors">All Areas</Link>
            <Link href="/repairs"                className="hover:text-gray-300 transition-colors">All Brands</Link>
            <Link href="/blog"                   className="hover:text-gray-300 transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
