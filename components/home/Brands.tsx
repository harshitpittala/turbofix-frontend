"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInUp, staggerContainer, cn } from "@/lib/utils";

const brands = [
  { name: "Apple",    icon: "/images/brands/apple.webp",       color: "#A0A0A0" },
  { name: "Samsung",  icon: "/images/brands/samsung.webp",     color: "#1428A0" },
  { name: "OnePlus",  icon: "/images/brands/oneplus.webp",     color: "#F5010C" },
  { name: "Xiaomi",   icon: "/images/brands/xiaomi.webp",      color: "#FF6900" },
  // Nokia/Sony marks are solid-white SVGs (no full-color asset available) — need a colored
  // backdrop chip, since the marquee cards themselves are white/near-white. Kept several
  // brands apart from each other so the two similar navy chips don't sit side by side.
  { name: "Sony",     icon: "/images/brands/sony.svg",         color: "#003791", mono: true },
  { name: "OPPO",     icon: "/images/brands/oppo.webp",        color: "#1D8348" },
  { name: "Vivo",     icon: "/images/brands/vivo.webp",        color: "#415FFF" },
  { name: "Realme",   icon: "/images/brands/realme.webp",      color: "#FEC400" },
  { name: "Google",   icon: "/images/brands/google-pixel.webp", color: "#4285F4" },
  { name: "Motorola", icon: "/images/brands/motorola.webp",    color: "#EB5A1B" },
  { name: "Nothing",  icon: "/images/brands/nothing.png",      color: "#E5E5E5" },
  { name: "Nokia",    icon: "/images/brands/nokia.svg",        color: "#124191", mono: true },
];

function BrandIcon({
  brand,
  width,
  height,
  opacity,
}: {
  brand: (typeof brands)[number];
  width: number;
  height: number;
  opacity: string;
}) {
  const img = (
    <Image
      src={brand.icon}
      alt={brand.name}
      width={width}
      height={height}
      className={cn("object-contain", !brand.mono && opacity)}
      unoptimized
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
    />
  );

  if (!brand.mono) return img;

  return (
    <span
      className="flex items-center justify-center rounded-md shrink-0 px-1.5 py-1"
      style={{ background: brand.color }}
    >
      {img}
    </span>
  );
}

const doubled = [...brands, ...brands];

export default function Brands() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden border-t border-slate-100">
      <div className="absolute inset-0 bg-white" />

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
            className="font-display text-4xl md:text-5xl font-bold mb-4 text-slate-900"
          >
            We Service{" "}
            <span className="gradient-text">Every Brand</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-slate-600 text-lg max-w-xl mx-auto"
          >
            Apple to Nothing — if it has a screen and a battery, we service it.
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
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
              }}
            >
              <BrandIcon brand={brand} width={40} height={18} opacity="opacity-80" />
              <span className="text-slate-700 text-sm font-medium">{brand.name}</span>
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
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
              }}
            >
              <BrandIcon brand={brand} width={36} height={16} opacity="opacity-50" />
              <span className="text-slate-500 text-sm">{brand.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom note */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 mt-10 text-center">
        <p className="text-slate-500 text-sm">
          Don't see your brand?{" "}
          <a href="/contact" className="text-blue-700 hover:underline">Contact us</a>{" "}
          — we most likely service it too.
        </p>
      </div>
    </section>
  );
}
