"use client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

import { type WeatherForecastErrorResponse } from "~/lib/schemas/tomorrow-io";
import { type WeatherForecastDaily } from "~/lib/schemas/weather";
import { getLocationFromLocalStorage } from "~/lib/local-storage";
import { getWeatherForecastDaily } from "~/lib/serverActions/tomorrow-io";
import { weatherCode } from "~/lib/tomorrowio/weather-codes";
import { WeatherIcon } from "~/components/weather-icon";

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Daily Forecast</h3>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[120px]">
            <div className="animate-pulse rounded bg-muted h-4 w-16" />
            <div className="animate-pulse rounded bg-muted h-12 w-12" />
            <div className="animate-pulse rounded bg-muted h-3 w-20" />
            <div className="animate-pulse rounded bg-muted h-8 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DailyCard({ item }: { item: WeatherForecastDaily[number] }) {
  const dateTime = dayjs(item.time);
  const isToday = dayjs().isSame(dateTime, 'day');
  const isTomorrow = dayjs().add(1, 'day').isSame(dateTime, 'day');

  const getDayLabel = () => {
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    return dateTime.format("ddd");
  };

  return (
    <div className={`
      flex flex-col items-center gap-3 p-4 rounded-lg min-w-[120px] transition-all
      ${isToday 
        ? 'bg-primary/10 border-2 border-primary/30 scale-105' 
        : 'bg-card/50 border border-border/50 hover:bg-card/70'
      }
      backdrop-blur-sm
    `}>
      <div className="flex flex-col items-center text-center">
        <span className={`text-sm font-semibold ${isToday ? 'text-primary' : 'text-foreground'}`}>
          {getDayLabel()}
        </span>
        <span className="text-xs text-muted-foreground">
          {dateTime.format("MMM D")}
        </span>
      </div>
      
      <WeatherIcon
        className="h-12 w-12 drop-shadow-sm"
        code={item.weatherCodeMax}
        night={false} // Daily forecast typically shows day icons
      />
      
      <span className="text-xs text-center text-muted-foreground font-medium leading-tight max-w-[100px]">
        {weatherCode[item.weatherCodeMax] ?? "Unknown"}
      </span>
      
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3 text-red-500" />
          <span className={`text-lg font-bold ${isToday ? 'text-primary' : 'text-foreground'}`}>
            {item.temperatureMax.toFixed(0)}°
          </span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingDown className="h-3 w-3 text-blue-500" />
          <span className="text-sm text-muted-foreground font-medium">
            {item.temperatureMin.toFixed(0)}°
          </span>
        </div>
      </div>
    </div>
  );
}

export function ForecastDaily() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastDaily = useQuery({
    queryKey: [location.data, "forecast", "daily"],
    queryFn: async (): Promise<
      WeatherForecastErrorResponse | WeatherForecastDaily
    > => {
      if (location.isLoading || !location.data)
        return Promise.reject(new Error("No location data."));
      console.log("Get daily forecast for location:", location.data);
      return await getWeatherForecastDaily(location.data);
    },
  });

  if (location.isLoading || forecastDaily.isLoading) {
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

  if (forecastDaily.isError) {
    return (
      <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-destructive/10 border border-destructive/20">
        <span className="text-destructive font-medium">Error loading daily forecast</span>
        <span className="text-sm text-muted-foreground">Please try again later</span>
      </div>
    );
  }

  if (!forecastDaily.data) {
    return (
      <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-muted/50 border border-border/50">
        <span className="text-muted-foreground font-medium">No daily forecast data</span>
        <span className="text-sm text-muted-foreground">Please check your location</span>
      </div>
    );
  }

  if ("code" in forecastDaily.data || !Array.isArray(forecastDaily.data)) {
    return (
      <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-destructive/10 border border-destructive/20">
        <span className="text-destructive font-medium">
          Error loading daily forecast data
        </span>
        {String(forecastDaily.data.code).startsWith("429") && (
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
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Daily Forecast</h3>
      </div>
      
      <div className="custom-scrollbar flex gap-3 overflow-x-auto pb-2 w-full max-w-full">
        <div className="flex gap-3 px-2">
                     {forecastDaily.data.map((item: WeatherForecastDaily[number]) => (
            <DailyCard key={String(item.time)} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
