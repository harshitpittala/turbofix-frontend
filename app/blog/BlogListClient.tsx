"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import CTA from "@/components/home/CTA";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import { blogs } from "@/data/blogs";

const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

export default function BlogListClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogs
    : blogs.filter((b) => b.category === activeCategory);

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
              <span className="section-label">Service Knowledge</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-5">
              Mobile Service{" "}
              <span className="gradient-text">Blog</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-xl max-w-2xl mx-auto">
              Expert guides, tips, and insights from Hyderabad's top mobile service technicians.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat ? "rgba(0,170,255,0.15)" : "rgba(255,255,255,0.03)",
                  border: activeCategory === cat ? "1px solid rgba(0,170,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  color: activeCategory === cat ? "#00AAFF" : "#9CA3AF",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="relative py-12 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blog, i) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="group rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Card gradient header */}
                <div
                  className="h-2"
                  style={{ background: "linear-gradient(90deg, #0066FF, #00AAFF)" }}
                />

                <div className="p-6">
                  {/* Category + read time */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg"
                      style={{ background: "rgba(0,170,255,0.1)", color: "#00AAFF", border: "1px solid rgba(0,170,255,0.2)" }}>
                      <Tag className="w-3 h-3" />
                      {blog.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h2 className="text-white font-semibold text-lg leading-snug mb-3 group-hover:text-[#00AAFF] transition-colors line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      {new Date(blog.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="flex items-center gap-1.5 text-sm font-medium text-[#00AAFF] hover:gap-2.5 transition-all duration-200"
                    >
                      Read more
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">No posts in this category yet.</div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
