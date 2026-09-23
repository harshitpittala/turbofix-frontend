"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Zap, ArrowRight, Star, Shield, Clock, ChevronDown,
  ChevronLeft, Activity, MessageSquare, Calendar,
  Smartphone, MessageCircle,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/config";

/* ── Floating badges ─────────────────────────────────────────────────── */
const floatingBadges = [
  { icon: Shield, label: "Warranty Protected", color: "#059669", delay: 0 },
  { icon: Clock,  label: "Same Day Service",   color: "#2563EB", delay: 0.3 },
  { icon: Star,   label: "5-Star Rated",       color: "#B45309", delay: 0.6 },
];

/* ── Social-proof avatar data ────────────────────────────────────────── */
const avatarData = [
  { initial: "A", from: "#1E3A8A", to: "#2563EB" },
  { initial: "R", from: "#1D4ED8", to: "#3B82F6" },
  { initial: "S", from: "#0EA5E9", to: "#38BDF8" },
  { initial: "P", from: "#0284C7", to: "#0EA5E9" },
  { initial: "M", from: "#1E40AF", to: "#60A5FA" },
];

/* ── Screen transition variants ──────────────────────────────────────── */
const screenVariants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] as any } },
  exit:   { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" as any } },
};

/* ── Status bar (shared) — dark icons, the screen content behind it is light ── */
function StatusBar() {
  return (
    <div className="relative flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
      <span className="text-[10px] text-slate-900 font-semibold font-mono">9:41</span>
      <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[68px] h-[22px] rounded-full bg-black" />
      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-[2px]">
          {[3, 4, 5, 6].map((h) => (
            <div key={h} className="w-[2.5px] rounded-sm bg-slate-900" style={{ height: `${h}px` }} />
          ))}
        </div>
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M5.5 7.5a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#0F172A" />
          <path d="M3 5.5a3.5 3.5 0 015 0" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M0.5 3A6.5 6.5 0 0110.5 3" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <div className="flex items-center">
          <div className="w-[18px] h-[9px] rounded-[2px] border border-slate-900/60 relative p-[1.5px]">
            <div className="h-full rounded-[1px] bg-blue-600" style={{ width: "78%" }} />
          </div>
          <div className="w-[2px] h-[5px] bg-slate-900/40 rounded-r-sm ml-[1px]" />
        </div>
      </div>
    </div>
  );
}

/* ── SCREEN 1: Service Dashboard ──────────────────────────────────────── */
function Screen1() {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <p className="text-[8px] text-slate-500">Good morning ☀️</p>
          <p className="text-[11px] font-bold text-slate-900">TurboFix</p>
        </div>
        <div className="relative">
          <div className="w-[28px] h-[28px] rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00AAFF] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" fill="white" />
          </div>
          <div className="absolute -top-[3px] -right-[3px] w-[10px] h-[10px] rounded-full bg-red-500 border-[1.5px] border-white flex items-center justify-center">
            <span className="text-[5px] text-white font-bold leading-none">2</span>
          </div>
        </div>
      </div>

      {/* Active repair card */}
      <div
        className="rounded-xl p-2.5 shrink-0"
        style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(59,130,246,0.06))",
          border: "1px solid rgba(37,99,235,0.2)",
        }}
      >
        <div className="flex items-center gap-1 mb-1">
          <div className="w-[5px] h-[5px] rounded-full bg-blue-600 animate-pulse" />
          <span className="text-[7px] text-blue-700 font-bold uppercase tracking-wider">Active Service</span>
        </div>
        <p className="text-[9px] text-slate-900 font-semibold mb-1.5">iPhone 16 Pro — Screen Service</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(15,23,42,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #1D4ED8, #2563EB)" }}
              animate={{ width: ["65%", "78%", "65%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[7px] text-blue-700 font-mono shrink-0">~20 min</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="shrink-0">
        <p className="text-[7px] text-slate-500 uppercase tracking-wider mb-1.5">Quick Actions</p>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { icon: Calendar,     label: "Book",    color: "#2563EB" },
            { icon: Activity,     label: "Track",   color: "#0EA5E9" },
            { icon: MessageSquare,label: "Support", color: "#1D4ED8" },
          ].map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 p-2 rounded-xl"
              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: `${color}18` }}
              >
                <Icon className="w-3 h-3" style={{ color }} />
              </div>
              <span className="text-[7px] text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* My devices */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[7px] text-slate-500 uppercase tracking-wider">My Devices</p>
          <span className="text-[7px] text-blue-700">Manage →</span>
        </div>
        {[
          { name: "iPhone 16 Pro",  status: "In Service", color: "#2563EB" },
          { name: "Samsung S25",    status: "Protected",  color: "#059669" },
        ].map(({ name, status, color }) => (
          <div
            key={name}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg mb-1.5"
            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
          >
            <Smartphone className="w-3 h-3 text-slate-500 shrink-0" />
            <p className="text-[8px] text-slate-900 font-medium flex-1 truncate">{name}</p>
            <span
              className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
              style={{ background: `${color}18`, color }}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SCREEN 2: Live Service Tracking ──────────────────────────────────── */
function Screen2() {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Header */}
      <div className="flex items-center gap-1.5 shrink-0">
        <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
        <p className="text-[10px] font-bold text-slate-900 flex-1">Service Tracker</p>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)" }}>
          <div className="w-[4px] h-[4px] rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[6.5px] text-blue-700 font-semibold">Live</span>
        </div>
      </div>

      {/* Tracking card */}
      <div
        className="rounded-xl p-2.5 shrink-0"
        style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(59,130,246,0.05))",
          border: "1px solid rgba(37,99,235,0.18)",
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[7px] text-blue-700 font-bold uppercase tracking-wider">#TFX-9821</span>
          <span className="text-[6.5px] text-slate-500 font-mono">Today, 10:15 AM</span>
        </div>
        <p className="text-[9px] text-slate-900 font-semibold mb-2">iPhone 16 Pro — Screen Service</p>

        {/* Steps */}
        <div className="flex items-start gap-0.5 mb-2">
          {[
            { label: "Received",  done: true  },
            { label: "Diagnosis", done: true  },
            { label: "Service",   active: true },
            { label: "Done",      done: false  },
          ].map((step, i) => (
            <div key={step.label} className="flex items-start flex-1 flex-col items-center gap-0.5 relative">
              <div className="flex items-center w-full">
                <div
                  className="w-[8px] h-[8px] rounded-full flex items-center justify-center shrink-0 relative z-10"
                  style={{
                    background: step.done ? "#059669" : (step as any).active ? "#2563EB" : "rgba(15,23,42,0.1)",
                    boxShadow: (step as any).active ? "0 0 4px rgba(37,99,235,0.5)" : "none",
                  }}
                >
                  {step.done && <span style={{ fontSize: "4px", color: "white" }}>✓</span>}
                </div>
                {i < 3 && (
                  <div
                    className="flex-1 h-[1.5px]"
                    style={{ background: step.done ? "#059669" : "rgba(15,23,42,0.1)" }}
                  />
                )}
              </div>
              <span className="text-[5.5px] text-slate-500 text-center leading-none mt-0.5 whitespace-nowrap">
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(15,23,42,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #1D4ED8, #2563EB)" }}
              animate={{ width: ["68%", "80%", "68%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[7px] text-blue-700 font-mono shrink-0">~20 min</span>
        </div>
      </div>

      {/* Technician */}
      <div
        className="rounded-xl p-2 shrink-0"
        style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
      >
        <p className="text-[6.5px] text-slate-500 uppercase tracking-wider mb-1.5">Your Technician</p>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#1D4ED8] to-[#3B82F6] flex items-center justify-center shrink-0">
            <span className="text-[8px] text-white font-bold">VR</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[8px] text-slate-900 font-semibold">Vikram Rao</p>
            <div className="flex items-center gap-1">
              <Star className="w-2 h-2 fill-amber-400 text-amber-400" />
              <span className="text-[7px] text-slate-500">4.9 · Verified Tech</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="w-[5px] h-[5px] rounded-full bg-blue-500 ml-auto mb-0.5 animate-pulse" />
            <span className="text-[6px] text-blue-700">Working</span>
          </div>
        </div>
        <p className="text-[7px] text-slate-500 mt-1.5 leading-relaxed">
          "Screen panel replaced. Running display tests now…"
        </p>
      </div>

      {/* Timeline */}
      <div className="flex-1 flex flex-col min-h-0">
        <p className="text-[6.5px] text-slate-500 uppercase tracking-wider mb-1.5">Timeline</p>
        {[
          { time: "09:30",  label: "Device received",     done: true  },
          { time: "09:45",  label: "Diagnosis complete",  done: true  },
          { time: "10:15",  label: "Screen service started", active: true },
          { time: "~10:35", label: "Quality check",       done: false },
        ].map(({ time, label, done, active }) => (
          <div key={time} className="flex items-start gap-2 mb-1.5">
            <div
              className="w-[6px] h-[6px] rounded-full mt-0.5 shrink-0"
              style={{ background: done ? "#059669" : active ? "#2563EB" : "rgba(15,23,42,0.12)" }}
            />
            <p
              className="flex-1 text-[7px] leading-none"
              style={{ color: done ? "#475569" : active ? "#1D4ED8" : "#94A3B8" }}
            >
              {label}
            </p>
            <span className="text-[6px] text-slate-500 font-mono shrink-0">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SCREEN 3: Services, Warranty & Diagnostics ──────────────────────── */
function Screen3() {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <p className="text-[10px] font-bold text-slate-900">Services</p>
        <div
          className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full"
          style={{ background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.22)" }}
        >
          <Star className="w-2 h-2 fill-amber-400 text-amber-400" />
          <span className="text-[7px] text-amber-700 font-bold">4.9</span>
        </div>
      </div>

      {/* Warranty card */}
      <div
        className="rounded-xl p-2.5 shrink-0"
        style={{ background: "rgba(5,150,105,0.07)", border: "1px solid rgba(5,150,105,0.18)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(5,150,105,0.14)" }}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[8px] text-emerald-700 font-bold">Warranty Active</p>
            <p className="text-[7px] text-slate-500">6-month coverage · Next service free</p>
          </div>
          <div className="w-[5px] h-[5px] rounded-full bg-emerald-500 animate-pulse shrink-0" />
        </div>
      </div>

      {/* Diagnostics */}
      <div
        className="rounded-xl p-2 shrink-0"
        style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)" }}
      >
        <p className="text-[6.5px] text-blue-700 font-semibold uppercase tracking-wider mb-1.5">
          Device Diagnostics
        </p>
        <div className="grid grid-cols-4 gap-1">
          {[
            { label: "Screen",  val: "85%",  color: "#2563EB" },
            { label: "Battery", val: "62%",  color: "#1D4ED8" },
            { label: "Camera",  val: "OK",   color: "#3B82F6" },
            { label: "Temp",    val: "32°C", color: "#0EA5E9" },
          ].map(({ label, val, color }) => (
            <div key={label} className="text-center p-1 rounded-lg" style={{ background: "#F8FAFC" }}>
              <div className="text-[8px] font-bold leading-none mb-0.5" style={{ color }}>{val}</div>
              <div className="text-[6px] text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services list */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[6.5px] text-slate-500 uppercase tracking-wider">Our Services</p>
          <span className="text-[7px] text-blue-700">All →</span>
        </div>
        {[
          { icon: "🖥️", label: "Screen Replacement" },
          { icon: "🔋", label: "Battery Replacement" },
          { icon: "📷", label: "Camera Service" },
          { icon: "💧", label: "Water Damage" },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg mb-1"
            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
          >
            <span className="text-[10px] shrink-0">{icon}</span>
            <p className="text-[7.5px] text-slate-700 font-medium flex-1 truncate">{label}</p>
          </div>
        ))}
      </div>

      {/* Customer review */}
      <div
        className="rounded-xl p-2 shrink-0"
        style={{ background: "rgba(217,119,6,0.05)", border: "1px solid rgba(217,119,6,0.12)" }}
      >
        <div className="flex items-center gap-0.5 mb-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-2 h-2 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-[7px] text-slate-700 leading-relaxed">"Fixed my iPhone in just 25 minutes!"</p>
        <p className="text-[6.5px] text-slate-500 mt-0.5">— Arjun R. · 2 days ago</p>
      </div>
    </div>
  );
}

/* ── Phone mockup with cycling screens ───────────────────────────────── */
function PhoneMockup() {
  const [screen, setScreen] = useState(0);
  const TOTAL = 3;

  useEffect(() => {
    const id = setInterval(() => setScreen((s) => (s + 1) % TOTAL), 4800);
    return () => clearInterval(id);
  }, []);

  const screens = [<Screen1 key={0} />, <Screen2 key={1} />, <Screen3 key={2} />];

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 will-change-transform"
    >
      {/* Phone frame — kept dark; a device bezel reads as hardware, not page theme */}
      <div
        className="relative w-[240px] sm:w-[260px] h-[500px] sm:h-[560px] rounded-[3.5rem]"
        style={{
          background: "linear-gradient(145deg, #1e2340 0%, #0d1020 100%)",
          border: "2px solid rgba(255,255,255,0.10)",
          boxShadow:
            "0 20px 50px rgba(15,23,42,0.35), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* Screen area — light app UI */}
        <div className="absolute inset-[3px] rounded-[3.2rem] overflow-hidden bg-white flex flex-col">

          {/* Status bar — always visible */}
          <StatusBar />

          {/* Screen indicator dots */}
          <div className="flex items-center justify-center gap-1.5 pb-1.5 shrink-0">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  width:      i === screen ? 14 : 5,
                  background: i === screen ? "#2563EB" : "rgba(15,23,42,0.15)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-[3.5px] rounded-full cursor-pointer"
                onClick={() => setScreen(i)}
              />
            ))}
          </div>

          {/* Cycling screen content */}
          <div className="relative flex-1 overflow-hidden px-3.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                variants={screenVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 px-3.5 pb-1 flex flex-col"
              >
                {screens[screen]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-2 shrink-0">
            <div className="w-14 h-[3px] rounded-full bg-slate-300" />
          </div>
        </div>

        {/* Side buttons (on the dark bezel) */}
        <div className="absolute -right-px top-28 w-[3px] h-10 rounded-l-full bg-white/15" />
        <div className="absolute -left-px top-20 w-[3px] h-8 rounded-r-full bg-white/15" />
        <div className="absolute -left-px top-32 w-[3px] h-14 rounded-r-full bg-white/15" />
        <div className="absolute -left-px top-48 w-[3px] h-14 rounded-r-full bg-white/15" />
      </div>

      {/* Soft contact shadow under phone (not a colored glow) */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-44 h-4 rounded-full blur-xl"
        style={{ background: "rgba(15,23,42,0.14)" }}
      />
    </motion.div>
  );
}

/* ── Hero section ────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />

      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center min-h-[80vh]">

          {/* ── Left: copy ─────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="relative z-10"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="section-label">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                Rated 4.9★ by 1,000+ Hyderabad Customers
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-sm font-semibold uppercase tracking-wider text-blue-700 mb-3"
            >
              Doorstep Mobile Service in Hyderabad
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight text-slate-900"
            >
              We Service Every
              <br />
              <span className="gradient-text">
                <TypeAnimation
                  sequence={[
                    "Cracked Screen.", 2000,
                    "Dead Battery.",   2000,
                    "Broken Camera.",  2000,
                    "Damaged Port.",   2000,
                    "Water Damage.",   2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-slate-600 text-base lg:text-lg xl:text-xl leading-relaxed mb-10 max-w-lg"
            >
              Premium mobile service with{" "}
              <span className="text-slate-900 font-medium">trained technicians</span>,{" "}
              <span className="text-slate-900 font-medium">genuine OEM parts</span>, and
              transparent pricing — most visits completed in about 30 minutes.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12">
              <Link
                href="/book-a-visit"
                className="btn-neon px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl font-semibold text-white flex items-center gap-2 sm:gap-2.5 group text-sm sm:text-base"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" fill="white" />
                Book a Visit Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl font-semibold text-white flex items-center gap-2 sm:gap-2.5 text-sm sm:text-base transition-transform hover:-translate-y-0.5"
                style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.3)" }}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                WhatsApp Enquire
              </a>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-slate-500 text-xs sm:text-[13px] leading-relaxed max-w-xl mb-8 sm:mb-10"
            >
              TurboFix is an independent provider of on-site hardware modification and component replacement
              services. TurboFix is not an authorized service provider, partner, or affiliate of Apple Inc.,
              Samsung Electronics, OnePlus, Xiaomi, Google Inc., or any other device manufacturer. All third-party
              trademarks, brand names, and logos are properties of their respective owners and are utilized here
              for purely informational hardware compatibility descriptions.
            </motion.p>

            {/* ── Social proof ──────────────────────────────────────── */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-5 sm:gap-6">
              <div className="flex items-center gap-3">
                {/* Avatars with colored initials */}
                <div className="flex -space-x-2.5">
                  {avatarData.map(({ initial, from, to }, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[2.5px] border-slate-50 flex items-center justify-center shrink-0"
                      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                    >
                      <span className="text-[9px] sm:text-[10px] text-white font-bold leading-none select-none">
                        {initial}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stars + label */}
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400 drop-shadow-sm"
                      />
                    ))}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600">
                    <span className="text-slate-900 font-semibold">4.9</span>
                    {" · "}1,000+ happy customers
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-300 hidden sm:block" />

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="text-blue-700 font-semibold">30 min</span>
                average service time
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: phone ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex justify-center items-center mt-8 lg:mt-0"
          >
            {/* Orbit rings — subtle, monochrome */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] sm:w-[380px] h-[340px] sm:h-[380px] rounded-full will-change-transform"
              style={{ border: "1px dashed rgba(15,23,42,0.08)" }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[420px] sm:w-[460px] h-[420px] sm:h-[460px] rounded-full will-change-transform"
              style={{ border: "1px dashed rgba(37,99,235,0.08)" }}
            />

            <PhoneMockup />

            {/* Floating badges */}
            {floatingBadges.map(({ icon: Icon, label, color, delay }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: delay + 0.8 },
                  scale:   { duration: 0.5, delay: delay + 0.8 },
                  y:       { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay },
                }}
                className="absolute glass-strong rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2"
                style={{
                  border:    `1px solid ${color}30`,
                  top:       i === 0 ? "12%" : i === 1 ? "78%" : "47%",
                  left:      i === 0 ? "-5%" : i === 1 ? "-10%" : "auto",
                  right:     i === 2 ? "-5%" : "auto",
                }}
              >
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}18` }}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color }} />
                </div>
                <span className="text-[10px] sm:text-xs text-slate-900 font-medium whitespace-nowrap">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
