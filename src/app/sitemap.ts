import { type MetadataRoute } from "next";

import { navItems } from "~/components/nav-items";

export const baseUrl = "https://weather.timmo.dev";

// Generate the sitemap.xml file. This will be found at /sitemap.xml and is used by search engines to determine what pages to index.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const result: MetadataRoute.Sitemap = navItems.map(({ href }) => ({
    url: `${baseUrl}${href}`,
    lastModified: now,
  }));

  return result;
}
