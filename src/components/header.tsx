"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { CloudSun } from "lucide-react";

import { ThemeToggle } from "~/components/theme-toggle";

export function Header() {
  const pathname = usePathname();

  const isHomePage = useMemo<boolean>(() => pathname === "/", [pathname]);

  return (
    <header className="flex w-full items-center justify-between gap-2 px-4 py-3">
      {isHomePage ? <div /> : <CloudSun />}
      <ThemeToggle />
    </header>
  );
}
