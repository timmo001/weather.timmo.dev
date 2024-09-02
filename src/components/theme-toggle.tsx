"use client";
import { useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";

export function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();

  const realTheme = useMemo<string>(
    () => (theme === "system" ? systemTheme || "dark" : theme || "dark"),
    [theme, systemTheme],
  );

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setTheme(realTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">
        {/* Shows only on screen readers */}
        Toggle theme
      </span>
    </Button>
  );
}
