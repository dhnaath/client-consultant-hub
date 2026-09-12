const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "src/curated/App.tsx");
let content = fs.readFileSync(file, "utf8");

// Add useEffect to sync initialChapterId
content = content.replace(
  "const [activeChapterId, setActiveChapterId] = useState(initialChapterId);",
  `const [activeChapterId, setActiveChapterId] = useState(initialChapterId);
  import_react.useEffect(() => {
    setActiveChapterId(initialChapterId);
  }, [initialChapterId]);`,
);
// wait, import_react is not correct. I should use React.useEffect or just useEffect since it's imported at the top.
