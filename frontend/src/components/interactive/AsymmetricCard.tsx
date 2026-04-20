"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  active?: boolean;
}

export function AsymmetricCard({ children, active, className, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D tilt physics 
    setRotateX(((y - centerY) / centerY) * -12); // Max 12 deg tilt
    setRotateY(((x - centerX) / centerX) * 12);
  };

  const resetTilt = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const SCI_FI_EDGE = "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{ perspective: 1200 }}
      className={cn("relative group cursor-pointer", className)}
      {...props}
    >
      {/* Glow Layer Behind */}
      <div 
        className={cn(
          "absolute -inset-2 blur-[20px] transition-all duration-500 -z-10",
          active ? "bg-cyan-500/40 opacity-100" : "bg-transparent opacity-0 group-hover:bg-white/10 group-hover:opacity-100"
        )}
        style={{ clipPath: SCI_FI_EDGE }}
      />

      {/* Actual Chiseled Border Wrapper (1px padding creates border) */}
      <div 
        className={cn(
          "p-[1.5px] transition-colors duration-500 h-full w-full",
          active ? "bg-cyan-400" : "bg-white/10 group-hover:bg-white/30"
        )}
        style={{ clipPath: SCI_FI_EDGE }}
      >
        {/* Inner Card Background */}
        <div 
          className="relative w-full h-full p-6 md:p-8 bg-[#050505] overflow-hidden"
          style={{ clipPath: SCI_FI_EDGE }}
        >
          {/* Internal Cyber Grid lines visible on hover */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="relative z-10 h-full flex flex-col">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}
