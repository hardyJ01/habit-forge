// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Trophy, Sparkles, Droplet } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "HabitForge",
  description: "High-performance health routing matrix",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased">
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/60">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg">
                <CheckCircle2 size={18} />
              </div>
              <span className="font-extrabold tracking-tight text-white">HabitForge</span>
            </div>
            <nav className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/50 transition-all">
                <Trophy size={14} /> Today
              </Link>
              <Link href="/checkin" className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/50 transition-all">
                <Droplet size={14} /> Water
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-4xl w-full mx-auto p-6 sm:p-8">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}