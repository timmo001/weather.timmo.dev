"use server";
import "server-only";
import { unstable_cache } from "next/cache";

import { env } from "~/env";
import { type Location } from "~/lib/schema";
import {
  type AccuweatherLocation,
  type AccuweatherCurrentConditions,
} from "~/lib/types/accuweather";

const BASE_PARAMS = `apikey=${env.WEATHER_API_KEY}`;
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
      const response = await fetch(
        `${env.WEATHER_BASE_URL}/locations/v1/cities/geoposition/search?${BASE_PARAMS}&q=${location.latitude},${location.longitude}`,
        BASE_REQUEST_OPTIONS,
      );
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

      const response = await fetch(
        `${env.WEATHER_BASE_URL}/currentconditions/v1/${weatherLocation.Key}?${BASE_PARAMS}`,
        BASE_REQUEST_OPTIONS,
      );
      const responseData =
        (await response.json()) as Array<AccuweatherCurrentConditions>;
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
): Promise<any> {
  return unstable_cache(
    async (): Promise<any> => {
      return Promise.reject("Not implemented.");
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
): Promise<any> {
  return unstable_cache(
    async (): Promise<any> => {
      return Promise.reject("Not implemented.");
    },
    [`${location.latitude},${location.longitude}`],
    {
      tags: ["forecast", "daily"],
      revalidate: 1000 * 60 * 30, // 30 minutes
    },
  )();
}
