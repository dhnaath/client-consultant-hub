const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "src/components/app-shell.tsx");
let content = fs.readFileSync(file, "utf8");

const newCategory = `  {
    title: "Value Treated",
    items: [
      { to: "/kurasi/ekonomi", label: "Ekonomi", icon: Coins },
      { to: "/kurasi/statistik", label: "Statistik", icon: LineChart },
      { to: "/kurasi/manajemen", label: "Manajemen", icon: Briefcase },
      { to: "/kurasi/komunikasi", label: "Komunikasi", icon: MessageCircle },
      { to: "/kurasi/logistik", label: "Logistik", icon: Truck },
      { to: "/kurasi/bisnis", label: "Bisnis", icon: Store },
      { to: "/kurasi/administrasi", label: "Administrasi", icon: FileText },
      { to: "/kurasi/akuntansi", label: "Akuntansi", icon: Calculator },
      { to: "/kurasi/asuransi", label: "Asuransi", icon: Shield },
      { to: "/kurasi/investasi", label: "Investasi", icon: TrendingUp },
    ],
  },
  {
    title: "Keuangan & Investasi",`;

content = content.replace('  {\n    title: "Keuangan & Investasi",', newCategory);

fs.writeFileSync(file, content, "utf8");
console.log("done");
