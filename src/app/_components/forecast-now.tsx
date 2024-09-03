"use client";
import { useQuery } from "@tanstack/react-query";
import { CloudSun } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { getWeatherForecastNow } from "~/lib/serverActions/tomorrowio";

dayjs.extend(relativeTime);

export function ForecastNow() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastNow = useQuery({
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryKey: [location.data, "forecast", "now"],
    queryFn: async () => {
      if (location.isLoading || !location.data) return null;
      return getWeatherForecastNow(location.data);
    },
  });

  if (location.isLoading) return <span>Loading location...</span>;
  if (location.isError) return <span>Error loading location...</span>;
  if (forecastNow.isLoading) return <span>Loading forecast...</span>;
  if (forecastNow.isError) return <span>Error loading forecast...</span>;
  if (!forecastNow.data) return <span>No forecast data.</span>;

  return (
    <div className="flex select-none flex-col gap-6">
      <span className="text-2xl font-semibold">
        Last updated: {dayjs(forecastNow.data.time).fromNow()}
      </span>
      <div className="flex flex-row items-stretch gap-6">
        <div className="flex flex-row items-center gap-1">
          <CloudSun className="h-24 w-24" />
        </div>
        <div className="flex flex-row items-center gap-1">
          <span className="text-4xl font-bold">
            {forecastNow.data.temperature.toFixed(1)}
          </span>
          <span className="text-2xl font-semibold">°C</span>
        </div>
      </div>
    </div>
  );
}
