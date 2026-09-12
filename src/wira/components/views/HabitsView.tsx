import React from "react";
import { Activity, Droplet, BookOpen } from "lucide-react";
import { cn } from "../../../lib/utils";

const habits = [
  { id: 1, title: "Drink Water", icon: Droplet, color: "text-blue-500", progress: 60 },
  { id: 2, title: "Meditation", icon: Activity, color: "text-emerald-500", progress: 100 },
  { id: 3, title: "Reading", icon: BookOpen, color: "text-amber-500", progress: 0 },
];

export function HabitsView() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Habits</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track your daily habits and build streaks.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
          New Habit
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm flex flex-col mb-8 max-w-xl">
        <div className="p-6 border-b border-bg-muted/30 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Today's Progress</h3>
          <Activity size={18} className="text-muted-foreground/70" />
        </div>
        <div className="p-6 flex-1 space-y-6">
          {habits.map((habit) => (
            <div key={habit.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <habit.icon size={16} className={habit.color} />
                  <span className="text-sm font-medium text-card-foreground">{habit.title}</span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  {habit.progress}%
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    habit.progress === 100 ? "bg-emerald-500" : "bg-blue-500",
                  )}
                  style={{ width: `${habit.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl bg-card/50 p-8">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <Activity size={32} className="text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-foreground">No new habits yet</h3>
        <p className="text-muted-foreground mt-2 max-w-md text-center">
          Start building good habits today.
        </p>
      </div>
    </div>
  );
}
