import { createFileRoute } from "@tanstack/react-router";
import ValuationApp from "../valuation/App";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/valuasi")({
  head: () => ({
    meta: [
      { title: "Valuasi MAPPI — Client OS Konsultan Manajemen" },
      { name: "description", content: "Penilaian & Analisis Standar Properti dan Bisnis MAPPI." },
    ],
  }),
  component: ValuasiPage,
});

function ValuasiPage() {
  return (
    <AppShell title="Valuasi MAPPI" subtitle="Penilaian Standar Properti dan Bisnis">
      <div className="w-full">
        <ValuationApp />
      </div>
    </AppShell>
  );
}
