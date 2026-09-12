const fs = require("fs");
let code = fs.readFileSync("src/KitlivApp.tsx", "utf-8");

// Find the grid array and remove wira, water, pomodoro
// The array looks like this:
/*
          {[
            {
              id: "wira",
              ...
            },
            {
              id: "kalender",
              ...
            },
            {
              id: "water",
              ...
            },
            {
              id: "pomodoro",
              ...
            },
          ]
*/
code = code.replace(/\{\s*id:\s*"wira"[\s\S]*?\},/, "");
code = code.replace(/\{\s*id:\s*"water"[\s\S]*?\},/, "");
code = code.replace(/\{\s*id:\s*"pomodoro"[\s\S]*?\},/, "");

fs.writeFileSync("src/KitlivApp.tsx", code);
