import Link from "next/link";

import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";

const navItems: Array<{
  label: string;
  href: string;
}> = [
  { label: "Home", href: "/" },
  { label: "Forecast", href: "/forecast" },
];

export function Header() {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-2 px-3 py-2">
      <nav className="flex flex-wrap items-center gap-1 delay-200 duration-300 animate-in fade-in">
        {navItems.map(({ label, href }) => (
          <Link key={href} href={href}>
            <Button variant="ghost">{label}</Button>
          </Link>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}
