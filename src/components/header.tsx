"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { CloudSun } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "~/components/theme-toggle";

export function Header() {
  const pathname = usePathname();

  const isHomePage = useMemo<boolean>(() => pathname === "/", [pathname]);

  return (
    <header className="flex w-full items-center justify-between gap-2 px-3 py-2">
      {isHomePage ? (
        <div />
      ) : (
        <Link href="/">
          <CloudSun className="h-[1.2rem] w-[1.2rem]" />
        </Link>
      )}
      <ThemeToggle />
    </header>
  );
}
