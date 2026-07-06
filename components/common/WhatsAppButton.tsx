"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const quickMessages = [
  "Hi! I need a screen replacement 📱",
  "What's the cost for battery replacement?",
  "How long does a repair take?",
  "I have water-damaged phone 💧",
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const pathname = usePathname();
  const isBookRepair = pathname === "/book-repair";

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleMessage = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/918639605147?text=${encoded}`, "_blank");
  };

  return (
    <AnimatePresence>
      {showButton && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50 flex-col items-end gap-3",
            isBookRepair ? "hidden sm:flex" : "flex",
          )}
        >
          {/* Chat popup */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="w-80 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: "rgba(5,10,26,0.98)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Header */}
                <div className="px-5 py-4" style={{ background: "#25D366" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">TurboFix Support</p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <p className="text-white/80 text-xs">Online now</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message area */}
                <div className="px-4 py-4">
                  <div
                    className="rounded-xl p-3 mb-4 text-sm text-gray-300"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    👋 Hi there! Need a quick repair? We reply in minutes. Choose a message below or type your own.
                  </div>

                  <div className="space-y-2 mb-4">
                    {quickMessages.map((msg, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => handleMessage(msg)}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-xs text-gray-300 hover:text-white transition-all flex items-center justify-between group"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {msg}
                        <Send className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#25D366] transition-opacity shrink-0 ml-2" />
                      </motion.button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleMessage("Hi TurboFix! I need help with my mobile.")}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                    style={{ background: "#25D366" }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open WhatsApp
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.1 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
            style={{ background: "#25D366" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {!isOpen && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "#25D366" }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            )}
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <MessageCircle className="w-6 h-6 text-white" fill="white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
