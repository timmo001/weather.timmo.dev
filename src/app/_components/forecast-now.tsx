"use client";
import { CloudSun } from "lucide-react";

export function ForecastNow() {
  return (
    <div className="flex select-none flex-row items-stretch gap-6">
      <div className="flex flex-row items-center gap-1">
        <CloudSun className="h-24 w-24" />
      </div>
      <div className="flex flex-row items-center gap-1">
        <span className="text-4xl font-bold">22.2</span>
        <span className="text-2xl font-semibold">°C</span>
      </div>
    </div>
  );
}
