const fs = require("fs");
const path = require("path");

const replacements = [
  { regex: /\bbg-slate-50\/50\b/g, replacement: "bg-muted/50" },
  { regex: /\bbg-slate-700\b/g, replacement: "bg-primary" },
  { regex: /\bborder-slate-700\b/g, replacement: "border-primary" },
  { regex: /\bbg-slate-300\b/g, replacement: "bg-muted" },
  { regex: /\btext-slate-100\b/g, replacement: "text-primary-foreground" },
  { regex: /\btext-slate-200\b/g, replacement: "text-primary-foreground/80" },
  { regex: /\bbg-slate-400\b/g, replacement: "bg-muted-foreground" },
  { regex: /\bbg-slate-500\/12\b/g, replacement: "bg-muted" },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      // ignore backup files
      if (fullPath.includes(".backup")) continue;

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
