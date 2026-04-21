import { useState, useEffect, useRef } from 'react';

const CANDIDATES = [
  "Narendra_Modi",
  "Rahul_Gandhi",
  "Arvind_Kejriwal",
  "Mamata_Banerjee",
  "Uddhav_Thackeray",
  "Akhilesh_Yadav",
  "Mayawati",
  "D_Raja"
];

const LOCATIONS = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Surat", "Jaipur"];

const SUCCESS_LOGS = [
  "Hash verified successfully",
  "Node sync completed",
  "Ledger consensus reached",
  "Block timestamp confirmed",
  "Cryptographic signature validated"
];

const INITIAL_DISTRIBUTION = CANDIDATES.reduce((acc, candidate) => {
  acc[candidate] = Math.floor(Math.random() * 50) + 10;
  return acc;
}, {} as Record<string, number>);

const INITIAL_TOTAL = Object.values(INITIAL_DISTRIBUTION).reduce((acc, val) => acc + val, 0);

export function useLiveSimulation() {
  const [liveVotes, setLiveVotes] = useState(INITIAL_TOTAL);
  const [dist, setDist] = useState<Record<string, number>>(INITIAL_DISTRIBUTION);
  const [anomalies, setAnomalies] = useState<{ msg: string; id: number; type: 'success' | 'alert' }[]>([]);
  const [timeSeries, setTimeSeries] = useState<{ time: string; total: number }[]>([]);
  const [pulse, setPulse] = useState(false);
  
  const totalVotesRef = useRef(INITIAL_TOTAL);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    
    // Initialize time series
    setTimeSeries(
      Array.from({ length: 15 }).map((_, i) => ({
        time: new Date(Date.now() - (15 - i) * 3000).toLocaleTimeString(),
        total: Math.max(0, INITIAL_TOTAL - (15 - i) * 2)
      }))
    );

    // Vote Generator Interval (2 - 5 seconds)
    const voteInterval = setInterval(() => {
      if (!isMounted.current) return;
      
      const numVotes = Math.floor(Math.random() * 3) + 1; // 1 to 3 votes at a time
      const targetCandidate = CANDIDATES[Math.floor(Math.random() * CANDIDATES.length)];
      
      totalVotesRef.current += numVotes;
      setLiveVotes(totalVotesRef.current);
      
      setDist(prev => ({
        ...prev,
        [targetCandidate]: (prev[targetCandidate] || 0) + numVotes
      }));
      
    }, Math.floor(Math.random() * 3000) + 2000);

    // Time Series Chart Updater (every 3 seconds)
    const chartInterval = setInterval(() => {
      if (!isMounted.current) return;
      setTimeSeries(current => {
        const updated = [...current, { time: new Date().toLocaleTimeString(), total: totalVotesRef.current }];
        return updated.slice(-15);
      });
    }, 3000);

    // Logs & Anomalies Generator (every 2 - 4.5 seconds)
    const logInterval = setInterval(() => {
      if (!isMounted.current) return;
      
      const rand = Math.random();
      let newLog = null;

      if (rand > 0.8) {
        // Red Security Event
        setPulse(true);
        newLog = { 
          msg: `DDoS Mitigation: Connection blocked from IP 104.28.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`, 
          id: Date.now(),
          type: 'alert' as const
        };
        setTimeout(() => setPulse(false), 900);
      } else if (rand > 0.3) {
        // Normal Success Event
        const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        const action = SUCCESS_LOGS[Math.floor(Math.random() * SUCCESS_LOGS.length)];
        newLog = {
          msg: rand > 0.6 ? `New secure vote received from ${location}` : action,
          id: Date.now(),
          type: 'success' as const
        };
      }

      if (newLog) {
        setAnomalies(prev => [newLog, ...prev].slice(0, 8)); // Keep last 8 logs
      }

    }, Math.floor(Math.random() * 2500) + 2000);

    return () => {
      isMounted.current = false;
      clearInterval(voteInterval);
      clearInterval(chartInterval);
      clearInterval(logInterval);
    };
  }, []);

  return { liveVotes, dist, anomalies, pulse, timeSeries };
}
