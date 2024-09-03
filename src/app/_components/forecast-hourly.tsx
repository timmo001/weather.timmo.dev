"use client";
import { useQuery } from "@tanstack/react-query";
import { CloudSun } from "lucide-react";

import { getLocationFromLocalStorage } from "~/lib/localStorage";
import {
  type WeatherForecastErrorResponse,
  type WeatherForecastHourly,
  getWeatherForecastHourly,
} from "~/lib/serverActions/tomorrowio";

export function ForecastHourly() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastHourly = useQuery({
    staleTime: 1000 * 60 * 20, // 20 minutes
    queryKey: [location.data, "forecast", "hourly"],
    queryFn: async (): Promise<
      WeatherForecastErrorResponse | WeatherForecastHourly
    > => {
      if (location.isLoading || !location.data)
        return Promise.reject("No location data.");
      console.log("Get hourly forecast for location:", location.data);
      return await getWeatherForecastHourly(location.data);
    },
  });

  if (location.isLoading) return <span>Loading location...</span>;
  if (location.isError) return <span>Error loading location...</span>;
  if (forecastHourly.isLoading) return <span>Loading hourly forecast...</span>;
  if (forecastHourly.isError)
    return <span>Error loading hourly forecast.</span>;
  if (!forecastHourly.data) return <span>No hourly forecast data.</span>;
  if ("code" in forecastHourly.data)
    return <span>{forecastHourly.data.code}</span>;

  return (
    <div className="flex max-w-screen-md select-none flex-row gap-4 overflow-y-auto">
      {[
        22.1, 21.9, 21.6, 21.4, 21.2, 21.1, 21.0, 20.9, 20.8, 20.7, 20.6, 20.5,
      ].map((temp, index) => (
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
