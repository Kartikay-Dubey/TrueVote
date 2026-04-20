"use client";
import { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldAlert, ShieldCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { AsymmetricCard } from "@/components/interactive/AsymmetricCard";
import { CyberButton } from "@/components/interactive/CyberButton";

const INDI_CANDIDATES = [
  { 
    id: "Narendra_Modi", 
    name: "Narendra Modi", 
    party: "Bharatiya Janata Party (BJP)", 
    symbol: "🪷",
    theme: "from-orange-500 to-orange-600",
    border: "border-orange-500",
    text: "text-orange-500",
    shadow: "shadow-[0_0_20px_rgba(249,115,22,0.4)]",
    agenda: ["Digital Economy", "National Security", "Infrastructure"]
  },
  { 
    id: "Rahul_Gandhi", 
    name: "Rahul Gandhi", 
    party: "Indian National Congress (INC)", 
    symbol: "✋",
    theme: "from-sky-500 to-sky-600",
    border: "border-sky-500",
    text: "text-sky-400",
    shadow: "shadow-[0_0_20px_rgba(14,165,233,0.4)]",
    agenda: ["Social Welfare", "Youth Employment", "Farmers' Rights"]
  },
  { 
    id: "Arvind_Kejriwal", 
    name: "Arvind Kejriwal", 
    party: "Aam Aadmi Party (AAP)", 
    symbol: "🧹",
    theme: "from-cyan-400 to-cyan-500",
    border: "border-cyan-400",
    text: "text-cyan-400",
    shadow: "shadow-[0_0_20px_rgba(34,211,238,0.4)]",
    agenda: ["Free Education", "Healthcare", "Anti-Corruption"]
  },
  { 
    id: "Mamata_Banerjee", 
    name: "Mamata Banerjee", 
    party: "All India Trinamool Congress (TMC)", 
    symbol: "🌸",
    theme: "from-emerald-500 to-emerald-600",
    border: "border-emerald-500",
    text: "text-emerald-400",
    shadow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    agenda: ["Regional Autonomy", "Women Empowerment", "Social Justice"]
  },
  { 
    id: "D_Raja", 
    name: "D. Raja", 
    party: "Communist Party of India (CPI)", 
    symbol: "🌾",
    theme: "from-red-600 to-red-700",
    border: "border-red-500",
    text: "text-red-500",
    shadow: "shadow-[0_0_20px_rgba(239,68,68,0.4)]",
    agenda: ["Labor Rights", "Wealth Distribution", "Public Sector Protect"]
  }
];

export default function VotePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("voter_token");
    if (!token) {
      router.push("/login");
    } else {
      setIsMounted(true);
    }
  }, [router]);

  const handleVote = async () => {
    if (!selected) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    
    try {
      const token = localStorage.getItem("voter_token");
      if (!token) throw new Error("Authentication missing");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}"}/api/v1/vote`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          candidateId: selected, 
          timestamp: Date.now()
        })
      });
      
      const data = await res.json();
      
      if (res.ok && data.hash) {
         router.push(`/success?hash=${data.hash}`);
      } else {
         setErrorMsg(data.error || "System error. Please try again.");
         setIsSubmitting(false);
         setShowConfirm(false);
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Network timeout. The security systems might be rejecting the connection.");
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  if (!isMounted) return null;

  const activeCandidateData = INDI_CANDIDATES.find(c => c.id === selected);

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto pt-8 px-4 relative">
        <div className="mb-14 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center justify-center p-4 bg-cyan-500/10 border border-cyan-400/30 mb-6" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'}}>
             <ShieldCheck className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" size={32} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase text-white">TrueVote secure ballot</h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto uppercase tracking-widest font-mono">Select your candidate. Your identity will remain permanently hidden.</p>
        </div>

        {errorMsg && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 bg-red-900/30 border border-red-500 text-red-400 flex items-center justify-center gap-4 font-mono font-bold uppercase text-sm shadow-[0_0_20px_rgba(239,68,68,0.2)]" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'}}>
            <ShieldAlert size={28} className="drop-shadow-[0_0_5px_rgba(239,68,68,1)] shrink-0" /> {errorMsg}
          </motion.div>
        )}

        {/* The 5 Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12 relative z-10">
          <AnimatePresence>
            {INDI_CANDIDATES.map((c) => {
              const isActive = selected === c.id;
              // Pass a style string hack to the AsymmetricCard to artificially inject borders if active
              return (
                <motion.div
                  layout
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  whileHover={{ scale: 1.02 }}
                  className={`transition-all duration-500 cursor-pointer ${selected && !isActive ? 'opacity-40 grayscale scale-[0.98]' : 'opacity-100 scale-100'}`}
                >
                  <div className={`p-[1.5px] h-full ${isActive ? `bg-gradient-to-r ${c.theme}` : 'bg-white/10 hover:bg-white/30'} transition-all`} style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}>
                    <div className="relative w-full h-full p-6 bg-[#050505]" style={{ clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)" }}>
                       
                       <div className="flex gap-6 items-start">
                          <div className={`shrink-0 w-20 h-20 flex items-center justify-center text-4xl bg-black border ${isActive ? `${c.border} ${c.shadow}` : 'border-white/10'} transition-all`} style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                             {c.symbol}
                          </div>
                          
                          <div className="flex-1">
                             <h3 className="text-2xl font-black text-white mb-1 tracking-tight">{c.name}</h3>
                             <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-4 ${isActive ? c.text : 'text-gray-400'}`}>{c.party}</p>
                             
                             <div className="flex flex-col gap-2">
                               {c.agenda.map((item, idx) => (
                                 <div key={idx} className="flex items-center gap-2">
                                   <div className={`w-1.5 h-1.5 rounded-full ${isActive ? `bg-${c.border.split('-')[1]}-400` : 'bg-gray-600'}`}></div>
                                   <span className="text-xs font-mono text-gray-300">{item}</span>
                                 </div>
                               ))}
                             </div>
                          </div>
                       </div>
                       
                       {isActive && (
                         <div className="absolute top-4 right-4">
                           <Check size={28} className={`${c.text}`} />
                         </div>
                       )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex justify-center pb-24">
          <CyberButton
            onClick={() => setShowConfirm(true)}
            disabled={!selected}
            className="text-lg px-20 text-white font-black"
          >
            Review and Submit
          </CyberButton>
        </div>

        {/* CONFIRMATION MODAL OVERLAY */}
        <AnimatePresence>
          {showConfirm && activeCandidateData && (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
             >
               <motion.div 
                 initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                 className={`w-full max-w-lg p-[2px] bg-gradient-to-r ${activeCandidateData.theme}`}
                 style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)'}}
               >
                 <div className="bg-[#050505] p-8 w-full h-full relative" style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)'}}>
                    <button onClick={() => setShowConfirm(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                      <X size={24} />
                    </button>
                    
                    <h2 className="text-3xl font-black text-white uppercase mb-2">Final Confirmation</h2>
                    <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
                      Please confirm your cryptographic ballot.
                    </p>

                    <div className="flex items-center gap-6 mb-10 bg-white/5 p-4" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'}}>
                       <div className="text-5xl">{activeCandidateData.symbol}</div>
                       <div>
                         <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-1">Your Selection</p>
                         <h3 className={`text-2xl font-black uppercase ${activeCandidateData.text}`}>{activeCandidateData.name}</h3>
                         <p className="text-white text-sm font-bold tracking-widest uppercase">{activeCandidateData.party}</p>
                       </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                       <CyberButton onClick={() => setShowConfirm(false)} className="flex-1 text-sm opacity-70">
                         Cancel
                       </CyberButton>
                       <button 
                         onClick={handleVote}
                         disabled={isSubmitting}
                         className={`flex-[2] py-4 px-6 text-white font-black uppercase tracking-widest bg-gradient-to-r ${activeCandidateData.theme} hover:brightness-110 transition-all focus:outline-none flex justify-center items-center`}
                         style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)'}}
                       >
                         {isSubmitting ? "Generating Receipt..." : "Seal & Cast Vote"}
                       </button>
                    </div>
                 </div>
               </motion.div>
             </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
