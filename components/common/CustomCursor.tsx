"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const ringConfig = { damping: 20, stiffness: 200, mass: 0.8 };

  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 1024) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    const handlePointerChange = () => {
      const el = document.elementFromPoint(
        cursorX.get(),
        cursorY.get()
      );
      if (el) {
        const style = window.getComputedStyle(el);
        setIsPointer(style.cursor === "pointer");
      }
    };

    const handleMouseDown = () => setIsClick(true);
    const handleMouseUp = () => setIsClick(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mousemove", handlePointerChange);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mousemove", handlePointerChange);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== "undefined" && window.innerWidth < 1024) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClick ? 0.5 : 1,
        }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        <div
          className="rounded-full"
          style={{
            width: isPointer ? "12px" : "8px",
            height: isPointer ? "12px" : "8px",
            background: "#00AAFF",
            boxShadow: "0 0 10px rgba(0,170,255,0.8), 0 0 20px rgba(0,170,255,0.4)",
            transition: "width 0.2s, height 0.2s",
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 1.5 : isClick ? 0.8 : 1,
        }}
        transition={{ opacity: { duration: 0.15 }, scale: { type: "spring", damping: 20, stiffness: 300 } }}
      >
        <div
          className="rounded-full"
          style={{
            width: "40px",
            height: "40px",
            border: `1px solid rgba(0,170,255,${isPointer ? "0.8" : "0.4"})`,
            boxShadow: isPointer ? "0 0 15px rgba(0,170,255,0.3)" : "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        />
      </motion.div>

      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isVisible ? 0.15 : 0 }}
      >
        <div
          className="rounded-full blur-xl"
          style={{
            width: "80px",
            height: "80px",
            background: "radial-gradient(circle, #00AAFF, transparent)",
          }}
        />
      </motion.div>
    </>
  );
}
