import { type MetadataRoute } from "next";

import { metadata as mainMetadata } from "~/app/layout";
import { navItems } from "~/components/nav-items";

// Generate the manifest, this will be found at /manifest.json
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
    description: mainMetadata.description!,
    start_url: "/",
    display: "standalone",
    background_color: "#082f49",
    theme_color: "#0ea5e9",
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
    shortcuts: navItems.slice(1).map(({ label, href }) => ({
      name: label,
      short_name: label,
      url: href,
      icons,
    })),
  };

  // Return the manifest
  return manifest;
}
