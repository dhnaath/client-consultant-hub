import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Circle, Clock, Loader2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Bar, Kosong, Panel, Pill } from "@/components/ui-bits";
import { cn } from "@/lib/utils";
import { rupiahRingkas, sisaHari, statusProyek, statusTugas, tanggal } from "@/lib/data";
import { useDataKlien } from "@/lib/portal";

export const Route = createFileRoute("/portal/progres")({
  head: () => ({
    meta: [
      { title: "Progres & Deliverable — Portal Klien Konsultansi" },
      {
        name: "description",
        content:
          "Pantau progres setiap engagement, pekerjaan yang sedang berjalan, dan status deliverable dari tim konsultan Anda.",
      },
      { property: "og:title", content: "Progres & Deliverable Engagement" },
      {
        property: "og:description",
        content:
          "Status pekerjaan dan deliverable per proyek konsultansi Anda, lengkap dengan tenggat.",
      },
    ],
  }),
  component: PortalProgres,
});

function PortalProgres() {
  const { proyek, tugas, deliverables, memuat } = useDataKlien();
  const [aktif, setAktif] = useState<string | "semua">("semua");

  const proyekTampil = aktif === "semua" ? proyek : proyek.filter((p) => p.id === aktif);

  return (
    <AppShell
      title="Progres & Deliverable"
      subtitle="Rincian pekerjaan tim konsultan pada setiap engagement Anda"
      actions={
        proyek.length > 1 ? (
          <div className="flex flex-wrap gap-1 rounded-lg border border-border p-1">
            <button
              onClick={() => setAktif("semua")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                aktif === "semua" ? "bg-accent text-foreground" : "text-muted-foreground",
              )}
            >
              Semua
            </button>
            {proyek.map((p) => (
              <button
                key={p.id}
                onClick={() => setAktif(p.id)}
                className={cn(
                  "max-w-[10rem] truncate rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  aktif === p.id ? "bg-accent text-foreground" : "text-muted-foreground",
                )}
              >
                {p.nama}
              </button>
            ))}
          </div>
        ) : null
      }
    >
      {proyekTampil.length === 0 ? (
        <Panel>
          <Kosong pesan={memuat ? "Memuat progres…" : "Belum ada engagement untuk ditampilkan."} />
        </Panel>
      ) : (
        <div className="space-y-6">
          {proyekTampil.map((p) => {
            const tugasProyek = tugas.filter((t) => t.project_id === p.id);
            const delivProyek = deliverables.filter((d) => d.project_id === p.id);
            const selesai = tugasProyek.filter((t) => t.status === "selesai").length;

            return (
              <Panel key={p.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold tracking-tight">{p.nama}</h2>
                      <Pill value={p.status} label={statusProyek[p.status] ?? p.status} />
                    </div>
                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{p.ringkasan}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold tabular-nums">{p.progres}%</p>
                    <p className="text-xs text-muted-foreground">
                      {selesai}/{tugasProyek.length} pekerjaan selesai
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Bar value={p.progres} />
                </div>

                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-4">
                  <Info label="Konsultan penanggung jawab" nilai={p.konsultan ?? "—"} />
                  <Info label="Mulai" nilai={tanggal(p.tanggal_mulai)} />
                  <Info label="Target selesai" nilai={tanggal(p.tanggal_selesai)} />
                  <Info label="Nilai kontrak" nilai={rupiahRingkas(Number(p.nilai))} />
                </dl>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold">Pekerjaan</h3>
                    {tugasProyek.length === 0 ? (
                      <Kosong pesan="Belum ada pekerjaan tercatat." />
                    ) : (
                      <ul className="mt-3 space-y-2.5">
                        {tugasProyek.map((t) => {
                          const sisa = sisaHari(t.tenggat);
                          return (
                            <li key={t.id} className="flex items-start gap-2.5">
                              {t.status === "selesai" ? (
                                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                              ) : t.status === "berjalan" ? (
                                <Loader2 className="mt-0.5 size-4 shrink-0 text-primary" />
                              ) : (
                                <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                              )}
                              <div className="min-w-0 flex-1">
                                <p
                                  className={cn(
                                    "text-sm",
                                    t.status === "selesai" && "text-muted-foreground line-through",
                                  )}
                                >
                                  {t.judul}
                                </p>
                                <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                                  <Clock className="size-3" />
                                  {tanggal(t.tenggat)}
                                  {t.status !== "selesai" && sisa !== null ? (
                                    <span
                                      className={cn(
                                        sisa < 0
                                          ? "text-rose-600 dark:text-rose-400"
                                          : sisa <= 7
                                            ? "text-amber-600 dark:text-amber-400"
                                            : "",
                                      )}
                                    >
                                      ·{" "}
                                      {sisa < 0
                                        ? `lewat ${Math.abs(sisa)} hari`
                                        : `${sisa} hari lagi`}
                                    </span>
                                  ) : null}
                                </p>
                              </div>
                              <Pill value={t.status} label={statusTugas[t.status] ?? t.status} />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">Deliverable</h3>
                    {delivProyek.length === 0 ? (
                      <Kosong pesan="Belum ada deliverable pada proyek ini." />
                    ) : (
                      <ul className="mt-3 divide-y divide-border">
                        {delivProyek.map((d) => (
                          <li
                            key={d.id}
                            className="flex flex-wrap items-center justify-between gap-2 py-2.5 first:pt-0"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm">{d.judul}</p>
                              <p className="text-xs capitalize text-muted-foreground">
                                {d.jenis} · {d.versi} · jatuh tempo {tanggal(d.jatuh_tempo)}
                              </p>
                            </div>
                            <Pill value={d.status} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
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
    <div className="rounded-xl border border-border bg-background px-3 py-2.5">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium">{nilai}</dd>
    </div>
  );
}
