import { createFileRoute } from "@tanstack/react-router";
import { MoviesView } from "../wira/components/views/MoviesView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/movies")({
  head: () => ({
    meta: [{ title: "Movies — Client OS" }, { name: "description", content: "Movies to watch." }],
  }),
  component: MoviesViewPage,
});

function MoviesViewPage() {
  return (
    <AppShell title="Movies" subtitle="Movies to watch.">
      <div className="w-full">
        <MoviesView />
      </div>
    </AppShell>
  );
}
