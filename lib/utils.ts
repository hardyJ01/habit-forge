import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Prevents layout CSS overlapping bugs
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}