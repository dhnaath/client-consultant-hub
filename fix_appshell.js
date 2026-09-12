const fs = require("fs");
let code = fs.readFileSync("src/components/app-shell.tsx", "utf-8");

// 1. Add useState, ChevronDown, ChevronRight imports
code = code.replace(
  /import { Link, useRouterState } from "@tanstack\/react-router";/,
  'import { useState } from "react";\nimport { Link, useRouterState } from "@tanstack/react-router";',
);
code = code.replace(
  /Settings,\n  Wallet,\n  CreditCard,\n\} from "lucide-react";/,
  'Settings,\n  Wallet,\n  CreditCard,\n  ChevronDown,\n  ChevronRight,\n} from "lucide-react";',
);

// 2. Replace navKonsultan and navKlien
const navGroups = `
const navKonsultan = [
  {
    title: "Manajemen Utama",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard },
      { to: "/klien", label: "Klien", icon: Users },
      { to: "/proyek", label: "Proyek", icon: FolderKanban },
      { to: "/tugas", label: "Tugas", icon: CheckSquare },
      { to: "/catatan", label: "Catatan", icon: NotebookText },
      { to: "/kalender", label: "Timeline", icon: CalendarDays },
      { to: "/katalog-produk", label: "Katalog Produk", icon: Package },
    ]
  },
  {
    title: "Produktivitas & Tools",
    items: [
      { to: "/task-manager", label: "Task Manager", icon: CheckSquare },
      { to: "/matriks-keputusan", label: "Matriks Keputusan", icon: Grid2X2 },
      { to: "/kurasi", label: "Kurasi Link", icon: Grid2X2 },
      { to: "/tools", label: "Tools", icon: FolderOpen },
      { to: "/incoterms", label: "Panduan Incoterms", icon: Navigation },
    ]
  },
  {
    title: "Keuangan & Kekayaan",
    items: [
      { to: "/keuangan", label: "Keuangan Pribadi", icon: Wallet },
      { to: "/kredit", label: "Kredit & Utang", icon: CreditCard },
      { to: "/pajak", label: "Kalkulator Pajak", icon: Calculator },
      { to: "/investasi", label: "Kalkulator Investasi", icon: TrendingUp },
      { to: "/valuasi", label: "Valuasi MAPPI", icon: Building },
    ]
  },
  {
    title: "Syariah & Muamalah",
    items: [
      { to: "/syariah", label: "Pasar Muamalah", icon: Activity },
      { to: "/syariah/indeks", label: "Indeks Sharia", icon: LineChart },
      { to: "/syariah/terlarang", label: "Transaksi Terlarang", icon: AlertTriangle },
      { to: "/syariah/akad", label: "Akad Syariah", icon: FileText },
      { to: "/syariah/asuransi", label: "Asuransi Syariah", icon: Shield },
      { to: "/zakat", label: "Kalkulator Zakat", icon: HeartHandshake },
    ]
  }
] as const;

const navKlien = [
  {
    title: "Portal Klien",
    items: [
      { to: "/portal", label: "Ringkasan", icon: LayoutDashboard },
      { to: "/portal/progres", label: "Progres", icon: Gauge },
      { to: "/portal/pesan", label: "Pesan", icon: MessagesSquare },
      { to: "/portal/jadwal", label: "Jadwal", icon: CalendarClock },
      { to: "/portal/dokumen", label: "Dokumen", icon: FolderOpen },
    ]
  }
] as const;

function NavGroup({ title, items }: { title: string; items: any[] }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground/70 transition-colors hover:text-foreground"
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
      </button>
      {isOpen && (
        <div className="mt-1 flex flex-col gap-0.5">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" || item.to === "/portal" }}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "!bg-accent !text-foreground" }}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
`;

code = code.replace(
  /const navKonsultan = \[[\s\S]*?\] as const;\s*const navKlien = \[[\s\S]*?\] as const;/,
  navGroups,
);

// 3. Replace nav mapping in AppShell sidebar
code = code.replace(
  /<nav className="flex flex-col gap-0\.5">\s*\{nav\.map\(\(item\) => \([\s\S]*?\}\)\}\s*<\/nav>/,
  '<nav className="flex flex-col">\n            {nav.map((group) => (\n              <NavGroup key={group.title} title={group.title} items={group.items} />\n            ))}\n          </nav>',
);

// 4. Replace nav mapping in mobile header
code = code.replace(
  /<nav className="flex gap-1 overflow-x-auto border-t border-border px-3 py-2 lg:hidden">\s*\{nav\.map\(\(item\) => \([\s\S]*?\}\)\}\s*<\/nav>/,
  `{/* Mobile Nav */}\n          <nav className="flex gap-1 overflow-x-auto border-t border-border px-3 py-2 lg:hidden">\n            {nav.flatMap(g => g.items).map((item) => (\n              <Link\n                key={item.to}\n                to={item.to}\n                activeOptions={{ exact: item.to === "/" || item.to === "/portal" }}\n                className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-muted-foreground"\n                activeProps={{ className: "!bg-accent !text-foreground font-medium" }}\n              >\n                {item.label}\n              </Link>\n            ))}\n          </nav>`,
);

fs.writeFileSync("src/components/app-shell.tsx", code);
