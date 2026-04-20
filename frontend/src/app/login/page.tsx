"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, User, ShieldAlert, Fingerprint, Lock } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { AsymmetricCard } from "@/components/interactive/AsymmetricCard";
import { CyberButton } from "@/components/interactive/CyberButton";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://truevote-backend-fcmt.onrender.com";

export default function VoterLoginPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [voterId, setVoterId] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voterId) {
      setError("Demographic ID is required.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/login/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterId })
      });
      const data = await res.json();
      
      if (res.ok) {
        setIsSubmitting(false);
        setStep(2);
      } else {
        setError(data.error || "Identity Verification Failed.");
        setIsSubmitting(false);
      }
    } catch (e) {
      setError("Network error. Could not connect to system.");
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Secure Override Key must be precisely 6 digits.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/login/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterId, otp })
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
         localStorage.setItem("voter_token", data.token);
         localStorage.setItem("voter_id", data.userId);
         
         if (data.hasVoted) {
           setError("VIOLATION DETECTED: This demographic identity has already cast a vote. Duplicate entries are blocked at the cryptographic layer.");
           setIsSubmitting(false);
         } else {
           router.push("/vote");
         }
      } else {
         setError(data.error || "Identity Verification Failed.");
         setIsSubmitting(false);
      }
    } catch (e) {
      setError("Network error. Handshake with secure server failed.");
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8">
           <div className="w-20 h-20 bg-blue-500/10 border border-blue-400/50 flex items-center justify-center glow-cyan mb-4 mx-auto" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
              <Fingerprint size={32} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,1)]" />
           </div>
           <h1 className="text-3xl font-black text-center uppercase tracking-widest">Identify Yourself</h1>
        </motion.div>

        <AsymmetricCard className="w-full max-w-md">
           <AnimatePresence mode="wait">
             {step === 1 ? (
               <motion.form 
                 key="step1"
                 initial={{ opacity: 0, x: -20 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 exit={{ opacity: 0, x: 20 }}
                 onSubmit={handleSendOTP} 
                 className="flex flex-col gap-6"
               >
                 {error && (
                    <div className="p-3 bg-red-500/10 border-l-2 border-red-500 text-red-400 text-xs font-mono uppercase flex items-start gap-2">
                       <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                       {error}
                    </div>
                 )}

                 <div className="flex flex-col gap-2 relative">
                    <label className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-1">Enter Verified ID (Aadhaar / Voter ID)</label>
                    <div className="absolute left-4 top-[38px] text-gray-500"><User size={20} /></div>
                    <input 
                      type="text" 
                      value={voterId}
                      onChange={(e) => {
                         setVoterId(e.target.value);
                         setError(null);
                      }}
                      autoFocus
                      placeholder="e.g. TV1001"
                      className="w-full h-14 bg-black/80 border-b border-white/20 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors font-mono placeholder:text-gray-700 tracking-widest uppercase"
                    />
                 </div>

                 <div className="pt-4 max-w-[200px] mx-auto w-full">
                   <CyberButton isLoading={isSubmitting} type="submit" disabled={!voterId} className="w-full">
                     Verify ID <Lock className="inline ml-2" size={16} />
                   </CyberButton>
                 </div>
               </motion.form>
             ) : (
               <motion.form 
                 key="step2"
                 initial={{ opacity: 0, x: -20 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 exit={{ opacity: 0, x: 20 }}
                 onSubmit={handleLogin} 
                 className="flex flex-col gap-6"
               >
                 {error && (
                    <div className="p-3 bg-red-500/10 border-l-2 border-red-500 text-red-400 text-xs font-mono uppercase flex items-start gap-2">
                       <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                       {error}
                    </div>
                 )}

                 <div className="flex flex-col gap-2 relative">
                    <label className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-1">Enter 6-Digit SMS Code</label>
                    <div className="absolute left-4 top-[38px] text-gray-500"><Lock size={20} /></div>
                    <input 
                      type="text" 
                      value={otp}
                      onChange={(e) => {
                         setOtp(e.target.value);
                         setError(null);
                      }}
                      autoFocus
                      placeholder="123456"
                      maxLength={6}
                      className="w-full h-14 bg-black/80 border-b border-white/20 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors font-mono placeholder:text-gray-700 tracking-[0.5em] text-center"
                    />
                 </div>

                 <div className="pt-4 max-w-[200px] mx-auto w-full">
                   <CyberButton isLoading={isSubmitting} type="submit" disabled={otp.length !== 6} className="w-full">
                     Proceed to Vote
                   </CyberButton>
                 </div>
               </motion.form>
             )}
           </AnimatePresence>
           
           <div className="mt-8 pt-6 border-t border-white/5 text-center flex flex-col items-center justify-center gap-2">
              <ShieldCheck className="text-gray-500" size={24} />
              <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest max-w-[250px]">
                 TrueVote uses mathematical identity verification to mandate a strict One-Person-One-Vote policy.
              </p>
           </div>
        </AsymmetricCard>
      </div>
    </PageTransition>
  );
}
