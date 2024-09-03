"use server";
import "server-only";
import { unstable_cache } from "next/cache";

import { env } from "~/env";
import { type Location } from "~/lib/schema";

// TODO: https://docs.tomorrow.io/reference/rate-limiting
// TODO: Check fetch response status

const BASE_PARAMS = `apikey=${env.WEATHER_API_KEY}`;
const BASE_REQUEST_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export type WeatherForecastErrorResponse = {
  code: 429001 | number;
  type: "Too Many Calls" | string;
  message: string;
};

export type WeatherForecastNowResponse = {
  data: {
    time: Date;
    values: {
      cloudBase: number;
      cloudCeiling: number;
      cloudCover: number;
      dewPoint: number;
      freezingRainIntensity: number;
      humidity: number;
      precipitationProbability: number;
      pressureSurfaceLevel: number;
      rainIntensity: number;
      sleetIntensity: number;
      snowIntensity: number;
      temperature: number;
      temperatureApparent: number;
      uvHealthConcern: number;
      uvIndex: number;
      visibility: number;
      weatherCode: number;
      windDirection: number;
      windGust: number;
      windSpeed: number;
    };
  };
  location: { lat: number; lon: number };
};

export type WeatherForecastNow = {
  time: Date;
  cloudBase: number;
  cloudCeiling: number;
  cloudCover: number;
  dewPoint: number;
  freezingRainIntensity: number;
  humidity: number;
  precipitationProbability: number;
  pressureSurfaceLevel: number;
  rainIntensity: number;
  sleetIntensity: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
};

export async function getWeatherForecastNow(
  location: Location,
): Promise<WeatherForecastErrorResponse | WeatherForecastNow> {
  return unstable_cache(
    async (): Promise<WeatherForecastErrorResponse | WeatherForecastNow> => {
      const response = await fetch(
        `${env.WEATHER_BASE_URL}/realtime?${BASE_PARAMS}&location=${location.latitude},${location.longitude}`,
        BASE_REQUEST_OPTIONS,
      );
      const responseData = (await response.json()) as
        | WeatherForecastErrorResponse
        | WeatherForecastNowResponse;
      console.log("Response:", responseData);
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

export type WeatherForecastHourlyResponse = any;

export type WeatherForecastHourly = any;

export async function getWeatherForecastHourly(
  location: Location,
): Promise<WeatherForecastErrorResponse | WeatherForecastHourly> {
  return unstable_cache(
    async (): Promise<WeatherForecastErrorResponse | WeatherForecastHourly> => {
      const response = await fetch(
        `${env.WEATHER_BASE_URL}/forecast?${BASE_PARAMS}&location=${location.latitude},${location.longitude}&timesteps=1h`,
        BASE_REQUEST_OPTIONS,
      );
      const responseData = (await response.json()) as
        | WeatherForecastErrorResponse
        | WeatherForecastHourlyResponse;
      console.log("Response:", responseData);
      if ("code" in responseData) return responseData;

      return {};
    },
    [`${location.latitude},${location.longitude}`],
    {
      tags: ["forecast", "hourly"],
      revalidate: 1000 * 60 * 20, // 20 minutes
    },
  )();
}

export type WeatherForecastDailyResponse = any;

export type WeatherForecastDaily = any;

export async function getWeatherForecastDaily(
  location: Location,
): Promise<WeatherForecastErrorResponse | WeatherForecastDaily> {
  return unstable_cache(
    async (): Promise<WeatherForecastErrorResponse | WeatherForecastDaily> => {
      const response = await fetch(
        `${env.WEATHER_BASE_URL}/forecast?${BASE_PARAMS}&location=${location.latitude},${location.longitude}&timesteps=1d`,
        BASE_REQUEST_OPTIONS,
      );
      const responseData = (await response.json()) as
        | WeatherForecastErrorResponse
        | WeatherForecastDailyResponse;
      console.log("Response:", responseData);
      if ("code" in responseData) return responseData;

      return {};
    },
    [`${location.latitude},${location.longitude}`],
    {
      tags: ["forecast", "daily"],
      revalidate: 1000 * 60 * 30, // 30 minutes
    },
  )();
}
