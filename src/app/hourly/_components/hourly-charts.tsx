"use client";
import { useQuery } from "@tanstack/react-query";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { WeatherForecastErrorResponse } from "~/lib/schemas/tomorrow-io";
import { WeatherForecastHourlyCharts } from "~/lib/schemas/weather";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { getLocationFromLocalStorage } from "~/lib/local-storage";
import { getWeatherForecastHourlyCharts } from "~/lib/serverActions/tomorrow-io";

const temperaturesChartConfig = {
  temperature: {
    label: "Actual",
    color: "hsl(var(--chart-3))",
  },
  temperatureApparent: {
    label: "Feels like",
    color: "hsl(var(--chart-5))",
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

export function HourlyCharts() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const forecastHourlyCharts = useQuery({
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
    <div className="flex flex-row flex-wrap">
      <div className="flex w-full flex-col items-center text-center xl:w-1/2">
        <h3 className="text-xl font-semibold">Temperature</h3>
        <ChartContainer
          className="mt-4 w-full flex-col items-center gap-1 text-center"
          config={temperaturesChartConfig}
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
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              scale="auto"
              tickFormatter={(value) => `${value} °C`}
            />
            <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
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
      </div>

      <div className="flex w-full flex-col items-center text-center xl:w-1/2">
        <h3 className="mt-8 text-xl font-semibold">Humidity</h3>
        <ChartContainer
          className="mt-4 w-full flex-col items-center gap-1 text-center"
          config={humiditiesChartConfig}
        >
          <LineChart
            accessibilityLayer
            data={forecastHourlyCharts.data.humidities}
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
            <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
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
      </div>

      <div className="flex w-full flex-col items-center text-center xl:w-1/2">
        <h3 className="mt-8 text-xl font-semibold">Wind</h3>
        <ChartContainer
          className="mt-4 w-full flex-col items-center gap-1 text-center"
          config={windSpeedsChartConfig}
        >
          <LineChart
            accessibilityLayer
            data={forecastHourlyCharts.data.windSpeeds}
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
              tickFormatter={(value) => `${value} m/s`}
            />
            <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
            <ChartTooltip cursor content={<ChartTooltipContent />} />
            <Line
              dataKey="windSpeed"
              type="monotone"
              stroke="var(--color-windSpeed)"
              strokeWidth={2}
              dot={false}
              unit="m/s"
            />
          </LineChart>
        </ChartContainer>
      </div>

      <div className="flex w-full flex-col items-center text-center xl:w-1/2">
        <h3 className="mt-8 text-xl font-semibold">Precipitation</h3>
        <ChartContainer
          className="mt-4 w-full flex-col items-center gap-1 text-center"
          config={intensitiesChartConfig}
        >
          <LineChart
            accessibilityLayer
            data={forecastHourlyCharts.data.precipitations}
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
            <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
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
      </div>
    </div>
  );
}
