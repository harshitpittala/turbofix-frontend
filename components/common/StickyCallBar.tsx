"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, Zap } from "lucide-react";

export default function StickyCallBar() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", damping: 20, stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
      style={{
        background: "rgba(2,4,15,0.97)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        {/* Call Now */}
        <a
          href="tel:+918639605147"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold text-white transition-opacity active:opacity-80"
          style={{ background: "linear-gradient(135deg,#0066FF,#00AAFF)" }}
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/918639605147?text=Hi%20TurboFix%21%20I%20need%20a%20mobile%20repair."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold text-white transition-opacity active:opacity-80"
          style={{ background: "#25D366" }}
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>

        {/* Book Now */}
        <Link
          href="/book-repair"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold text-white transition-opacity active:opacity-80"
          style={{
            background: "linear-gradient(135deg,#7C3AED,#9F67FF)",
          }}
        >
          <Zap className="w-4 h-4" />
          Book Now
        </Link>
      </div>
    </motion.div>
  );
}
