"use client";
import { useQuery } from "@tanstack/react-query";
import { CloudSun } from "lucide-react";

import { getLocationFromLocalStorage } from "~/lib/localStorage";

export function ForecastHourly() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecast = useQuery({
    staleTime: 1000 * 60 * 20, // 20 minutes
    queryKey: [location.data, "forecast", "hourly"],
    queryFn: async () => {
      return [
        22.1, 21.9, 21.6, 21.4, 21.2, 21.1, 21.0, 20.9, 20.8, 20.7, 20.6, 20.5,
      ];
    },
  });

  if (location.isLoading) return <span>Loading location...</span>;
  if (location.isError) return <span>Error loading location...</span>;
  if (forecast.isLoading) return <span>Loading forecast...</span>;
  if (forecast.isError) return <span>Error loading forecast...</span>;
  if (!forecast.data || !Array.isArray(forecast.data))
    return <span>No forecast data.</span>;

  return (
    <div className="flex max-w-screen-md select-none flex-row gap-4 overflow-y-auto">
      {forecast.data.map((temp, index) => (
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
