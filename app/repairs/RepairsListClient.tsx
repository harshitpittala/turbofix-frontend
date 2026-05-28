"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CTA from "@/components/home/CTA";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import { brandData } from "@/data/brands";

export default function RepairsListClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">All Brands Repaired</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-5">
              Repair by <span className="gradient-text">Brand</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-xl max-w-2xl mx-auto">
              Expert repair specialists for every major smartphone brand in Hyderabad.
              OEM-quality parts, 6-month warranty, doorstep service.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Brand Grid */}
      <section className="relative py-16 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandData.map((brand, i) => (
              <motion.div
                key={brand.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/repairs/${brand.slug}`}
                  className="group block rounded-2xl p-7 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${brand.color}15`, border: `1px solid ${brand.color}25` }}
                    >
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={28}
                        height={28}
                        className="object-contain"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
                      />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold text-lg group-hover:text-[#00AAFF] transition-colors">
                        {brand.name}
                      </h2>
                      <p className="text-gray-500 text-xs">{brand.commonIssues.length} repair services</p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                    {brand.description.slice(0, 100)}...
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {brand.commonIssues.slice(0, 3).map((issue) => (
                      <span
                        key={issue.title}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{ background: `${brand.color}10`, color: brand.color, border: `1px solid ${brand.color}20` }}
                      >
                        {issue.title.split(" ").slice(0, 2).join(" ")}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-[#00AAFF] group-hover:gap-3 transition-all duration-200">
                    View {brand.name} repairs
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
