import { createFileRoute } from "@tanstack/react-router";
import { LanguagesView } from "../wira/components/views/LanguagesView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/languages")({
  head: () => ({
    meta: [
      { title: "Languages — Client OS" },
      { name: "description", content: "Learn new languages." },
    ],
  }),
  component: LanguagesViewPage,
});

function LanguagesViewPage() {
  return (
    <AppShell title="Languages" subtitle="Learn new languages.">
      <div className="w-full">
        <LanguagesView />
      </div>
    </AppShell>
  );
}
