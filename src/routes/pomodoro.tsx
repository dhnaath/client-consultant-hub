import { createFileRoute } from "@tanstack/react-router";
import PomodoroApp from "../pomodoro/App";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/pomodoro")({
  head: () => ({
    meta: [
      { title: "Pomodoro Timer — Client OS" },
      { name: "description", content: "Pengatur waktu fokus dan produktivitas." },
    ],
  }),
  component: PomodoroPage,
});

function PomodoroPage() {
  return (
    <AppShell title="Pomodoro Timer" subtitle="Fokus kerja dengan teknik Pomodoro">
      <div className="w-full">
        <PomodoroApp />
      </div>
    </AppShell>
  );
}
