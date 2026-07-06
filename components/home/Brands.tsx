"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const brands = [
  { name: "Apple",    icon: "/images/brands/apple.svg",    color: "#A0A0A0" },
  { name: "Samsung",  icon: "/images/brands/samsung.svg",  color: "#1428A0" },
  { name: "OnePlus",  icon: "/images/brands/oneplus.svg",  color: "#F5010C" },
  { name: "Xiaomi",   icon: "/images/brands/xiaomi.svg",   color: "#FF6900" },
  { name: "OPPO",     icon: "/images/brands/oppo.svg",     color: "#1D8348" },
  { name: "Vivo",     icon: "/images/brands/vivo.svg",     color: "#415FFF" },
  { name: "Realme",   icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Ctext x='14' y='22' text-anchor='middle' fill='white' font-size='22' font-weight='900' font-family='Arial,sans-serif'%3ER%3C/text%3E%3C/svg%3E",   color: "#FEC400" },
  { name: "Google",   icon: "/images/brands/google.svg",   color: "#4285F4" },
  { name: "Motorola", icon: "/images/brands/motorola.svg", color: "#EB5A1B" },
  { name: "Nokia",    icon: "/images/brands/nokia.svg",    color: "#124191" },
  { name: "Sony",     icon: "/images/brands/sony.svg",     color: "#003791" },
  { name: "Nothing",  icon: "/images/brands/nothing.svg",  color: "#E5E5E5" },
];

const doubled = [...brands, ...brands];

export default function Brands() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#02040F]" />

      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-14"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-4">
            <span className="section-label">Supported Brands</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl font-bold mb-4"
          >
            We Repair{" "}
            <span className="gradient-text">Every Brand</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Apple to Nothing — if it has a screen and a battery, we fix it.
          </motion.p>
        </motion.div>
      </div>

      {/* Marquee Row 1 */}
      <div className="marquee-container mb-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 w-max"
        >
          {doubled.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex items-center gap-3 px-6 py-3 rounded-xl whitespace-nowrap select-none"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Image
                src={brand.icon}
                alt={brand.name}
                width={18}
                height={18}
                className="opacity-80"
                unoptimized
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <span className="text-gray-300 text-sm font-medium">{brand.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 (reverse) */}
      <div className="marquee-container">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 w-max"
        >
          {[...doubled].reverse().map((brand, i) => (
            <div
              key={`${brand.name}-rev-${i}`}
              className="flex items-center gap-3 px-6 py-3 rounded-xl whitespace-nowrap select-none"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Image
                src={brand.icon}
                alt={brand.name}
                width={16}
                height={16}
                className="opacity-50"
                unoptimized
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <span className="text-gray-400 text-sm">{brand.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom note */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 mt-10 text-center">
        <p className="text-gray-600 text-sm">
          Don't see your brand?{" "}
          <a href="/contact" className="text-[#00AAFF] hover:underline">Contact us</a>{" "}
          — we most likely repair it too.
        </p>
      </div>
    </section>
  );
}
