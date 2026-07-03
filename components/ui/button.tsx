// components/ui/button.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "font-bold text-xs py-3 px-4 rounded-xl transition-all active:scale-[0.98] disabled:scale-100 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500",
        variant === "primary" && "bg-emerald-600 hover:bg-emerald-500 text-white",
        variant === "secondary" && "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
        variant === "danger" && "bg-rose-950 text-rose-400 hover:bg-rose-900 border border-rose-800/40",
        className
      )}
      {...props}
    />
  );
}