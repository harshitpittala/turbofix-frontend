"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from "@/lib/utils";
import { API_URL } from "@/lib/config";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 86396 05147", href: "tel:+918639605147", color: "#2563EB" },
  { icon: Mail, label: "Email", value: "support@turbofix.in", href: "mailto:support@turbofix.in", color: "#1D4ED8" },
  { icon: MapPin, label: "Address", value: "11-1-441, Aghapura, Nampally, Hyderabad", href: "#map", color: "#3B82F6" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91 86396 05147", href: "https://wa.me/918639605147", color: "#25D366" },
];

const hours = [
  { day: "Bookings (online & WhatsApp)", time: "24/7, every day" },
  { day: "Doorstep visits, Monday – Sunday", time: "9:00 AM – 9:00 PM" },
];

// Doorstep visit hours as [openHour, closeHour] in 24h, indexed by JS getDay() (0=Sun..6=Sat).
// Visits run 9 AM – 9 PM every day; bookings are accepted 24/7.
const SCHEDULE: Record<number, [number, number]> = {
  0: [9, 21], 1: [9, 21], 2: [9, 21], 3: [9, 21], 4: [9, 21], 5: [9, 21], 6: [9, 21],
};

function useIsOpenNow() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const [open, close] = SCHEDULE[now.getDay()];
      const hour = now.getHours() + now.getMinutes() / 60;
      setIsOpen(hour >= open && hour < close);
    };
    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, []);
  return isOpen;
}

export default function ContactPageClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const isOpen = useIsOpenNow();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "Failed to send message.");

      setSubmitted(true);
      toast.success(result.message || "Message sent! We'll reply within 2 hours.");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please call or WhatsApp us instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <span className="section-label">Contact Us</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-6xl font-bold mb-4 text-slate-900">
              Let's{" "}
              <span className="gradient-text">Talk</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-slate-600 text-xl max-w-xl mx-auto">
              Have a question? Need a visit? We respond within 2 hours on weekdays.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="relative py-16 pb-28 overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-white" />
        <div className="container relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h2 variants={fadeInLeft} className="font-display text-3xl font-bold mb-8 text-slate-900">
                Find Us, Reach Us
              </motion.h2>

              {/* Contact cards */}
              <div className="space-y-4 mb-10">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      variants={fadeInLeft}
                      href={item.href}
                      target={item.label === "WhatsApp" ? "_blank" : undefined}
                      rel={item.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl group"
                      style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
                      whileHover={{ x: 4, borderColor: `${item.color}40` }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: item.color }} />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-0.5">{item.label}</p>
                        <p className="text-slate-700 text-sm font-medium">{item.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Hours */}
              <motion.div
                variants={fadeInLeft}
                className="rounded-xl p-6"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-blue-700" />
                  <h3 className="text-slate-900 font-semibold">Opening Hours</h3>
                </div>
                <div className="space-y-3">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between">
                      <span className="text-slate-500 text-sm">{h.day}</span>
                      <span className="text-slate-900 text-sm font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
                {isOpen !== null && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isOpen ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                    <span className={`text-xs font-medium ${isOpen ? "text-emerald-700" : "text-slate-500"}`}>
                      {isOpen ? "Technicians are on visits right now" : "Visits resume at 9 AM — you can still book now"}
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div
                className="rounded-2xl p-8"
                style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(5,150,105,0.1)", border: "2px solid rgba(5,150,105,0.3)" }}>
                      <CheckCircle className="w-8 h-8 text-emerald-700" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Message Received!</h3>
                    <p className="text-slate-500 text-sm max-w-xs">Thanks for reaching out. We'll get back to you within 2 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm text-blue-700 hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1.5">Your Name</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Arjun Reddy"
                          className="input-glass"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="input-glass"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@email.com"
                        className="input-glass"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">Subject</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Screen service inquiry"
                        className="input-glass"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Describe your device issue..."
                        className="input-glass resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-neon w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? "Sending…" : "Send Message"}
                    </button>
                    <p className="text-center text-slate-500 text-xs">We reply within 2 hours on weekdays</p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Map placeholder */}
          <motion.div
            id="map"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl overflow-hidden"
            style={{ border: "1px solid #E2E8F0", height: "300px" }}
          >
            <iframe
              src="https://maps.google.com/maps?q=11-1-441%2C%20Aghapura%2C%20Nampally%2C%20Hyderabad%2C%20Telangana%20500001&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
