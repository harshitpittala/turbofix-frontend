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
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">Service Knowledge</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-5 text-slate-900">
              Mobile Service{" "}
              <span className="gradient-text">Blog</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-slate-600 text-xl max-w-2xl mx-auto">
              Expert guides, tips, and insights from Hyderabad's top mobile service technicians.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative py-8 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat ? "rgba(37,99,235,0.1)" : "#FFFFFF",
                  border: activeCategory === cat ? "1px solid rgba(37,99,235,0.35)" : "1px solid #E2E8F0",
                  color: activeCategory === cat ? "#1D4ED8" : "#64748B",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="relative py-12 pb-28 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
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
                style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
              >
                {/* Card gradient header */}
                <div
                  className="h-2"
                  style={{ background: "linear-gradient(90deg, #1E3A8A, #2563EB)" }}
                />

                <div className="p-6">
                  {/* Category + read time */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg"
                      style={{ background: "rgba(37,99,235,0.08)", color: "#1D4ED8", border: "1px solid rgba(37,99,235,0.25)" }}>
                      <Tag className="w-3 h-3" />
                      {blog.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h2 className="text-slate-900 font-semibold text-lg leading-snug mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {new Date(blog.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:gap-2.5 transition-all duration-200"
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
            <div className="text-center py-20 text-slate-500">No posts in this category yet.</div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
