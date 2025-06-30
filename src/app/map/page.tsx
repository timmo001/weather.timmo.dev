import { type Metadata } from "next";

import { Map } from "~/app/map/_components/map";

export const metadata: Metadata = {
  title: "Map | Weather",
  description: "View the weather map for your location.",
};

export default function MapPage() {
  return (
    <>
      <section className="animate-in fade-in container flex max-w-(--breakpoint-2xl) flex-col items-center gap-6 delay-300 duration-300">
        <h2 className="text-2xl font-bold">Map</h2>
        <Map />
      </section>
    </>
  );
}
