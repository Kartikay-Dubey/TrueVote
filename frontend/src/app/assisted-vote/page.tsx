"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, UserCheck, ShieldAlert } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { AsymmetricCard } from "@/components/interactive/AsymmetricCard";
import { CyberButton } from "@/components/interactive/CyberButton";
import { motion } from "framer-motion";

export default function AssistedVotingPage() {
  const [voterId, setVoterId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin-login");
    } else {
      setAdminToken(token);
    }
  }, [router]);

  const handleAssistedLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voterId) {
      setError("Verify Demographic ID is structurally valid.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/assisted-login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminToken}`
        },
        body: JSON.stringify({ voterId })
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
         localStorage.setItem("voter_token", data.token);
         localStorage.setItem("voter_id", data.userId);
         
         if (data.hasVoted) {
           setError("VIOLATION DETECTED: This user has already voted in the system. Blocked natively.");
           setIsSubmitting(false);
         } else {
           router.push("/vote");
         }
      } else {
         setError(data.error || "Administrative override failed.");
         setIsSubmitting(false);
      }
    } catch (e) {
      setError("Network error. Rural node offline.");
      setIsSubmitting(false);
    }
  };

  if (!adminToken) return null;

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 font-mono">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8">
           <div className="w-20 h-20 bg-purple-500/10 border border-purple-400/50 flex items-center justify-center mb-4 mx-auto shadow-[0_0_20px_rgba(168,85,247,0.3)]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
              <ShieldCheck size={32} className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,1)]" />
           </div>
           <h1 className="text-3xl font-black text-center uppercase tracking-widest text-purple-400">Rural Access Kiosk</h1>
           <p className="text-gray-400 uppercase text-xs text-center tracking-[0.2em] mt-2">Admin Overridden Subroutine</p>
        </motion.div>

        <AsymmetricCard className="w-full max-w-md !border-purple-500/30">
           <motion.form 
             initial={{ opacity: 0, x: -20 }} 
             animate={{ opacity: 1, x: 0 }} 
             onSubmit={handleAssistedLogin} 
             className="flex flex-col gap-6"
           >
             {error && (
                <div className="p-3 bg-red-500/10 border-l-2 border-red-500 text-red-400 text-xs font-mono uppercase flex items-start gap-2">
                   <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                   {error}
                </div>
             )}

             <div className="flex flex-col gap-2 relative">
                <label className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-1">Citizen Unique ID</label>
                <div className="absolute left-4 top-[38px] text-gray-500"><UserCheck size={20} /></div>
                <input 
                  type="text" 
                  value={voterId}
                  onChange={(e) => {
                     setVoterId(e.target.value);
                     setError(null);
                  }}
                  autoFocus
                  placeholder="e.g. TV1001"
                  className="w-full h-14 bg-black/80 border-b border-white/20 pl-12 pr-4 text-white focus:outline-none focus:border-purple-400 transition-colors font-mono placeholder:text-gray-700 tracking-widest text-sm uppercase"
                />
             </div>

             <div className="pt-4 mx-auto w-full">
               <CyberButton isLoading={isSubmitting} type="submit" disabled={!voterId} className="w-full !bg-purple-500/20 !border-purple-500/50 !text-purple-300">
                 Verify & Launch Session
               </CyberButton>
             </div>
           </motion.form>
           
           <div className="mt-8 pt-6 border-t border-white/5 text-center flex flex-col items-center justify-center gap-2">
              <ShieldAlert className="text-gray-500" size={24} />
              <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest max-w-[250px]">
                 Strict Liability: Votes cast through the rural kiosk are irreversibly cryptographic. Verify physical demographics.
              </p>
           </div>
        </AsymmetricCard>
      </div>
    </PageTransition>
  );
}
