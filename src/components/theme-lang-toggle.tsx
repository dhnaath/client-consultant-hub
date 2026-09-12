import { useState, useEffect } from "react";
import { Globe, Moon, Sun } from "lucide-react";
import { useLanguage, Language } from "@/finance/hooks/useLanguage";

export function ThemeLangToggle() {
  const lang = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"Dark" | "Light">("Light");

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("appTheme") as "Dark" | "Light") || "Light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "Dark" ? "Light" : "Dark";
    setTheme(newTheme);
    localStorage.setItem("appTheme", newTheme);
  };

  const cycleLanguage = () => {
    const langs: Language[] = ["id", "en", "ms", "zh"];
    const currentIndex = langs.indexOf(lang);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    localStorage.setItem("appLanguage", nextLang);
    window.dispatchEvent(new Event("languageChange"));
  };

  const langText = {
    id: "ID",
    en: "EN",
    ms: "MS",
    zh: "ZH",
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-9 w-16 rounded-lg border border-border bg-background"></div>
        <div className="h-9 w-9 rounded-lg border border-border bg-background"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={cycleLanguage}
        className="flex h-9 min-w-[36px] items-center justify-center rounded-lg border border-border bg-background px-2 text-xs font-bold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        {langText[lang]}
      </button>
      <button
        onClick={toggleTheme}
        className="flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        {theme === "Dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    </div>
  );
}
