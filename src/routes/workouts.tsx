import { createFileRoute } from "@tanstack/react-router";
import { WorkoutsView } from "../wira/components/views/WorkoutsView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/workouts")({
  head: () => ({
    meta: [
      { title: "Workouts — Client OS" },
      { name: "description", content: "Log and track your fitness routines." },
    ],
  }),
  component: WorkoutsViewPage,
});

function WorkoutsViewPage() {
  return (
    <AppShell title="Workouts" subtitle="Log and track your fitness routines.">
      <div className="w-full">
        <WorkoutsView />
      </div>
    </AppShell>
  );
}
