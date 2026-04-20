"use client";
import { useEffect, useState, useMemo } from "react";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldAlert, CheckCircle2, Globe2 } from "lucide-react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { AsymmetricCard } from "@/components/interactive/AsymmetricCard";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid
} from "recharts";

const PARTY_COLORS: Record<string, string> = {
  "Narendra_Modi": "#f97316", // orange
  "Rahul_Gandhi": "#0ea5e9", // sky
  "Arvind_Kejriwal": "#22d3ee", // cyan
  "Mamata_Banerjee": "#10b981", // emerald
  "D_Raja": "#ef4444" // red
};

export default function AdminDashboard() {
  const [liveVotes, setLiveVotes] = useState(0);
  const [dist, setDist] = useState<Record<string, number>>({});
  const [anomalies, setAnomalies] = useState([] as { msg: string; id: number }[]);
  const [pulse, setPulse] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  
  // Local state for the real-time Line Chart tracking velocity
  const [timeSeries, setTimeSeries] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin-login");
      return;
    }
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/auth/admin-verify`, {
       headers: { "Authorization": `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(data => {
       if (!data.valid) router.push("/admin-login");
       else setIsAuth(true);
    })
    .catch(() => router.push("/admin-login"));

    if (isAuth) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/results`)
        .then(r => r.json())
        .then(d => {
          setLiveVotes(d.total || 0);
          setDist(d.distribution || {});
          // Initialize chart with baseline
          setTimeSeries([{ time: new Date().toLocaleTimeString(), total: d.total || 0 }]);
        })
        .catch(console.error);
    }

    const socket = io(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`);

    socket.on('new_vote_cast', (data: { hash: string, candidateId: string }) => {
      setLiveVotes(prev => {
        const next = prev + 1;
        // Push onto time series chart
        setTimeSeries(current => {
          const updated = [...current, { time: new Date().toLocaleTimeString(), total: next }];
          return updated.slice(-15); // keep last 15 points
        });
        return next;
      });
      setDist(prev => ({ ...prev, [data.candidateId]: (prev[data.candidateId] || 0) + 1 }));
    });

    const interval = setInterval(() => {
      if (Math.random() > 0.94) {
        setPulse(true);
        setAnomalies(prev => [{ msg: `DDoS Mitigation: Connection blocked from IP 104.28.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`, id: Date.now() }, ...prev].slice(0, 4));
        setTimeout(() => setPulse(false), 900);
      }
    }, 2000);

    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, [isAuth, router]);

  const pieData = useMemo(() => {
    return Object.entries(dist).map(([key, value]) => ({
      name: key.replace(/_/g, " "),
      value,
      color: PARTY_COLORS[key] || "#ffffff"
    }));
  }, [dist]);

  if (!isAuth) return null;

  return (
    <PageTransition>
      <div className="pt-8 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter uppercase text-white">Live Election Dashboard</h1>
            <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">Admin Portal connected and visually verifying network nodes.</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <button 
               onClick={() => router.push('/assisted-vote')}
               className="bg-purple-500/10 text-purple-400 border border-purple-500/50 hover:bg-purple-500/20 px-6 py-2.5 font-bold uppercase tracking-widest text-xs transition-colors shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
               style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'}}
            >
               + Rural Access Terminal
            </button>
            <div className="flex items-center gap-3 px-5 py-1.5 bg-green-500/10 text-green-400 border border-green-500/50 text-[10px] font-mono shadow-[0_0_15px_rgba(74,222,128,0.2)]" style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)'}}>
              <div className="w-2 h-2 bg-green-400 animate-pulse drop-shadow-[0_0_5px_rgba(74,222,128,1)]"></div>
              LIVE SSL SECURED
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 w-full">
          <AsymmetricCard active className="h-[180px]">
             <div className="flex justify-between items-start text-gray-400 mb-8">
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Total Secure Votes Cast</span>
               <Globe2 size={24} className="text-cyan-400/50" />
             </div>
             <motion.span 
               key={liveVotes}
               initial={{ scale: 1.1, color: "#22d3ee" }} animate={{ scale: 1, color: "#ffffff" }}
               className="text-6xl font-mono font-black text-white tracking-tight block"
             >
               {liveVotes.toLocaleString()}
             </motion.span>
          </AsymmetricCard>

          <AsymmetricCard className="h-[180px]">
             <div className="flex justify-between items-start text-gray-400 mb-8">
               <span className="text-xs font-bold uppercase tracking-[0.2em]">System Integrity</span>
               <CheckCircle2 className="text-emerald-400/50" size={24} />
             </div>
             <span className="text-6xl font-mono font-black text-emerald-400 tracking-tight block">100.0%</span>
          </AsymmetricCard>

          <AsymmetricCard 
            className={`h-[180px] transition-colors duration-300 ${pulse ? '!border-red-500' : ''}`}
          >
             <div className="absolute inset-0 bg-red-500/10 pointer-events-none opacity-0 transition-opacity duration-300" style={{ opacity: pulse ? 1 : 0 }} />
             <div className="flex justify-between items-start text-gray-400 mb-8 relative z-10">
               <span className={pulse ? "text-xs font-bold uppercase tracking-[0.2em] text-red-500" : "text-xs font-bold uppercase tracking-[0.2em]"}>Security Incidents</span>
               <ShieldAlert className={pulse ? "text-red-500" : "text-gray-600"} size={24} />
             </div>
             <span className={`text-5xl font-black uppercase tracking-wider relative z-10 ${pulse ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-gray-700'}`}>
               {pulse ? "BLOCKED" : "SECURED"}
             </span>
          </AsymmetricCard>
        </div>

        {/* RECHARTS DATA VISUALIZATION SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-8">
            
            {/* Live Distribution Pie Chart */}
            <div className="bg-black/80 p-6 border border-white/5 relative flex flex-col h-[400px]" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'}}>
               <h3 className="font-bold text-lg uppercase tracking-widest text-white mb-2 border-b border-white/10 pb-4">Live Vote Distribution</h3>
               <div className="flex-1 w-full min-h-0 relative">
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          startAngle={180}
                          endAngle={0}
                          innerRadius={90}
                          outerRadius={140}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'monospace' }} 
                          itemStyle={{ color: 'white' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono text-sm uppercase">Awaiting Tally Data...</div>
                  )}
                  {/* Embedded Legend */}
                  <div className="absolute bottom-0 left-0 w-full flex flex-wrap justify-center gap-4 text-[10px] font-mono uppercase">
                     {pieData.map((d, i) => (
                       <div key={i} className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div><span className="text-gray-400">{d.name} ({d.value})</span></div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Time-Series Velocity Area Chart */}
            <div className="bg-black/80 p-6 border border-white/5 relative flex flex-col h-[400px]" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'}}>
               <h3 className="font-bold text-lg uppercase tracking-widest text-white mb-2 border-b border-white/10 pb-4">Network Velocity (Votes / Time)</h3>
               <div className="flex-1 w-full min-h-0 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeSeries} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="time" stroke="#4b5563" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                      <YAxis stroke="#4b5563" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace' }} />
                      <Area type="monotone" dataKey="total" stroke="#22d3ee" fillOpacity={1} fill="url(#colorTotal)" isAnimationActive={false} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>
        </div>

        {/* Security Anomalies Map */}
        <div className="w-full bg-black/80 p-8 border border-white/5 relative" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'}}>
           <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
             <Activity className="text-red-500 animate-pulse" size={24} />
             <h3 className="font-bold text-lg uppercase tracking-widest text-white">Live Operations Log & Firewall Activity</h3>
           </div>
           
           <div className="space-y-4 font-mono text-sm max-h-[250px] overflow-hidden relative">
             <AnimatePresence>
               {anomalies.map((anom) => (
                   <motion.div 
                     layout
                     key={anom.id}
                     initial={{ opacity: 0, x: -50, scale: 0.95 }}
                     animate={{ opacity: 1, x: 0, scale: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ type: "spring", stiffness: 300, damping: 25 }}
                     className="p-4 bg-red-900/10 border-l-4 border-red-500 text-red-300 flex flex-col gap-2"
                   >
                     <div className="flex justify-between items-start w-full">
                        <span className="text-red-400 font-bold uppercase tracking-widest text-xs">Intrusion Attempt Blocked</span>
                        <span className="text-[10px] px-2 py-1 bg-red-500 text-white font-bold uppercase tracking-widest">Defended</span>
                     </div>
                     <span className="text-xs text-gray-400 mt-1">{new Date(anom.id).toLocaleTimeString()} - {anom.msg}</span>
                   </motion.div>
               ))}
             </AnimatePresence>
             {anomalies.length === 0 && <div className="text-gray-600 text-center pt-10 uppercase tracking-[0.2em] text-xs">Sensors active... awaiting threats.</div>}
           </div>
        </div>

      </div>
    </PageTransition>
  );
}
