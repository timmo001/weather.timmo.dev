"use client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CloudSun } from "lucide-react";

import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { getWeatherForecastDaily } from "~/lib/serverActions/accuweather";
import { type AccuweatherDailyForecast } from "~/lib/types/accuweather";

export function ForecastDaily() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastDaily = useQuery({
    staleTime: 1000 * 60 * 30, // 30 minutes
    queryKey: [location.data, "forecast", "daily"],
    queryFn: async (): Promise<AccuweatherDailyForecast> => {
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
      ) : (
        <div className="custom-scrollbar mt-1 flex max-w-96 flex-row flex-nowrap gap-4 overflow-x-auto overflow-y-hidden md:max-w-screen-md lg:max-w-screen-lg">
          {forecastDaily.data.DailyForecasts.map((item) => {
            const dateTime = dayjs(item.Date);

            return (
              <div
                key={item.EpochDate}
                className="flex flex-col items-stretch gap-1"
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm font-semibold">
                    {dateTime.format("ddd")}
                  </span>
                </div>
                <CloudSun className="h-20 w-20" />
                <span className="text-xl font-bold">{item.Day.IconPhrase}</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-xl font-bold">
                    {item.Temperature.Minimum.Value.toFixed(1)}
                  </span>
                  <span className="text-sm font-semibold">
                    °{item.Temperature.Minimum.Unit}
                  </span>
                </div>
                <span className="text-xl font-bold">
                  {item.Temperature.Maximum.Value.toFixed(1)}
                  <span className="ms-1 pb-1 text-sm font-semibold">
                    °{item.Temperature.Maximum.Unit}
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
