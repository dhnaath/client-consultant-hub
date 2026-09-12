import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ExpenseMatrix } from "@/components/expense-matrix";

export const Route = createFileRoute("/expense")({
  component: ExpensePage,
});

function ExpensePage() {
  return (
    <AppShell title="Expense" subtitle="Kuadran Pengeluaran">
      <div className="w-full -mt-8">
        <ExpenseMatrix />
      </div>
    </AppShell>
  );
}
