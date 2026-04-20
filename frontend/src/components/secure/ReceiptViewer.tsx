"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";

export function ReceiptViewer({ hash }: { hash: string }) {
  const [displayed, setDisplayed] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(hash.substring(0, i));
      i++;
      if (i > hash.length) clearInterval(interval);
    }, 15); // Fast typing terminal effect
    return () => clearInterval(interval);
  }, [hash]);

  const copyHash = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="w-full max-w-2xl glass-panel p-1 rounded-2xl relative group shadow-[0_0_40px_rgba(6,182,212,0.15)]"
    >
      <div className="p-6 bg-black/60 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Decrypted Hash Terminal
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch gap-3 bg-black p-4 rounded-xl border border-white/10 font-mono relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(255,255,255,1)_50%)] bg-[length:100%_4px]"></div>
          
          <code className="text-left text-sm sm:text-base text-gray-300 break-all flex-1 select-all relative z-10 w-full min-h-[30px] flex items-center text-cyan-100">
            {displayed}
            {displayed.length < hash.length && <span className="inline-block w-2 bg-cyan-400 h-5 ml-1 animate-pulse"></span>}
          </code>
          
          {displayed.length === hash.length && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              onClick={copyHash}
              className="p-3 bg-white/5 hover:bg-cyan-500/20 relative z-10 rounded-lg transition-colors border border-white/10 hover:border-cyan-500/50 mt-3 sm:mt-0"
              title="Copy Receipt"
            >
              {copied ? <CheckCircle2 size={20} className="text-green-400" /> : <Copy size={20} className="text-cyan-400" />}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
