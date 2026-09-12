import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { EisenhowerMatrix } from "@/components/eisenhower-matrix";

export const Route = createFileRoute("/eisenhower")({
  component: EisenhowerPage,
});

function EisenhowerPage() {
  return (
    <AppShell title="Eisenhower Matrix" subtitle="Matriks Manajemen Waktu">
      <div className="w-full -mt-8">
        <EisenhowerMatrix />
      </div>
    </AppShell>
  );
}
