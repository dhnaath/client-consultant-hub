import { createFileRoute } from "@tanstack/react-router";
import { TripsView } from "../wira/components/views/TripsView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/trips")({
  head: () => ({
    meta: [{ title: "Trips — Client OS" }, { name: "description", content: "Plan your trips." }],
  }),
  component: TripsViewPage,
});

function TripsViewPage() {
  return (
    <AppShell title="Trips" subtitle="Plan your trips.">
      <div className="w-full">
        <TripsView />
      </div>
    </AppShell>
  );
}
