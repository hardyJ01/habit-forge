"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, RotateCcw, Plus } from "lucide-react";
import { HydrationState } from "@/types";

export default function WaterCheckInPage() {
  const [hydration, setHydration] = useLocalStorage<HydrationState>("hf_hydration", {
    glassesDrunk: 0,
    dailyGoal: 8,
  });

  const progressPercent = Math.min((hydration.glassesDrunk / hydration.dailyGoal) * 100, 100);

  const updateGoal = (newGoal: number) => {
    if (newGoal >= 1) {
      setHydration(prev => ({ ...prev, dailyGoal: newGoal }));
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white sm:text-3xl tracking-tight">Hydration Core</h1>
        <p className="text-sm text-slate-400 mt-1">Configure volume metrics and track fluid ratios.</p>
      </div>

      <Card className="space-y-6 relative overflow-hidden">
        <div className="flex justify-between items-center bg-slate-950/60 p-4 rounded-xl border border-slate-850">
          <label htmlFor="goal-select" className="text-xs font-bold text-slate-400">DAILY TARGET GOAL</label>
          <select
            id="goal-select"
            value={hydration.dailyGoal}
            onChange={(e) => updateGoal(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 text-sm font-bold p-2 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            {[4, 6, 8, 10, 12, 16].map(num => (
              <option key={num} value={num}>{num} Glasses</option>
            ))}
          </select>
        </div>

        <div className="text-center py-2">
          <span className="text-slate-500 text-xs uppercase font-bold tracking-widest block">Intake Profile</span>
          <p className="text-5xl font-black text-white mt-2 font-mono">
            {hydration.glassesDrunk} <span className="text-xl text-slate-600 font-sans">/ {hydration.dailyGoal}</span>
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold font-mono">
            <span>VOLUME RATIO</span>
            <span className="text-blue-400">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-4 bg-slate-950 rounded-full p-0.5 border border-slate-850">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => hydration.glassesDrunk < hydration.dailyGoal && setHydration(p => ({ ...p, glassesDrunk: p.glassesDrunk + 1 }))}
            disabled={hydration.glassesDrunk >= hydration.dailyGoal}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white"
          >
            <Plus size={14} className="inline mr-1" /> Add 1 Glass
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => setHydration(p => ({ ...p, glassesDrunk: 0 }))}
            aria-label="Reset progress"
          >
            <RotateCcw size={14} />
          </Button>
        </div>
      </Card>
    </div>
  );
}