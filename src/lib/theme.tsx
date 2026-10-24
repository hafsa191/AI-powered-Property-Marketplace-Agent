import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const THEMES = [
  { id: "studio", name: "Studio Fusion", swatch: "oklch(0.66 0.24 305)", ink: "oklch(0.13 0.025 300)" },
  { id: "gold", name: "Luxury Gold", swatch: "oklch(0.8 0.12 85)", ink: "oklch(0.18 0.015 60)" },
  { id: "blue", name: "Deep Blue", swatch: "oklch(0.76 0.12 255)", ink: "oklch(0.17 0.03 262)" },
  { id: "emerald", name: "Emerald", swatch: "oklch(0.78 0.13 162)", ink: "oklch(0.17 0.025 165)" },
  { id: "burgundy", name: "Burgundy", swatch: "oklch(0.78 0.12 15)", ink: "oklch(0.17 0.03 15)" },
  { id: "slate", name: "Slate", swatch: "oklch(0.81 0.025 255)", ink: "oklch(0.16 0.015 255)" },
  { id: "teal", name: "Modern Teal", swatch: "oklch(0.79 0.11 190)", ink: "oklch(0.17 0.025 205)" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
const KEY = "aurelia-theme";

const Ctx = createContext<{ theme: ThemeId; setTheme: (t: ThemeId) => void }>({
  theme: "studio",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("studio");

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as ThemeId | null;
    if (saved && THEMES.some((t) => t.id === saved)) setThemeState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = (t: ThemeId) => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    setThemeState(t);
    localStorage.setItem(KEY, t);
    window.setTimeout(() => root.classList.remove("theme-transition"), 700);
  };

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
