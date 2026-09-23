"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/config";
import { CheckCircle, Zap, Sparkles, ArrowRight } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface SuccessData {
  orderId:  string;
  name:     string;
  email:    string;
  brand:    string;
  model:    string;
  services: string[];
  date:     string;
  time:     string;
}

/* ─── Service label map ─────────────────────────────────────────────────── */
const SERVICE_LABELS: Record<string, string> = {
  screen:   "Screen Replacement",
  battery:  "Battery Replacement",
  camera:   "Camera Service",
  water:    "Water Damage",
  speaker:  "Speaker / Mic Service",
  charging: "Charging Port",
  back:     "Back Panel",
  software: "Software / Data",
  other:    "Other Service",
};

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function fmtDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit", month: "short",
  });
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function SuccessPageClient() {
  const router = useRouter();
  const [data, setData]   = useState<SuccessData | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("tfx_booking_success");
      if (!raw) { router.replace("/book-a-visit"); return; }
      setData(JSON.parse(raw));
    } catch {
      router.replace("/book-a-visit");
      return;
    }
    setReady(true);
  }, [router]);

  /* Loading spinner while reading sessionStorage */
  if (!ready || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 rounded-full"
          style={{ borderColor: "rgba(37,99,235,0.2)", borderTopColor: "#2563EB" }}
        />
      </div>
    );
  }

  const serviceCount = data.services.length;
  const deviceLabel  = [data.brand, data.model].filter(Boolean).join(" ");

  const infoCards = [
    { icon: "📱", label: "Device",   value: deviceLabel || "—" },
    { icon: "🔧", label: "Services", value: `${serviceCount} service${serviceCount !== 1 ? "s" : ""}` },
    { icon: "📅", label: "Date",     value: data.date ? fmtDate(data.date) : "—" },
    { icon: "⏰", label: "Time",     value: data.time || "—" },
  ];

  const nextSteps = [
    "You'll receive an SMS & email confirmation",
    "Our technician will call 30 min before pickup",
    "Free diagnostic assessment — no payment yet",
    "Approved? We get to work immediately",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />

      <div className="relative container max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 20px 50px rgba(15,23,42,0.1)",
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.5) 50%, transparent 100%)",
            }}
          />

          <div className="text-center py-12 px-6 sm:px-10">

            {/* ── Success icon ── */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
                  className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(5,150,105,0.1)",
                    border: "2px solid rgba(5,150,105,0.3)",
                  }}
                >
                  <CheckCircle className="w-10 h-10 text-emerald-700" />
                </motion.div>
              </div>
            </div>

            {/* ── Heading ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                Booking Confirmed!
              </h1>
              <p className="text-slate-500 mb-2 text-base">
                Hey <span className="text-slate-900 font-semibold">{data.name}</span>, you&apos;re all set.
              </p>
              <p className="text-slate-500 text-sm mb-8">
                Confirmation sent to{" "}
                <span className="text-blue-700">{data.email}</span>
              </p>

              {/* ── Booking reference ── */}
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-8"
                style={{
                  background: "rgba(37,99,235,0.06)",
                  border: "1px solid rgba(37,99,235,0.2)",
                }}
              >
                <Zap className="w-4 h-4 text-blue-700 shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-slate-500">Booking Reference</p>
                  <p className="text-slate-900 font-mono font-bold text-sm tracking-wide">
                    {data.orderId}
                  </p>
                </div>
              </div>

              {/* ── 2×2 detail cards ── */}
              <div className="grid grid-cols-2 gap-3 mb-10 text-left max-w-sm mx-auto">
                {infoCards.map((card) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="rounded-xl p-3"
                    style={{
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <p className="text-lg mb-1">{card.icon}</p>
                    <p className="text-slate-500 text-xs">{card.label}</p>
                    <p className="text-slate-900 text-xs font-semibold mt-0.5">{card.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* ── Services list (if more than 1) ── */}
              {serviceCount > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-xl p-4 mb-6 text-left max-w-sm mx-auto"
                  style={{
                    background: "rgba(37,99,235,0.05)",
                    border: "1px solid rgba(37,99,235,0.15)",
                  }}
                >
                  <p className="text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
                    Services Requested
                  </p>
                  <div className="space-y-1">
                    {data.services.map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "#2563EB" }}
                        />
                        <span className="text-slate-700 text-xs">
                          {SERVICE_LABELS[s] ?? s}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── What Happens Next ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="rounded-xl p-5 mb-8 text-left max-w-sm mx-auto"
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                }}
              >
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-4">
                  What Happens Next
                </p>
                {nextSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5"
                      style={{ background: "rgba(37,99,235,0.15)", color: "#2563EB" }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{step}</p>
                  </div>
                ))}
              </motion.div>

              {/* ── Action buttons ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#25D366" }}
                >
                  <Sparkles className="w-4 h-4" />
                  WhatsApp Us
                </a>
                <a
                  href="/"
                  className="btn-outline-neon flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
                >
                  Back to Home
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* ── Trust strip ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="mt-8 pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500"
                style={{ borderTop: "1px solid #E2E8F0" }}
              >
                {["🛡 6-month warranty", "🔒 Secure booking", "🆓 Free diagnostics", "✅ No fix, no fee"].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </motion.div>

              <p className="text-center text-slate-500 text-xs mt-4">
                <a href="/no-fix-no-fee-policy" className="hover:text-slate-600 underline">
                  Read our No Fix, No Fee Policy
                </a>
              </p>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
