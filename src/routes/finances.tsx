import { createFileRoute } from "@tanstack/react-router";
import { IncomeView } from "../wira/components/views/IncomeView";
import { ExpensesView } from "../wira/components/views/ExpensesView";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/finances")({
  head: () => ({
    meta: [
      { title: "Finances — Client OS" },
      { name: "description", content: "Manage your finances." },
    ],
  }),
  component: FinancesPage,
});

function FinancesPage() {
  return (
    <AppShell title="Finances" subtitle="Manage your finances.">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        <IncomeView />
        <ExpensesView />
      </div>
    </AppShell>
  );
}
