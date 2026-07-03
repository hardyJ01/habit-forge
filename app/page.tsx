"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Check, Sparkles } from "lucide-react";
import { Habit } from "@/types";

export default function InteractiveDashboard() {
  const [habits, setHabits] = useLocalStorage<Habit[]>("hf_habits", [
    { id: "1", name: "Morning Meditation", streak: 12, category: "Mindset", completed: true },
  ]);

  const [newHabitName, setNewHabitName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Health");

  const addHabit = (name: string, category: string) => {
    if (!name.trim()) return;
    const newEntry: Habit = {
      id: crypto.randomUUID(), // Production safe item standard hashing
      name: name.trim(),
      streak: 0,
      category: category,
      completed: false,
    };
    setHabits(prev => [...prev, newEntry]);
    setNewHabitName("");
  };

  const toggleComplete = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        return { 
          ...h, 
          completed: !h.completed, 
          streak: !h.completed ? h.streak + 1 : Math.max(0, h.streak - 1) 
        };
      }
      return h;
    }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Routine Matrix</h1>
        <p className="text-sm text-slate-400 mt-1">Isolated Client-side LocalStorage synchronization network active.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6 lg:col-span-1">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200">Forge New Habit</h3>
            <div className="space-y-2">
              <input 
                type="text" 
                aria-label="Habit Name"
                placeholder="Name (e.g., Run 5K)"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
              />
              <select 
                aria-label="Habit Category"
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-slate-300 focus:outline-none"
              >
                <option value="Health">💪 Health</option>
                <option value="Mindset">🧠 Mindset</option>
              </select>
              <Button onClick={() => addHabit(newHabitName, selectedCategory)} className="w-full">
                Add Tracker
              </Button>
            </div>
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Sparkles size={14} />
              <h3 className="text-sm font-bold">Quick Injections</h3>
            </div>
            <button 
              onClick={() => addHabit("Digital Detox (Pre-Bed)", "Mindset")}
              className="w-full text-left p-3 bg-slate-950 hover:bg-slate-850 rounded-xl border border-slate-850 text-xs text-slate-300"
            >
              + Adjoin <b>Digital Detox</b> Suggestion
            </button>
            <button 
              onClick={() => addHabit("Running", "Health")}
              className="w-full text-left p-3 bg-slate-950 hover:bg-slate-850 rounded-xl border border-slate-850 text-xs text-slate-300"
            >
              + Adjoin <b>Running</b> Suggestion
            </button>
            <button 
              onClick={() => addHabit("Reading 20 min", "Mindset")}
              className="w-full text-left p-3 bg-slate-950 hover:bg-slate-850 rounded-xl border border-slate-850 text-xs text-slate-300"
            >
              + Adjoin <b>Reading 20 min</b> Suggestion
            </button>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-3">
          {habits.length === 0 ? (
            <div className="text-center p-12 bg-slate-900 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm">
              No tracking arrays detected on disk.
            </div>
          ) : (
            habits.map((habit) => (
              <div 
                key={habit.id} 
                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                  habit.completed ? "bg-slate-900/40 border-slate-800/40 opacity-50" : "bg-slate-900 border-slate-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleComplete(habit.id)}
                    aria-label={`Mark ${habit.name} as complete`}
                    className={`h-6 w-6 rounded-full border flex items-center justify-center transition-all ${
                      habit.completed ? "bg-emerald-500 border-emerald-500 text-slate-950" : "border-slate-700"
                    }`}
                  >
                    <Check size={12} strokeWidth={3} />
                  </button>
                  <div>
                    <h3 className={`text-sm font-bold ${habit.completed && "line-through text-slate-500"}`}>{habit.name}</h3>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{habit.category} • 🔥 {habit.streak} Day Streak</span>
                  </div>
                </div>
                <Button variant="danger" className="py-2 px-2 rounded-lg" onClick={() => setHabits(p => p.filter(h => h.id !== habit.id))}>
                  <Trash2 size={14} />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}