import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import LocalShariaIndices from "../syariah/components/LocalShariaIndices";

export const Route = createFileRoute("/syariah/indeks")({
  component: SyariahIndeksPage,
});

function SyariahIndeksPage() {
  return (
    <AppShell title="Indeks Sharia" subtitle="Daftar indeks saham syariah lokal">
      <div className="w-full">
        <LocalShariaIndices />
      </div>
    </AppShell>
  );
}
