"use server";
import "server-only";
import { unstable_cache } from "next/cache";
import dayjs from "dayjs";

import { env } from "~/env";
import { type Location } from "~/lib/schema";
import {
  WeatherForecastDailyCharts,
  type WeatherForecastDaily,
  type WeatherForecastDailyResponse,
  type WeatherForecastErrorResponse,
  type WeatherForecastHourly,
  type WeatherForecastHourlyCharts,
  type WeatherForecastHourlyResponse,
  type WeatherForecastNow,
  type WeatherForecastNowResponse,
} from "~/lib/types/tomorrowio";
import { getWindDirectionCardinalFromDegrees } from "~/lib/utils";

// All requests to the Tomorrow.io API require an API key
const BASE_PARAMS = `apikey=${env.WEATHER_API_KEY}`;

// Setup the base request options for all requests to the Tomorrow.io API
const BASE_REQUEST_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

//
// Get the current weather forecast for a location
//
export async function getWeatherForecastNow(
  location: Location,
): Promise<WeatherForecastErrorResponse | WeatherForecastNow> {
  return unstable_cache(
    async (): Promise<WeatherForecastErrorResponse | WeatherForecastNow> => {
      const url = `https://api.tomorrow.io/v4/weather/realtime?${BASE_PARAMS}&location=${location.latitude},${location.longitude}`;
      console.log("Get forecast now for location:", location, url);
      const response = await fetch(url, BASE_REQUEST_OPTIONS);
      const responseData = (await response.json()) as
        | WeatherForecastErrorResponse
        | WeatherForecastNowResponse;
      console.log("Response:", JSON.stringify(responseData));
      // If there is an error, return it so the client can handle it
      if ("code" in responseData) return responseData;

      return {
        time: responseData.data.time,
        ...responseData.data.values,
        windDirectionCardinal: getWindDirectionCardinalFromDegrees(
          responseData.data.values.windDirection,
        ),
      };
    },
    [`${location.latitude},${location.longitude}`],
    {
      tags: ["forecast", "now"],
      revalidate: 1000 * 60 * 5, // 5 minutes
    },
  )();
}

//
// Get the hourly weather forecast for a location
//
export async function getWeatherForecastHourly(
  location: Location,
): Promise<WeatherForecastErrorResponse | WeatherForecastHourly> {
  return unstable_cache(
    async (): Promise<WeatherForecastErrorResponse | WeatherForecastHourly> => {
      const url = `https://api.tomorrow.io/v4/weather/forecast?${BASE_PARAMS}&location=${location.latitude},${location.longitude}&timesteps=1h`;
      console.log("Get hourly forecast for location:", location, url);
      const response = await fetch(url, BASE_REQUEST_OPTIONS);
      const responseData = (await response.json()) as
        | WeatherForecastErrorResponse
        | WeatherForecastHourlyResponse;
      console.log("Response:", JSON.stringify(responseData));
      // If there is an error, return it so the client can handle it
      if ("code" in responseData) return responseData;

      return responseData.timelines.hourly.map((hourly) => ({
        time: hourly.time,
        ...hourly.values,
      }));
    },
    [`${location.latitude},${location.longitude}`],
    {
      tags: ["forecast", "hourly"],
      revalidate: 1000 * 60 * 20, // 20 minutes
    },
  )();
}

//
// Use the hourly forecast and transform the data into a format for
// the client to use in the charts
//
export async function getWeatherForecastHourlyCharts(
  location: Location,
): Promise<WeatherForecastErrorResponse | WeatherForecastHourlyCharts> {
  const hourlyForecast = await getWeatherForecastHourly(location);
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
): Promise<WeatherForecastErrorResponse | WeatherForecastDaily> {
  return unstable_cache(
    async (): Promise<WeatherForecastErrorResponse | WeatherForecastDaily> => {
      const url = `https://api.tomorrow.io/v4/weather/forecast?${BASE_PARAMS}&location=${location.latitude},${location.longitude}&timesteps=1d`;
      console.log("Get daily forecast for location:", location, url);
      const response = await fetch(url, BASE_REQUEST_OPTIONS);
      const responseData = (await response.json()) as
        | WeatherForecastErrorResponse
        | WeatherForecastDailyResponse;
      console.log("Response:", JSON.stringify(responseData));
      // If there is an error, return it so the client can handle it
      if ("code" in responseData) return responseData;

      return responseData.timelines.daily.map((daily) => ({
        time: daily.time,
        ...daily.values,
      }));
    },
    [`${location.latitude},${location.longitude}`],
    {
      tags: ["forecast", "daily"],
      revalidate: 1000 * 60 * 30, // 30 minutes
    },
  )();
}

// 
// Use the daily forecast and transform the data into a format for
// the client to use in the charts
// 
export async function getWeatherForecastDailyCharts(
  location: Location,
): Promise<WeatherForecastErrorResponse | WeatherForecastDailyCharts> {
  const dailyForecast = await getWeatherForecastDaily(location);
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
      sleetAccumulationSum: daily.sleetAccumulationSum,
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
