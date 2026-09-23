"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone, Battery, Camera, Mic2, Droplets, Wifi,
  Wrench, MonitorSmartphone, ArrowRight
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/utils";

const services = [
  {
    icon: Smartphone,
    title: "Screen Replacement",
    desc: "Cracked or shattered? We restore your display with AMOLED-grade panels for like-new clarity and touch response.",
    color: "#2563EB",
    time: "~30 min",
    popular: true,
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    desc: "Fresh high-capacity cells restore full-day battery life. Health verified before and after.",
    color: "#1D4ED8",
    time: "~20 min",
    popular: false,
  },
  {
    icon: Camera,
    title: "Camera Service",
    desc: "Blurry shots or broken lens? Our optics team brings your camera back to life.",
    color: "#3B82F6",
    time: "~45 min",
    popular: false,
  },
  {
    icon: Droplets,
    title: "Water Damage Service",
    desc: "Ultrasonic cleaning and precision board drying to restore water-damaged devices.",
    color: "#0EA5E9",
    time: "~2 hrs",
    popular: false,
  },
  {
    icon: Mic2,
    title: "Speaker & Mic Service",
    desc: "No sound? Muffled calls? We replace speaker units and microphone grilles.",
    color: "#1E40AF",
    time: "~25 min",
    popular: false,
  },
  {
    icon: Wifi,
    title: "Charging Port Service",
    desc: "Loose port or not charging? We solder and replace USB-C / Lightning connectors.",
    color: "#0284C7",
    time: "~30 min",
    popular: false,
  },
  {
    icon: Wrench,
    title: "Back Panel Replacement",
    desc: "Scratched or shattered back glass? Restore premium looks instantly.",
    color: "#60A5FA",
    time: "~40 min",
    popular: false,
  },
  {
    icon: MonitorSmartphone,
    title: "Software & Data Issues",
    desc: "Bootloops, crashes, lost data — our software team handles it all.",
    color: "#0369A1",
    time: "~1 hr",
    popular: false,
  },
];

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden border-t border-slate-100">
      <div className="absolute inset-0 bg-white" />

      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-4">
            <span className="section-label">Our Services</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl font-bold mb-5 text-slate-900"
          >
            Every Service,{" "}
            <span className="gradient-text">Done Right</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-slate-600 text-lg max-w-xl mx-auto"
          >
            From cracked screens to complex motherboard work — TurboFix handles
            every issue with precision and speed.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={scaleIn}
                className="card-hover relative group rounded-2xl p-6 cursor-pointer"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                }}
              >
                {service.popular && (
                  <div
                    className="absolute -top-px left-6 right-6 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                  />
                )}
                {service.popular && (
                  <div
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: `${service.color}20`, color: service.color, border: `1px solid ${service.color}30` }}
                  >
                    Popular
                  </div>
                )}

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}08, transparent 60%)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${service.color}15`, border: `1px solid ${service.color}20` }}
                >
                  <Icon className="w-5.5 h-5.5" style={{ color: service.color }} />
                </div>

                <h3 className="text-slate-900 font-semibold mb-2 text-[15px]">{service.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{service.desc}</p>

                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">⏱ {service.time}</div>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                    style={{ background: `${service.color}20` }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: service.color }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 btn-outline-neon px-7 py-3.5 rounded-xl text-sm font-semibold"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
