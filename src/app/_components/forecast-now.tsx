"use client";
import { useQuery } from "@tanstack/react-query";
import { CloudSun } from "lucide-react";
import { getLocationFromLocalStorage } from "~/lib/localStorage";

export function ForecastNow() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecast = useQuery({
    queryKey: ["forecast", location.data],
    queryFn: async () => {
      return { temp: 22.2 };
    },
  });

  if (location.isLoading) return <span>Loading location...</span>;
  if (location.isError) return <span>Error loading location...</span>;
  if (forecast.isLoading) return <span>Loading forecast...</span>;
  if (forecast.isError) return <span>Error loading forecast...</span>;
  if (!forecast.data) return <span>No forecast data.</span>;

  return (
    <div className="flex select-none flex-row items-stretch gap-6">
      <div className="flex flex-row items-center gap-1">
        <CloudSun className="h-24 w-24" />
      </div>
      <div className="flex flex-row items-center gap-1">
        <span className="text-4xl font-bold">{forecast.data.temp}</span>
        <span className="text-2xl font-semibold">°C</span>
      </div>
    </div>
  );
}
