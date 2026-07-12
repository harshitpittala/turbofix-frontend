"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL, WHATSAPP_URL } from "@/lib/config";
import {
  Smartphone, Battery, Camera, Droplets, Mic2, Wifi, Wrench,
  MonitorSmartphone, Check, ChevronRight, ChevronLeft, ChevronDown,
  User, Phone, Mail, MapPin, Calendar, Shield, HelpCircle, MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  consent: boolean;
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const brands = [
  {
    name: "Apple", logo: "/images/brands/apple.svg", color: "#4B5563",
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
    name: "Samsung", logo: "/images/brands/samsung.svg", color: "#1428A0",
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
    name: "OnePlus", logo: "/images/brands/oneplus.svg", color: "#F5010C",
    models: [
      "OnePlus 13", "OnePlus 13R", "OnePlus 12", "OnePlus 12R",
      "OnePlus 11", "OnePlus 11R", "OnePlus 10 Pro", "OnePlus 10T",
      "OnePlus Nord 4", "OnePlus Nord 3", "OnePlus Nord CE 4",
      "OnePlus Nord CE 3 Lite", "OnePlus Nord CE 3",
      "OnePlus Open", "OnePlus Ace 3 Pro",
    ],
  },
  {
    name: "Xiaomi", logo: "/images/brands/xiaomi.svg", color: "#FF6900",
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
    name: "Vivo", logo: "/images/brands/vivo.svg", color: "#415FFF",
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
    name: "OPPO", logo: "/images/brands/oppo.svg", color: "#1D8348",
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
    name: "Realme", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Ctext x='14' y='22' text-anchor='middle' fill='white' font-size='22' font-weight='900' font-family='Arial,sans-serif'%3ER%3C/text%3E%3C/svg%3E", color: "#FFAD00",
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
    name: "Motorola", logo: "/images/brands/motorola.svg", color: "#005EB8",
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
    name: "Google", logo: "/images/brands/google.svg", color: "#4285F4",
    models: [
      "Pixel 9 Pro Fold", "Pixel 9 Pro XL", "Pixel 9 Pro", "Pixel 9",
      "Pixel 8 Pro", "Pixel 8a", "Pixel 8",
      "Pixel 7 Pro", "Pixel 7a", "Pixel 7",
      "Pixel 6 Pro", "Pixel 6a", "Pixel 6",
      "Pixel Fold",
    ],
  },
  {
    name: "Nothing", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Ctext x='14' y='22' text-anchor='middle' fill='white' font-size='22' font-weight='900' font-family='Arial,sans-serif'%3EN%3C/text%3E%3C/svg%3E", color: "#FF3B30",
    models: [
      "Nothing Phone (1)", "Nothing Phone (2)", "Nothing Phone (2a)",
      "Nothing Phone (2a Plus)", "Nothing Phone (3)",
      "Nothing Phone (3a)", "Nothing Phone (3a Pro)",
      "CMF Phone 1", "CMF Phone 2",
    ],
  },
  {
    name: "ASUS", logo: "/images/brands/asus.svg", color: "#0055A8",
    models: [
      "ROG Phone 8", "ROG Phone 7", "ROG Phone 6", "ROG Phone 5",
      "Zenfone 10", "Zenfone 9", "Zenfone 8",
    ],
  },
  {
    name: "Sony", logo: "/images/brands/sony.svg", color: "#003087",
    models: [
      "Xperia 1 VI", "Xperia 1 V",
      "Xperia 5 V", "Xperia 10 VI",
    ],
  },
  {
    name: "Nokia", logo: "/images/brands/nokia.svg", color: "#124191",
    models: [
      "Nokia XR21", "Nokia X30", "Nokia G60", "Nokia G42", "Nokia C32",
    ],
  },
  {
    name: "Huawei", logo: "/images/brands/huawei.svg", color: "#CF0A2C",
    models: [
      "Pura 70", "Mate 60 Pro", "Mate 50 Pro",
      "P60 Pro", "P50 Pro",
    ],
  },
  {
    name: "Honor", logo: "/images/brands/honor.svg", color: "#C1272D",
    models: [
      "Magic 6 Pro", "Magic 5 Pro",
      "Honor 200 Pro", "Honor 200", "Honor 90",
    ],
  },
  {
    name: "iQOO", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 20'%3E%3Ctext x='22' y='15' text-anchor='middle' fill='white' font-size='13' font-weight='700' font-family='Arial,sans-serif'%3EiQOO%3C/text%3E%3C/svg%3E", color: "#0055FF",
    models: [
      "iQOO 13", "iQOO 12",
      "iQOO Neo 10", "iQOO Neo 9",
      "iQOO Z9 Turbo", "iQOO Z9", "iQOO Z7",
    ],
  },
  {
    name: "POCO", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 20'%3E%3Ctext x='22' y='15' text-anchor='middle' fill='white' font-size='13' font-weight='700' font-family='Arial,sans-serif'%3EPOCO%3C/text%3E%3C/svg%3E", color: "#B08D00",
    models: [
      "POCO F6 Pro", "POCO F6", "POCO F5",
      "POCO X6 Pro", "POCO X6",
      "POCO M6", "POCO C65",
    ],
  },
  {
    name: "Infinix", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Ctext x='14' y='22' text-anchor='middle' fill='white' font-size='22' font-weight='900' font-family='Arial,sans-serif'%3EX%3C/text%3E%3C/svg%3E", color: "#DA291C",
    models: [
      "GT 20 Pro", "Note 50", "Note 40 Pro",
      "Zero 30", "Smart 8",
    ],
  },
  {
    name: "Tecno", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 20'%3E%3Ctext x='26' y='15' text-anchor='middle' fill='white' font-size='11' font-weight='700' font-family='Arial,sans-serif'%3ETECNO%3C/text%3E%3C/svg%3E", color: "#0070C0",
    models: [
      "Phantom V Fold", "Camon 40", "Camon 30",
      "Pova 6", "Spark 20",
    ],
  },
  {
    name: "Lava", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 20'%3E%3Ctext x='22' y='15' text-anchor='middle' fill='white' font-size='13' font-weight='700' font-family='Arial,sans-serif'%3ELAVA%3C/text%3E%3C/svg%3E", color: "#E31E24",
    models: [
      "Storm 5G", "Agni 3", "Agni 2",
      "Blaze 3", "Blaze 2",
    ],
  },
  {
    name: "itel", logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 20'%3E%3Ctext x='18' y='15' text-anchor='middle' fill='white' font-size='13' font-weight='700' font-family='Arial,sans-serif'%3Eitel%3C/text%3E%3C/svg%3E", color: "#0066FF",
    models: [
      "Vision 5", "A80", "A70", "P55", "S24",
    ],
  },
  {
    name: "Other", logo: "", color: "#6B7280",
    models: [],
  },
];

const FEATURED_COUNT = 8;

const repairServices = [
  { id: "screen", icon: Smartphone, label: "Screen Replacement", color: "#2563EB" },
  { id: "battery", icon: Battery, label: "Battery Replacement", color: "#16A34A" },
  { id: "camera", icon: Camera, label: "Camera Module", color: "#7C3AED" },
  { id: "water", icon: Droplets, label: "Water Damage", color: "#0891B2" },
  { id: "speaker", icon: Mic2, label: "Speaker / Mic", color: "#D97706" },
  { id: "charging", icon: Wifi, label: "Charging Port", color: "#DB2777" },
  { id: "back", icon: Wrench, label: "Back Panel", color: "#0EA5E9" },
  { id: "software", icon: MonitorSmartphone, label: "Software / Data", color: "#65A30D" },
  { id: "other", icon: HelpCircle, label: "Something Else", color: "#EA580C" },
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
  { label: "Service", desc: "Select what's needed" },
  { label: "Schedule", desc: "Pick a date & time" },
  { label: "Details", desc: "Your contact info" },
];

const stepHints = [
  "Select your phone brand to continue",
  "Pick at least one item to continue",
  "Choose a date & time to continue",
  "Fill in your contact details to finish",
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
      className="rounded-2xl p-4 overflow-hidden border border-blue-100 bg-blue-50/50"
    >
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          whileHover={canGoPrev ? { scale: 1.1 } : {}}
          whileTap={canGoPrev ? { scale: 0.9 } : {}}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-20 bg-white border border-gray-200"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.p
            key={monthName}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-semibold text-gray-900"
          >
            {monthName}
          </motion.p>
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={nextMonth}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors bg-white border border-gray-200"
        >
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </motion.button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-[9px] text-gray-400 font-medium py-1">
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
                className={cn(
                  "aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all",
                  isSelected
                    ? "bg-[#0066FF] text-white shadow-md shadow-blue-500/30"
                    : isToday
                    ? "bg-blue-100 text-[#0066FF] border border-blue-300"
                    : isPast
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-white",
                )}
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
            className="mt-3 pt-3 flex items-center gap-2 border-t border-blue-100"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
            <span className="text-xs text-[#0066FF] font-medium">
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
  const [expanded, setExpanded] = useState(false);
  const selected = brands.find((b) => b.name === data.brand);
  const other = brands[brands.length - 1];
  const visibleBrands = expanded ? brands : [...brands.slice(0, FEATURED_COUNT), other];
  const hiddenNames = brands.slice(FEATURED_COUNT, -1).map((b) => b.name).slice(0, 4).join(", ");

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-gray-500 text-xs font-semibold mb-4 uppercase tracking-wider">Select Brand</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {visibleBrands.map((brand) => (
            <motion.button
              key={brand.name}
              type="button"
              onClick={() => setData({ brand: brand.name, model: "", customBrand: "" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border transition-all duration-200",
                data.brand === brand.name
                  ? "bg-blue-50 border-[#0066FF]/40"
                  : "bg-gray-50 border-gray-200 hover:border-gray-300",
              )}
            >
              {data.brand === brand.name && (
                <div
                  className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center bg-[#0066FF]"
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              )}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: brand.color || "#6B7280" }}
              >
                {brand.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    width={18}
                    height={18}
                    className="object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                ) : (
                  <span className="text-sm font-bold text-white">?</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs sm:text-sm font-medium",
                  data.brand === brand.name ? "text-[#0066FF]" : "text-gray-600",
                )}
              >
                {brand.name}
              </span>
            </motion.button>
          ))}
        </div>

        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="w-full mt-3 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium text-[#0066FF] bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
            Show more brands — {hiddenNames}…
          </button>
        )}
      </div>

      <AnimatePresence>
        {selected && data.brand !== "Other" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-gray-500 text-xs font-semibold mb-4 uppercase tracking-wider">Select Model</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1 model-list">
              {selected.models.map((model) => (
                <motion.button
                  key={model}
                  type="button"
                  onClick={() => setData({ model })}
                  whileHover={{ x: 3 }}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm text-left transition-all border",
                    data.model === model
                      ? "bg-blue-50 border-[#0066FF]/30 text-gray-900"
                      : "bg-white border-gray-200 text-gray-600",
                  )}
                >
                  {model}
                  {data.model === model && <Check className="w-4 h-4 shrink-0 text-[#0066FF]" />}
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
              <h3 className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wider">Brand Name *</h3>
              <input
                type="text"
                value={data.customBrand}
                onChange={(e) => setData({ customBrand: e.target.value })}
                placeholder="e.g. Infinix, Tecno, Itel, Lava, Poco…"
                className="input-light"
              />
            </div>
            <div>
              <h3 className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wider">
                Model <span className="text-gray-400 normal-case tracking-normal">(optional)</span>
              </h3>
              <input
                type="text"
                value={data.model}
                onChange={(e) => setData({ model: e.target.value })}
                placeholder="e.g. Hot 40 Pro, Camon 30, Smart 8…"
                className="input-light"
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
        <h3 className="text-gray-500 text-xs font-semibold mb-1 uppercase tracking-wider">Select What's Needed</h3>
        <p className="text-gray-400 text-xs mb-5">
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
                className={cn(
                  "relative flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 border",
                  active ? "bg-blue-50 border-[#0066FF]/30" : "bg-gray-50 border-gray-200",
                )}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: active ? `${svc.color}18` : "#F3F4F6",
                    border: `1px solid ${active ? svc.color + "40" : "#E5E7EB"}`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: active ? svc.color : "#9CA3AF" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium", active ? "text-gray-900" : "text-gray-600")}>
                    {svc.label}
                  </p>
                </div>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all"
                  style={{
                    background: active ? svc.color : "transparent",
                    border: `2px solid ${active ? svc.color : "#D1D5DB"}`,
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
        <label className="block text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wider">
          Additional Details <span className="text-gray-400 normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          rows={4}
          value={data.issueDesc}
          onChange={(e) => setData({ issueDesc: e.target.value })}
          placeholder="Describe your issue in more detail — e.g. 'Screen cracked in top-left corner, touch still works'…"
          className="input-light resize-none"
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
        <h3 className="text-gray-500 text-xs font-semibold mb-4 uppercase tracking-wider">Service Type</h3>
        <div className="flex items-center gap-4 p-5 rounded-xl bg-purple-50 border border-purple-200">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-white border border-purple-200">
            🛵
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-semibold text-sm">Doorstep Pickup</p>
            <p className="text-gray-500 text-xs mt-0.5">
              We collect &amp; deliver — covers Hyderabad (10 km radius)
            </p>
          </div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-[#7C3AED]">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Calendar date picker */}
      <div>
        <h3 className="text-gray-500 text-xs font-semibold mb-4 uppercase tracking-wider">Select Date</h3>
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
            <h3 className="text-gray-500 text-xs font-semibold mb-4 uppercase tracking-wider">Select Time</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {timeSlots.map((slot) => (
                <motion.button
                  key={slot}
                  type="button"
                  onClick={() => setData({ time: slot })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "py-2.5 rounded-xl text-xs sm:text-sm transition-all font-medium border",
                    data.time === slot
                      ? "bg-blue-50 border-[#0066FF]/40 text-[#0066FF]"
                      : "bg-gray-50 border-gray-200 text-gray-600",
                  )}
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
          <label className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">
            <User className="w-3.5 h-3.5" /> Full Name *
          </label>
          <input
            type="text"
            required
            value={data.name}
            onChange={(e) => setData({ name: e.target.value })}
            placeholder="Arjun Reddy"
            className="input-light"
          />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">
            <Phone className="w-3.5 h-3.5" /> Phone Number *
          </label>
          <input
            type="tel"
            required
            value={data.phone}
            onChange={(e) => setData({ phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="input-light"
          />
        </div>
      </div>
      <div>
        <label className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">
          <Mail className="w-3.5 h-3.5" /> Email Address *
        </label>
        <input
          type="email"
          required
          value={data.email}
          onChange={(e) => setData({ email: e.target.value })}
          placeholder="you@email.com"
          className="input-light"
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">
          <MapPin className="w-3.5 h-3.5" /> Pickup Address *
        </label>
        <textarea
          rows={3}
          value={data.address}
          onChange={(e) => setData({ address: e.target.value })}
          placeholder="Door no., Street, Area, Hyderabad — 500xxx"
          className="input-light resize-none"
        />
      </div>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl p-5 mt-6 bg-blue-50 border border-blue-100"
      >
        <h4 className="text-[#0066FF] text-xs font-semibold uppercase tracking-wider mb-4">
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
              <span className="text-gray-800 text-right text-xs leading-relaxed">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Consent checkbox */}
      <label className="flex items-start gap-3 mt-5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => setData({ consent: e.target.checked })}
          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#0066FF] focus:ring-[#0066FF] shrink-0"
        />
        <span className="text-xs text-gray-500 leading-relaxed">
          I agree to TurboFix's{" "}
          <Link href="/terms" target="_blank" className="text-[#0066FF] underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" target="_blank" className="text-[#0066FF] underline underline-offset-2">
            Privacy Policy
          </Link>
          , and consent to being contacted about this booking.
        </span>
      </label>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */
export default function BookingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<BookingData>({
    brand: "", customBrand: "", model: "", services: [], issueDesc: "",
    serviceType: "pickup", date: "", time: "",
    name: "", phone: "", email: "", address: "", consent: false,
  });

  const update = (partial: Partial<BookingData>) => setData((d) => ({ ...d, ...partial }));

  const canProceed = [
    data.brand !== "" &&
      (data.brand !== "Other" || data.customBrand.trim() !== "") &&
      (data.brand === "Other" || data.model !== ""),
    data.services.length > 0,
    data.date !== "" && data.time !== "",
    data.name !== "" && data.phone !== "" && data.email !== "" && data.address.trim() !== "" && data.consent,
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

      sessionStorage.setItem('tfx_booking_success', JSON.stringify({
        orderId:  result.data.order_id,
        name:     data.name,
        email:    data.email,
        brand:    data.brand === 'Other' ? data.customBrand : data.brand,
        model:    data.model,
        services: data.services,
        date:     data.date,
        time:     data.time,
      }));
      router.push('/book-a-visit/success');
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.", {
        duration: 5000,
        style: { background: "#fff", color: "#111827", border: "1px solid rgba(239,68,68,0.3)" },
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
    <section id="book-your-repair" className="py-6 sm:py-8 scroll-mt-24">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-gray-900">
            <span className="w-1 h-5 rounded-full bg-[#0066FF]" />
            Book Your Visit
          </h2>
          <span className="text-xs text-gray-400">Takes about 2 minutes</span>
        </div>

        {/* Card */}
        <div className="rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm">
          {/* Progress header */}
          <div className="px-5 sm:px-8 pt-7 pb-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-5 overflow-x-auto pb-1">
              {steps.map((s, i) => (
                <div key={s.label} className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        background: i < step
                          ? "linear-gradient(135deg,#22C55E,#16A34A)"
                          : i === step
                          ? "linear-gradient(135deg,#0066FF,#2563EB)"
                          : "#F3F4F6",
                        scale: i === step ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border border-transparent"
                      style={{ color: i <= step ? "white" : "#9CA3AF" }}
                    >
                      {i < step ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                    </motion.div>
                    <span
                      className="text-[10px] mt-1.5 font-medium hidden sm:block"
                      style={{ color: i === step ? "#0066FF" : i < step ? "#16A34A" : "#9CA3AF" }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <motion.div
                      className="h-px mx-1 sm:mx-2 hidden sm:block"
                      animate={{ background: i < step ? "#16A34A" : "#E5E7EB" }}
                      style={{ width: "clamp(16px, 6vw, 56px)" }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-900 font-semibold text-base sm:text-lg">{steps[step].label}</h3>
                <p className="text-gray-500 text-sm">{steps[step].desc}</p>
              </div>
              <span className="text-gray-400 text-xs font-mono shrink-0">
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
          <div className="px-5 sm:px-8 py-5 border-t border-gray-100">
            <div className="flex items-center justify-between gap-4">
              <motion.button
                type="button"
                onClick={goPrev}
                disabled={step === 0}
                whileHover={step > 0 ? { scale: 1.02 } : {}}
                whileTap={step > 0 ? { scale: 0.98 } : {}}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-gray-50 border border-gray-200 text-gray-600"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </motion.button>

              <motion.button
                type="button"
                onClick={goNext}
                disabled={!canProceed[step] || loading}
                whileHover={canProceed[step] ? { scale: 1.02 } : {}}
                whileTap={canProceed[step] ? { scale: 0.98 } : {}}
                className={cn(
                  "relative flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-sm font-semibold overflow-hidden disabled:cursor-not-allowed transition-all",
                  canProceed[step] ? "text-white bg-[#0066FF] shadow-md shadow-blue-500/25" : "text-gray-400 bg-gray-100",
                )}
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
              </motion.button>
            </div>

            {!canProceed[step] && (
              <p className="text-center text-xs text-gray-400 mt-3">↑ {stepHints[step]}</p>
            )}

            <div className="flex items-center justify-center gap-5 mt-4 text-xs">
              <a href="tel:+918639605147" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#0066FF]" /> Call us
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors">
                <MessageCircle className="w-3.5 h-3.5 text-[#16A34A]" /> WhatsApp
              </a>
            </div>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 mt-3">
              <Shield className="w-3 h-3" /> Secure booking · Free diagnostics · No payment upfront
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
