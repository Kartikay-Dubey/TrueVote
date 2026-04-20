"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends HTMLMotionProps<"button"> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function CyberButton({ children, isLoading, className, disabled, ...props }: Props) {
  const BUTTON_EDGE = "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)";
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      disabled={disabled || isLoading}
      className={cn(
        "relative p-[2px] transition-all duration-300 group inline-block",
        disabled || isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        className
      )}
      style={{ clipPath: BUTTON_EDGE }}
      {...props}
    >
      {/* Border wrapper for the button */}
      <div 
        className={cn(
          "absolute inset-0 z-0",
          disabled || isLoading ? "bg-white/20" : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x"
        )} 
      />
      
      {/* Background and Inner Content */}
      <div 
        className="relative z-10 bg-black px-10 py-5 flex items-center justify-center gap-3 overflow-hidden text-white font-bold tracking-widest uppercase text-sm"
        style={{ clipPath: BUTTON_EDGE }}
      >
        {/* Subtle hover sweep */}
        {!disabled && !isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:animate-sweep" />
        )}
        
        {isLoading ? <Loader2 className="animate-spin text-cyan-400" size={20} /> : null}
        <span className="relative z-10 drop-shadow-md">{isLoading ? "Processing..." : children}</span>
      </div>
    </motion.button>
  );
}
