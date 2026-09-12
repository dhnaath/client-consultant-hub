import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, FileText, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Kosong, Panel, Pill } from "@/components/ui-bits";
import { cn } from "@/lib/utils";
import { tanggal } from "@/lib/data";
import { useDataKlien } from "@/lib/portal";

export const Route = createFileRoute("/portal/dokumen")({
  head: () => ({
    meta: [
      { title: "Dokumen Engagement — Portal Klien Konsultansi" },
      {
        name: "description",
        content:
          "Semua laporan, notulen, dan lampiran yang dibagikan tim konsultan untuk engagement Anda, lengkap dengan versi dan tanggal unggah.",
      },
      { property: "og:title", content: "Dokumen Engagement" },
      {
        property: "og:description",
        content: "Kumpulan dokumen resmi yang dibagikan konsultan kepada Anda per proyek.",
      },
    ],
  }),
  component: PortalDokumen,
});

function PortalDokumen() {
  const { dokumen, proyek, namaProyek, memuat } = useDataKlien();
  const [cari, setCari] = useState("");
  const [proyekAktif, setProyekAktif] = useState<string | "semua">("semua");

  const daftar = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return dokumen.filter((d) => {
      const cocokProyek = proyekAktif === "semua" || d.project_id === proyekAktif;
      const cocokCari =
        !q || d.nama.toLowerCase().includes(q) || (d.jenis ?? "").toLowerCase().includes(q);
      return cocokProyek && cocokCari;
    });
  }, [dokumen, cari, proyekAktif]);

  return (
    <AppShell
      title="Dokumen"
      subtitle="Dokumen yang dibagikan tim konsultan untuk engagement Anda"
      actions={
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari dokumen…"
            className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-64"
          />
        </div>
      }
    >
      {proyek.length > 1 ? (
        <div className="mb-4 flex flex-wrap gap-1 rounded-lg border border-border p-1">
          <button
            onClick={() => setProyekAktif("semua")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              proyekAktif === "semua" ? "bg-accent text-foreground" : "text-muted-foreground",
            )}
          >
            Semua proyek
          </button>
          {proyek.map((p) => (
            <button
              key={p.id}
              onClick={() => setProyekAktif(p.id)}
              className={cn(
                "max-w-[12rem] truncate rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                proyekAktif === p.id ? "bg-accent text-foreground" : "text-muted-foreground",
              )}
            >
              {p.nama}
            </button>
          ))}
        </div>
      ) : null}

      <Panel>
        {daftar.length === 0 ? (
          <Kosong
            pesan={
              memuat ? "Memuat dokumen…" : "Tidak ada dokumen yang cocok dengan pencarian Anda."
            }
          />
        ) : (
          <ul className="divide-y divide-border">
            {daftar.map((d) => (
              <li
                key={d.id}
                className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <FileText className="size-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium">{d.nama}</p>
                    <Pill value="aktif" label={d.versi ?? "v1"} />
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {namaProyek(d.project_id)} · {d.jenis ?? "dokumen"} · {d.ukuran ?? "—"} ·
                    diunggah {tanggal(d.created_at)} oleh {d.diunggah_oleh ?? "tim konsultan"}
                  </p>
                </div>
                <a
                  href={d.tautan ?? "#"}
                  target={d.tautan ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
                >
                  <Download className="size-3.5" />
                  Unduh
                </a>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </AppShell>
  );
}
