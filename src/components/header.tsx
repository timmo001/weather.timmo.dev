import Link from "next/link";

import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { Location } from "~/components/location";
import { navItems } from "~/components/nav-items";

export function Header() {
  return (
    <header className="flex w-full flex-nowrap items-start justify-between px-2 py-2">
      <nav className="flex flex-1 flex-wrap gap-1">
        {navItems.map(({ label, href, icon }) => (
          <Link key={href} href={href}>
            <Button size="sm" variant="ghost">
              {icon}
              <span className="ms-2">{label}</span>
            </Button>
          </Link>
        ))}
      </nav>
      <div className="flex flex-row flex-nowrap items-center gap-1">
        <Location />
        <ThemeToggle />
      </div>
    </header>
  );
}
