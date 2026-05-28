"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL, WHATSAPP_URL } from "@/lib/config";
import {
  Smartphone, Battery, Camera, Droplets, Mic2, Wifi, Wrench,
  MonitorSmartphone, Check, ChevronRight, ChevronLeft, Zap,
  User, Phone, Mail, MapPin, Calendar, Clock, Star, Shield,
  CheckCircle, Sparkles, ArrowRight, HelpCircle,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface BookingData {
  brand: string;
  customBrand: string;
  model: string;
  services: string[];
  issueDesc: string;
  serviceType: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const brands = [
  {
    name: "Apple", logo: "https://cdn.simpleicons.org/apple/ffffff", color: "#A0A0A0",
    models: [
      "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
      "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
      "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
      "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13 Mini", "iPhone 13",
      "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12 Mini", "iPhone 12",
      "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11",
      "iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X",
      "iPhone SE (3rd Gen)", "iPhone SE (2nd Gen)",
    ],
  },
  {
    name: "Samsung", logo: "https://cdn.simpleicons.org/samsung/ffffff", color: "#1428A0",
    models: [
      "Galaxy S25 Ultra", "Galaxy S25+", "Galaxy S25",
      "Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24",
      "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23",
      "Galaxy S22 Ultra", "Galaxy S22+", "Galaxy S22",
      "Galaxy Z Fold 6", "Galaxy Z Fold 5", "Galaxy Z Fold 4",
      "Galaxy Z Flip 6", "Galaxy Z Flip 5", "Galaxy Z Flip 4",
      "Galaxy A55 5G", "Galaxy A35 5G", "Galaxy A25 5G", "Galaxy A15",
      "Galaxy M55", "Galaxy M54", "Galaxy M34",
      "Galaxy F55", "Galaxy F35", "Galaxy F15",
    ],
  },
  {
    name: "OnePlus", logo: "https://cdn.simpleicons.org/oneplus/ffffff", color: "#F5010C",
    models: [
      "OnePlus 13", "OnePlus 13R", "OnePlus 12", "OnePlus 12R",
      "OnePlus 11", "OnePlus 11R", "OnePlus 10 Pro", "OnePlus 10T",
      "OnePlus Nord 4", "OnePlus Nord 3", "OnePlus Nord CE 4",
      "OnePlus Nord CE 3 Lite", "OnePlus Nord CE 3",
      "OnePlus Open", "OnePlus Ace 3 Pro",
    ],
  },
  {
    name: "Xiaomi", logo: "https://cdn.simpleicons.org/xiaomi/ffffff", color: "#FF6900",
    models: [
      "Xiaomi 15 Ultra", "Xiaomi 15 Pro", "Xiaomi 15",
      "Xiaomi 14 Ultra", "Xiaomi 14 Pro", "Xiaomi 14",
      "Redmi Note 14 Pro+", "Redmi Note 14 Pro", "Redmi Note 14",
      "Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi Note 13",
      "POCO X7 Pro", "POCO X7", "POCO X6 Pro", "POCO F6 Pro", "POCO F6",
      "Redmi 14C", "Redmi 13C", "Redmi 13",
    ],
  },
  {
    name: "Vivo", logo: "https://cdn.simpleicons.org/vivo/ffffff", color: "#415FFF",
    models: [
      "Vivo X200 Pro", "Vivo X200", "Vivo X100 Pro", "Vivo X100",
      "Vivo V40 Pro", "Vivo V40", "Vivo V30 Pro", "Vivo V30",
      "Vivo V29 Pro", "Vivo V29", "Vivo V29e",
      "Vivo T3 Pro", "Vivo T3x", "Vivo T3 5G",
      "Vivo Y300 Pro", "Vivo Y200 Pro", "Vivo Y200e", "Vivo Y100",
      "Vivo iQOO 13", "Vivo iQOO 12", "Vivo iQOO Neo 9 Pro",
    ],
  },
  {
    name: "OPPO", logo: "https://cdn.simpleicons.org/oppo/ffffff", color: "#1D8348",
    models: [
      "OPPO Find X8 Pro", "OPPO Find X8", "OPPO Find X7 Pro",
      "OPPO Reno 13 Pro", "OPPO Reno 13", "OPPO Reno 12 Pro", "OPPO Reno 12",
      "OPPO Reno 11 Pro", "OPPO Reno 11",
      "OPPO F27 Pro+", "OPPO F27 Pro", "OPPO F25 Pro",
      "OPPO A3 Pro", "OPPO A3", "OPPO A79", "OPPO A60",
      "OPPO K13", "OPPO K12",
    ],
  },
  {
    name: "Realme", logo: "https://cdn.simpleicons.org/realme/ffffff", color: "#FFAD00",
    models: [
      "Realme GT 7 Pro", "Realme GT 6T", "Realme GT 6",
      "Realme GT Neo 6", "Realme GT Neo 5",
      "Realme 14 Pro+", "Realme 14 Pro", "Realme 14",
      "Realme 13 Pro+", "Realme 13 Pro", "Realme 13",
      "Realme 12 Pro+", "Realme 12 Pro", "Realme 12",
      "Realme C67", "Realme C55", "Realme C53", "Realme C35",
      "Realme Narzo 70 Pro", "Realme Narzo 70",
    ],
  },
  {
    name: "Motorola", logo: "https://cdn.simpleicons.org/motorola/ffffff", color: "#005EB8",
    models: [
      "Motorola Edge 50 Ultra", "Motorola Edge 50 Pro", "Motorola Edge 50 Fusion",
      "Motorola Edge 40 Pro", "Motorola Edge 40 Neo", "Motorola Edge 40",
      "Motorola Edge 30 Ultra", "Motorola Edge 30 Pro",
      "Motorola Moto G85", "Motorola Moto G75", "Motorola Moto G64",
      "Motorola Moto G54", "Motorola Moto G34",
      "Motorola Razr 50 Ultra", "Motorola Razr 50",
    ],
  },
  {
    name: "Google", logo: "https://cdn.simpleicons.org/google/ffffff", color: "#4285F4",
    models: [
      "Pixel 9 Pro Fold", "Pixel 9 Pro XL", "Pixel 9 Pro", "Pixel 9",
      "Pixel 8 Pro", "Pixel 8a", "Pixel 8",
      "Pixel 7 Pro", "Pixel 7a", "Pixel 7",
      "Pixel 6 Pro", "Pixel 6a", "Pixel 6",
      "Pixel Fold",
    ],
  },
  {
    name: "Other", logo: "", color: "#6B7280",
    models: [],
  },
];

const repairServices = [
  { id: "screen", icon: Smartphone, label: "Screen Replacement", color: "#0EA5E9" },
  { id: "battery", icon: Battery, label: "Battery Replacement", color: "#22C55E" },
  { id: "camera", icon: Camera, label: "Camera Repair", color: "#A78BFA" },
  { id: "water", icon: Droplets, label: "Water Damage", color: "#38BDF8" },
  { id: "speaker", icon: Mic2, label: "Speaker / Mic Fix", color: "#F59E0B" },
  { id: "charging", icon: Wifi, label: "Charging Port", color: "#EC4899" },
  { id: "back", icon: Wrench, label: "Back Panel", color: "#06B6D4" },
  { id: "software", icon: MonitorSmartphone, label: "Software / Data", color: "#84CC16" },
  { id: "other", icon: HelpCircle, label: "Other Repair", color: "#F97316" },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
];

const steps = [
  { label: "Device", desc: "Choose your brand & model" },
  { label: "Service", desc: "Select repairs needed" },
  { label: "Schedule", desc: "Pick a date & time" },
  { label: "Details", desc: "Your contact info" },
];

/* ─── Helpers ───────────────────────────────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any } },
  exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0, transition: { duration: 0.25 } }),
};

/* ─── Calendar picker ───────────────────────────────────────────────────── */
function CalendarPicker({ selected, onChange }: { selected: string; onChange: (d: string) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [viewDate, setViewDate] = useState(() => new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1));
  const [monthDir, setMonthDir] = useState(0);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const canGoPrev =
    new Date(year, month - 1, 1) >= new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1);

  const prevMonth = () => {
    if (!canGoPrev) return;
    setMonthDir(-1);
    setViewDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setMonthDir(1);
    setViewDate(new Date(year, month + 1, 1));
  };

  const monthName = viewDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl p-4 overflow-hidden"
      style={{
        background: "rgba(0,170,255,0.04)",
        border: "1px solid rgba(0,170,255,0.15)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          whileHover={canGoPrev ? { scale: 1.1 } : {}}
          whileTap={canGoPrev ? { scale: 0.9 } : {}}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-20"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.p
            key={monthName}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-semibold text-white"
          >
            {monthName}
          </motion.p>
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={nextMonth}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </motion.button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-[9px] text-gray-600 font-medium py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, x: monthDir * 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -monthDir * 20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-0.5"
        >
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split("T")[0];
            const isPast = date < tomorrow;
            const isSelected = dateStr === selected;
            const isToday = date.toDateString() === today.toDateString();

            return (
              <motion.button
                key={`${year}-${month}-${day}`}
                type="button"
                disabled={isPast}
                onClick={() => !isPast && onChange(dateStr)}
                whileHover={!isPast ? { scale: 1.15 } : {}}
                whileTap={!isPast ? { scale: 0.9 } : {}}
                className="aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all"
                style={{
                  background: isSelected
                    ? "linear-gradient(135deg, #0066FF, #00AAFF)"
                    : isToday
                    ? "rgba(0,170,255,0.08)"
                    : "transparent",
                  color: isSelected
                    ? "white"
                    : isPast
                    ? "#2D3748"
                    : isToday
                    ? "#00AAFF"
                    : "#D1D5DB",
                  boxShadow: isSelected ? "0 0 14px rgba(0,170,255,0.35)" : "none",
                  border: isToday && !isSelected ? "1px solid rgba(0,170,255,0.3)" : "1px solid transparent",
                  cursor: isPast ? "not-allowed" : "pointer",
                }}
              >
                {day}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Selected date display */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-3 pt-3 flex items-center gap-2"
            style={{ borderTop: "1px solid rgba(0,170,255,0.12)" }}
          >
            <Calendar className="w-3.5 h-3.5 text-[#00AAFF] shrink-0" />
            <span className="text-xs text-[#00AAFF] font-medium">
              {new Date(selected + "T00:00:00").toLocaleDateString("en-IN", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Step: Device ──────────────────────────────────────────────────────── */
function StepDevice({ data, setData }: { data: BookingData; setData: (d: Partial<BookingData>) => void }) {
  const selected = brands.find((b) => b.name === data.brand);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Select Brand</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {brands.map((brand) => (
            <motion.button
              key={brand.name}
              type="button"
              onClick={() => setData({ brand: brand.name, model: "", customBrand: "" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl transition-all duration-200"
              style={{
                background: data.brand === brand.name ? `${brand.color}15` : "rgba(255,255,255,0.03)",
                border: `1px solid ${data.brand === brand.name ? brand.color + "50" : "rgba(255,255,255,0.07)"}`,
                boxShadow: data.brand === brand.name ? `0 0 20px ${brand.color}20` : "none",
              }}
            >
              {data.brand === brand.name && (
                <div
                  className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: brand.color }}
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              )}
              {brand.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={brand.logo}
                  alt={brand.name}
                  width={28}
                  height={28}
                  className="object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
                />
              ) : (
                <span className="text-xl font-bold" style={{ color: brand.color }}>?</span>
              )}
              <span
                className="text-xs sm:text-sm font-medium"
                style={{ color: data.brand === brand.name ? brand.color : "#9CA3AF" }}
              >
                {brand.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && data.brand !== "Other" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Select Model</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,170,255,0.3) transparent" }}
            >
              {selected.models.map((model) => (
                <motion.button
                  key={model}
                  type="button"
                  onClick={() => setData({ model })}
                  whileHover={{ x: 3 }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-left transition-all"
                  style={{
                    background: data.model === model ? `${selected.color}12` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${data.model === model ? selected.color + "40" : "rgba(255,255,255,0.05)"}`,
                    color: data.model === model ? "white" : "#9CA3AF",
                  }}
                >
                  {model}
                  {data.model === model && (
                    <Check className="w-4 h-4 shrink-0" style={{ color: selected.color }} />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
        {data.brand === "Other" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">Brand Name *</h3>
              <input
                type="text"
                value={data.customBrand}
                onChange={(e) => setData({ customBrand: e.target.value })}
                placeholder="e.g. Infinix, Tecno, Itel, Lava, Poco…"
                className="input-glass"
              />
            </div>
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
                Model{" "}
                <span className="text-gray-600 normal-case tracking-normal">(optional)</span>
              </h3>
              <input
                type="text"
                value={data.model}
                onChange={(e) => setData({ model: e.target.value })}
                placeholder="e.g. Hot 40 Pro, Camon 30, Smart 8…"
                className="input-glass"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Step: Service ─────────────────────────────────────────────────────── */
function StepService({ data, setData }: { data: BookingData; setData: (d: Partial<BookingData>) => void }) {
  const toggle = (id: string) => {
    const curr = data.services;
    setData({ services: curr.includes(id) ? curr.filter((s) => s !== id) : [...curr, id] });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Select Repairs Needed</h3>
        <p className="text-gray-600 text-xs mb-5">
          Pick one or more issues — our expert technicians will diagnose and provide you with details.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {repairServices.map((svc) => {
            const Icon = svc.icon;
            const active = data.services.includes(svc.id);
            return (
              <motion.button
                key={svc.id}
                type="button"
                onClick={() => toggle(svc.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200"
                style={{
                  background: active ? `${svc.color}10` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active ? svc.color + "45" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: active ? `0 0 20px ${svc.color}15` : "none",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all"
                  style={{
                    background: active ? `${svc.color}20` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${active ? svc.color + "40" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: active ? svc.color : "#6B7280" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: active ? "white" : "#D1D5DB" }}>
                    {svc.label}
                  </p>
                </div>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all"
                  style={{
                    background: active ? svc.color : "transparent",
                    border: `2px solid ${active ? svc.color : "rgba(255,255,255,0.15)"}`,
                  }}
                >
                  {active && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
          Additional Details{" "}
          <span className="text-gray-600 normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          rows={4}
          value={data.issueDesc}
          onChange={(e) => setData({ issueDesc: e.target.value })}
          placeholder="Describe your issue in more detail — e.g. 'Screen cracked in top-left corner, touch still works'…"
          className="input-glass resize-none"
        />
      </div>
    </div>
  );
}

/* ─── Step: Schedule ────────────────────────────────────────────────────── */
function StepSchedule({ data, setData }: { data: BookingData; setData: (d: Partial<BookingData>) => void }) {
  return (
    <div className="space-y-8">
      {/* Service type — Doorstep only */}
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Service Type</h3>
        <div
          className="flex items-center gap-4 p-5 rounded-xl"
          style={{
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.35)",
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}
          >
            🛵
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Doorstep Pickup</p>
            <p className="text-gray-500 text-xs mt-0.5">
              We collect &amp; deliver — covers Hyderabad (10 km radius)
            </p>
          </div>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "#7C3AED" }}
          >
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Calendar date picker */}
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Select Date</h3>
        <CalendarPicker selected={data.date} onChange={(d) => setData({ date: d, time: "" })} />
      </div>

      {/* Time slots */}
      <AnimatePresence>
        {data.date && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Select Time</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {timeSlots.map((slot) => (
                <motion.button
                  key={slot}
                  type="button"
                  onClick={() => setData({ time: slot })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-2.5 rounded-xl text-xs sm:text-sm transition-all font-medium"
                  style={{
                    background: data.time === slot ? "rgba(0,170,255,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${data.time === slot ? "rgba(0,170,255,0.5)" : "rgba(255,255,255,0.05)"}`,
                    color: data.time === slot ? "#00AAFF" : "#9CA3AF",
                    boxShadow: data.time === slot ? "0 0 16px rgba(0,170,255,0.2)" : "none",
                  }}
                >
                  {slot}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Step: Details ─────────────────────────────────────────────────────── */
function StepDetails({ data, setData }: { data: BookingData; setData: (d: Partial<BookingData>) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="flex items-center gap-1.5 text-xs text-gray-400 mb-2 uppercase tracking-wider">
            <User className="w-3.5 h-3.5" /> Full Name *
          </label>
          <input
            type="text"
            required
            value={data.name}
            onChange={(e) => setData({ name: e.target.value })}
            placeholder="Arjun Reddy"
            className="input-glass"
          />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-xs text-gray-400 mb-2 uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" /> Phone Number *
          </label>
          <input
            type="tel"
            required
            value={data.phone}
            onChange={(e) => setData({ phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="input-glass"
          />
        </div>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-gray-400 mb-2 uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" /> Email Address *
        </label>
        <input
          type="email"
          required
          value={data.email}
          onChange={(e) => setData({ email: e.target.value })}
          placeholder="you@email.com"
          className="input-glass"
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs text-gray-400 mb-2 uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" /> Pickup Address *
        </label>
        <textarea
          rows={3}
          value={data.address}
          onChange={(e) => setData({ address: e.target.value })}
          placeholder="Door no., Street, Area, Hyderabad — 500xxx"
          className="input-glass resize-none"
        />
      </div>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl p-5 mt-6"
        style={{ background: "rgba(0,170,255,0.05)", border: "1px solid rgba(0,170,255,0.15)" }}
      >
        <h4 className="text-[#00AAFF] text-xs font-semibold uppercase tracking-wider mb-4">
          Booking Summary
        </h4>
        <div className="space-y-2.5 text-sm">
          {[
            {
              label: "Device",
              value: (() => {
                const brand = data.brand === "Other" ? data.customBrand : data.brand;
                return data.model ? `${brand} ${data.model}` : brand;
              })(),
            },
            {
              label: "Services",
              value: data.services.length
                ? repairServices.filter((s) => data.services.includes(s.id)).map((s) => s.label).join(", ")
                : "—",
            },
            { label: "Type", value: "Doorstep Pickup" },
            {
              label: "Date",
              value: data.date
                ? new Date(data.date + "T00:00:00").toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  })
                : "—",
            },
            { label: "Time", value: data.time || "—" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <span className="text-gray-500 shrink-0">{label}</span>
              <span className="text-gray-200 text-right text-xs leading-relaxed">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Success screen ────────────────────────────────────────────────────── */
function SuccessScreen({ data, orderId }: { data: BookingData; orderId: string }) {
  const refId = orderId;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="text-center py-12 px-4"
    >
      <div className="flex justify-center mb-8">
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-full blur-xl"
            style={{ background: "rgba(34,197,94,0.4)", transform: "scale(1.5)" }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.4)" }}
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <h2 className="font-display text-3xl font-bold text-white mb-3">Booking Confirmed!</h2>
        <p className="text-gray-400 mb-2 text-base">
          Hey <span className="text-white font-medium">{data.name}</span>, you're all set.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Confirmation sent to <span className="text-[#00AAFF]">{data.email}</span>
        </p>

        <div
          className="inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-8"
          style={{ background: "rgba(0,170,255,0.08)", border: "1px solid rgba(0,170,255,0.2)" }}
        >
          <Zap className="w-4 h-4 text-[#00AAFF]" />
          <div className="text-left">
            <p className="text-xs text-gray-500">Booking Reference</p>
            <p className="text-white font-mono font-bold text-sm">{refId}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-10 text-sm text-left max-w-sm mx-auto">
          {[
            { icon: "📱", label: "Device", value: `${data.brand === "Other" ? data.customBrand : data.brand} ${data.model}`.trim() },
            { icon: "🔧", label: "Services", value: `${data.services.length} repair${data.services.length > 1 ? "s" : ""}` },
            {
              icon: "📅",
              label: "Date",
              value: data.date
                ? new Date(data.date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
                : "—",
            },
            { icon: "⏰", label: "Time", value: data.time },
          ].map((item) => (
            <div key={item.label} className="glass rounded-xl p-3">
              <p className="text-lg mb-1">{item.icon}</p>
              <p className="text-gray-500 text-xs">{item.label}</p>
              <p className="text-white text-xs font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl p-5 mb-8 text-left max-w-sm mx-auto"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
            What Happens Next
          </p>
          {[
            "You'll receive an SMS & email confirmation",
            "Our technician will call 30 min before pickup",
            "Free diagnostic assessment — no payment yet",
            "Repair approved? We get to work immediately",
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2.5 mb-2 last:mb-0">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5"
                style={{ background: "rgba(0,170,255,0.15)", color: "#00AAFF" }}
              >
                {i + 1}
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{s}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
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
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */
export default function BookRepairClient() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [data, setData] = useState<BookingData>({
    brand: "", customBrand: "", model: "", services: [], issueDesc: "",
    serviceType: "pickup", date: "", time: "",
    name: "", phone: "", email: "", address: "",
  });

  const update = (partial: Partial<BookingData>) => setData((d) => ({ ...d, ...partial }));

  const canProceed = [
    data.brand !== "" &&
      (data.brand !== "Other" || data.customBrand.trim() !== "") &&
      (data.brand === "Other" || data.model !== ""),
    data.services.length > 0,
    data.date !== "" && data.time !== "",
    data.name !== "" && data.phone !== "" && data.email !== "" && data.address.trim() !== "",
  ];

  const goNext = () => {
    if (step < 3) { setDirection(1); setStep((s) => s + 1); }
    else handleSubmit();
  };
  const goPrev = () => { if (step > 0) { setDirection(-1); setStep((s) => s - 1); } };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        customer_name:    data.name,
        customer_phone:   data.phone,
        customer_email:   data.email,
        customer_address: data.address,
        device_brand:     data.brand === "Other" ? data.customBrand : data.brand,
        device_model:     data.model,
        services:         data.services,
        issue_description: data.issueDesc || null,
        service_type:     "pickup",
        pickup_address:   data.address,
        scheduled_date:   data.date,
        scheduled_time:   data.time,
      };

      const res = await fetch(`${API_URL}/api/orders`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Booking failed. Please try again.");

      setOrderId(result.data.order_id);
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.", {
        duration: 5000,
        style: { background: "#1a1a2e", color: "#fff", border: "1px solid rgba(239,68,68,0.3)" },
      });
    } finally {
      setLoading(false);
    }
  };

  const stepComponents = [
    <StepDevice key="device" data={data} setData={update} />,
    <StepService key="service" data={data} setData={update} />,
    <StepSchedule key="schedule" data={data} setData={update} />,
    <StepDetails key="details" data={data} setData={update} />,
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster position="top-right" />
      <div className="absolute inset-0 bg-[#02040F]" />
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 radial-glow opacity-50" />

      {/* Subtle background orbs */}
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none will-change-transform"
        style={{ background: "rgba(0,102,255,0.07)" }}
      />
      <motion.div
        animate={{ x: [0, -18, 0], y: [0, 25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none will-change-transform"
        style={{ background: "rgba(124,58,237,0.06)" }}
      />

      <div className="relative container max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Page heading */}
        {!submitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="section-label mb-4 inline-flex">Book a Repair</span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-3">
              Fix It{" "}
              <span className="gradient-text">Today</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Complete in under 2 minutes · Free diagnostics · No payment upfront
            </p>
          </motion.div>
        )}

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(0,170,255,0.4) 50%, transparent 100%)",
            }}
          />

          {submitted ? (
            <SuccessScreen data={data} orderId={orderId} />
          ) : (
            <>
              {/* Progress header */}
              <div
                className="px-5 sm:px-8 pt-7 pb-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center justify-between mb-5 overflow-x-auto pb-1">
                  {steps.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-1 sm:gap-2 shrink-0">
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={{
                            background: i < step
                              ? "linear-gradient(135deg,#22C55E,#16A34A)"
                              : i === step
                              ? "linear-gradient(135deg,#0066FF,#00AAFF)"
                              : "rgba(255,255,255,0.06)",
                            borderColor: i <= step ? "transparent" : "rgba(255,255,255,0.1)",
                            scale: i === step ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border"
                          style={{ color: i <= step ? "white" : "#6B7280" }}
                        >
                          {i < step ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                        </motion.div>
                        <span
                          className="text-[10px] mt-1.5 font-medium hidden sm:block"
                          style={{ color: i === step ? "#00AAFF" : i < step ? "#22C55E" : "#4B5563" }}
                        >
                          {s.label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <motion.div
                          className="h-px mx-1 sm:mx-2 hidden sm:block"
                          animate={{
                            background: i < step
                              ? "linear-gradient(90deg,#22C55E,rgba(34,197,94,0.3))"
                              : "rgba(255,255,255,0.06)",
                          }}
                          style={{ width: "clamp(16px, 6vw, 56px)" }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-white font-semibold text-base sm:text-lg">{steps[step].label}</h2>
                    <p className="text-gray-500 text-sm">{steps[step].desc}</p>
                  </div>
                  <span className="text-gray-600 text-xs font-mono shrink-0">
                    {step + 1} / {steps.length}
                  </span>
                </div>
              </div>

              {/* Form body */}
              <div className="px-5 sm:px-8 py-7 min-h-[420px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {stepComponents[step]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer nav */}
              <div
                className="px-5 sm:px-8 py-5 flex items-center justify-between gap-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <motion.button
                  type="button"
                  onClick={goPrev}
                  disabled={step === 0}
                  whileHover={step > 0 ? { scale: 1.02 } : {}}
                  whileTap={step > 0 ? { scale: 0.98 } : {}}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#9CA3AF",
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </motion.button>

                <div className="hidden sm:flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-[#00AAFF]" /> Secure
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400" /> 4.9 rated
                  </span>
                </div>

                <motion.button
                  type="button"
                  onClick={goNext}
                  disabled={!canProceed[step] || loading}
                  whileHover={canProceed[step] ? { scale: 1.02 } : {}}
                  whileTap={canProceed[step] ? { scale: 0.98 } : {}}
                  className="relative flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{
                    background: canProceed[step]
                      ? "linear-gradient(135deg,#0066FF,#00AAFF)"
                      : "rgba(255,255,255,0.07)",
                    boxShadow: canProceed[step] ? "0 0 20px rgba(0,170,255,0.3)" : "none",
                  }}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      {step === 3 ? "Confirm Booking" : "Continue"}
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                  {canProceed[step] && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.button>
              </div>
            </>
          )}
        </motion.div>

        {/* Trust bar */}
        {!submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-xs text-gray-600"
          >
            {["🔒 Secure booking", "🆓 Free diagnostics", "🛡 6-month warranty", "⚡ Same-day service"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
