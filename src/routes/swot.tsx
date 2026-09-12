import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SWOTMatrix } from "@/components/swot-matrix";

export const Route = createFileRoute("/swot")({
  component: SWOTPage,
});

function SWOTPage() {
  return (
    <AppShell title="SWOT Analysis" subtitle="Matriks Perencanaan Strategis">
      <div className="w-full -mt-8">
        <SWOTMatrix />
      </div>
    </AppShell>
  );
}
