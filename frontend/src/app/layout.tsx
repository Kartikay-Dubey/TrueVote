import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BackgroundEffect } from "@/components/aesthetic/BackgroundEffect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrueVote Secure Polling",
  description: "Trust Through Transparency. End-to-end verifiable digital voting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-[#050505] text-white min-h-screen`}>
        {/* TrueVote Animated Canvas Background */}
        <BackgroundEffect />

        {/* Global Navigation */}
        <nav className="fixed top-0 w-full z-50 glass">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between border-b border-white/5">
            <Link href="/" className="font-bold text-xl tracking-tight transition-transform hover:scale-105 relative z-10 flex items-center gap-2">
              <div className="w-6 h-6 bg-cyan-500 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.6)]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                 <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </div>
              <span><span className="text-cyan-400 font-black">True</span>Vote</span>
            </Link>
            <div className="flex gap-6 items-center relative z-10">
               <Link href="/" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Home</Link>
               <Link href="/vote" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Cast Vote</Link>
               <Link href="/verify" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Verify</Link>
               <Link href="/admin" className="text-sm font-medium px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/30 hover:border-purple-500/50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)] glow-purple">
                 Admin Dashboard
               </Link>
            </div>
          </div>
        </nav>
        
        {/* Main Content Layout Block */}
        <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-[calc(100vh-80px)] relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
