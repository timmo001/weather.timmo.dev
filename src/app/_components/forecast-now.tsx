"use client";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CloudSun } from "lucide-react";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { getWeatherForecastNow } from "~/lib/serverActions/tomorrowio";
import {
  type WeatherForecastErrorResponse,
  type WeatherForecastNow,
} from "~/lib/types/tomorrowio";
import { weatherCode } from "~/lib/tomorrowio/weatherCodes";

dayjs.extend(relativeTime);

export function ForecastNow() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastNow = useQuery({
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryKey: [location.data, "forecast", "now"],
    queryFn: async (): Promise<
      WeatherForecastErrorResponse | WeatherForecastNow
    > => {
      if (location.isLoading || !location.data)
        return Promise.reject("No location data.");
      console.log("Get forecast now for location:", location.data);
      return getWeatherForecastNow(location.data);
    },
  });

  const dateTime = useMemo<Dayjs | null>(() => {
    if (
      forecastNow.isLoading ||
      forecastNow.isError ||
      !forecastNow.data ||
      "code" in forecastNow.data
    )
      return null;

    return dayjs(forecastNow.data.time);
  }, [forecastNow.data]);

  if (location.isLoading) return <span>Loading location...</span>;
  if (location.isError) return <span>Error loading location...</span>;

  return (
    <div className="flex select-none flex-col items-center gap-1 text-center">
      <h3 className="text-xl font-semibold">Now</h3>
      {forecastNow.isLoading ? (
        <span>Loading realtime forecast...</span>
      ) : forecastNow.isError ? (
        <span>Error loading realtime forecast.</span>
      ) : !forecastNow.data ? (
        <span>No realtime forecast data.</span>
      ) : "code" in forecastNow.data ? (
        <span>
          An error occured when loading realtime forecast data
          {String(forecastNow.data.code).startsWith("429") &&
            ": Too many requests to the API. Please try again later."}
        </span>
      ) : (
        <>
          <div className="flex flex-row items-stretch gap-6">
            <CloudSun className="h-24 w-24" />
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-lg font-semibold">
                {weatherCode[forecastNow.data.weatherCode] || "Unknown"}
              </span>
              <div className="flex flex-row items-center gap-1">
                <span className="text-4xl font-bold">
                  {forecastNow.data.temperature.toFixed(1)}
                </span>
                <span className="text-2xl font-semibold">°C</span>
              </div>
            </div>
          </div>
          {dateTime && (
            <span className="text-sm font-semibold">
              Last updated: {dateTime.fromNow()}
            </span>
          )}
        </>
      )}
    </div>
  );
}
