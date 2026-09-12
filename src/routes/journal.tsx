import { createFileRoute } from "@tanstack/react-router";
import { JournalView } from "../wira/components/views/JournalView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Client OS" },
      { name: "description", content: "Write and reflect on your thoughts." },
    ],
  }),
  component: JournalViewPage,
});

function JournalViewPage() {
  return (
    <AppShell title="Journal" subtitle="Write and reflect on your thoughts.">
      <div className="w-full">
        <JournalView />
      </div>
    </AppShell>
  );
}
