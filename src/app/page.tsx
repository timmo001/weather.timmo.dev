import { CloudSun } from "lucide-react";

import { LocationForm } from "~/app/_components/location-form";

export default function HomePage() {
  return (
    <div
      className="container flex flex-col items-center justify-center gap-12 p-4"
      role="main"
    >
      <h1 className="flex select-none flex-row items-center gap-2 text-5xl font-extrabold tracking-tight text-white delay-200 duration-300 animate-in fade-in sm:text-[5rem]">
        <CloudSun className="h-16 w-16" />
        Weather
      </h1>
      <section className="flex flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
        <h2 className="text-2xl font-bold text-white">Set Location</h2>
        <LocationForm />
      </section>
      <section className="flex flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
        <h2 className="text-2xl font-bold text-white">Forecast</h2>
      </section>
    </div>
  );
}
