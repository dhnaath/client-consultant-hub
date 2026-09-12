import { createFileRoute } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Pin, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Kosong } from "@/components/ui-bits";
import { cn } from "@/lib/utils";
import { clientsQuery, notesQuery, waktuRelatif } from "@/lib/data";

export const Route = createFileRoute("/catatan")({
  head: () => ({
    meta: [
      { title: "Catatan & Knowledge Base — Client OS Konsultan Manajemen" },
      {
        name: "description",
        content:
          "Basis pengetahuan konsultan: notulen rapat, temuan, metodologi, checklist, dan template proposal.",
      },
      { property: "og:title", content: "Catatan & Knowledge Base Konsultan" },
      {
        property: "og:description",
        content: "Kumpulan notulen, temuan lapangan, metodologi, dan template kerja konsultansi.",
      },
    ],
  }),
  component: HalamanCatatan,
});

function HalamanCatatan() {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("semua");
  const [notes, clients] = useQueries({ queries: [notesQuery, clientsQuery] });
  const semua = notes.data ?? [];

  const kategoriList = useMemo(
    () => ["semua", ...Array.from(new Set(semua.map((n) => n.kategori)))],
    [semua],
  );

  const hasil = semua.filter((n) => {
    const cocokKategori = kategori === "semua" || n.kategori === kategori;
    const q = cari.trim().toLowerCase();
    const cocokCari =
      !q ||
      n.judul.toLowerCase().includes(q) ||
      (n.isi ?? "").toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q));
    return cocokKategori && cocokCari;
  });

  const namaKlien = (id: string | null) =>
    (clients.data ?? []).find((k) => k.id === id)?.nama ?? "Pengetahuan internal";

  const urut = [...hasil].sort((a, b) => Number(b.dipin) - Number(a.dipin));

  return (
    <AppShell
      title="Catatan & Knowledge Base"
      subtitle="Notulen, temuan, metodologi, dan template kerja praktik Anda"
      actions={
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari catatan atau tag…"
            className="h-9 w-64 rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
          />
        </div>
      }
    >
      <div className="mb-5 flex flex-wrap gap-1.5">
        {kategoriList.map((k) => (
          <button
            key={k}
            onClick={() => setKategori(k)}
            className={cn(
              "rounded-full border border-border px-3 py-1 text-xs font-medium capitalize text-muted-foreground transition-colors hover:text-foreground",
              kategori === k && "border-primary/40 bg-accent text-foreground",
            )}
          >
            {k}
          </button>
        ))}
      </div>

      {urut.length === 0 ? (
        <Kosong pesan="Tidak ada catatan yang cocok." />
      ) : (
        <div className="columns-1 gap-4 md:columns-2 xl:columns-3 [&>*]:mb-4">
          {urut.map((n) => (
            <article
              key={n.id}
              className="break-inside-avoid rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold leading-snug">{n.judul}</h2>
                {n.dipin ? <Pin className="size-4 shrink-0 text-primary" /> : null}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {namaKlien(n.client_id)} · {waktuRelatif(n.updated_at)}
              </p>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {n.isi}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-accent px-2 py-0.5 text-xs capitalize">
                  {n.kategori}
                </span>
                {n.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
