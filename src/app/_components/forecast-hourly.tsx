"use client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Clock } from "lucide-react";

import { type WeatherForecastErrorResponse } from "~/lib/schemas/tomorrow-io";
import { type WeatherForecastHourly } from "~/lib/schemas/weather";
import { getLocationFromLocalStorage } from "~/lib/local-storage";
import { getWeatherForecastHourly } from "~/lib/serverActions/tomorrow-io";
import { weatherCode } from "~/lib/tomorrowio/weather-codes";
import { WeatherIcon } from "~/components/weather-icon";

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Hourly Forecast</h3>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[100px]">
            <div className="animate-pulse rounded bg-muted h-4 w-16" />
            <div className="animate-pulse rounded bg-muted h-12 w-12" />
            <div className="animate-pulse rounded bg-muted h-3 w-20" />
            <div className="animate-pulse rounded bg-muted h-5 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HourlyCard({ item }: { item: WeatherForecastHourly[number] }) {
  const dateTime = dayjs(item.time);
  const isNight = dateTime.hour() < 6 || dateTime.hour() >= 18;
  const isNow = dayjs().isSame(dateTime, 'hour');

  return (
    <div className={`
      flex flex-col items-center gap-2 p-3 rounded-lg min-w-[100px] transition-all
      ${isNow 
        ? 'bg-primary/10 border-2 border-primary/30 scale-105' 
        : 'bg-card/50 border border-border/50 hover:bg-card/70'
      }
      backdrop-blur-sm
    `}>
      <div className="flex flex-col items-center text-center">
        <span className={`text-xs font-medium ${isNow ? 'text-primary' : 'text-muted-foreground'}`}>
          {isNow ? 'Now' : dateTime.format("ddd")}
        </span>
        <span className={`text-sm font-semibold ${isNow ? 'text-primary' : 'text-foreground'}`}>
          {dateTime.format("HH:mm")}
        </span>
      </div>
      
      <WeatherIcon
        className="h-12 w-12 drop-shadow-sm"
        code={item.weatherCode}
        night={isNight}
      />
      
      <span className="text-xs text-center text-muted-foreground font-medium leading-tight max-w-[80px]">
        {weatherCode[item.weatherCode] ?? "Unknown"}
      </span>
      
      {item.temperature ? (
        <div className="flex items-end gap-1">
          <span className={`text-lg font-bold ${isNow ? 'text-primary' : 'text-foreground'}`}>
            {item.temperature.toFixed(0)}
          </span>
          <span className="text-xs text-muted-foreground font-medium">°C</span>
        </div>
      ) : (
        <span className="text-lg font-bold text-muted-foreground">?</span>
      )}
    </div>
  );
}

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
        return Promise.reject(new Error("No location data."));
      console.log("Get hourly forecast for location:", location.data);
      return await getWeatherForecastHourly(location.data);
    },
  });

  if (location.isLoading || forecastHourly.isLoading) {
    return <LoadingSkeleton />;
  }

  if (location.isError) {
    return (
      <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-destructive/10 border border-destructive/20">
        <span className="text-destructive font-medium">Error loading location</span>
        <span className="text-sm text-muted-foreground">Please check your location settings</span>
      </div>
    );
  }

  if (forecastHourly.isError) {
    return (
      <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-destructive/10 border border-destructive/20">
        <span className="text-destructive font-medium">Error loading hourly forecast</span>
        <span className="text-sm text-muted-foreground">Please try again later</span>
      </div>
    );
  }

  if (!forecastHourly.data) {
    return (
      <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-muted/50 border border-border/50">
        <span className="text-muted-foreground font-medium">No hourly forecast data</span>
        <span className="text-sm text-muted-foreground">Please check your location</span>
      </div>
    );
  }

  if ("code" in forecastHourly.data || !Array.isArray(forecastHourly.data)) {
    return (
      <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-destructive/10 border border-destructive/20">
        <span className="text-destructive font-medium">
          Error loading hourly forecast data
        </span>
        {String(forecastHourly.data.code).startsWith("429") && (
          <span className="text-sm text-muted-foreground">
            Too many requests to the API. Please try again later.
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Hourly Forecast</h3>
      </div>
      
      <div className="custom-scrollbar flex gap-3 overflow-x-auto pb-2 w-full max-w-full">
        <div className="flex gap-3 px-2">
          {forecastHourly.data.map((item) => (
            <HourlyCard key={String(item.time)} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
