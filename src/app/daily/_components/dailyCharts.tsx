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
    label: "Minimum",
    color: "hsl(var(--chart-3))",
  },
  temperatureAvg: {
    label: "Average",
    color: "hsl(var(--chart-3))",
  },
  temperatureMax: {
    label: "Maximum",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const humiditiesChartConfig = {
  humidityMin: {
    label: "Minumum",
    color: "hsl(var(--chart-2))",
  },
  humidityAvg: {
    label: "Average",
    color: "hsl(var(--chart-2))",
  },
  humidityMax: {
    label: "Maximum",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const windSpeedsChartConfig = {
  windSpeedMin: {
    label: "Minumum",
    color: "hsl(var(--chart-4))",
  },
  windSpeedAvg: {
    label: "Average",
    color: "hsl(var(--chart-4))",
  },
  windSpeedMax: {
    label: "Maximum",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const intensitiesChartConfig = {
  rainAccumulationMin: {
    label: "Rain Min",
    color: "hsl(var(--chart-1))",
  },
  rainAccumulationMax: {
    label: "Rain Max",
    color: "hsl(var(--chart-1))",
  },
  rainAccumulationAvg: {
    label: "Rain Avg",
    color: "hsl(var(--chart-1))",
  },
  freezingRainAccumulationMin: {
    label: "Freezing rain / Hail Min",
    color: "hsl(var(--chart-2))",
  },
  freezingRainAccumulationMax: {
    label: "Freezing rain / Hail Max",
    color: "hsl(var(--chart-2))",
  },
  freezingRainAccumulationAvg: {
    label: "Freezing rain / Hail Avg",
    color: "hsl(var(--chart-2))",
  },
  sleetAccumulationMin: {
    label: "Sleet Min",
    color: "hsl(var(--chart-4))",
  },
  sleetAccumulationMax: {
    label: "Sleet Max",
    color: "hsl(var(--chart-4))",
  },
  sleetAccumulationAvg: {
    label: "Sleet Avg",
    color: "hsl(var(--chart-4))",
  },
  snowAccumulationMin: {
    label: "Snow Min",
    color: "hsl(var(--chart-5))",
  },
  snowAccumulationMax: {
    label: "Snow Max",
    color: "hsl(var(--chart-5))",
  },
  snowAccumulationAvg: {
    label: "Snow Avg",
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
    <div className="flex flex-row flex-wrap">
      <div className="flex w-full flex-col items-center text-center xl:w-1/2">
        <h3 className="mt-8 text-xl font-semibold">Temperature</h3>
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
            <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
            <ChartTooltip cursor content={<ChartTooltipContent />} />
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
      </div>

      <div className="flex w-full flex-col items-center text-center xl:w-1/2">
        <h3 className="mt-8 text-xl font-semibold">Humidity</h3>
        <ChartContainer
          className="mt-4 w-full select-none flex-col items-center gap-1 text-center"
          config={humiditiesChartConfig}
        >
          <ComposedChart
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
              tickFormatter={(value) => `${value} °C`}
            />
            <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
            <ChartTooltip cursor content={<ChartTooltipContent />} />
            <Line
              dataKey="humidityMin"
              type="monotone"
              stroke="var(--color-humidityMin)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="humidityAvg"
              type="monotone"
              stroke="var(--color-humidityAvg)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="humidityMax"
              type="monotone"
              stroke="var(--color-humidityMax)"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </div>

      <div className="flex w-full flex-col items-center text-center xl:w-1/2">
        <h3 className="mt-8 text-xl font-semibold">Wind</h3>
        <ChartContainer
          className="mt-4 w-full select-none flex-col items-center gap-1 text-center"
          config={windSpeedsChartConfig}
        >
          <ComposedChart
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
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              scale="auto"
              tickFormatter={(value) => `${value} °C`}
            />
            <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
            <ChartTooltip cursor content={<ChartTooltipContent />} />
            <Line
              dataKey="windSpeedMin"
              type="monotone"
              stroke="var(--color-windSpeedMin)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="windSpeedAvg"
              type="monotone"
              stroke="var(--color-windSpeedAvg)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="windSpeedMax"
              type="monotone"
              stroke="var(--color-windSpeedMax)"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </div>

      <div className="flex w-full flex-col items-center text-center xl:w-1/2">
        <h3 className="mt-8 text-xl font-semibold">Precipitation</h3>
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
              verticalAlign="top"
              align="right"
              direction="column"
            />
            <ChartTooltip cursor content={<ChartTooltipContent />} />
            <Line
              dataKey="rainAccumulationAvg"
              type="monotone"
              stroke="var(--color-rainAccumulationAvg)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="freezingRainAccumulationAvg"
              type="monotone"
              stroke="var(--color-freezingRainAccumulationAvg)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="sleetAccumulationAvg"
              type="monotone"
              stroke="var(--color-sleetAccumulationAvg)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="snowAccumulationAvg"
              type="monotone"
              stroke="var(--color-snowAccumulationAvg)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
