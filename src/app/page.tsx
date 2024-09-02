import { CloudSun } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="flex flex-row items-center gap-2 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <CloudSun className="h-16 w-16" />
        Weather
      </h1>
    </div>
  );
}
