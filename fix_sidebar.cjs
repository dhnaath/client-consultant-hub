const fs = require("fs");
let code = fs.readFileSync("src/components/app-shell.tsx", "utf-8");

// We need to add Droplet, Timer to lucide-react imports if not there.
if (!code.includes("Droplet")) {
  code = code.replace(
    /} from "lucide-react";/,
    '  Droplet,\n  Timer,\n  Briefcase,\n} from "lucide-react";',
  );
}

// Add to navKonsultan
const newCategory = `
  {
    title: "Kehidupan & Produktivitas",
    items: [
      { to: "/kehidupan", label: "Dashboard Life", icon: Briefcase },
      { to: "/water", label: "Water Tracker", icon: Droplet },
      { to: "/pomodoro", label: "Pomodoro Timer", icon: Timer },
    ]
  },`;

code = code.replace(
  /title: "Syariah & Muamalah",/,
  newCategory + '\n  {\n    title: "Syariah & Muamalah",',
);

fs.writeFileSync("src/components/app-shell.tsx", code);
