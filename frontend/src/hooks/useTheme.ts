"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("docchat-theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  // Fall back to dark mode (richer default experience)
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  // Hydrate from localStorage / system pref on mount
  useEffect(() => {
    setThemeState(getStoredTheme());
  }, []);

  // Sync the <html> class whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("docchat-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggleTheme } as const;
}
