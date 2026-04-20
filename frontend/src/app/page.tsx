"use client";

import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Activity, Lock, Database, UserCheck, Eye, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";
import { AsymmetricCard } from "@/components/interactive/AsymmetricCard";
import { CyberButton } from "@/components/interactive/CyberButton";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function LandingPage() {
  return (
    <PageTransition>
      {/* 1. HERO SECTION */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center pt-24 pb-32 border-b border-white/5 relative">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/10 text-cyan-400 border border-blue-500/30 mb-8 font-mono text-xs tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(59,130,246,0.15)]" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'}}>
          <ShieldCheck size={18} />
          <span>TrueVote • Secure • Transparent</span>
        </motion.div>

        <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="text-6xl md:text-[6rem] leading-[1.05] font-black tracking-tighter mb-8 uppercase text-white drop-shadow-2xl">
          Your Vote. <br />
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 animate-gradient-x drop-shadow-lg">
            Fully Secured.
          </span>
        </motion.h1>
        
        <motion.p initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl text-xl text-gray-400 mb-14 leading-relaxed font-light font-mono">
          The future of fair and open elections. A voting system where your identity is protected, and your vote is mathematically guaranteed to count.
        </motion.p>

        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex gap-6 z-10 relative">
          <Link href="/login">
             <CyberButton className="text-lg">
                Sign In to Vote <ArrowRight size={20} />
             </CyberButton>
          </Link>
          <Link href="/verify" className="px-10 py-5 font-bold uppercase tracking-widest text-sm bg-white/5 hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]" style={{ clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)'}}>
            Check Your Vote
          </Link>
        </motion.div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-32 border-b border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-20">
           <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">How It Works</h2>
           <p className="text-cyan-400 font-mono tracking-[0.2em] text-sm uppercase">Simple, secure, and verifiable</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 w-full">
           {[
             { step: "01", title: "Sign In securely", icon: Fingerprint, desc: "We verify your identity to ensure a strict one-person, one-vote policy." },
             { step: "02", title: "Cast Your Vote", icon: Eye, desc: "Select your candidate privately and review your choice." },
             { step: "03", title: "Hash Generation", icon: Lock, desc: "We convert your vote into an unbreakable secure code for the public ledger." },
             { step: "04", title: "Verify Your Vote", icon: Database, desc: "Use your secure code to independently confirm your vote was counted correctly." }
           ].map((s, i) => (
              <AsymmetricCard key={i} variants={fadeInUp} className="min-h-[250px]">
                <div className="flex flex-col h-full text-left">
                   <div className="flex justify-between items-start mb-6">
                      <span className="text-3xl font-black text-white/10">{s.step}</span>
                      <s.icon className="text-cyan-400" size={32} />
                   </div>
                   <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">{s.title}</h3>
                   <p className="text-gray-400 font-mono text-xs leading-relaxed">{s.desc}</p>
                </div>
              </AsymmetricCard>
           ))}
        </motion.div>
      </section>

      {/* 3. SECURITY MECHANICS */}
      <section className="py-32 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[100px] bg-blue-500/10 rounded-full pointer-events-none -z-10" />
        
        <div className="flex flex-col md:flex-row items-center gap-16 px-4">
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)'}}>
                <Lock size={14} /> Bank-Grade Security
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Unbreakable Security</h2>
              <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-xl">
                 TrueVote secures your data in transit and at rest. Upon clicking vote, the system generates a cryptographic SHA-256 code derived simultaneously from your choice, the exact timestamp, and your session.
                 <br/><br/>
                 Modification of a single bit breaks the code completely, guaranteeing absolute transparency and immunity to tampering.
              </p>
           </motion.div>
           
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex-1 w-full">
              <div className="p-[2px] bg-gradient-to-br from-blue-500/50 to-emerald-500/20" style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)'}}>
                 <div className="bg-black p-8 font-mono text-xs text-green-400 overflow-hidden" style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)'}}>
                    <p className="opacity-50">root@truevote:~# verify_vote_ledger</p>
                    <p className="mt-2 text-cyan-400">Securing vote choice...</p>
                    <p className="mt-1">Identity verified securely.</p>
                    <p className="mt-1">Generating public ledger entry...</p>
                    <p className="mt-4 text-white font-bold bg-white/10 p-2 break-all">
                       SECURE_CODE: 0x9b7f5d4a1c6e8f2b3a0c5e7d9b4a1f6c8d2e5b7a0c3f5e9b1d4a6c8e3f2b7d5a
                    </p>
                    <p className="mt-2 text-blue-400 animate-pulse">{">>> VOTE COUNTED."}</p>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* 4. CORE FEATURES */}
      <section className="py-32 border-b border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-20">
           <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">Why Choose TrueVote?</h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
           <AsymmetricCard variants={fadeInUp}>
              <UserCheck size={36} className="text-blue-400 mb-6" />
              <h3 className="text-2xl font-black uppercase text-white mb-2">1-To-1 Voter Isolation</h3>
              <p className="text-gray-400 font-mono text-sm">Every vote is mathematically tied to a unique verified identity. Our strict backend logic instantly blocks any attempts at duplicate voting.</p>
           </AsymmetricCard>

           <AsymmetricCard variants={fadeInUp}>
              <Activity size={36} className="text-cyan-400 mb-6" />
              <h3 className="text-2xl font-black uppercase text-white mb-2">Real-Time Verification</h3>
              <p className="text-gray-400 font-mono text-sm">Administrators monitor the entire ecosystem live, while voters can instantly verify their exact vote made it to the final tally using their secure receipt.</p>
           </AsymmetricCard>
        </motion.div>
      </section>

      {/* 5. TRUST */}
      <section className="py-32 border-b border-white/5 text-center">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto px-4">
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
               <div className="w-16 h-16 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-500/10 glow-cyan"><Fingerprint className="text-cyan-400"/></div>
               <h4 className="text-xl font-bold uppercase text-white">Your vote is anonymous</h4>
            </motion.div>
            <motion.div variants={fadeInUp} className="hidden md:block w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
               <div className="w-16 h-16 rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-500/10 glow-purple"><Eye className="text-blue-400"/></div>
               <h4 className="text-xl font-bold uppercase text-white">Your vote is verifiable</h4>
            </motion.div>
            <motion.div variants={fadeInUp} className="hidden md:block w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
               <div className="w-16 h-16 rounded-full border border-emerald-500/30 flex items-center justify-center bg-emerald-500/10 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]"><Lock className="text-emerald-400"/></div>
               <h4 className="text-xl font-bold uppercase text-white">It cannot be altered</h4>
            </motion.div>
         </motion.div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-40 text-center flex flex-col items-center px-4">
         <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-5xl font-black uppercase tracking-tighter mb-8 text-white">
            Ready to participate?
         </motion.h2>
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex gap-4">
            <Link href="/login">
               <CyberButton className="px-16 py-6 text-xl">Sign In to Vote</CyberButton>
            </Link>
         </motion.div>
      </section>
    </PageTransition>
  );
}
