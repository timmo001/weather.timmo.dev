"use client";
import { CloudSun } from "lucide-react";

const forecast12Hour = [
  22.1, 21.9, 21.6, 21.4, 21.2, 21.1, 21.0, 20.9, 20.8, 20.7, 20.6, 20.5,
];

export function ForecastHourly() {
  return (
    <div className="flex max-w-screen-md select-none flex-row gap-4 overflow-y-auto">
      {forecast12Hour.map((temp, index) => (
        <div key={index} className="flex flex-col items-stretch gap-1">
          <div className="flex flex-row items-center gap-1">
            <CloudSun className="h-16 w-16" />
          </div>
          <div className="flex flex-row items-center gap-1">
            <span className="text-xl font-bold">{temp.toFixed(1)}</span>
            <span className="text-sm font-semibold">°C</span>
          </div>
        </div>
      ))}
    </div>
  );
}
