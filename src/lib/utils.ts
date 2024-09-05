import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//
// Get the cardinal direction from degrees (0-360) for wind direction
//
export function getWindDirectionCardinalFromDegrees(degrees: number): string {
  const cardinals = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  // Use a modulo operation to calculate the remainder of the degrees divided by 360
  // then divide that value by 22.5 and round the result to get the index of the
  // cardinal direction (N -> NNW) from the above array
  return cardinals[Math.round((degrees % 360) / 22.5)] || "N";
}
