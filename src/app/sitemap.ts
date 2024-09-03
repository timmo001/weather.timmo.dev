import { type MetadataRoute } from "next";

export const baseUrl = "https://weather.timmo.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const result: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
    },
    {
      url: `${baseUrl}/temperature`,
      lastModified: now,
    },
  ];

  return result;
}
