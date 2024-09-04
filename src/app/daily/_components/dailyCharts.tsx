"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { getWeatherForecastDailyCharts } from "~/lib/serverActions/tomorrowio";
import {
  type WeatherForecastErrorResponse,
  type WeatherForecastDailyCharts,
} from "~/lib/types/tomorrowio";

const temperaturesChartConfig = {
  temperatureMin: {
    label: "Temperature Minimum",
    color: "hsl(var(--chart-3))",
  },
  temperatureAvg: {
    label: "Temperature Average",
    color: "hsl(var(--chart-3))",
  },
  temperatureMax: {
    label: "Temperature Maximum",
    color: "hsl(var(--chart-3))",
  },
  temperatureRange: {
    label: "Temperature Range",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const humiditiesChartConfig = {
  humidity: {
    label: "Humidity",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const windSpeedsChartConfig = {
  windSpeed: {
    label: "Wind speed",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const intensitiesChartConfig = {
  rainAccumulation: {
    label: "Rain",
    color: "hsl(var(--chart-1))",
  },
  freezingRainAccumulation: {
    label: "Freezing rain / Hail",
    color: "hsl(var(--chart-2))",
  },
  sleetAccumulation: {
    label: "Sleet",
    color: "hsl(var(--chart-4))",
  },
  snowAccumulation: {
    label: "Snow",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function DailyCharts() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastDailyCharts = useQuery({
    staleTime: 1000 * 60 * 20, // 20 minutes
    queryKey: [location.data, "forecast", "daily"],
    queryFn: async (): Promise<
      WeatherForecastErrorResponse | WeatherForecastDailyCharts
    > => {
      if (location.isLoading || !location.data)
        return Promise.reject("No location data.");
      console.log(
        "Get daily temperature forecast for location:",
        location.data,
      );
      return await getWeatherForecastDailyCharts(location.data);
    },
  });

  if (location.isLoading) return <span>Loading location...</span>;
  if (location.isError) return <span>Error loading location...</span>;
  if (forecastDailyCharts.isLoading)
    return <span>Loading daily forecast...</span>;
  if (forecastDailyCharts.isError)
    return <span>Error loading daily forecast.</span>;
  if (!forecastDailyCharts.data) return <span>No daily forecast data.</span>;
  if ("code" in forecastDailyCharts.data)
    return (
      <span>
        An error occured when loading daily forecast data{" "}
        {String(forecastDailyCharts.data.code).startsWith("429") &&
          ": Too many requests to the API. Please try again later."}
      </span>
    );

  return (
    <>
      <h3 className="text-xl font-semibold">Temperature</h3>
      <ChartContainer
        className="mt-4 w-full select-none flex-col items-center gap-1 text-center"
        config={temperaturesChartConfig}
      >
        <ComposedChart
          accessibilityLayer
          data={forecastDailyCharts.data.temperatures}
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
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            scale="auto"
            tickFormatter={(value) => `${value} °C`}
          />
          <ChartLegend
            content={<ChartLegendContent />}
            verticalAlign="bottom"
          />
          <ChartTooltip cursor content={<ChartTooltipContent />} />
          <Area
            dataKey="temperatureRange"
            type="monotone"
            stroke="var(--color-temperatureMin)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="temperatureMin"
            type="monotone"
            stroke="var(--color-temperatureMin)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="temperatureAvg"
            type="monotone"
            stroke="var(--color-temperatureAvg)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="temperatureMax"
            type="monotone"
            stroke="var(--color-temperatureMax)"
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ChartContainer>

      <h3 className="text-xl font-semibold">Humidity</h3>
      <ChartContainer
        className="mt-4 w-full select-none flex-col items-center gap-1 text-center"
        config={humiditiesChartConfig}
      >
        <LineChart
          accessibilityLayer
          data={forecastDailyCharts.data.humidities}
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
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            scale="auto"
            tickFormatter={(value) => `${value} %`}
          />
          <ChartLegend
            content={<ChartLegendContent />}
            verticalAlign="bottom"
          />
          <ChartTooltip cursor content={<ChartTooltipContent />} />
          <Line
            dataKey="humidity"
            type="monotone"
            stroke="var(--color-humidity)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>

      <h3 className="text-xl font-semibold">Wind</h3>
      <ChartContainer
        className="mt-4 w-full select-none flex-col items-center gap-1 text-center"
        config={windSpeedsChartConfig}
      >
        <LineChart
          accessibilityLayer
          data={forecastDailyCharts.data.windSpeeds}
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
            dataKey="windSpeed"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            scale="auto"
            tickFormatter={(value) => `${value} mph`}
          />
          <ChartLegend
            content={<ChartLegendContent />}
            verticalAlign="bottom"
          />
          <ChartTooltip cursor content={<ChartTooltipContent />} />
          <Line
            dataKey="windSpeed"
            type="monotone"
            stroke="var(--color-windSpeed)"
            strokeWidth={2}
            dot={false}
            unit="mph"
          />
        </LineChart>
      </ChartContainer>

      <h3 className="text-xl font-semibold">Precipitation</h3>
      <ChartContainer
        className="mt-4 w-full select-none flex-col items-center gap-1 text-center"
        config={intensitiesChartConfig}
      >
        <LineChart
          accessibilityLayer
          data={forecastDailyCharts.data.precipitations}
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
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            scale="auto"
            tickFormatter={(value) => `${value} mm`}
          />
          <ChartLegend
            content={<ChartLegendContent />}
            verticalAlign="bottom"
          />
          <ChartTooltip cursor content={<ChartTooltipContent />} />
          <Line
            dataKey="rainAccumulation"
            type="monotone"
            stroke="var(--color-rainAccumulation)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="freezingRainAccumulation"
            type="monotone"
            stroke="var(--color-freezingRainAccumulation)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="sleetAccumulation"
            type="monotone"
            stroke="var(--color-sleetAccumulation)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="snowAccumulation"
            type="monotone"
            stroke="var(--color-snowAccumulation)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
}
