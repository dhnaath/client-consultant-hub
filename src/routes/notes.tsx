import { createFileRoute } from "@tanstack/react-router";
import { NotesView } from "../wira/components/views/NotesView";
import { NotionLayout } from "../wira/components/NotionLayout";
import { AppShell } from "../components/app-shell";
import { useState } from "react";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Notes & Docs — Client OS" },
      { name: "description", content: "Write and organize your notes." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const [notionSubView, setNotionSubView] = useState("notes-personal");

  return (
    <AppShell title="Notes & Docs" subtitle="Write and organize your notes.">
      <div className="w-full h-[calc(100vh-140px)]">
        <NotionLayout activeId={notionSubView} onNavigate={setNotionSubView}>
          {notionSubView.startsWith("notes") ? <NotesView /> : null}
          {notionSubView.startsWith("docs") ? (
            <div className="text-muted-foreground text-center mt-10">
              Documentation view coming soon
            </div>
          ) : null}
        </NotionLayout>
      </div>
    </AppShell>
  );
}
