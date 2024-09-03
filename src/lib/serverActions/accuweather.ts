"use server";
import "server-only";
import { unstable_cache } from "next/cache";

import { env } from "~/env";
import { type Location } from "~/lib/schema";
import {
  type AccuweatherLocation,
  type AccuweatherCurrentConditions,
  AccuweatherHourlyForecast,
  AccuweatherDailyForecast,
} from "~/lib/types/accuweather";

const BASE_PARAMS = `apikey=${env.WEATHER_API_KEY}&details=true&language=en-gb`;
const BASE_REQUEST_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export async function getWeatherLocation(
  location: Location,
): Promise<AccuweatherLocation> {
  return unstable_cache(
    async (): Promise<any> => {
      const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?${BASE_PARAMS}&q=${location.latitude},${location.longitude}`;
      console.log("Get location:", url);
      const response = await fetch(url, BASE_REQUEST_OPTIONS);
      const responseData = (await response.json()) as AccuweatherLocation;
      console.log("Response:", JSON.stringify(responseData));

      return responseData;
    },
    [`${location.latitude},${location.longitude}`],
    {
      tags: ["forecast", "now"],
      revalidate: 1000 * 60 * 60, // 60 minutes
    },
  )();
}

export async function getWeatherForecastNow(
  location: Location,
): Promise<AccuweatherCurrentConditions> {
  return unstable_cache(
    async (): Promise<AccuweatherCurrentConditions> => {
      const weatherLocation = await getWeatherLocation(location);
      console.log("Location key:", weatherLocation.Key);

      const url = `https://dataservice.accuweather.com/currentconditions/v1/${weatherLocation.Key}?${BASE_PARAMS}`;
      console.log("Get current conditions:", url);
      const response = await fetch(url, BASE_REQUEST_OPTIONS);
      const responseData = await response.json();
      console.log("Response:", JSON.stringify(responseData));

      if (!responseData || responseData.length === 0 || !responseData[0])
        return Promise.reject("No data found.");

      return responseData[0];
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
): Promise<Array<AccuweatherHourlyForecast>> {
  return unstable_cache(
    async (): Promise<Array<AccuweatherHourlyForecast>> => {
      const weatherLocation = await getWeatherLocation(location);
      console.log("Location key:", weatherLocation.Key);

      const url = `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${weatherLocation.Key}?${BASE_PARAMS}&metric=true`;
      console.log("Get hourly forecast:", url);
      const response = await fetch(url, BASE_REQUEST_OPTIONS);
      const responseData = await response.json();
      console.log("Response:", JSON.stringify(responseData));

      if (!responseData || responseData.length === 0 || !responseData[0])
        return Promise.reject("No data found.");

      return responseData;
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
): Promise<AccuweatherDailyForecast> {
  return unstable_cache(
    async (): Promise<AccuweatherDailyForecast> => {
      const weatherLocation = await getWeatherLocation(location);
      console.log("Location key:", weatherLocation.Key);

      const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${weatherLocation.Key}?${BASE_PARAMS}&metric=true`;
      console.log("Get daily forecast:", url);
      const response = await fetch(url, BASE_REQUEST_OPTIONS);
      const responseData = await response.json();
      console.log("Response:", JSON.stringify(responseData));

      if (!responseData || responseData.length === 0 || !responseData[0])
        return Promise.reject("No data found.");

      return responseData;
    },
    [`${location.latitude},${location.longitude}`],
    {
      tags: ["forecast", "daily"],
      revalidate: 1000 * 60 * 30, // 30 minutes
    },
  )();
}
