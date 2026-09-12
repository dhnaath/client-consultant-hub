const fs = require("fs");
let code = fs.readFileSync("src/KitlivApp.tsx", "utf-8");

// Remove imports
code = code.replace(/import FinanceApp from "\.\/finance\/App";\n/, "");
code = code.replace(/import CreditApp from "\.\/credit\/App";\n/, "");
code = code.replace(/import CuratedApp from "\.\/curated\/App";\n/, "");
code = code.replace(/import TasksApp from "\.\/tasks\/App";\n/, "");

// Remove from useState types
code = code.replace(/    \| "finance"\n/g, "");
code = code.replace(/    \| "credit"\n/g, "");
code = code.replace(/    \| "curated"\n/g, "");
code = code.replace(/    \| "tasks"\n/g, "");

// Remove from subCategories 'apps' array
// (Just replace "finance", "credit", "curated", "tasks" with empty strings or just remove them,
// but it's easier to use a regex that matches them in arrays)
code = code.replace(/"finance",\s*/g, "");
code = code.replace(/"credit",\s*/g, "");
code = code.replace(/"curated",\s*/g, "");
code = code.replace(/"tasks",\s*/g, "");

// The allApps array objects
code = code.replace(/\s*\{\s*id: "finance"[\s\S]*?\},/g, "");
code = code.replace(/\s*\{\s*id: "credit"[\s\S]*?\},/g, "");
code = code.replace(/\s*\{\s*id: "curated"[\s\S]*?\},/g, "");
code = code.replace(/\s*\{\s*id: "tasks"[\s\S]*?\},/g, "");

// The activeApp checks
code = code.replace(
  /\s*if \(activeApp === "finance"\)[\s\S]*?<FinanceApp \/>[\s\S]*?<\/div>\s*\);\s*/g,
  "\n  ",
);
code = code.replace(
  /\s*if \(activeApp === "credit"\)[\s\S]*?<CreditApp \/>[\s\S]*?<\/div>\s*\);\s*/g,
  "\n  ",
);
code = code.replace(
  /\s*if \(activeApp === "curated"\)[\s\S]*?<CuratedApp \/>[\s\S]*?<\/div>\s*\);\s*/g,
  "\n  ",
);
code = code.replace(
  /\s*if \(activeApp === "tasks"\)[\s\S]*?<TasksApp \/>[\s\S]*?<\/div>\s*\);\s*/g,
  "\n  ",
);

fs.writeFileSync("src/KitlivApp.tsx", code);
