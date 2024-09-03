"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { ThemeToggle } from "~/components/theme-toggle";

export function Header() {
  const pathname = usePathname();

  const isHomePage = useMemo<boolean>(() => pathname === "/", [pathname]);

  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-2 px-3 py-2">
      <nav className="flex flex-wrap items-center gap-6 delay-200 duration-300 animate-in fade-in">
        <Link className="ms-2" href="/">
          Home
        </Link>
        <Link href="/forecast">Forecast</Link>
      </nav>
      <ThemeToggle />
    </header>
  );
}
