"use client";
import { useQuery } from "@tanstack/react-query";

import { getLocationFromLocalStorage } from "~/lib/local-storage";

export function Map() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  return (
    <iframe
      src={`https://www.windy.com/-Weather-radar-radar?radar,${
        location.data?.latitude
      },${location.data?.longitude},5`}
      allowFullScreen
      allowTransparency
      referrerPolicy="no-referrer"
      style={{
        border: "none",
        width: "100%",
        height: "86vh",
      }}
    />
  );
}
