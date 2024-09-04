import { type MetadataRoute } from "next";

import { metadata as mainMetadata } from "~/app/layout";
import { navItems } from "~/lib/nav-items";

export default function manifest(): MetadataRoute.Manifest {
  const icons = [
    {
      src: "/icon",
      sizes: "248x248",
      type: "image/png",
    },
  ];

  const manifest: MetadataRoute.Manifest = {
    name: mainMetadata.title as string,
    short_name: mainMetadata.title as string,
    description: mainMetadata.description as string,
    start_url: "/",
    display: "standalone",
    background_color: "#020817",
    theme_color: "#5b21b6",
    categories: mainMetadata.keywords as Array<string>,
    lang: "en",
    icons,
    screenshots: [
      {
        src: "/api/og",
        sizes: "1200x630",
        type: "image/png",
      },
    ],
    shortcuts: navItems.map(({ label, href }) => ({
      name: label,
      short_name: label,
      url: href,
      icons,
    })),
  };

  // Return the manifest
  return manifest;
}
