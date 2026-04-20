"use client";
import PageTransition from "@/components/PageTransition";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, Key } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { HashTerminal } from "@/components/secure/HashTerminal";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hash = searchParams?.get("hash") || "0xErr_NoHashProvided";
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem("admin_token"));
    // Since vote is done, clear the voter token to maintain security bounds
    localStorage.removeItem("voter_token");
    localStorage.removeItem("voter_id");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center pt-8 px-4">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-8"
      >
         <div className="w-24 h-24 bg-cyan-500/10 border-2 border-cyan-400/50 flex items-center justify-center glow-cyan" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
            <Key size={40} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,1)]" />
         </div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="text-5xl md:text-6xl font-black mb-4 tracking-tighter uppercase"
      >
        Vote Recorded
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="text-gray-400 text-lg mb-14 max-w-2xl font-mono uppercase tracking-widest text-sm"
      >
        Your vote has been securely and anonymously added to the public ledger. Keep the secure code below safe. You can use it to verify your vote was counted correctly.
      </motion.p>

      {/* Extreme Visual Terminal Component */}
      <HashTerminal hash={hash} />
      
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        onClick={() => router.push(isAdmin ? "/admin" : "/")}
        className="mt-20 text-sm font-bold uppercase tracking-[0.3em] text-cyan-400/50 hover:text-cyan-400 flex items-center gap-3 transition-colors group"
      >
        {isAdmin ? "Return to Dashboard" : "Return to Home"} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
      </motion.button>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <PageTransition>
      <Suspense fallback={null}>
        <SuccessContent />
      </Suspense>
    </PageTransition>
  );
}
