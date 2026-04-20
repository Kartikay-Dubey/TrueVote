"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function HashTerminal({ hash }: { hash: string }) {
  const [displayed, setDisplayed] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let index = 0;
    let cycles = 0;
    const interval = setInterval(() => {
      if (index >= hash.length) {
        clearInterval(interval);
        setDisplayed(hash);
        setIsLocked(true);
        return;
      }
      
      // Cyberpunk decryption algorithm
      let temp = hash.substring(0, index);
      // Lead cursor with random hex characters 
      for(let j=0; j < 6 && index+j < hash.length; j++) {
        temp += Math.random().toString(16).charAt(2);
      }
      setDisplayed(temp);
      
      cycles++;
      if (cycles > 2) { 
         index++;
         cycles = 0;
      }
    }, 15);
    return () => clearInterval(interval);
  }, [hash]);

  const handleCopy = () => {
    if (!isLocked) return;
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const BORDER_POLY = "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="w-full max-w-3xl mx-auto p-[1px] bg-cyan-500/50"
      style={{ clipPath: BORDER_POLY }}
    >
      <div className="bg-[#020202] w-full p-6 sm:p-8" style={{ clipPath: BORDER_POLY }}>
        
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-[0.2em] flex items-center gap-3">
            <span className={cn("w-2 h-2", isLocked ? "bg-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,1)]" : "bg-red-500 animate-pulse")}></span>
            {isLocked ? "DECRYPTION COMPLETE" : "DECRYPTING IMMUTABLE RECEIPT..."}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch gap-4 relative">
          
          <code className={cn(
             "text-left text-sm sm:text-base break-all flex-1 select-all relative z-10 w-full min-h-[48px] flex items-center p-4 bg-white/5 font-mono",
             isLocked ? "text-cyan-100" : "text-gray-400"
          )} style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)'}}>
            {displayed}
            {!isLocked && <span className="inline-block w-3 bg-cyan-400 h-5 ml-1 animate-pulse"></span>}
          </code>
          
          {isLocked && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              onClick={handleCopy}
              className="p-4 bg-cyan-500/10 hover:bg-cyan-500/30 transition-colors flex items-center justify-center shrink-0 mt-2 sm:mt-0"
              style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)'}}
              title="Copy Receipt"
            >
              {copied ? <Check size={24} className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,1)]" /> : <Copy size={24} className="text-cyan-400" />}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
