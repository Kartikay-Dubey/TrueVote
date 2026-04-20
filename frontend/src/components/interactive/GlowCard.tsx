"use client";
import { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlowCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  active?: boolean;
}

export function GlowCard({ children, active = false, className = "", ...props }: GlowCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div 
      ref={divRef} 
      onMouseMove={handleMouseMove} 
      onMouseEnter={() => setOpacity(1)} 
      onMouseLeave={() => setOpacity(0)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-2xl glass-panel border bg-black/60 transition-colors duration-300 ${active ? 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-white/5 shadow-lg'} ${className}`}
      {...props}
    >
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(6,182,212,0.15), transparent 40%)`
        }} 
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
