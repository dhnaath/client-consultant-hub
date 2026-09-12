import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { AssetMatrix } from "@/components/asset-matrix";

export const Route = createFileRoute("/asset")({
  component: AssetPage,
});

function AssetPage() {
  return (
    <AppShell title="Asset" subtitle="Kuadran Aset">
      <div className="w-full -mt-8">
        <AssetMatrix />
      </div>
    </AppShell>
  );
}
