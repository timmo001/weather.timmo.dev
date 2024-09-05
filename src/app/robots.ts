import { type MetadataRoute } from "next";

import { baseUrl } from "~/app/sitemap";

// Generate the robots.txt file. This will be found at /robots.txt and is used by search engines to determine what pages to index.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og"],
      disallow: "/private/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
