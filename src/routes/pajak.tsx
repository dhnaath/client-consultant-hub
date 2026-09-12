import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import TaxTools from "../tax/components/TaxTools";

export const Route = createFileRoute("/pajak")({
  head: () => ({
    meta: [
      { title: "Kalkulator Pajak — Client OS" },
      { name: "description", content: "Kalkulator Pajak Personal & Bisnis" },
    ],
  }),
  component: PajakPage,
});

function PajakPage() {
  return (
    <AppShell title="Kalkulator Pajak" subtitle="Pajak Personal & Bisnis">
      <div className="w-full">
        <TaxTools />
      </div>
    </AppShell>
  );
}
