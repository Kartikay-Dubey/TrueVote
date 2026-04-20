"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, User, ShieldAlert } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { AsymmetricCard } from "@/components/interactive/AsymmetricCard";
import { CyberButton } from "@/components/interactive/CyberButton";
import { motion } from "framer-motion";

export default function VoterLoginPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address to securely sign in.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
         localStorage.setItem("voter_token", data.token);
         localStorage.setItem("voter_id", data.userId);
         
         if (data.hasVoted) {
           setError("You have already voted. Your choice was securely recorded and you cannot vote again.");
           setIsSubmitting(false);
         } else {
           router.push("/vote");
         }
      } else {
         setError(data.error || "Sign in failed. Please try again.");
         setIsSubmitting(false);
      }
    } catch (e) {
      setError("Network error. Please check your connection to the server.");
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8">
           <div className="w-20 h-20 bg-blue-500/10 border border-blue-400/50 flex items-center justify-center glow-cyan mb-4 mx-auto" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
              <User size={32} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,1)]" />
           </div>
           <h1 className="text-3xl font-black text-center uppercase tracking-widest">Sign In to Vote</h1>
        </motion.div>

        <AsymmetricCard className="w-full max-w-md">
           <form onSubmit={handleLogin} className="flex flex-col gap-6">
             {error && (
                <div className="p-3 bg-red-500/10 border-l-2 border-red-500 text-red-400 text-xs font-mono uppercase flex items-start gap-2">
                   <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                   {error}
                </div>
             )}

             <div className="flex flex-col gap-2 relative">
                <label className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-1">Verify Identity</label>
                <div className="absolute left-4 top-[38px] text-gray-500"><User size={20} /></div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                     setEmail(e.target.value);
                     setError(null);
                  }}
                  autoFocus
                  placeholder="Enter your email address"
                  className="w-full h-14 bg-black/80 border-b border-white/20 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors font-mono placeholder:text-gray-700"
                />
             </div>

             <div className="pt-4 max-w-[200px] mx-auto w-full">
               <CyberButton isLoading={isSubmitting} type="submit" disabled={!email} className="w-full">
                 Sign In
               </CyberButton>
             </div>
           </form>
           
           <div className="mt-8 pt-6 border-t border-white/5 text-center flex flex-col items-center justify-center gap-2">
              <ShieldCheck className="text-gray-500" size={24} />
              <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest max-w-[250px]">
                 TrueVote uses strict identity verification to ensure absolute fairness.
              </p>
           </div>
        </AsymmetricCard>
      </div>
    </PageTransition>
  );
}
