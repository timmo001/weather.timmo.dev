"use client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CloudSun } from "lucide-react";

import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { getWeatherForecastHourly } from "~/lib/serverActions/accuweather";
import { type AccuweatherHourlyForecast } from "~/lib/types/accuweather";

export function ForecastHourly() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastHourly = useQuery({
    staleTime: 1000 * 60 * 20, // 20 minutes
    queryKey: [location.data, "forecast", "hourly"],
    queryFn: async (): Promise<Array<AccuweatherHourlyForecast>> => {
      if (location.isLoading || !location.data)
        return Promise.reject("No location data.");
      console.log("Get hourly forecast for location:", location.data);
      return await getWeatherForecastHourly(location.data);
    },
  });

  if (location.isLoading) return <span>Loading location...</span>;
  if (location.isError) return <span>Error loading location...</span>;

  return (
    <div className="mt-4 flex select-none flex-col items-center gap-1 text-center">
      <h3 className="text-xl font-semibold">Hourly</h3>
      {forecastHourly.isLoading ? (
        <span>Loading hourly forecast...</span>
      ) : forecastHourly.isError ? (
        <span>Error loading hourly forecast.</span>
      ) : !forecastHourly.data ? (
        <span>No hourly forecast data.</span>
      ) : (
        <div className="custom-scrollbar mt-1 flex max-w-96 flex-row flex-nowrap gap-4 overflow-x-auto overflow-y-hidden md:max-w-screen-md lg:max-w-screen-lg">
          {forecastHourly.data.map((item) => {
            const dateTime = dayjs(item.DateTime);

            return (
              <div
                key={item.EpochDateTime}
                className="flex flex-col items-stretch gap-1"
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm font-semibold">
                    {dateTime.format("ddd")}
                  </span>
                  <span className="text-sm font-semibold">
                    {dateTime.format("HH:mm")}
                  </span>
                </div>
                <CloudSun className="h-20 w-20" />
                <span className="text-sm font-bold">{item.IconPhrase}</span>
                <span className="align-top text-xl font-bold">
                  {item.Temperature.Value.toFixed(1)}
                  <span className="ms-1 pb-1 text-sm font-semibold">
                    °{item.Temperature.Unit.toUpperCase()}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
