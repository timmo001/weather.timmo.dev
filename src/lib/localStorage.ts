"use client";
import { z } from "zod";

import { LocationSchema } from "~/lib/schema";

export function getLocationFromLocalStorage(): z.infer<typeof LocationSchema> {
  const data = localStorage.getItem("location");
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing location data:", e);
    }
  }
  return {
    latitude: 32,
    longitude: 104.9,
  };
}
