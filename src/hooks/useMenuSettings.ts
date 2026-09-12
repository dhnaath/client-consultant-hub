import { useState, useEffect } from "react";

const STORAGE_KEY = "sidebar_menu_settings";

export function useMenuSettings() {
  const [enabledMenus, setEnabledMenus] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  const toggleMenu = (path: string, isEnabled: boolean) => {
    const newSettings = { ...enabledMenus, [path]: isEnabled };
    setEnabledMenus(newSettings);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      window.dispatchEvent(new Event("menuSettingsChanged"));
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setEnabledMenus(JSON.parse(stored));
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener("menuSettingsChanged", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("menuSettingsChanged", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { enabledMenus, toggleMenu };
}
