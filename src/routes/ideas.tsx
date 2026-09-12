import { createFileRoute } from "@tanstack/react-router";
import { IdeasView } from "../wira/components/views/IdeasView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/ideas")({
  head: () => ({
    meta: [
      { title: "Ideas — Client OS" },
      { name: "description", content: "Capture and develop your creative ideas." },
    ],
  }),
  component: IdeasViewPage,
});

function IdeasViewPage() {
  return (
    <AppShell title="Ideas" subtitle="Capture and develop your creative ideas.">
      <div className="w-full">
        <IdeasView />
      </div>
    </AppShell>
  );
}
