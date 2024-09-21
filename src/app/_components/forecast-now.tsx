"use client";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs, { type Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { type WeatherForecastErrorResponse } from "~/lib/schemas/tomorrow-io";
import { type WeatherForecastNow } from "~/lib/schemas/weather";
import { getLocationFromLocalStorage } from "~/lib/local-storage";
import { getWeatherForecastNow } from "~/lib/serverActions/tomorrow-io";
import { weatherCode } from "~/lib/tomorrowio/weather-codes";
import { WeatherIcon } from "~/components/weather-icon";

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
        return Promise.reject(new Error("No location data."));
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
  }, [forecastNow.data, forecastNow.isError, forecastNow.isLoading]);

  if (location.isLoading) return <span>Loading location...</span>;
  if (location.isError) return <span>Error loading location...</span>;

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      {forecastNow.isLoading ? (
        <span>Loading current forecast...</span>
      ) : forecastNow.isError ? (
        <span>Error loading current forecast.</span>
      ) : !forecastNow.data ? (
        <span>No current forecast data.</span>
      ) : "code" in forecastNow.data ? (
        <span>
          An error occured when loading current forecast data
          {String(forecastNow.data.code).startsWith("429") &&
            ": Too many requests to the API. Please try again later."}
        </span>
      ) : (
        <>
          <div className="flex flex-row flex-wrap items-center justify-center gap-2">
            <WeatherIcon
              className="h-32 w-32"
              code={forecastNow.data.weatherCode}
              night={
                dateTime ? dateTime.hour() < 6 || dateTime.hour() >= 18 : false
              }
            />
            <div className="flex flex-col items-center justify-center gap-2 md:items-start">
              <span className="text-5xl font-bold">
                {weatherCode[forecastNow.data.weatherCode] ?? "Unknown"}
              </span>
              <div className="flex flex-row items-start gap-1">
                <span className="text-6xl font-semibold">
                  {forecastNow.data.temperature.toFixed(1)}
                </span>
                <span className="text-2xl font-semibold">°C</span>
              </div>
            </div>
            <div className="mx-10 flex flex-col items-start justify-center text-lg">
              <div className="flex flex-row items-center gap-1">
                <span className="font-semibold">Chance of Rain:</span>
                <span className="font-normal">
                  {forecastNow.data.precipitationProbability.toFixed(0)}
                </span>
                <span className="font-small text-base font-normal">%</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span className="font-semibold">Dew Point:</span>
                <span className="font-normal">
                  {forecastNow.data.dewPoint.toFixed(1)}
                </span>
                <span className="font-small text-base font-normal">°C</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span className="font-semibold">Humidity:</span>
                <span className="font-normal">
                  {forecastNow.data.humidity.toFixed(1)}
                </span>
                <span className="font-small text-base font-normal">%</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span className="font-semibold">Pressure:</span>
                <span className="font-normal">
                  {forecastNow.data.pressureSurfaceLevel.toFixed(1)}
                </span>
                <span className="font-small text-base font-normal">hPa</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span className="font-semibold">Wind Speed:</span>
                <span className="font-normal">
                  {forecastNow.data.windSpeed.toFixed(1)}
                </span>
                <span className="font-small text-base font-normal">m/s</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span className="font-semibold">Wind Direction:</span>
                <span className="font-normal">
                  {forecastNow.data.windDirectionCardinal}
                </span>
                <span className="font-small text-base font-normal">
                  ({forecastNow.data.windDirection}°)
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span className="font-semibold">UV Index:</span>
                <span className="font-normal">{forecastNow.data.uvIndex}</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span className="font-semibold">Visibility:</span>
                <span className="font-normal">
                  {forecastNow.data.visibility.toFixed(1)}
                </span>
                <span className="font-small text-base font-normal">km</span>
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
