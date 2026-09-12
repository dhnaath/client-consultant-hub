const fs = require("fs");
const path = require("path");

const replacements = [
  // Backgrounds
  { regex: /\bbg-white\b/g, replacement: "bg-card" },
  { regex: /\bbg-slate-50(?!\/)\b/g, replacement: "bg-muted/30" },
  { regex: /\bbg-slate-100\b/g, replacement: "bg-muted" },
  { regex: /\bbg-slate-200\b/g, replacement: "bg-accent" },
  { regex: /\bbg-slate-800\b/g, replacement: "bg-primary" },
  { regex: /\bbg-slate-900\b/g, replacement: "bg-primary" },
  { regex: /\bgray-50\b/g, replacement: "bg-muted/30" },
  { regex: /\bgray-100\b/g, replacement: "bg-muted" },
  { regex: /\bgray-200\b/g, replacement: "bg-accent" },
  { regex: /\bgray-800\b/g, replacement: "bg-primary" },
  { regex: /\bgray-900\b/g, replacement: "bg-primary" },

  // Texts
  { regex: /\btext-slate-900\b/g, replacement: "text-foreground" },
  { regex: /\btext-slate-800\b/g, replacement: "text-foreground" },
  { regex: /\btext-slate-700\b/g, replacement: "text-card-foreground" },
  { regex: /\btext-slate-600\b/g, replacement: "text-muted-foreground" },
  { regex: /\btext-slate-500\b/g, replacement: "text-muted-foreground" },
  { regex: /\btext-slate-400\b/g, replacement: "text-muted-foreground/70" },
  { regex: /\btext-slate-300\b/g, replacement: "text-muted-foreground/50" },
  { regex: /\btext-gray-900\b/g, replacement: "text-foreground" },
  { regex: /\btext-gray-800\b/g, replacement: "text-foreground" },
  { regex: /\btext-gray-700\b/g, replacement: "text-card-foreground" },
  { regex: /\btext-gray-600\b/g, replacement: "text-muted-foreground" },
  { regex: /\btext-gray-500\b/g, replacement: "text-muted-foreground" },

  // Borders
  { regex: /\bborder-slate-100\b/g, replacement: "border-border" },
  { regex: /\bborder-slate-200\b/g, replacement: "border-border" },
  { regex: /\bborder-slate-300\b/g, replacement: "border-border" },
  { regex: /\bborder-gray-100\b/g, replacement: "border-border" },
  { regex: /\bborder-gray-200\b/g, replacement: "border-border" },
  { regex: /\bborder-gray-300\b/g, replacement: "border-border" },

  // Hovers
  { regex: /\bhover:bg-slate-50(?!\/)\b/g, replacement: "hover:bg-muted/50" },
  { regex: /\bhover:bg-slate-100\b/g, replacement: "hover:bg-accent" },
  { regex: /\bhover:bg-slate-200\b/g, replacement: "hover:bg-accent" },
  { regex: /\bhover:bg-slate-800\b/g, replacement: "hover:bg-primary/90" },
  { regex: /\bhover:bg-slate-900\b/g, replacement: "hover:bg-primary/90" },
  { regex: /\bhover:text-slate-900\b/g, replacement: "hover:text-foreground" },
  { regex: /\bhover:text-slate-800\b/g, replacement: "hover:text-foreground" },
  { regex: /\bhover:text-slate-700\b/g, replacement: "hover:text-foreground" },
  { regex: /\bhover:text-slate-600\b/g, replacement: "hover:text-foreground" },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      let content = fs.readFileSync(fullPath, "utf8");
      let modified = false;

      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, "utf8");
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory("./src");
console.log("Done replacing colors.");
