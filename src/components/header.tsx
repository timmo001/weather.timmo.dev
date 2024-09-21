import Link from "next/link";

import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { Location } from "~/components/location";
import { navItems } from "~/lib/nav-items";

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
      <div className="flex flex-row items-center gap-2">
        <Location />
        <ThemeToggle />
      </div>
    </header>
  );
}
