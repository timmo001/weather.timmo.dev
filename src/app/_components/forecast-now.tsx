"use client";
import { CloudSun } from "lucide-react";

export function ForecastNow() {
  return (
    <div className="flex flex-row items-stretch gap-6">
      <div className="flex flex-row items-center gap-1">
        <CloudSun className="h-24 w-24" />
      </div>
      <div className="flex flex-row items-center gap-1">
        <span className="text-4xl font-bold text-white">22</span>
        <span className="text-4xl font-bold text-white">°C</span>
      </div>
    </div>
  );
}
