import { type MetadataRoute } from "next";

import { navItems } from "~/lib/nav-items";

export const baseUrl = "https://weather.timmo.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const result: MetadataRoute.Sitemap = navItems.map(({ href }) => ({
    url: `${baseUrl}${href}`,
    lastModified: now,
  }));

  return result;
}
