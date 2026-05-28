"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 70 ? Math.random() * 15 + 5 : Math.random() * 5 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    timeout = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [mounted]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#02040F" }}
        >
          {/* Radial background */}
          <div className="absolute inset-0 radial-glow" />

          {/* Particles — only render client-side to avoid window SSR error */}
          {mounted && [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#00AAFF]"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                y: [null, Math.random() * -200],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 1.5,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="relative mb-10"
          >
            {/* Orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-24 h-24 -left-4 -top-4"
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  border: "1px dashed rgba(0,170,255,0.3)",
                  borderTopColor: "#00AAFF",
                }}
              />
            </motion.div>

            {/* Glow */}
            <div
              className="absolute inset-0 rounded-2xl blur-2xl"
              style={{ background: "rgba(0,170,255,0.4)", transform: "scale(1.5)" }}
            />

            {/* Icon box */}
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0066FF, #00AAFF)" }}
            >
              <Zap className="w-8 h-8 text-white" fill="white" />
            </div>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-1">
              Turbo<span className="gradient-text-blue">Fix</span>
            </h1>
            <p className="text-xs text-gray-500 tracking-[0.3em] uppercase font-mono">
              Hyderabad
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "240px" }}
            transition={{ delay: 0.5 }}
            className="relative h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)", width: "240px" }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0066FF, #00AAFF)",
                boxShadow: "0 0 10px rgba(0,170,255,0.8)",
              }}
              transition={{ ease: "easeOut" }}
            />
          </motion.div>

          {/* Progress text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-xs text-gray-500 font-mono"
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
