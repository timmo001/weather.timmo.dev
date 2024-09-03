"use server";
import "server-only";
import { unstable_cache } from "next/cache";

import { env } from "~/env";
import { type Location } from "~/lib/schema";
import {
  type WeatherForecastErrorResponse,
  type WeatherForecastNow,
  type WeatherForecastNowResponse,
  type WeatherForecastHourly,
  type WeatherForecastHourlyResponse,
  type WeatherForecastDaily,
  type WeatherForecastDailyResponse,
} from "~/lib/types/tomorrowio";

const BASE_PARAMS = `apikey=${env.WEATHER_API_KEY}`;
const BASE_REQUEST_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

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
      if ("code" in responseData) return responseData;

      return {
        time: responseData.data.time,
        ...responseData.data.values,
      };
    },
    [`${location.latitude},${location.longitude}`],
    {
      tags: ["forecast", "now"],
      revalidate: 1000 * 60 * 5, // 5 minutes
    },
  )();
}

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
