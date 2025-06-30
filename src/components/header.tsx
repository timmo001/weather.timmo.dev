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
import { useBreakpoint } from "~/lib/hooks/tailwind";

function NavItems({ endAt }: { endAt: number }) {
  return navItems.slice(0, endAt).map(({ label, href, icon }) => (
    <Link key={href} href={href} passHref>
      <Button 
        size="sm" 
        variant="ghost" 
        className="hover:bg-accent/50 transition-colors"
      >
        {icon}
        <span className="ml-2 hidden sm:inline">{label}</span>
      </Button>
    </Link>
  ));
}

function Menu({ startAt }: { startAt: number }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="sm" 
          variant="ghost" 
          className="hover:bg-accent/50 transition-colors"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More navigation options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {navItems.slice(startAt).map(({ label, href, icon }) => (
          <DropdownMenuItem key={href} asChild>
            <Link href={href} passHref className="w-full">
              <div className="flex items-center w-full">
                {icon}
                <span className="ml-2">{label}</span>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const isSmall = useBreakpoint("sm");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <nav className="flex flex-1 flex-row flex-nowrap items-center gap-1">
          {isSmall ? (
            <>
              <NavItems endAt={4} />
              {navItems.length > 4 && <Menu startAt={4} />}
            </>
          ) : (
            <>
              <NavItems endAt={2} />
              {navItems.length > 2 && <Menu startAt={2} />}
            </>
          )}
        </nav>

        <div className="flex flex-row flex-nowrap items-center gap-2">
          <Location />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
