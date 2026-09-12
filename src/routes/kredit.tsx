import { createFileRoute } from "@tanstack/react-router";
import CreditApp from "@/credit/App";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/kredit")({
  head: () => ({
    meta: [
      { title: "Kredit & Utang — Client OS" },
      { name: "description", content: "Kelola saldo kartu kredit dan utang." },
    ],
  }),
  component: KreditPage,
});

function KreditPage() {
  return (
    <AppShell title="Kredit & Utang" subtitle="Manajemen utang dan kartu kredit">
      <div className="w-full -mt-8">
        <CreditApp />
      </div>
    </AppShell>
  );
}
