"use client";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs, { type Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun } from "lucide-react";

import { type WeatherForecastErrorResponse } from "~/lib/schemas/tomorrow-io";
import { type WeatherForecastNow } from "~/lib/schemas/weather";
import { getLocationFromLocalStorage } from "~/lib/local-storage";
import { getWeatherForecastNow } from "~/lib/serverActions/tomorrow-io";
import { weatherCode } from "~/lib/tomorrowio/weather-codes";
import { WeatherIcon } from "~/components/weather-icon";

dayjs.extend(relativeTime);

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-8">
        {/* Weather icon skeleton */}
        <div className="animate-pulse rounded-full bg-muted h-32 w-32" />
        
        {/* Main weather info skeleton */}
        <div className="flex flex-col items-center gap-3 lg:items-start">
          <div className="animate-pulse rounded bg-muted h-8 w-48" />
          <div className="flex items-end gap-2">
            <div className="animate-pulse rounded bg-muted h-16 w-24" />
            <div className="animate-pulse rounded bg-muted h-6 w-8" />
          </div>
        </div>
      </div>
      
      {/* Weather details skeleton */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded bg-muted h-16 w-full" />
        ))}
      </div>
    </div>
  );
}

function WeatherDetails({ data }: { data: WeatherForecastNow }) {
  const details = [
    {
      icon: <Droplets className="h-4 w-4 text-blue-500" />,
      label: "Chance of Rain",
      value: `${data.precipitationProbability.toFixed(0)}%`,
    },
    {
      icon: <Thermometer className="h-4 w-4 text-orange-500" />,
      label: "Dew Point",
      value: `${data.dewPoint.toFixed(1)}°C`,
    },
    {
      icon: <Droplets className="h-4 w-4 text-cyan-500" />,
      label: "Humidity",
      value: `${data.humidity.toFixed(1)}%`,
    },
    {
      icon: <Gauge className="h-4 w-4 text-purple-500" />,
      label: "Pressure",
      value: `${data.pressureSurfaceLevel.toFixed(1)} hPa`,
    },
    {
      icon: <Wind className="h-4 w-4 text-gray-500" />,
      label: "Wind",
      value: `${data.windSpeed.toFixed(1)} m/s ${data.windDirectionCardinal}`,
    },
    {
      icon: <Sun className="h-4 w-4 text-yellow-500" />,
      label: "UV Index",
      value: data.uvIndex.toString(),
    },
    {
      icon: <Eye className="h-4 w-4 text-indigo-500" />,
      label: "Visibility",
      value: `${data.visibility.toFixed(1)} km`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-2xl lg:grid-cols-3">
      {details.map((detail, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-colors"
        >
          {detail.icon}
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-medium">
              {detail.label}
            </span>
            <span className="text-sm font-semibold">{detail.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

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

  if (location.isLoading || forecastNow.isLoading) {
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

  if (forecastNow.isError) {
    return (
      <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-destructive/10 border border-destructive/20">
        <span className="text-destructive font-medium">Error loading current forecast</span>
        <span className="text-sm text-muted-foreground">Please try again later</span>
      </div>
    );
  }

  if (!forecastNow.data) {
    return (
      <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-muted/50 border border-border/50">
        <span className="text-muted-foreground font-medium">No current forecast data</span>
        <span className="text-sm text-muted-foreground">Please check your location</span>
      </div>
    );
  }

  if ("code" in forecastNow.data) {
    return (
      <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-destructive/10 border border-destructive/20">
        <span className="text-destructive font-medium">
          Error loading current forecast data
        </span>
        {String(forecastNow.data.code).startsWith("429") && (
          <span className="text-sm text-muted-foreground">
            Too many requests to the API. Please try again later.
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center w-full max-w-4xl">
      {/* Main weather display */}
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
        <WeatherIcon
          className="h-32 w-32 drop-shadow-lg"
          code={forecastNow.data.weatherCode}
          night={
            dateTime ? dateTime.hour() < 6 || dateTime.hour() >= 18 : false
          }
        />
        
        <div className="flex flex-col items-center gap-3 lg:items-start">
          <h3 className="text-2xl font-bold text-foreground lg:text-3xl">
            {weatherCode[forecastNow.data.weatherCode] ?? "Unknown"}
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-6xl font-bold text-foreground lg:text-7xl">
              {forecastNow.data.temperature.toFixed(1)}
            </span>
            <span className="text-2xl font-semibold text-muted-foreground lg:text-3xl">
              °C
            </span>
          </div>
          {dateTime && (
            <span className="text-sm text-muted-foreground font-medium">
              Updated {dateTime.fromNow()}
            </span>
          )}
        </div>
      </div>

      {/* Weather details */}
      <WeatherDetails data={forecastNow.data} />
    </div>
  );
}
