import { createFileRoute } from "@tanstack/react-router";
import { ShoppingListView } from "../wira/components/views/ShoppingListView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/shopping")({
  head: () => ({
    meta: [
      { title: "Shopping List — Client OS" },
      { name: "description", content: "Manage your shopping list." },
    ],
  }),
  component: ShoppingListViewPage,
});

function ShoppingListViewPage() {
  return (
    <AppShell title="Shopping List" subtitle="Manage your shopping list.">
      <div className="w-full">
        <ShoppingListView />
      </div>
    </AppShell>
  );
}
