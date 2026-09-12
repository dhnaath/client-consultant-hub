import { createFileRoute } from "@tanstack/react-router";
import { RecipesView } from "../wira/components/views/RecipesView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/recipes")({
  head: () => ({
    meta: [
      { title: "Recipes — Client OS" },
      { name: "description", content: "Manage your recipes." },
    ],
  }),
  component: RecipesViewPage,
});

function RecipesViewPage() {
  return (
    <AppShell title="Recipes" subtitle="Manage your recipes.">
      <div className="w-full">
        <RecipesView />
      </div>
    </AppShell>
  );
}
