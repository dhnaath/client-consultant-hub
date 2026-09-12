const fs = require("fs");
const file = "/app/applet/src/components/app-shell.tsx";
let content = fs.readFileSync(file, "utf8");

// 1. Add "Akses Cepat" category
content = content.replace(
  "const navKonsultan = [",
  'const navKonsultan = [\n  {\n    title: "Akses Cepat",\n    items: [\n      { to: "/favorit", label: "Favorit", icon: Star },\n      { to: "/profil", label: "Profil", icon: User },\n      { to: "/lainnya", label: "Lainnya", icon: MoreHorizontal },\n    ],\n  },',
);

// 2. Modify the bottom grid
const oldBottomGrid = `<div className="mt-4 grid grid-cols-4 gap-1 shrink-0 relative">
          <button
            className="rounded-xl bg-card border border-border flex flex-col gap-1 items-center justify-center py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm hover:shadow-md"
            title="Lainnya"
            onClick={() => alert("Fitur global sedang dalam pengembangan")}
          >
            <MoreHorizontal size={18} />
          </button>
          <button
            className="rounded-xl bg-card border border-border flex flex-col gap-1 items-center justify-center py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm hover:shadow-md"
            title="Favorit"
            onClick={() => alert("Fitur global sedang dalam pengembangan")}
          >
            <Star size={18} />
          </button>
          <button
            className="rounded-xl bg-card border border-border flex flex-col gap-1 items-center justify-center py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm hover:shadow-md"
            title="Profil"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <User size={18} />
          </button>
          <button
            className="rounded-xl bg-card border border-border flex flex-col gap-1 items-center justify-center py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm hover:shadow-md"
            title="Pengaturan"
            onClick={() => handleOpenSettings("general")}
          >
            <Settings size={18} />
          </button>`;

const newBottomGrid = `<div className="mt-4 shrink-0 relative">
          <button
            className="w-full rounded-xl bg-card border border-border flex gap-2 items-center justify-center py-2.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm hover:shadow-md"
            title="Pengaturan"
            onClick={() => handleOpenSettings("general")}
          >
            <Settings size={18} />
            <span className="text-sm font-medium">Pengaturan</span>
          </button>`;

content = content.replace(oldBottomGrid, newBottomGrid);

fs.writeFileSync(file, content);
