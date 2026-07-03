export interface Habit {
  id: string;
  name: string;
  streak: number;
  category: string;
  completed: boolean;
}

export interface HydrationState {
  glassesDrunk: number;
  dailyGoal: number;
}