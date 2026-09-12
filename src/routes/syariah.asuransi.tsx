import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import IslamicInsurance from "../syariah/components/IslamicInsurance";

export const Route = createFileRoute("/syariah/asuransi")({
  component: SyariahAsuransiPage,
});

function SyariahAsuransiPage() {
  return (
    <AppShell title="Asuransi Syariah" subtitle="Panduan lengkap asuransi syariah (Takaful)">
      <div className="w-full">
        <IslamicInsurance />
      </div>
    </AppShell>
  );
}
