// components/ui/card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl", className)} 
      {...props} 
    />
  );
}