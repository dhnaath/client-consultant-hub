import { createFileRoute } from "@tanstack/react-router";
import { EventsView } from "../wira/components/views/EventsView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [{ title: "Events — Client OS" }, { name: "description", content: "Upcoming events." }],
  }),
  component: EventsViewPage,
});

function EventsViewPage() {
  return (
    <AppShell title="Events" subtitle="Upcoming events.">
      <div className="w-full">
        <EventsView />
      </div>
    </AppShell>
  );
}
