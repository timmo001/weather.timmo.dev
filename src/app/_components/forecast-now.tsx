"use client";
import { useQuery } from "@tanstack/react-query";
import { CloudSun } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { getWeatherForecastNow } from "~/lib/serverActions/accuweather";
import { type AccuweatherCurrentConditions } from "~/lib/types/accuweather";

dayjs.extend(relativeTime);

export function ForecastNow() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastNow = useQuery({
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryKey: [location.data, "forecast", "now"],
    queryFn: async (): Promise<AccuweatherCurrentConditions> => {
      if (location.isLoading || !location.data)
        return Promise.reject("No location data.");
      console.log("Get forecast now for location:", location.data);
      return getWeatherForecastNow(location.data);
    },
  });

  if (location.isLoading) return <span>Loading location...</span>;
  if (location.isError) return <span>Error loading location...</span>;

  return (
    <div className="flex select-none flex-col items-center gap-1 text-center">
      <h2 className="text-2xl font-bold">Now</h2>
      {forecastNow.isLoading ? (
        <span>Loading realtime forecast...</span>
      ) : forecastNow.isError ? (
        <span>Error loading realtime forecast.</span>
      ) : !forecastNow.data ? (
        <span>No realtime forecast data.</span>
      ) : (
        <>
          <div className="flex flex-row items-stretch gap-6">
            <div className="flex flex-row items-center gap-1">
              <CloudSun className="h-24 w-24" />
            </div>
            <div className="flex flex-col items-stretch justify-center gap-1 text-start">
              <span className="ms-1 text-2xl font-semibold">
                {forecastNow.data.WeatherText}
              </span>
              <div className="flex flex-row items-center gap-1">
                <span className="text-4xl font-bold">
                  {forecastNow.data.Temperature.Metric.Value.toFixed(1)}
                </span>
                <span className="text-2xl font-semibold">
                  °{forecastNow.data.Temperature.Metric.Unit}
                </span>
              </div>
            </div>
          </div>
          <span className="mt-2 text-sm font-semibold">
            Last updated:{" "}
            {dayjs(forecastNow.data.LocalObservationDateTime).fromNow()}
          </span>
        </>
      )}
    </div>
  );
}
