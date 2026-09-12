import { createFileRoute } from "@tanstack/react-router";
import { BudgetView } from "../wira/components/views/BudgetView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/budget")({
  head: () => ({
    meta: [
      { title: "Budget — Client OS" },
      { name: "description", content: "Manage your finances and budget." },
    ],
  }),
  component: BudgetViewPage,
});

function BudgetViewPage() {
  return (
    <AppShell title="Budget" subtitle="Manage your finances and budget.">
      <div className="w-full">
        <BudgetView />
      </div>
    </AppShell>
  );
}
