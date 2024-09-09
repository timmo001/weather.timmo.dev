"use client";
import { type Location } from "~/lib/schemas/location";

//
// Get the user's location from local storage, or default to the center of the earth
//
export function getLocationFromLocalStorage(): Location {
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
