import { createFileRoute } from "@tanstack/react-router";
import { HealthView } from "../wira/components/views/HealthView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [{ title: "Health — Client OS" }, { name: "description", content: "Track your health." }],
  }),
  component: HealthViewPage,
});

function HealthViewPage() {
  return (
    <AppShell title="Health" subtitle="Track your health.">
      <div className="w-full">
        <HealthView />
      </div>
    </AppShell>
  );
}
