import { createFileRoute } from "@tanstack/react-router";
import { HabitsView } from "../wira/components/views/HabitsView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/habits")({
  head: () => ({
    meta: [
      { title: "Habits — Client OS" },
      { name: "description", content: "Track your daily habits." },
    ],
  }),
  component: HabitsViewPage,
});

function HabitsViewPage() {
  return (
    <AppShell title="Habits" subtitle="Track your daily habits.">
      <div className="w-full">
        <HabitsView />
      </div>
    </AppShell>
  );
}
