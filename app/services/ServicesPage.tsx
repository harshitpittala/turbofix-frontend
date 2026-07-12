"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone, Battery, Camera, Mic2, Droplets, Wifi,
  Wrench, MonitorSmartphone, Cpu, Shield, Zap, ArrowRight
} from "lucide-react";
import CTA from "@/components/home/CTA";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/utils";

const services = [
  {
    icon: Smartphone,
    title: "Screen Replacement",
    shortDesc: "Factory-quality display restoration",
    fullDesc: "We replace cracked, shattered, or malfunctioning screens with OEM-grade panels. AMOLED, LCD, and Retina displays — all restored to original specifications. Includes digitizer replacement and screen protector installation.",
    features: ["OEM-grade panels", "AMOLED / LCD / Retina", "Digitizer included", "Complimentary screen protector"],
    time: "~30 min",
    color: "#0EA5E9",
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    shortDesc: "Restore all-day power",
    fullDesc: "Genuine-grade battery cells that restore your device to 100% capacity. We use cells that match or exceed OEM specifications. Battery health optimization included with every replacement.",
    features: ["Grade-A cells", "100% capacity restoration", "Health optimization", "Safe disposal of old battery"],
    time: "~20 min",
    color: "#22C55E",
  },
  {
    icon: Camera,
    title: "Camera Service",
    shortDesc: "Restore crystal-clear photography",
    fullDesc: "From cracked lens covers to failed autofocus modules — our optics specialists handle it all. We service front and rear cameras, including ultra-wide, telephoto, and ToF sensors.",
    features: ["Front & rear cameras", "Lens replacement", "Autofocus service", "OIS module service"],
    time: "~45 min",
    color: "#A78BFA",
  },
  {
    icon: Droplets,
    title: "Water Damage Service",
    shortDesc: "Rescue your device from liquid damage",
    fullDesc: "Ultrasonic cleaning, PCB inspection, and component-level drying — our water damage service protocol saves phones others write off. 85% success rate on devices brought in within 24 hours.",
    features: ["Ultrasonic cleaning", "PCB inspection", "Component drying", "85% success rate"],
    time: "~2–4 hrs",
    color: "#38BDF8",
  },
  {
    icon: Mic2,
    title: "Speaker & Mic Service",
    shortDesc: "Crystal-clear audio restored",
    fullDesc: "Muffled calls, distorted audio, or complete silence — we diagnose and replace speaker units, microphone assemblies, and earpiece speakers with precision.",
    features: ["Earpiece speaker", "Loudspeaker replacement", "Microphone module", "Audio testing post-service"],
    time: "~25 min",
    color: "#F59E0B",
  },
  {
    icon: Wifi,
    title: "Charging Port Service",
    shortDesc: "Resolve loose or dead charging ports",
    fullDesc: "USB-C, Lightning, or Micro-USB — we solder, clean, or replace charging connectors with precision. Also covers headphone jack service and data transfer port issues.",
    features: ["USB-C & Lightning", "Soldering & replacement", "Headphone jack", "Data port tested"],
    time: "~30 min",
    color: "#EC4899",
  },
  {
    icon: Wrench,
    title: "Back Panel Replacement",
    shortDesc: "Pristine exterior restored",
    fullDesc: "Restore your phone's premium look with genuine-grade back glass or panel replacements. We also service dented frames and replace antenna bands for full signal restoration.",
    features: ["Back glass replacement", "Frame service", "Antenna bands", "Premium finish"],
    time: "~40 min",
    color: "#06B6D4",
  },
  {
    icon: MonitorSmartphone,
    title: "Startup & Performance Service",
    shortDesc: "Device stuck or running slow?",
    fullDesc: "Device stuck on the logo screen, stuck in a restart loop, or running slow — our technicians diagnose the hardware and firmware cause on-site and restore normal operation, preserving access to your files where the storage hardware itself is intact.",
    features: ["Won't-start diagnostics", "Performance tune-up", "File access preserved (hardware permitting)", "Speed optimization"],
    time: "~1–2 hrs",
    color: "#84CC16",
  },
  {
    icon: Cpu,
    title: "Motherboard Service",
    shortDesc: "Advanced board-level service",
    fullDesc: "Chip-level soldering, IC replacement, and board diagnostics for complex hardware failures. Our microscope workstations handle jobs no other shop in Hyderabad will attempt.",
    features: ["Chip-level soldering", "IC replacement", "Microscope stations", "Expert diagnostics"],
    time: "~1–3 days",
    color: "#F97316",
  },
  {
    icon: Shield,
    title: "Screen Protector Installation",
    shortDesc: "Perfect bubble-free application",
    fullDesc: "Premium tempered glass and privacy screen protectors applied in our dust-free booth for a bubble-free finish every time. Free replacement for 12 months on our premium range if it cracks from a drop.",
    features: ["Dust-free installation", "Tempered glass", "Privacy filters", "12-month replacement"],
    time: "~10 min",
    color: "#8B5CF6",
  },
];

export default function ServicesPage() {
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
              <span className="section-label">What We Service</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-5">
              Every Service,{" "}
              <span className="gradient-text">Perfected</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 text-xl max-w-2xl mx-auto">
              10 specialist services under one roof — from quick screen swaps to
              complex motherboard-level work.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail Grid */}
      <section className="relative py-16 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.1 }}
                  className="group rounded-2xl p-7 relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                  whileHover={{ y: -4, borderColor: `${svc.color}25` }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${svc.color}06, transparent 60%)` }}
                  />

                  <div className="flex items-start gap-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${svc.color}12`, border: `1px solid ${svc.color}25` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: svc.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                        <h3 className="text-white font-semibold text-lg">{svc.title}</h3>
                      </div>
                      <p className="text-gray-500 text-xs mb-3">{svc.shortDesc} · ⏱ {svc.time}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{svc.fullDesc}</p>
                      <div className="flex flex-wrap gap-2">
                        {svc.features.map((f) => (
                          <span
                            key={f}
                            className="text-xs px-2.5 py-1 rounded-lg"
                            style={{ background: `${svc.color}10`, color: svc.color, border: `1px solid ${svc.color}20` }}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <Link href="/book-a-visit" className="btn-neon inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white">
              <Zap className="w-5 h-5" fill="white" />
              Book a Visit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
