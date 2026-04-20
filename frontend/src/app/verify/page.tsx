"use client";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Search, ShieldCheck, XCircle, SearchCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CyberButton } from "@/components/interactive/CyberButton";
import { AsymmetricCard } from "@/components/interactive/AsymmetricCard";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://truevote-backend-fcmt.onrender.com";

export default function VerifyPage() {
  const [hash, setHash] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "valid" | "invalid">("idle");
  const [meta, setMeta] = useState<any>(null);

  const handleVerify = async () => {
    if (!hash || hash.length < 10) return;
    setStatus("loading");
    setMeta(null);
    
    try {
      const res = await fetch(`${BASE_URL}/api/v1/verify/${hash}`);
      const data = await res.json();
      
      if (res.ok && data.verified) {
        setMeta(data.data);
        setStatus("valid");
      } else {
        setStatus("invalid");
      }
    } catch (e) {
      console.error(e);
      setStatus("invalid");
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto pt-16 text-center px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block p-4 mb-8 bg-cyan-500/10 border border-cyan-400/30" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
           <SearchCode className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,1)]" size={36} />
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter uppercase">Check Your Vote</h1>
        <p className="text-gray-400 mb-14 text-sm font-mono uppercase tracking-[0.2em] max-w-2xl mx-auto">
          Enter your secure 64-character receipt code below to confirm your specific vote is accurately recorded on the public ledger.
        </p>

        <AsymmetricCard active={hash.length > 10} className="w-full text-left">
          <div className="flex flex-col md:flex-row gap-6 relative z-10 w-full items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" size={24} />
              <input 
                type="text" 
                value={hash}
                onChange={(e) => {
                  setHash(e.target.value);
                  setStatus("idle");
                }}
                spellCheck={false}
                placeholder="Paste your 0x... receipt code here"
                className="w-full h-16 bg-[#020202] py-4 pl-14 pr-4 text-white focus:outline-none font-mono text-lg transition-colors placeholder:text-gray-700"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'}}
              />
            </div>
            
            <div className="shrink-0 w-full md:w-auto">
              <CyberButton
                onClick={handleVerify}
                disabled={status === "loading" || !hash}
                isLoading={status === "loading"}
                className="w-full md:w-auto py-3 px-10 h-16 text-sm"
              >
                Scan Ledger
              </CyberButton>
            </div>
          </div>

          <div className="mt-12 min-h-[160px] flex flex-col justify-center border-t border-white/5 pt-8">
            <AnimatePresence mode="wait">
              {status === "idle" && (
                 <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-gray-600 font-mono text-sm uppercase tracking-widest text-center w-full">
                   Awaiting exact 64-character sequence input...
                 </motion.div>
              )}

              {status === "valid" && (
                <motion.div key="valid" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative">
                  <div className="flex items-start gap-6 relative z-10 p-6 bg-green-500/10 border-l-4 border-l-green-400" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)'}}>
                    <ShieldCheck className="text-green-400 shrink-0 drop-shadow-[0_0_10px_rgba(74,222,128,1)]" size={40} />
                    <div>
                      <h4 className="text-2xl font-black tracking-tight text-white uppercase mb-2">Vote Safely Counted <span className="text-green-400">PASSED</span></h4>
                      <p className="text-gray-300 font-mono text-sm mb-4">Your vote officially exists on the active ledger. It cannot be altered or removed.</p>
                      {meta && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-black/60 p-3 border border-white/5 border-l-green-400">
                             <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Timestamp</p>
                             <p className="text-green-300 font-mono text-xs">{new Date(meta.timestamp).toISOString()}</p>
                          </div>
                          <div className="bg-black/60 p-3 border border-white/5 border-l-green-400">
                             <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Your Selected Candidate</p>
                             <p className="text-green-300 font-mono text-xs tracking-wider">{meta.candidateId.replace(/_/g, " ")}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {status === "invalid" && (
                <motion.div key="invalid" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative">
                  <div className="flex items-start gap-6 relative z-10 p-6 bg-red-500/10 border-l-4 border-l-red-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)'}}>
                    <XCircle className="text-red-500 shrink-0 drop-shadow-[0_0_10px_rgba(239,68,68,1)]" size={40} />
                    <div>
                      <h4 className="text-2xl font-black tracking-tight text-white uppercase mb-2">Record Not Found <span className="text-red-500">INVALID</span></h4>
                      <p className="text-gray-300 font-mono text-sm">The system rejected this code. It may be incomplete, or you copied it incorrectly.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AsymmetricCard>
      </div>
    </PageTransition>
  );
}
