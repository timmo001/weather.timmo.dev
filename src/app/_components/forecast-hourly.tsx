"use client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { getWeatherForecastHourly } from "~/lib/serverActions/tomorrowio";
import { weatherCode } from "~/lib/tomorrowio/weatherCodes";
import {
  type WeatherForecastErrorResponse,
  type WeatherForecastHourly,
} from "~/lib/types/tomorrowio";
import { WeatherIcon } from "~/components/weatherIcon";

export function ForecastHourly() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastHourly = useQuery({
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

  return (
    <div className="mt-4 flex flex-col items-center gap-1 text-center">
      <h3 className="text-xl font-semibold">Hourly</h3>
      {forecastHourly.isLoading ? (
        <span>Loading hourly forecast...</span>
      ) : forecastHourly.isError ? (
        <span>Error loading hourly forecast.</span>
      ) : !forecastHourly.data ? (
        <span>No hourly forecast data.</span>
      ) : "code" in forecastHourly.data ||
        !Array.isArray(forecastHourly.data) ? (
        <span>
          An error occured when loading hourly forecast data
          {String(forecastHourly.data.code).startsWith("429") &&
            ": Too many requests to the API. Please try again later."}
        </span>
      ) : (
        <div className="custom-scrollbar mt-1 flex max-w-96 flex-row flex-nowrap gap-5 overflow-y-auto md:max-w-screen-md lg:max-w-screen-lg">
          {forecastHourly.data?.map((item) => {
            const dateTime = dayjs(item.time);

            return (
              <div
                key={String(item.time)}
                className="flex flex-col items-center gap-1"
              >
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold">
                    {dateTime.format("ddd")}
                  </span>
                  <span className="text-sm font-semibold">
                    {dateTime.format("HH:mm")}
                  </span>
                </div>
                <WeatherIcon
                  className="h-24 w-24"
                  code={item.weatherCode}
                  night={
                    dateTime
                      ? dateTime.hour() < 6 || dateTime.hour() >= 18
                      : false
                  }
                />
                <div className="flex flex-col items-center">
                  <span className="whitespace-nowrap text-sm font-semibold">
                    {weatherCode[item.weatherCode] || "Unknown"}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-xl font-bold">
                    {item.temperature.toFixed(1)}
                  </span>
                  <span className="text-sm font-semibold">°C</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
