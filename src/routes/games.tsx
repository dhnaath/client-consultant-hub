import { createFileRoute } from "@tanstack/react-router";
import { GamesView } from "../wira/components/views/GamesView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [{ title: "Games — Client OS" }, { name: "description", content: "Games to play." }],
  }),
  component: GamesViewPage,
});

function GamesViewPage() {
  return (
    <AppShell title="Games" subtitle="Games to play.">
      <div className="w-full">
        <GamesView />
      </div>
    </AppShell>
  );
}
