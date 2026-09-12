import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Kosong, Panel } from "@/components/ui-bits";
import { cn } from "@/lib/utils";
import { jamMenit, tanggal } from "@/lib/data";
import { useDataKlien } from "@/lib/portal";
import { useProfil } from "@/lib/profile";

export const Route = createFileRoute("/portal/pesan")({
  head: () => ({
    meta: [
      { title: "Pesan Tim Konsultan — Portal Klien" },
      {
        name: "description",
        content:
          "Komunikasi langsung dengan tim konsultan Anda: pertanyaan, klarifikasi data, dan tindak lanjut per proyek.",
      },
      { property: "og:title", content: "Pesan Tim Konsultan" },
      {
        property: "og:description",
        content: "Kirim dan baca pesan dengan konsultan penanggung jawab engagement Anda.",
      },
    ],
  }),
  component: PortalPesan,
});

function PortalPesan() {
  const qc = useQueryClient();
  const { clientId } = useProfil();
  const { klien, proyek, pesan, namaProyek, memuat } = useDataKlien();
  const [proyekAktif, setProyekAktif] = useState<string | "semua">("semua");
  const [teks, setTeks] = useState("");
  const akhir = useRef<HTMLDivElement | null>(null);

  const daftar = useMemo(
    () =>
      (proyekAktif === "semua" ? pesan : pesan.filter((m) => m.project_id === proyekAktif)).slice(),
    [pesan, proyekAktif],
  );

  useEffect(() => {
    akhir.current?.scrollIntoView({ block: "nearest" });
  }, [daftar.length]);

  const kirim = useMutation({
    mutationFn: async (isi: string) => {
      // MOCK: Simulate network delay instead of database insert
      await new Promise((resolve) => setTimeout(resolve, 500));

      const target = proyekAktif === "semua" ? (proyek[0]?.id ?? null) : proyekAktif;
      const newMessage = {
        id: "mock_" + Date.now(),
        client_id: clientId,
        project_id: target,
        pengirim: "klien",
        nama_pengirim: klien?.pic ?? "Perwakilan klien",
        isi,
        dibaca: false,
        created_at: new Date().toISOString(),
      };

      // MOCK: Update React Query cache directly
      qc.setQueryData(["messages"], (old: any) => {
        return [...(old || []), newMessage];
      });
    },
    onSuccess: () => {
      setTeks("");
      toast.success("Pesan terkirim ke tim konsultan");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AppShell
      title="Pesan"
      subtitle="Komunikasi dengan tim konsultan penanggung jawab engagement Anda"
      actions={
        proyek.length > 0 ? (
          <div className="flex flex-wrap gap-1 rounded-lg border border-border p-1">
            <button
              onClick={() => setProyekAktif("semua")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                proyekAktif === "semua" ? "bg-accent text-foreground" : "text-muted-foreground",
              )}
            >
              Semua
            </button>
            {proyek.map((p) => (
              <button
                key={p.id}
                onClick={() => setProyekAktif(p.id)}
                className={cn(
                  "max-w-[10rem] truncate rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  proyekAktif === p.id ? "bg-accent text-foreground" : "text-muted-foreground",
                )}
              >
                {p.nama}
              </button>
            ))}
          </div>
        ) : null
      }
    >
      <Panel className="mx-auto max-w-3xl">
        <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
          {daftar.length === 0 ? (
            <Kosong
              pesan={memuat ? "Memuat percakapan…" : "Belum ada pesan. Mulai percakapan di bawah."}
            />
          ) : (
            daftar.map((m) => {
              const dariKlien = m.pengirim === "klien";
              return (
                <div
                  key={m.id}
                  className={cn("flex flex-col gap-1", dariKlien ? "items-end" : "items-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm sm:max-w-[75%]",
                      dariKlien
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-background",
                    )}
                  >
                    <p className="whitespace-pre-line">{m.isi}</p>
                  </div>
                  <p className="px-1 text-[11px] text-muted-foreground">
                    {m.nama_pengirim} · {namaProyek(m.project_id)} · {tanggal(m.created_at)}{" "}
                    {jamMenit(m.created_at)}
                  </p>
                </div>
              );
            })
          )}
          <div ref={akhir} />
        </div>

        <form
          className="mt-5 flex items-end gap-2 border-t border-border pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            const isi = teks.trim();
            if (!isi) return;
            kirim.mutate(isi);
          }}
        >
          <textarea
            value={teks}
            onChange={(e) => setTeks(e.target.value)}
            rows={2}
            placeholder="Tulis pesan untuk tim konsultan…"
            className="min-h-[2.75rem] flex-1 resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            disabled={kirim.isPending || !teks.trim()}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="size-4" />
            <span className="hidden sm:inline">Kirim</span>
          </button>
        </form>
      </Panel>
    </AppShell>
  );
}
