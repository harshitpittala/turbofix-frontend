"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Zap, Menu, X, ChevronRight, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Brands",   href: "/brands" },
  { label: "About",    href: "/about" },
  { label: "Blog",     href: "/blog" },
  { label: "FAQ",      href: "/faq" },
  { label: "Contact",  href: "/contact" },
];

const mobileLinks = [
  { label: "Home",          href: "/" },
  { label: "Services",      href: "/services" },
  { label: "Brands",        href: "/brands" },
  { label: "About",         href: "/about" },
  { label: "Blog",          href: "/blog" },
  { label: "FAQ",           href: "/faq" },
  { label: "Contact",       href: "/contact" },
  { label: "Areas We Cover", href: "/locations" },
  { label: "Book a Visit",  href: "/book-a-visit" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const lastScrollY = useRef(0);
  const pathname    = usePathname();
  const { scrollY } = useScroll();
  const isLight = pathname === "/book-a-visit";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current;
    if (latest > prev && latest > 80) setHidden(true);
    else setHidden(false);
    setScrolled(latest > 20);
    lastScrollY.current = latest;
  });

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !isLight ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", scrolled || isLight ? "py-3" : "py-5")}
      >
        {/* Background */}
        {isLight ? (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xl border-b border-gray-200" />
        ) : (
          <div
            className={cn(
              "absolute inset-0 transition-all duration-500",
              scrolled ? "backdrop-blur-xl bg-[#02040F]/80 border-b border-white/5" : "bg-transparent",
            )}
          />
        )}

        <div className="container relative flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00AAFF] group-hover:shadow-neon-blue transition-all duration-300" />
              <div className="absolute inset-0 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00AAFF] opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
            </div>
            <div>
              <span className={cn("font-display font-800 text-xl tracking-tight", isLight ? "text-gray-900" : "text-white")}>
                Turbo<span className="gradient-text-blue">Fix</span>
              </span>
              <div className={cn("text-[9px] font-mono tracking-widest leading-none -mt-0.5", isLight ? "text-gray-400" : "text-gray-500")}>
                HYDERABAD
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-[#0066FF]"
                    : isLight
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-gray-400 hover:text-white",
                )}
              >
                {(pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(0,170,255,0.08)", border: "1px solid rgba(0,170,255,0.2)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918639605147"
              className={cn(
                "flex items-center gap-2 text-sm transition-colors",
                isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white",
              )}
            >
              <Phone className="w-4 h-4 text-[#00AAFF]" />
              +91 86396 05147
            </a>
            <Link
              href="/book-a-visit"
              className="btn-neon px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2"
            >
              Book a Visit
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors",
              isLight ? "bg-gray-100 border border-gray-200 text-gray-600 hover:text-gray-900" : "glass text-gray-300 hover:text-white",
            )}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 lg:hidden overflow-y-auto"
              style={{ background: "rgba(5, 10, 26, 0.98)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                <nav className="flex flex-col gap-1.5 flex-1">
                  {mobileLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                          pathname === link.href
                            ? "bg-[#00AAFF]/10 text-[#00AAFF] border border-[#00AAFF]/20"
                            : "text-gray-400 hover:text-white hover:bg-white/5",
                        )}
                      >
                        {link.label}
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-3 mt-4"
                >
                  <a href="tel:+918639605147" className="flex items-center gap-3 px-4 py-3 rounded-xl glass text-sm text-gray-300">
                    <Phone className="w-4 h-4 text-[#00AAFF]" />
                    +91 86396 05147
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
