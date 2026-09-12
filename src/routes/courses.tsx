import { createFileRoute } from "@tanstack/react-router";
import { CoursesView } from "../wira/components/views/CoursesView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Client OS" },
      { name: "description", content: "Manage your courses." },
    ],
  }),
  component: CoursesViewPage,
});

function CoursesViewPage() {
  return (
    <AppShell title="Courses" subtitle="Manage your courses.">
      <div className="w-full">
        <CoursesView />
      </div>
    </AppShell>
  );
}
