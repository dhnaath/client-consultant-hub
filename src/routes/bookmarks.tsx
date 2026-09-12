import { createFileRoute } from "@tanstack/react-router";
import { BookmarksView } from "../wira/components/views/BookmarksView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: "Bookmarks — Client OS" },
      { name: "description", content: "Save and organize your favorite links." },
    ],
  }),
  component: BookmarksViewPage,
});

function BookmarksViewPage() {
  return (
    <AppShell title="Bookmarks" subtitle="Save and organize your favorite links.">
      <div className="w-full">
        <BookmarksView />
      </div>
    </AppShell>
  );
}
