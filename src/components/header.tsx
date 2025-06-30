"use client";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ThemeToggle } from "~/components/theme-toggle";
import { Location } from "~/components/location";
import { navItems } from "~/components/nav-items";

function NavItems({ endAt }: { endAt: number }) {
  return navItems.slice(0, endAt).map(({ label, href, icon }) => (
    <Link key={href} href={href} passHref>
      <Button size="sm" variant="ghost">
        {icon}
        <span className="ms-2">{label}</span>
      </Button>
    </Link>
  ));
}

function Menu({ startAt }: { startAt: number }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navItems.slice(startAt).map(({ label, href, icon }) => (
          <DropdownMenuItem key={href} asChild>
            <Link href={href} passHref>
              <div className="flex items-center">
                {icon}
                <span className="ms-2">{label}</span>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  return (
    <header className="flex w-full flex-nowrap items-start justify-between px-2 py-2">
      {/* Small screen */}
      <nav className="flex flex-row flex-nowrap items-center gap-1 md:hidden">
        <NavItems endAt={4} />
        {/* Add if there are more than 4 items */}
        {/* <Menu startAt={4} /> */}
      </nav>

      {/* Larger screens */}
      <nav className="hidden flex-1 flex-row flex-nowrap items-center gap-1 md:flex">
        <NavItems endAt={2} />
        <Menu startAt={2} />
      </nav>

      <div className="flex flex-row flex-nowrap items-center gap-1">
        <Location />
        <ThemeToggle />
      </div>
    </header>
  );
}
