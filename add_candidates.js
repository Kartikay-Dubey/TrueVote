const fs = require('fs');

let votePage = fs.readFileSync('frontend/src/app/vote/page.tsx', 'utf8');
let adminPage = fs.readFileSync('frontend/src/app/admin/page.tsx', 'utf8');

// Replace the INDI_CANDIDATES array in vote/page.tsx
const newCandidates = `const INDI_CANDIDATES = [
  { 
    id: "Narendra_Modi", 
    name: "Narendra Modi", 
    party: "Bharatiya Janata Party (BJP)", 
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Bharatiya_Janata_Party_logo.svg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Indian_National_Congress_hand_logo.svg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Aam_Aadmi_Party_logo_%28English%29.svg/1200px-Aam_Aadmi_Party_logo_%28English%29.svg.png",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/All_India_Trinamool_Congress_flag.svg/1024px-All_India_Trinamool_Congress_flag.svg.png",
    symbol: "🌸",
    theme: "from-emerald-500 to-emerald-600",
    border: "border-emerald-500",
    text: "text-emerald-400",
    shadow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    agenda: ["Regional Autonomy", "Women Empowerment", "Social Justice"]
  },
  { 
    id: "Uddhav_Thackeray", 
    name: "Uddhav Thackeray", 
    party: "Shiv Sena (UBT)", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Shiv_Sena_UBT_logo.svg/800px-Shiv_Sena_UBT_logo.svg.png",
    symbol: "🏹",
    theme: "from-amber-600 to-amber-700",
    border: "border-amber-500",
    text: "text-amber-500",
    shadow: "shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    agenda: ["Regional Pride", "Farmers' Voice", "Industrial Growth"]
  },
  { 
    id: "Akhilesh_Yadav", 
    name: "Akhilesh Yadav", 
    party: "Samajwadi Party (SP)", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Samajwadi_Party_Flag.svg/1024px-Samajwadi_Party_Flag.svg.png",
    symbol: "🚲",
    theme: "from-red-500 to-red-600",
    border: "border-red-500",
    text: "text-red-500",
    shadow: "shadow-[0_0_20px_rgba(239,68,68,0.4)]",
    agenda: ["Social Equality", "Minority Rights", "Rural Development"]
  },
  { 
    id: "Mayawati", 
    name: "Mayawati", 
    party: "Bahujan Samaj Party (BSP)", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Elephant_Bahujan_Samaj_Party.svg/512px-Elephant_Bahujan_Samaj_Party.svg.png",
    symbol: "🐘",
    theme: "from-blue-600 to-blue-800",
    border: "border-blue-600",
    text: "text-blue-500",
    shadow: "shadow-[0_0_20px_rgba(37,99,235,0.4)]",
    agenda: ["Dalit Emancipation", "Constitutional Law", "Poverty Eradication"]
  }
];`;

votePage = votePage.replace(/const INDI_CANDIDATES = \[[\s\S]*?\];/, newCandidates);

// Edit the rendering to use image instead of text symbol
// Old: <div className={\`shrink-0 w-20 h-20 flex items-center justify-center text-4xl bg-black border \${isActive ? \`\${c.border} \${c.shadow}\` : 'border-white/10'} transition-all\`} style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>\\s*{c.symbol}\\s*<\/div>
// Replace this logic with an <img> tag if c.image exists
const oldDiv = /\<div className=\{\`shrink-0 w-20 h-20 flex items-center justify-center text-4xl bg-black border \$\{isActive \? \`\$\{c\.border\} \$\{c\.shadow\}\` : 'border-white\/10'\} transition-all\`\} style=\{\{ clipPath: 'polygon\(10px 0, 100% 0, 100% calc\(100% - 10px\), calc\(100% - 10px\) 100%, 0 100%, 0 10px\)' \}\}>\s*\{c\.symbol\}\s*<\/div>/g;

const newDiv = `<div className={\`shrink-0 w-20 h-20 flex items-center justify-center text-4xl bg-black border overflow-hidden relative \${isActive ? \`\${c.border} \${c.shadow}\` : 'border-white/10'} transition-all\`} style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
  {c.image ? <img src={c.image} alt={c.party} className="w-full h-full object-contain p-2" /> : c.symbol}
</div>`;

votePage = votePage.replace(oldDiv, newDiv);

// Also replace the confirmation symbol rendering
// Old: <div className="text-5xl">{activeCandidateData.symbol}</div>
const oldSymbol2 = /<div className="text-5xl">\{activeCandidateData\.symbol\}<\/div>/g;
const newSymbol2 = `<div className="w-24 h-24 shrink-0 bg-white/10 flex items-center justify-center p-2 rounded relative">
  {activeCandidateData.image ? <img src={activeCandidateData.image} className="w-full h-full object-contain" alt="" /> : <span className="text-5xl">{activeCandidateData.symbol}</span>}
</div>`;
votePage = votePage.replace(oldSymbol2, newSymbol2);

fs.writeFileSync('frontend/src/app/vote/page.tsx', votePage);

// Now update admin/page.tsx PARTY_COLORS to include the 3 new ones
const newColors = `const PARTY_COLORS: Record<string, string> = {
  "Narendra_Modi": "#f97316", // orange
  "Rahul_Gandhi": "#0ea5e9", // sky
  "Arvind_Kejriwal": "#22d3ee", // cyan
  "Mamata_Banerjee": "#10b981", // emerald
  "Uddhav_Thackeray": "#f59e0b", // amber
  "Akhilesh_Yadav": "#ef4444", // red
  "Mayawati": "#2563eb", // blue
  "D_Raja": "#dc2626" // darker red
};`;

adminPage = adminPage.replace(/const PARTY_COLORS: Record<string, string> = \{[\s\S]*?\};/, newColors);
fs.writeFileSync('frontend/src/app/admin/page.tsx', adminPage);

console.log('Updated candidates and colors.');
