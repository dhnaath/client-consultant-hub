import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Clock, MapPin, Video } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Kosong, Panel, Pill } from "@/components/ui-bits";
import { jamMenit, sisaHari, tanggal } from "@/lib/data";
import { useDataKlien } from "@/lib/portal";

export const Route = createFileRoute("/portal/jadwal")({
  head: () => ({
    meta: [
      { title: "Jadwal Pertemuan — Portal Klien Konsultansi" },
      {
        name: "description",
        content:
          "Jadwal workshop, rapat, dan pelatihan bersama tim konsultan, beserta agenda, lokasi, dan tenggat pekerjaan Anda.",
      },
      { property: "og:title", content: "Jadwal Pertemuan Engagement" },
      {
        property: "og:description",
        content:
          "Agenda pertemuan mendatang dan tenggat deliverable pada engagement konsultansi Anda.",
      },
    ],
  }),
  component: PortalJadwal,
});

function PortalJadwal() {
  const { jadwal, deliverables, namaProyek, memuat } = useDataKlien();

  const sekarang = Date.now();
  const mendatang = jadwal.filter(
    (j) => new Date(j.mulai).getTime() >= sekarang - 3600_000 && j.status !== "selesai",
  );
  const lampau = jadwal
    .filter((j) => !mendatang.includes(j))
    .sort((a, b) => (a.mulai < b.mulai ? 1 : -1));

  const tenggat = deliverables
    .filter((d) => d.jatuh_tempo && d.status !== "disetujui")
    .sort((a, b) => (a.jatuh_tempo! < b.jatuh_tempo! ? -1 : 1));

  return (
    <AppShell
      title="Jadwal"
      subtitle="Pertemuan bersama tim konsultan dan tenggat penting engagement Anda"
    >
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title="Pertemuan mendatang">
          {mendatang.length === 0 ? (
            <Kosong pesan={memuat ? "Memuat jadwal…" : "Belum ada pertemuan terjadwal."} />
          ) : (
            <ul className="space-y-3">
              {mendatang.map((j) => {
                const sisa = sisaHari(j.mulai.slice(0, 10));
                return (
                  <li
                    key={j.id}
                    className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-start"
                  >
                    <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-muted">
                      <span className="text-lg font-semibold leading-none">
                        {new Date(j.mulai).getDate()}
                      </span>
                      <span className="mt-1 text-[11px] uppercase text-muted-foreground">
                        {new Date(j.mulai).toLocaleDateString("id-ID", { month: "short" })}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium">{j.judul}</p>
                        <Pill
                          value={j.tipe === "online" ? "berjalan" : "aktif"}
                          label={j.tipe === "online" ? "Online" : "Onsite"}
                        />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {namaProyek(j.project_id)}
                      </p>
                      {j.agenda ? (
                        <p className="mt-2 text-sm text-muted-foreground">{j.agenda}</p>
                      ) : null}
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="size-3" />
                          {jamMenit(j.mulai)} · {j.durasi_menit} menit
                        </span>
                        <span className="flex items-center gap-1.5">
                          {j.tipe === "online" ? (
                            <Video className="size-3" />
                          ) : (
                            <MapPin className="size-3" />
                          )}
                          {j.lokasi ?? "—"}
                        </span>
                        {sisa !== null ? (
                          <span className="flex items-center gap-1.5">
                            <CalendarClock className="size-3" />
                            {sisa <= 0 ? "hari ini" : `${sisa} hari lagi`}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel title="Tenggat deliverable">
            {tenggat.length === 0 ? (
              <Kosong pesan="Tidak ada tenggat aktif." />
            ) : (
              <ul className="divide-y divide-border">
                {tenggat.map((d) => {
                  const sisa = sisaHari(d.jatuh_tempo);
                  return (
                    <li key={d.id} className="py-2.5 first:pt-0 last:pb-0">
                      <p className="text-sm font-medium">{d.judul}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {tanggal(d.jatuh_tempo)}
                        {sisa !== null
                          ? ` · ${sisa < 0 ? `lewat ${Math.abs(sisa)} hari` : `${sisa} hari lagi`}`
                          : ""}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>

          <Panel title="Riwayat pertemuan">
            {lampau.length === 0 ? (
              <Kosong pesan="Belum ada pertemuan yang selesai." />
            ) : (
              <ul className="divide-y divide-border">
                {lampau.map((j) => (
                  <li key={j.id} className="py-2.5 first:pt-0 last:pb-0">
                    <p className="text-sm font-medium">{j.judul}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {tanggal(j.mulai)} · {jamMenit(j.mulai)} · {j.lokasi ?? "—"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
