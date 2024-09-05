"use client";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { getWeatherForecastNow } from "~/lib/serverActions/tomorrowio";
import {
  type WeatherForecastErrorResponse,
  type WeatherForecastNow,
} from "~/lib/types/tomorrowio";
import { weatherCode } from "~/lib/tomorrowio/weatherCodes";
import { WeatherIcon } from "~/components/weatherIcon";

dayjs.extend(relativeTime);

export function ForecastNow() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastNow = useQuery({
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
    <div className="flex flex-col items-center gap-1 text-center">
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
          <div className="flex flex-row flex-wrap items-stretch gap-6">
            <WeatherIcon
              className="h-32 w-32"
              code={forecastNow.data.weatherCode}
              night={
                dateTime ? dateTime.hour() < 6 || dateTime.hour() >= 18 : false
              }
            />
            <div className="flex flex-col items-start justify-center gap-1">
              <span className="text-3xl font-bold">
                {weatherCode[forecastNow.data.weatherCode] || "Unknown"}
              </span>
              <div className="flex flex-row items-start gap-1">
                <span className="text-5xl font-semibold">
                  {forecastNow.data.temperature.toFixed(1)}
                </span>
                <span className="text-2xl font-semibold">°C</span>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center text-lg">
              <div className="flex flex-row items-center gap-1">
                <span className="font-bold">Humidity:</span>
                <span className="font-semibold">
                  {forecastNow.data.temperature.toFixed(1)}
                </span>
                <span className="font-semibold">%</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span className="font-bold">Wind Speed:</span>
                <span className="font-semibold">
                  {forecastNow.data.windSpeed.toFixed(1)}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span className="font-bold">Wind Direction:</span>
                <span className="font-semibold">
                  {forecastNow.data.windDirection}
                </span>
                <span className="font-semibold">°</span>
              </div>
            </div>
          </div>
          {dateTime && (
            <span className="mt-4 text-sm font-semibold">
              Last updated: {dateTime.fromNow()}
            </span>
          )}
        </>
      )}
    </div>
  );
}
