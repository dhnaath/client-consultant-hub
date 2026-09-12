import { createFileRoute } from "@tanstack/react-router";
import { PodcastsView } from "../wira/components/views/PodcastsView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/podcasts")({
  head: () => ({
    meta: [
      { title: "Podcasts — Client OS" },
      { name: "description", content: "Podcasts to listen to." },
    ],
  }),
  component: PodcastsViewPage,
});

function PodcastsViewPage() {
  return (
    <AppShell title="Podcasts" subtitle="Podcasts to listen to.">
      <div className="w-full">
        <PodcastsView />
      </div>
    </AppShell>
  );
}
