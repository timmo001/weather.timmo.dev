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
      allowFullScreen
      allowTransparency
      src={`https://embed.windy.com/embed2.html?lat=${
        location.data?.latitude
      }&lon=${location.data?.longitude}&zoom=6&level=surface&overlay=rain&product=ecmwf&menu=&message=true&calendar=now&pressure=true&type=map&location=coordinates&metricWind=mph&metricTemp=%C2%B0C&radarRange=-1`}
      referrerPolicy="no-referrer"
      style={{
        width: "100%",
        height: "85vh",
        border: "none",
      }}
    />
  );
}
