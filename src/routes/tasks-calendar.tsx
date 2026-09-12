import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { TasksView } from "@/wira/components/views/TasksView";

export const Route = createFileRoute("/tasks-calendar")({
  head: () => ({
    meta: [{ title: "Tasks Calendar" }],
  }),
  component: TasksCalendarPage,
});

function TasksCalendarPage() {
  return (
    <AppShell title="Tasks Calendar" subtitle="Kalender tugas Anda">
      <div className="h-[800px] w-full overflow-hidden bg-card rounded-xl border border-border">
        <TasksView initialViewMode="calendar" />
      </div>
    </AppShell>
  );
}
