"use client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { getWeatherForecastHourlyCharts } from "~/lib/serverActions/tomorrowio";
import {
  type WeatherForecastErrorResponse,
  type WeatherForecastHourlyCharts,
} from "~/lib/types/tomorrowio";

const chartConfig = {
  temperature: {
    label: "Actual",
    color: "hsl(var(--chart-3))",
  },
  temperatureApparent: {
    label: "Feels like",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function TemperatureHourly() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastHourlyCharts = useQuery({
    staleTime: 1000 * 60 * 20, // 20 minutes
    queryKey: [location.data, "forecast", "hourly"],
    queryFn: async (): Promise<
      WeatherForecastErrorResponse | WeatherForecastHourlyCharts
    > => {
      if (location.isLoading || !location.data)
        return Promise.reject("No location data.");
      console.log(
        "Get hourly temperature forecast for location:",
        location.data,
      );
      return await getWeatherForecastHourlyCharts(location.data);
    },
  });

  if (location.isLoading) return <span>Loading location...</span>;
  if (location.isError) return <span>Error loading location...</span>;
  if (forecastHourlyCharts.isLoading)
    return <span>Loading hourly forecast...</span>;
  if (forecastHourlyCharts.isError)
    return <span>Error loading hourly forecast.</span>;
  if (!forecastHourlyCharts.data) return <span>No hourly forecast data.</span>;
  if ("code" in forecastHourlyCharts.data)
    return (
      <span>
        An error occured when loading hourly forecast data{" "}
        {String(forecastHourlyCharts.data.code).startsWith("429") &&
          ": Too many requests to the API. Please try again later."}
      </span>
    );

  return (
    <>
      <h3 className="text-xl font-semibold">Hourly Temperature</h3>
      <ChartContainer
        className="mt-4 w-full select-none flex-col items-center gap-1 text-center"
        config={chartConfig}
      >
        <LineChart
          accessibilityLayer
          data={forecastHourlyCharts.data.temperatures}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            scale="auto"
          />
          <YAxis
            dataKey="temperature"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            scale="auto"
            tickFormatter={(value) => `${value}°C`}
          />
          <ChartLegend
            content={<ChartLegendContent />}
            verticalAlign="bottom"
          />
          <ChartTooltip cursor content={<ChartTooltipContent />} />
          <Line
            dataKey="temperatureApparent"
            type="monotone"
            stroke="var(--color-temperatureApparent)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="temperature"
            type="monotone"
            stroke="var(--color-temperature)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
}
