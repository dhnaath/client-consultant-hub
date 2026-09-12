import { createFileRoute } from "@tanstack/react-router";
import { PhotographyView } from "../wira/components/views/PhotographyView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/photography")({
  head: () => ({
    meta: [
      { title: "Photography — Client OS" },
      { name: "description", content: "Manage your photos." },
    ],
  }),
  component: PhotographyViewPage,
});

function PhotographyViewPage() {
  return (
    <AppShell title="Photography" subtitle="Manage your photos.">
      <div className="w-full">
        <PhotographyView />
      </div>
    </AppShell>
  );
}
