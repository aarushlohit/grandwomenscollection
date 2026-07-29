"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ThemeMode = "light" | "dark";

const ThemeContext = createContext<{
  resolvedTheme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [resolvedTheme, setResolvedTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("grand-theme");
    const nextTheme = stored === "dark" || stored === "light" ? stored : "light";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    setResolvedTheme(nextTheme);
  }, []);

  const value = useMemo(
    () => ({
      resolvedTheme,
      setTheme: (theme: ThemeMode) => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        window.localStorage.setItem("grand-theme", theme);
        setResolvedTheme(theme);
      }
    }),
    [resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
