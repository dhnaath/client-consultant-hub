import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { ArrowUpRight, Briefcase, CalendarClock, TrendingUp, Users, Wallet } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Bar, Kosong, Panel, Pill } from "@/components/ui-bits";
import {
  activitiesQuery,
  clientsQuery,
  deliverablesQuery,
  projectsQuery,
  rupiahRingkas,
  sisaHari,
  statusTugas,
  tanggal,
  tasksQuery,
  waktuRelatif,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard Eksekutif — Client OS Konsultan Manajemen" },
      {
        name: "description",
        content:
          "Pantau portofolio klien, proyek, tugas, dan deliverable praktik konsultansi manajemen dalam satu dashboard operasional.",
      },
      { property: "og:title", content: "Dashboard Eksekutif — Client OS Konsultan" },
      {
        property: "og:description",
        content: "Ringkasan klien aktif, proyek berjalan, tenggat tugas, dan aktivitas terbaru.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [clients, projects, tasks, deliverables, activities] = useQueries({
    queries: [clientsQuery, projectsQuery, tasksQuery, deliverablesQuery, activitiesQuery],
  });

  const daftarKlien = clients.data ?? [];
  const daftarProyek = projects.data ?? [];
  const daftarTugas = tasks.data ?? [];
  const daftarDeliv = deliverables.data ?? [];

  const klienAktif = daftarKlien.filter((k) => k.status === "aktif").length;
  const proyekBerjalan = daftarProyek.filter((p) => p.status === "berjalan");
  const nilaiAktif = proyekBerjalan.reduce((a, p) => a + Number(p.nilai), 0);
  const tugasTerbuka = daftarTugas.filter((t) => t.status !== "selesai");
  const jatuhTempo = tugasTerbuka
    .filter((t) => t.tenggat)
    .sort((a, b) => (a.tenggat! < b.tenggat! ? -1 : 1))
    .slice(0, 6);
  const utilisasi = proyekBerjalan.length
    ? Math.round(proyekBerjalan.reduce((a, p) => a + p.progres, 0) / proyekBerjalan.length)
    : 0;

  const namaKlien = (id: string | null) => daftarKlien.find((k) => k.id === id)?.nama ?? "Internal";
  const namaProyek = (id: string | null) => daftarProyek.find((p) => p.id === id)?.nama ?? "—";

  return (
    <AppShell
      title="Dashboard Eksekutif"
      subtitle="Ringkasan portofolio praktik konsultansi manajemen Anda"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metrik
          ikon={<Users className="size-4" />}
          label="Klien aktif"
          nilai={`${klienAktif}`}
          catatan={`${daftarKlien.length} total klien terdaftar`}
        />
        <Metrik
          ikon={<Briefcase className="size-4" />}
          label="Proyek berjalan"
          nilai={`${proyekBerjalan.length}`}
          catatan={`${daftarProyek.length} proyek dalam portofolio`}
        />
        <Metrik
          ikon={<Wallet className="size-4" />}
          label="Nilai proyek berjalan"
          nilai={rupiahRingkas(nilaiAktif)}
          catatan="Kontrak yang sedang dieksekusi"
        />
        <Metrik
          ikon={<TrendingUp className="size-4" />}
          label="Rata-rata progres"
          nilai={`${utilisasi}%`}
          catatan={`${tugasTerbuka.length} tugas masih terbuka`}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Proyek prioritas"
          aksi={
            <Link to="/proyek" className="text-xs font-medium text-primary hover:underline">
              Lihat semua
            </Link>
          }
        >
          {proyekBerjalan.length === 0 ? (
            <Kosong pesan="Belum ada proyek berjalan." />
          ) : (
            <div className="space-y-4">
              {proyekBerjalan.slice(0, 5).map((p) => (
                <div key={p.id} className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{p.nama}</p>
                      <p className="text-xs text-muted-foreground">
                        {namaKlien(p.client_id)} · {p.konsultan} · target{" "}
                        {tanggal(p.tanggal_selesai)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Pill value={p.prioritas} />
                      <span className="text-xs font-medium tabular-nums">{p.progres}%</span>
                    </div>
                  </div>
                  <Bar value={p.progres} />
                </div>
              ))}
            </div>
          )}
        </Panel>

        <Panel
          title="Tenggat terdekat"
          aksi={
            <Link to="/tugas" className="text-xs font-medium text-primary hover:underline">
              Semua tugas
            </Link>
          }
        >
          {jatuhTempo.length === 0 ? (
            <Kosong pesan="Tidak ada tenggat dalam antrean." />
          ) : (
            <ul className="space-y-3">
              {jatuhTempo.map((t) => {
                const sisa = sisaHari(t.tenggat);
                return (
                  <li key={t.id} className="flex items-start gap-3">
                    <CalendarClock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{t.judul}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {namaProyek(t.project_id)}
                      </p>
                    </div>
                    <span
                      className={
                        sisa !== null && sisa < 0
                          ? "text-xs font-medium text-destructive"
                          : "text-xs text-muted-foreground"
                      }
                    >
                      {sisa === null
                        ? "—"
                        : sisa < 0
                          ? `telat ${Math.abs(sisa)} hr`
                          : `${sisa} hr lagi`}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel title="Status tugas" className="xl:col-span-1">
          <ul className="space-y-3">
            {Object.entries(statusTugas).map(([key, label]) => {
              const jumlah = daftarTugas.filter((t) => t.status === key).length;
              const persen = daftarTugas.length ? (jumlah / daftarTugas.length) * 100 : 0;
              return (
                <li key={key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span>{label}</span>
                    <span className="tabular-nums text-muted-foreground">{jumlah}</span>
                  </div>
                  <Bar value={persen} />
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel title="Deliverable menunggu" className="xl:col-span-1">
          {daftarDeliv.filter((d) => d.status !== "disetujui").length === 0 ? (
            <Kosong pesan="Semua deliverable sudah disetujui." />
          ) : (
            <ul className="space-y-3">
              {daftarDeliv
                .filter((d) => d.status !== "disetujui")
                .slice(0, 6)
                .map((d) => (
                  <li key={d.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{d.judul}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {namaProyek(d.project_id)} · {d.versi} · {tanggal(d.jatuh_tempo)}
                      </p>
                    </div>
                    <Pill value={d.status} />
                  </li>
                ))}
            </ul>
          )}
        </Panel>

        <Panel title="Aktivitas terbaru" className="xl:col-span-1">
          {(activities.data ?? []).length === 0 ? (
            <Kosong pesan="Belum ada aktivitas." />
          ) : (
            <ol className="relative space-y-4 border-l border-border pl-4">
              {(activities.data ?? []).slice(0, 6).map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[21px] top-1.5 size-2 rounded-full bg-primary" />
                  <p className="text-sm font-medium">{a.judul}</p>
                  <p className="text-xs text-muted-foreground">
                    {namaKlien(a.client_id)} · {waktuRelatif(a.waktu)}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </div>
    </AppShell>
  );
}

function Metrik({
  ikon,
  label,
  nilai,
  catatan,
}: {
  ikon: React.ReactNode;
  label: string;
  nilai: string;
  catatan: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-foreground">
          {ikon}
        </span>
        <ArrowUpRight className="size-4 text-muted-foreground" />
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight">{nilai}</p>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{catatan}</p>
    </div>
  );
}
