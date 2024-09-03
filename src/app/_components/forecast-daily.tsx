"use client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CloudSun } from "lucide-react";

import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { getWeatherForecastDaily } from "~/lib/serverActions/tomorrowio";
import {
  type WeatherForecastErrorResponse,
  type WeatherForecastDaily,
} from "~/lib/types/tomorrowio";

export function ForecastDaily() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastDaily = useQuery({
    staleTime: 1000 * 60 * 30, // 30 minutes
    queryKey: [location.data, "forecast", "daily"],
    queryFn: async (): Promise<
      WeatherForecastErrorResponse | WeatherForecastDaily
    > => {
      if (location.isLoading || !location.data)
        return Promise.reject("No location data.");
      console.log("Get daily forecast for location:", location.data);
      return await getWeatherForecastDaily(location.data);
    },
  });

  if (location.isLoading) return <span>Loading location...</span>;
  if (location.isError) return <span>Error loading location...</span>;

  return (
    <div className="mt-4 flex select-none flex-col items-center gap-1 text-center">
      <h3 className="text-xl font-semibold">Daily</h3>
      {forecastDaily.isLoading ? (
        <span>Loading daily forecast...</span>
      ) : forecastDaily.isError ? (
        <span>Error loading daily forecast.</span>
      ) : !forecastDaily.data ? (
        <span>No daily forecast data.</span>
      ) : "code" in forecastDaily.data ? (
        <span>
          An error occured when loading daily forecast data
          {String(forecastDaily.data.code).startsWith("429") &&
            ": Too many requests to the API. Please try again later."}
        </span>
      ) : (
        <div className="custom-scrollbar mt-1 flex max-w-96 flex-row flex-nowrap gap-4 overflow-y-auto md:max-w-screen-md lg:max-w-screen-lg">
          {forecastDaily.data.map((item) => {
            const time = dayjs(item.time);

            return (
              <div
                key={time.toISOString()}
                className="flex flex-col items-stretch gap-1"
              >
                <div className="flex flex-row items-center gap-1">
                  <CloudSun className="h-16 w-16" />
                </div>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-xl font-bold">
                    {item.temperature.toFixed(1)}
                  </span>
                  <span className="text-sm font-semibold">°C</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-semibold">
                    {time.format("ddd")}
                  </span>
                  <span className="text-sm font-semibold">
                    {time.format("HH:mm")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
