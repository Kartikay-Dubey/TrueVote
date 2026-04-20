"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function AnimatedButton({ children, isLoading, className, disabled, ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled || isLoading}
      className={cn(
        "relative overflow-hidden rounded-xl font-bold px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2",
        disabled || isLoading 
          ? "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed" 
          : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] border border-white/20 hover:border-white/50",
        className
      )}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin" size={20} /> : children}
      
      {/* Shine effect overlay */}
      {!disabled && !isLoading && (
         <motion.div 
           className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20"
           animate={{ left: ["-100%", "200%"] }}
           transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 3 }}
         />
      )}
    </motion.button>
  );
}
