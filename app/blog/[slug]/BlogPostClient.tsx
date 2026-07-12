"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import CTA from "@/components/home/CTA";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import type { BlogPost } from "@/data/blogs";
import { blogs } from "@/data/blogs";

interface Props {
  blog: BlogPost;
}

export default function BlogPostClient({ blog }: Props) {
  const related = blogs
    .filter((b) => b.slug !== blog.slug && b.category === blog.category)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#02040F]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#00AAFF] transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-5">
              <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg"
                style={{ background: "rgba(0,170,255,0.1)", color: "#00AAFF", border: "1px solid rgba(0,170,255,0.2)" }}>
                <Tag className="w-3 h-3" />
                {blog.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {blog.readTime}
              </span>
              <span className="text-xs text-gray-600">
                {new Date(blog.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
              {blog.title}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-gray-400 text-lg leading-relaxed">
              {blog.excerpt}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="relative h-px bg-gradient-to-r from-transparent via-[#00AAFF]/20 to-transparent" />
      </div>

      {/* Article Body */}
      <section className="relative py-14 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="container relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose-turbofix space-y-8">
            {blog.content.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
              >
                {section.heading && (
                  <h2 className="font-display text-2xl font-bold text-white mt-10 mb-3 first:mt-0">
                    {section.heading}
                  </h2>
                )}
                {section.subheading && (
                  <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-2">
                    {section.subheading}
                  </h3>
                )}
                {section.text && (
                  <p className="text-gray-400 leading-relaxed text-[1.05rem]">{section.text}</p>
                )}
                {section.list && (
                  <ul className="space-y-2.5 mt-3">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-400 text-[1rem]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00AAFF] mt-2.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.faq && (
                  <div className="mt-8 space-y-4">
                    <h2 className="font-display text-2xl font-bold text-white mb-4">
                      Frequently Asked Questions
                    </h2>
                    {section.faq.map((item, j) => (
                      <div
                        key={j}
                        className="rounded-xl p-5"
                        style={{ background: "rgba(0,170,255,0.04)", border: "1px solid rgba(0,170,255,0.12)" }}
                      >
                        <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Book Repair CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 rounded-2xl p-8 text-center"
            style={{ background: "rgba(0,102,255,0.06)", border: "1px solid rgba(0,170,255,0.2)" }}
          >
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Need a Visit? We Come to You.
            </h3>
            <p className="text-gray-400 mb-6">
              TurboFix offers doorstep mobile service across Hyderabad. Book online and we'll handle the rest.
            </p>
            <Link
              href="/book-a-visit"
              className="btn-neon inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white"
            >
              Book a Visit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-white mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-xl p-5 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span className="text-xs text-[#00AAFF] mb-2 block">{r.category}</span>
                    <h4 className="text-white text-sm font-medium leading-snug group-hover:text-[#00AAFF] transition-colors line-clamp-2">
                      {r.title}
                    </h4>
                    <span className="flex items-center gap-1 text-xs text-gray-600 mt-3">
                      <Clock className="w-3 h-3" />
                      {r.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
