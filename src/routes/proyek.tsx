import { createFileRoute } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Bar, Kosong, Panel, Pill } from "@/components/ui-bits";
import { cn } from "@/lib/utils";
import {
  clientsQuery,
  deliverablesQuery,
  projectsQuery,
  rupiah,
  statusProyek,
  tanggal,
  tasksQuery,
} from "@/lib/data";

export const Route = createFileRoute("/proyek")({
  head: () => ({
    meta: [
      { title: "Proyek Konsultansi — Client OS Konsultan Manajemen" },
      {
        name: "description",
        content:
          "Papan proyek konsultansi lengkap dengan status, prioritas, progres, nilai kontrak, dan deliverable.",
      },
      { property: "og:title", content: "Proyek Konsultansi" },
      {
        property: "og:description",
        content: "Pantau seluruh penugasan konsultansi dari perencanaan hingga selesai.",
      },
    ],
  }),
  component: HalamanProyek,
});

const filterStatus = ["semua", "perencanaan", "berjalan", "tertahan", "selesai"] as const;

function HalamanProyek() {
  const [aktif, setAktif] = useState<string>("semua");
  const [projects, clients, tasks, deliverables] = useQueries({
    queries: [projectsQuery, clientsQuery, tasksQuery, deliverablesQuery],
  });

  const daftar = (projects.data ?? []).filter((p) => aktif === "semua" || p.status === aktif);
  const namaKlien = (id: string | null) =>
    (clients.data ?? []).find((k) => k.id === id)?.nama ?? "Internal";

  return (
    <AppShell
      title="Proyek Konsultansi"
      subtitle="Semua penugasan lintas klien beserta progres dan deliverable"
      actions={
        <div className="flex flex-wrap gap-1 rounded-lg border border-border p-1">
          {filterStatus.map((s) => (
            <button
              key={s}
              onClick={() => setAktif(s)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium capitalize text-muted-foreground transition-colors hover:text-foreground",
                aktif === s && "bg-accent text-foreground",
              )}
            >
              {s === "semua" ? "Semua" : (statusProyek[s] ?? s)}
            </button>
          ))}
        </div>
      }
    >
      {daftar.length === 0 ? (
        <Kosong pesan="Tidak ada proyek pada filter ini." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {daftar.map((p) => {
            const tugas = (tasks.data ?? []).filter((t) => t.project_id === p.id);
            const selesai = tugas.filter((t) => t.status === "selesai").length;
            const deliv = (deliverables.data ?? []).filter((d) => d.project_id === p.id);
            return (
              <Panel key={p.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">{namaKlien(p.client_id)}</p>
                    <h3 className="mt-0.5 font-semibold tracking-tight">{p.nama}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Pill value={p.prioritas} />
                    <Pill value={p.status} label={statusProyek[p.status] ?? p.status} />
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.ringkasan}</p>

                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progres</span>
                    <span className="tabular-nums">{p.progres}%</span>
                  </div>
                  <Bar value={p.progres} />
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                  <Info label="Konsultan" nilai={p.konsultan ?? "—"} />
                  <Info label="Periode" nilai={`${tanggal(p.tanggal_mulai)}`} />
                  <Info label="Target" nilai={tanggal(p.tanggal_selesai)} />
                  <Info label="Nilai" nilai={rupiah(Number(p.nilai))} />
                </dl>

                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                  <span>
                    Tugas {selesai}/{tugas.length} selesai
                  </span>
                  <span>·</span>
                  <span>{deliv.length} deliverable</span>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}

function Info({ label, nilai }: { label: string; nilai: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium">{nilai}</dd>
    </div>
  );
}
