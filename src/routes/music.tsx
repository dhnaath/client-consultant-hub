import { createFileRoute } from "@tanstack/react-router";
import { MusicView } from "../wira/components/views/MusicView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music — Client OS" },
      { name: "description", content: "Listen and manage music." },
    ],
  }),
  component: MusicViewPage,
});

function MusicViewPage() {
  return (
    <AppShell title="Music" subtitle="Listen and manage music.">
      <div className="w-full">
        <MusicView />
      </div>
    </AppShell>
  );
}
