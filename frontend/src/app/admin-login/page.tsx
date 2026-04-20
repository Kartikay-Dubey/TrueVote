"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, KeyRound } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { AsymmetricCard } from "@/components/interactive/AsymmetricCard";
import { CyberButton } from "@/components/interactive/CyberButton";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@truevote.com");
  const [password, setPassword] = useState("secure123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
         localStorage.setItem("admin_token", data.token);
         router.push("/admin");
      } else {
         setError(data.error || "Administrator Access Denied.");
         setIsSubmitting(false);
      }
    } catch (e) {
      setError("Network timeout. The authentication layer is offline.");
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8">
           <div className="w-24 h-24 bg-red-500/10 border-2 border-red-500/50 flex items-center justify-center mb-6 mx-auto" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'}}>
              <KeyRound size={40} className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,1)]" />
           </div>
           <h1 className="text-4xl font-black text-center uppercase tracking-widest text-red-500 drop-shadow-sm">Root Access</h1>
           <p className="text-center font-mono text-xs uppercase tracking-widest text-gray-400 mt-2">Restricted Command Center</p>
        </motion.div>

        <AsymmetricCard className="w-full max-w-md">
           <form onSubmit={handleLogin} className="flex flex-col gap-6">
             {error && (
                <div className="p-4 bg-red-900/30 border-l-4 border-red-500 text-red-300 text-xs font-mono uppercase flex items-start gap-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                   <ShieldAlert size={20} className="shrink-0" />
                   <span className="mt-0.5">{error}</span>
                </div>
             )}

             <div className="flex flex-col gap-2 relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Administrator Email"
                  className="w-full h-14 bg-black/80 border-b border-red-500/20 px-4 text-white focus:outline-none focus:border-red-500 transition-colors font-mono placeholder:text-gray-700"
                />
             </div>
             
             <div className="flex flex-col gap-2 relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Master Key"
                  className="w-full h-14 bg-black/80 border-b border-red-500/20 px-4 text-white focus:outline-none focus:border-red-500 transition-colors font-mono placeholder:text-gray-700 hover:border-red-500/50"
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'}}
                />
             </div>

             <div className="pt-6 w-full flex justify-end">
               <button 
                 disabled={isSubmitting}
                 type="submit"
                 className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-[0.2em] px-8 py-4 transition-colors w-full sm:w-auto"
                 style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)'}}
               >
                 {isSubmitting ? "Authenticating..." : "Mount Dashboard"}
               </button>
             </div>
           </form>
           
        </AsymmetricCard>
      </div>
    </PageTransition>
  );
}
