import { createFileRoute } from "@tanstack/react-router";
import { GoalsView } from "../wira/components/views/GoalsView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "Goals — Client OS" },
      { name: "description", content: "Set and track your long-term objectives." },
    ],
  }),
  component: GoalsViewPage,
});

function GoalsViewPage() {
  return (
    <AppShell title="Goals" subtitle="Set and track your long-term objectives.">
      <div className="w-full">
        <GoalsView />
      </div>
    </AppShell>
  );
}
