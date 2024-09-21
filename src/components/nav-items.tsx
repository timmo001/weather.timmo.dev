import { ClockIcon, CalendarIcon, MapIcon, CloudSun } from "lucide-react";

//
// Create an array of navigation items for the app
//
export const navItems: Array<{
  label: string;
  href: string;
  icon: React.ReactNode;
}> = [
  { label: "Home", href: "/", icon: <CloudSun className="h-4 w-4" /> },
  { label: "Hourly", href: "/hourly", icon: <ClockIcon className="h-4 w-4" /> },
  {
    label: "Daily",
    href: "/daily",
    icon: <CalendarIcon className="h-4 w-4" />,
  },
  { label: "Map", href: "/map", icon: <MapIcon className="h-4 w-4" /> },
];
