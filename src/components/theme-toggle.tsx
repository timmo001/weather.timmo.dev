"use client";
import { useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();

  const realTheme = useMemo<string>(
    () => (theme === "system" ? systemTheme || "dark" : theme || "dark"),
    [theme, systemTheme],
  );

  console.log({ theme, systemTheme, realTheme });

  return (
    <button onClick={() => setTheme(realTheme === "dark" ? "light" : "dark")}>
      {realTheme === "dark" ? (
        <Moon className="h-6 w-6" />
      ) : (
        <Sun className="h-6 w-6" />
      )}
    </button>
  );
}
