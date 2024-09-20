"use server";
import "server-only";
import { unstable_cache } from "next/cache";
import dayjs from "dayjs";

import { env } from "~/env";
import { type Location } from "~/lib/schemas/location";
import {
  type WeatherForecastErrorResponse,
  type Timelines,
  ValuesSchema,
} from "~/lib/schemas/tomorrow-io";
import {
  getWindDirectionCardinalFromDegrees,
  getZodSchemaFieldsShallow,
} from "~/lib/utils";
import {
  type WeatherForecastDaily,
  type WeatherForecastDailyCharts,
  type WeatherForecastHourly,
  type WeatherForecastHourlyCharts,
  type WeatherForecastNow,
  type WeatherForecastTimelines,
  WeatherForecastDailySchema,
  WeatherForecastHourlySchema,
  WeatherForecastNowSchema,
  WeatherForecastTimelinesSchema,
} from "~/lib/schemas/weather";

//
// Get the current weather data for a location
//
export async function getWeatherForecastTimelines(
  location: Location,
  timezone = "auto",
  units = "metric",
): Promise<WeatherForecastErrorResponse | WeatherForecastTimelines> {
  const cachedResponseData = await unstable_cache(
    async (): Promise<WeatherForecastErrorResponse | Timelines> => {
      const url = new URL("https://api.tomorrow.io/v4/timelines");
      url.searchParams.append("apikey", env.WEATHER_API_KEY);
      url.searchParams.append(
        "location",
        `${location.latitude},${location.longitude}`,
      );
      url.searchParams.append(
        "fields",
        Object.keys(getZodSchemaFieldsShallow(ValuesSchema)).join(","),
      );
      url.searchParams.append("units", units);
      url.searchParams.append("timesteps", ["current", "1h", "1d"].join(","));
      url.searchParams.append("startTime", "now");
      url.searchParams.append("endTime", "nowPlus5d");
      url.searchParams.append("timezone", timezone);

      console.log("Get weather timelines for location:", location, url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip",
        },
      });

      const responseData = (await response.json()) as
        | WeatherForecastErrorResponse
        | Timelines;
      console.log("New response:", JSON.stringify(responseData));

      return responseData;
    },
    [`${location.latitude},${location.longitude}`],
    {
      tags: ["timelines"],
      revalidate: 60 * 4, // 4 minutes
    },
  )();

  // If there is an error, return it so the client can handle it
  if ("code" in cachedResponseData) return cachedResponseData;

  console.log(
    "Got weather forecast timelines:",
    JSON.stringify({
      data: {
        timelines: cachedResponseData.data.timelines.map((timeline) => ({
          timestep: timeline.timestep,
          startTime: timeline.startTime,
          endTime: timeline.endTime,
          intervals: timeline.intervals.length,
        })),
        warnings: cachedResponseData.data.warnings,
      },
    }),
  );

  const currentData = cachedResponseData.data.timelines.find(
    (timeline) => timeline.timestep === "current",
  );
  if (!currentData?.intervals?.[0]?.values) {
    console.error("No current data in response:", currentData);
    return {
      code: 500,
      message: "No current data in response",
      type: "error",
    };
  }

  const hourlyData = cachedResponseData.data.timelines.find(
    (timeline) => timeline.timestep === "1h",
  );
  if (!hourlyData?.intervals) {
    console.error("No hourly data in response:", hourlyData);
    return {
      code: 500,
      message: "No hourly data in response",
      type: "error",
    };
  }

  const dailyData = cachedResponseData.data.timelines.find(
    (timeline) => timeline.timestep === "1d",
  );
  if (!dailyData?.intervals) {
    console.error("No daily data in response:", dailyData);
    return {
      code: 500,
      message: "No daily data in response",
      type: "error",
    };
  }

  return WeatherForecastTimelinesSchema.parse({
    current: {
      time: currentData.intervals[0].startTime,
      ...currentData.intervals[0].values,
    },
    hourly: hourlyData.intervals.map((interval) => ({
      time: interval.startTime,
      ...interval.values,
    })),
    daily: dailyData.intervals.map((interval) => ({
      time: interval.startTime,
      ...interval.values,
    })),
  });
}

//
// Get the current weather forecast for a location
//
export async function getWeatherForecastNow(
  location: Location,
  timezone = "auto",
  units = "metric",
): Promise<WeatherForecastErrorResponse | WeatherForecastNow> {
  const timelines = await getWeatherForecastTimelines(
    location,
    timezone,
    units,
  );
  // If there is an error, return it so the client can handle it
  if ("code" in timelines) return timelines;

  console.log("Got weather forecast now:", JSON.stringify(timelines.current));

  if (!timelines.current.windDirection) {
    console.error(
      "No wind direction in current weather data:",
      timelines.current,
    );
    return {
      code: 500,
      message: "No wind direction in current weather data",
      type: "error",
    };
  }

  return WeatherForecastNowSchema.parse({
    ...timelines.current,
    windDirectionCardinal: getWindDirectionCardinalFromDegrees(
      timelines.current.windDirection,
    ),
  });
}

//
// Get the hourly weather forecast for a location
//
export async function getWeatherForecastHourly(
  location: Location,
  timezone = "auto",
  units = "metric",
): Promise<WeatherForecastErrorResponse | WeatherForecastHourly> {
  const timelines = await getWeatherForecastTimelines(
    location,
    timezone,
    units,
  );
  // If there is an error, return it so the client can handle it
  if ("code" in timelines) return timelines;

  console.log("Got weather forecast hourly:", timelines.hourly.length);

  return WeatherForecastHourlySchema.parse(timelines.hourly);
}

//
// Use the hourly forecast and transform the data into a format for
// the client to use in the charts
//
export async function getWeatherForecastHourlyCharts(
  location: Location,
  timezone = "auto",
  units = "metric",
): Promise<WeatherForecastErrorResponse | WeatherForecastHourlyCharts> {
  const hourlyForecast = await getWeatherForecastHourly(
    location,
    timezone,
    units,
  );
  // If there is an error, return it so the client can handle it
  if ("code" in hourlyForecast) return hourlyForecast;

  const response: WeatherForecastHourlyCharts = {
    temperatures: hourlyForecast.map((hourly) => ({
      time: dayjs(hourly.time).format("ddd HH:mm"),
      temperature: hourly.temperature,
      temperatureApparent: hourly.temperatureApparent,
    })),
    humidities: hourlyForecast.map((hourly) => ({
      time: dayjs(hourly.time).format("ddd HH:mm"),
      humidity: hourly.humidity,
    })),
    windSpeeds: hourlyForecast.map((hourly) => ({
      time: dayjs(hourly.time).format("ddd HH:mm"),
      windSpeed: hourly.windSpeed,
    })),
    precipitations: hourlyForecast.map((hourly) => ({
      time: dayjs(hourly.time).format("ddd HH:mm"),
      rainAccumulation: hourly.rainAccumulation,
      sleetAccumulation: hourly.sleetAccumulation,
      snowAccumulation: hourly.snowAccumulation,
      iceAccumulation: hourly.iceAccumulation,
    })),
  };

  console.log(
    "Got hourly chart data:",
    JSON.stringify({
      temperatures: response.temperatures.length,
      humidities: response.humidities.length,
      windSpeeds: response.windSpeeds.length,
      precipitations: response.precipitations.length,
    }),
  );
  return response;
}

//
// Get the daily weather forecast for a location
//
export async function getWeatherForecastDaily(
  location: Location,
  timezone = "auto",
  units = "metric",
): Promise<WeatherForecastErrorResponse | WeatherForecastDaily> {
  const timelines = await getWeatherForecastTimelines(
    location,
    timezone,
    units,
  );
  // If there is an error, return it so the client can handle it
  if ("code" in timelines) return timelines;

  console.log("Got weather forecast daily:", timelines.daily.length);

  return WeatherForecastDailySchema.parse(timelines.daily);
}

//
// Use the daily forecast and transform the data into a format for
// the client to use in the charts
//
export async function getWeatherForecastDailyCharts(
  location: Location,
  timezone = "auto",
  units = "metric",
): Promise<WeatherForecastErrorResponse | WeatherForecastDailyCharts> {
  const dailyForecast = await getWeatherForecastDaily(
    location,
    timezone,
    units,
  );
  // If there is an error, return it so the client can handle it
  if ("code" in dailyForecast) return dailyForecast;

  const response: WeatherForecastDailyCharts = {
    temperatures: dailyForecast.map((daily) => ({
      time: dayjs(daily.time).format("ddd"),
      temperatureMax: daily.temperatureMax,
      temperatureMin: daily.temperatureMin,
      temperatureAvg: daily.temperatureAvg,
      temperatureRange: [daily.temperatureMin, daily.temperatureMax],
    })),
    humidities: dailyForecast.map((daily) => ({
      time: dayjs(daily.time).format("ddd"),
      humidityMin: daily.humidityMin,
      humidityMax: daily.humidityMax,
      humidityAvg: daily.humidityAvg,
      humidityRange: [daily.humidityMin, daily.humidityMax],
    })),
    windSpeeds: dailyForecast.map((daily) => ({
      time: dayjs(daily.time).format("ddd"),
      windSpeedMin: daily.windSpeedMin,
      windSpeedMax: daily.windSpeedMax,
      windSpeedAvg: daily.windSpeedAvg,
      windSpeedRange: [daily.windSpeedMin, daily.windSpeedMax],
    })),
    precipitations: dailyForecast.map((daily) => ({
      time: dayjs(daily.time).format("ddd"),
      rainAccumulationMin: daily.rainAccumulationMin,
      rainAccumulationMax: daily.rainAccumulationMax,
      rainAccumulationAvg: daily.rainAccumulationAvg,
      rainAccumulationRange: [
        daily.rainAccumulationMin,
        daily.rainAccumulationMax,
      ],
      rainAccumulationSum: daily.rainAccumulationSum,
      sleetAccumulationMin: daily.sleetAccumulationMin,
      sleetAccumulationMax: daily.sleetAccumulationMax,
      sleetAccumulationAvg: daily.sleetAccumulationAvg,
      sleetAccumulationRange: [
        daily.sleetAccumulationMin,
        daily.sleetAccumulationMax,
      ],
      // sleetAccumulationSum: daily.sleetAccumulationSum,
      snowAccumulationMin: daily.snowAccumulationMin,
      snowAccumulationMax: daily.snowAccumulationMax,
      snowAccumulationAvg: daily.snowAccumulationAvg,
      snowAccumulationRange: [
        daily.snowAccumulationMin,
        daily.snowAccumulationMax,
      ],
      snowAccumulationSum: daily.snowAccumulationSum,
      iceAccumulationMin: daily.iceAccumulationMin,
      iceAccumulationMax: daily.iceAccumulationMax,
      iceAccumulationAvg: daily.iceAccumulationAvg,
      iceAccumulationRange: [
        daily.iceAccumulationMin,
        daily.iceAccumulationMax,
      ],
      iceAccumulationSum: daily.iceAccumulationSum,
    })),
  };

  console.log(
    "Got daily chart data:",
    JSON.stringify({
      temperatures: response.temperatures.length,
      humidities: response.humidities.length,
      windSpeeds: response.windSpeeds.length,
      precipitations: response.precipitations.length,
    }),
  );
  return response;
}
