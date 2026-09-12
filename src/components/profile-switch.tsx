import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Building2, Check, ChevronsUpDown, ShieldCheck, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clientsQuery } from "@/lib/data";
import { useProfil, type Peran } from "@/lib/profile";
import { cn } from "@/lib/utils";

export function ProfileSwitch() {
  const { clientId, gantiPeran, gantiKlien } = useProfil();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const peran: Peran = pathname.startsWith("/portal") ? "klien" : "konsultan";
  const { data: klien } = useQuery(clientsQuery);
  const daftar = klien ?? [];
  const klienAktif = daftar.find((k) => k.id === clientId);

  const pilihPeran = (p: Peran) => {
    gantiPeran(p);
    navigate({ to: p === "klien" ? "/portal" : "/" });
  };

  const pilihKlien = (id: string) => {
    gantiKlien(id);
    gantiPeran("klien");
    navigate({ to: "/portal" });
  };

  const judul = peran === "konsultan" ? "Dhia Najmi" : (klienAktif?.pic ?? "Perwakilan klien");
  const sub =
    peran === "konsultan" ? "Konsultan · Tim Praktik" : (klienAktif?.nama ?? "Portal Klien");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex max-w-full items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2 text-left transition-colors hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            peran === "konsultan"
              ? "bg-primary text-primary-foreground"
              : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
          )}
        >
          {peran === "konsultan" ? (
            <ShieldCheck className="size-4" />
          ) : (
            <Building2 className="size-4" />
          )}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-sm font-medium">{judul}</span>
          <span className="block truncate text-xs text-muted-foreground">{sub}</span>
        </span>
        <ChevronsUpDown className="ml-1 size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Tampilan aplikasi
        </DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => pilihPeran("konsultan")} className="gap-2.5">
          <ShieldCheck className="size-4" />
          <span className="flex-1">
            <span className="block text-sm">Sisi Konsultan</span>
            <span className="block text-xs text-muted-foreground">
              Semua klien, proyek, dan tugas
            </span>
          </span>
          {peran === "konsultan" ? <Check className="size-4 text-primary" /> : null}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => pilihPeran("klien")} className="gap-2.5">
          <UserRound className="size-4" />
          <span className="flex-1">
            <span className="block text-sm">Sisi Klien</span>
            <span className="block text-xs text-muted-foreground">
              Portal engagement satu perusahaan
            </span>
          </span>
          {peran === "klien" ? <Check className="size-4 text-primary" /> : null}
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Masuk sebagai klien
        </DropdownMenuLabel>
        {daftar.map((k) => (
          <DropdownMenuItem key={k.id} onSelect={() => pilihKlien(k.id)} className="gap-2.5">
            <Building2 className="size-4 text-muted-foreground" />
            <span className="flex-1">
              <span className="block truncate text-sm">{k.nama}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {k.pic ?? "—"} · {k.kota ?? "—"}
              </span>
            </span>
            {peran === "klien" && clientId === k.id ? (
              <Check className="size-4 text-primary" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
